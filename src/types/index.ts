export type FileType =
  | 'image'
  | 'pdf'
  | 'text'
  | 'audio'
  | 'video'
  | 'json'
  | 'xml'
  | 'csv'
  | 'excel'
  | 'html'
  | 'code'
  | 'markdown'
  | 'unknown';

export interface DecodedFile {
  data: string | ArrayBuffer;
  type: FileType;
  mimeType: string;
  size: number;
  extension?: string;
}

export interface FileInfo {
  name?: string;
  size: number;
  mimeType: string;
  type: FileType;
}

export const SUPPORTED_MIME_TYPES: Record<string, FileType> = {
  // Images
  'image/png': 'image',
  'image/jpeg': 'image',
  'image/jpg': 'image',
  'image/gif': 'image',
  'image/svg+xml': 'image',
  'image/webp': 'image',
  'image/bmp': 'image',
  'image/x-icon': 'image',
  'image/vnd.microsoft.icon': 'image',

  // PDF
  'application/pdf': 'pdf',

  // Text
  'text/plain': 'text',
  'text/markdown': 'markdown',

  // Audio
  'audio/mpeg': 'audio',
  'audio/mp3': 'audio',
  'audio/wav': 'audio',
  'audio/ogg': 'audio',
  'audio/webm': 'audio',
  'audio/x-m4a': 'audio',
  'audio/mp4': 'audio',

  // Video
  'video/mp4': 'video',
  'video/webm': 'video',
  'video/ogg': 'video',
  'video/quicktime': 'video',

  // Data formats
  'application/json': 'json',
  'text/json': 'json',
  'application/xml': 'xml',
  'text/xml': 'xml',
  'text/csv': 'csv',
  'application/vnd.ms-excel': 'excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'excel',
  'text/html': 'html',
  'application/xhtml+xml': 'html',

  // Code
  'text/javascript': 'code',
  'application/javascript': 'code',
  'text/css': 'code',
  'text/x-python': 'code',
  'text/x-java': 'code',
  'text/x-c': 'code',
  'text/x-c++': 'code',
};

export const EXTENSION_TO_MIME: Record<string, string> = {
  // Images
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'svg': 'image/svg+xml',
  'webp': 'image/webp',
  'bmp': 'image/bmp',
  'ico': 'image/x-icon',

  // Documents
  'pdf': 'application/pdf',
  'txt': 'text/plain',
  'md': 'text/markdown',

  // Audio
  'mp3': 'audio/mpeg',
  'wav': 'audio/wav',
  'ogg': 'audio/ogg',
  'm4a': 'audio/x-m4a',

  // Video
  'mp4': 'video/mp4',
  'webm': 'video/webm',
  'ogv': 'video/ogg',
  'mov': 'video/quicktime',

  // Data
  'json': 'application/json',
  'xml': 'application/xml',
  'csv': 'text/csv',
  'xls': 'application/vnd.ms-excel',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'html': 'text/html',
  'htm': 'text/html',

  // Code
  'js': 'text/javascript',
  'jsx': 'text/javascript',
  'ts': 'text/javascript',
  'tsx': 'text/javascript',
  'css': 'text/css',
  'py': 'text/x-python',
  'java': 'text/x-java',
  'c': 'text/x-c',
  'cpp': 'text/x-c++',
  'h': 'text/x-c',
};
