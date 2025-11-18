import type { FileType } from '../types';
import { SUPPORTED_MIME_TYPES } from '../types';

interface DetectionResult {
  type: FileType;
  mimeType: string;
  extension?: string;
}

/**
 * Magic number signatures for file type detection
 */
const FILE_SIGNATURES: { [key: string]: { signature: number[]; mimeType: string; type: FileType } } = {
  png: { signature: [0x89, 0x50, 0x4e, 0x47], mimeType: 'image/png', type: 'image' },
  jpg: { signature: [0xff, 0xd8, 0xff], mimeType: 'image/jpeg', type: 'image' },
  gif87a: { signature: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], mimeType: 'image/gif', type: 'image' },
  gif89a: { signature: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], mimeType: 'image/gif', type: 'image' },
  pdf: { signature: [0x25, 0x50, 0x44, 0x46], mimeType: 'application/pdf', type: 'pdf' },
  xlsx: { signature: [0x50, 0x4b, 0x03, 0x04], mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', type: 'excel' },
  xls: { signature: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1], mimeType: 'application/vnd.ms-excel', type: 'excel' },
  webp: { signature: [0x52, 0x49, 0x46, 0x46], mimeType: 'image/webp', type: 'image' },
  bmp: { signature: [0x42, 0x4d], mimeType: 'image/bmp', type: 'image' },
  mp3_id3: { signature: [0x49, 0x44, 0x33], mimeType: 'audio/mpeg', type: 'audio' },
  mp3_ff: { signature: [0xff, 0xfb], mimeType: 'audio/mpeg', type: 'audio' },
  mp4: { signature: [0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70], mimeType: 'video/mp4', type: 'video' },
  mp4_alt: { signature: [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70], mimeType: 'video/mp4', type: 'video' },
  ogg: { signature: [0x4f, 0x67, 0x67, 0x53], mimeType: 'audio/ogg', type: 'audio' },
  wav: { signature: [0x52, 0x49, 0x46, 0x46], mimeType: 'audio/wav', type: 'audio' },
};

/**
 * Detect file type from magic numbers in base64 data
 */
function detectFromMagicNumbers(base64Data: string): DetectionResult | null {
  try {
    const binaryString = atob(base64Data.substring(0, Math.min(base64Data.length, 100)));
    const bytes: number[] = [];

    for (let i = 0; i < Math.min(binaryString.length, 32); i++) {
      bytes.push(binaryString.charCodeAt(i));
    }

    // Check against known signatures
    for (const [, info] of Object.entries(FILE_SIGNATURES)) {
      const { signature, mimeType, type } = info;
      let matches = true;

      for (let i = 0; i < signature.length; i++) {
        if (bytes[i] !== signature[i]) {
          matches = false;
          break;
        }
      }

      if (matches) {
        return { type, mimeType, extension: getExtensionFromMimeType(mimeType) };
      }
    }

    // Special case for WEBP (need to check WEBP signature at offset 8)
    if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
      if (bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
        return { type: 'image', mimeType: 'image/webp', extension: 'webp' };
      }
    }

    // Try to detect text-based formats
    const textContent = binaryString.substring(0, 100).trim();

    if (textContent.startsWith('<?xml') || textContent.startsWith('<xml')) {
      return { type: 'xml', mimeType: 'application/xml', extension: 'xml' };
    }

    if (textContent.startsWith('<!DOCTYPE html') || textContent.startsWith('<html')) {
      return { type: 'html', mimeType: 'text/html', extension: 'html' };
    }

    if (textContent.startsWith('<svg')) {
      return { type: 'image', mimeType: 'image/svg+xml', extension: 'svg' };
    }

    // Try to parse as JSON
    try {
      JSON.parse(textContent);
      return { type: 'json', mimeType: 'application/json', extension: 'json' };
    } catch {
      // Not JSON
    }

  } catch {
    // Failed to decode or analyze
  }

  return null;
}

/**
 * Detect file type from MIME type
 */
function detectFromMimeType(mimeType: string): DetectionResult | null {
  const type = SUPPORTED_MIME_TYPES[mimeType];
  if (type) {
    return {
      type,
      mimeType,
      extension: getExtensionFromMimeType(mimeType),
    };
  }
  return null;
}

/**
 * Get file extension from MIME type
 */
function getExtensionFromMimeType(mimeType: string): string {
  const mimeToExtension: { [key: string]: string } = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'application/pdf': 'pdf',
    'text/plain': 'txt',
    'text/markdown': 'md',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/ogg': 'ogg',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'application/json': 'json',
    'application/xml': 'xml',
    'text/csv': 'csv',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'text/html': 'html',
    'text/javascript': 'js',
    'text/css': 'css',
  };

  return mimeToExtension[mimeType] || '';
}

/**
 * Main file type detection function
 */
export function detectFileType(base64Data: string, providedMimeType?: string | null): DetectionResult {
  // First, try the provided MIME type
  if (providedMimeType) {
    const result = detectFromMimeType(providedMimeType);
    if (result) {
      return result;
    }
  }

  // Second, try magic number detection
  const magicResult = detectFromMagicNumbers(base64Data);
  if (magicResult) {
    return magicResult;
  }

  // Third, try to detect if it's text
  try {
    const decoded = atob(base64Data.substring(0, Math.min(base64Data.length, 1000)));
    const isPrintable = /^[\x20-\x7E\s]*$/.test(decoded);

    if (isPrintable) {
      // Check for CSV (commas and newlines)
      if (decoded.includes(',') && decoded.includes('\n')) {
        return { type: 'csv', mimeType: 'text/csv', extension: 'csv' };
      }

      // Check for Markdown
      if (decoded.includes('#') || decoded.includes('##') || decoded.includes('```')) {
        return { type: 'markdown', mimeType: 'text/markdown', extension: 'md' };
      }

      // Default to plain text
      return { type: 'text', mimeType: 'text/plain', extension: 'txt' };
    }
  } catch {
    // Not text
  }

  // Default to unknown
  return { type: 'unknown', mimeType: 'application/octet-stream', extension: 'bin' };
}

/**
 * Check if a file type is supported for viewing
 */
export function isSupported(fileType: FileType): boolean {
  return fileType !== 'unknown';
}

/**
 * Get human-readable file type name
 */
export function getFileTypeName(fileType: FileType, mimeType: string): string {
  const typeNames: { [key in FileType]: string } = {
    image: 'Image',
    pdf: 'PDF Document',
    text: 'Text File',
    audio: 'Audio File',
    video: 'Video File',
    json: 'JSON Data',
    xml: 'XML Document',
    csv: 'CSV Spreadsheet',
    excel: 'Excel Spreadsheet',
    html: 'HTML Document',
    code: 'Code File',
    markdown: 'Markdown Document',
    unknown: 'Unknown File Type',
  };

  let name = typeNames[fileType];

  // Add specific format if available
  if (mimeType) {
    const subtype = mimeType.split('/')[1];
    if (subtype) {
      name += ` (${subtype.toUpperCase()})`;
    }
  }

  return name;
}
