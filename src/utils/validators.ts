const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit

export function validateFileSize(size: number, maxSize: number = MAX_FILE_SIZE): boolean {
  return size <= maxSize;
}

export function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
}
