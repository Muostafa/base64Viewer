import type { DecodedFile } from '../types';
import { detectFileType } from './fileTypeDetector';

export class Base64DecoderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Base64DecoderError';
  }
}

/**
 * Validates if a string is valid base64
 */
export function isValidBase64(str: string): boolean {
  if (!str || str.length === 0) {
    return false;
  }

  try {
    // Remove data URI prefix if present
    const base64Data = str.includes(',') ? str.split(',')[1] : str;

    // Check if it's valid base64 format
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(base64Data.trim())) {
      return false;
    }

    // Try to decode
    atob(base64Data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extracts MIME type from data URI
 */
export function extractMimeType(dataUri: string): string | null {
  const match = dataUri.match(/^data:([^;,]+)/);
  return match ? match[1] : null;
}

/**
 * Converts base64 string to ArrayBuffer
 */
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}

/**
 * Converts base64 string to Blob
 */
export function base64ToBlob(base64: string, mimeType: string): Blob {
  const arrayBuffer = base64ToArrayBuffer(base64);
  return new Blob([arrayBuffer], { type: mimeType });
}

/**
 * Main decoder function that handles various base64 input formats
 */
export function decodeBase64(input: string): DecodedFile {
  if (!input || input.trim().length === 0) {
    throw new Base64DecoderError('Input is empty');
  }

  const trimmedInput = input.trim();
  let base64Data: string;
  let mimeType: string | null = null;

  // Check if it's a data URI
  if (trimmedInput.startsWith('data:')) {
    mimeType = extractMimeType(trimmedInput);
    const parts = trimmedInput.split(',');

    if (parts.length !== 2) {
      throw new Base64DecoderError('Invalid data URI format');
    }

    base64Data = parts[1];
  } else {
    base64Data = trimmedInput;
  }

  // Validate base64
  if (!isValidBase64(base64Data)) {
    throw new Base64DecoderError('Invalid base64 string');
  }

  // Decode to binary
  let decodedData: string;
  try {
    decodedData = atob(base64Data);
  } catch (error) {
    throw new Base64DecoderError('Failed to decode base64: ' + (error as Error).message);
  }

  // Detect file type
  const detectionResult = detectFileType(base64Data, mimeType);

  // Convert to ArrayBuffer for binary data
  const arrayBuffer = base64ToArrayBuffer(base64Data);

  return {
    data: arrayBuffer,
    type: detectionResult.type,
    mimeType: detectionResult.mimeType,
    size: decodedData.length,
    extension: detectionResult.extension,
  };
}

/**
 * Creates a downloadable object URL from base64
 */
export function createObjectURL(base64: string, mimeType: string): string {
  const blob = base64ToBlob(base64, mimeType);
  return URL.createObjectURL(blob);
}

/**
 * Converts ArrayBuffer to base64 string
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';

  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

/**
 * Gets file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
