import type { DecodedFile } from '../types';
import { formatFileSize } from '../utils/base64Decoder';
import { getFileTypeName } from '../utils/fileTypeDetector';

interface ControlsProps {
  file: DecodedFile;
  base64Data: string;
}

export function Controls({ file, base64Data }: ControlsProps) {
  const handleDownload = () => {
    const fileName = `download.${file.extension || 'bin'}`;
    const dataUrl = `data:${file.mimeType};base64,${base64Data}`;

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(base64Data);
      alert('Base64 data copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard: ' + (err as Error).message);
    }
  };

  return (
    <div className="controls" style={{ marginBottom: '1rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          border: '1px solid #ddd',
        }}
      >
        <div>
          <strong>File Info:</strong>
          <div style={{ marginTop: '0.5rem', fontSize: '14px', color: '#666' }}>
            <div>Type: {getFileTypeName(file.type, file.mimeType)}</div>
            <div>MIME: {file.mimeType}</div>
            <div>Size: {formatFileSize(file.size)}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleCopy}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            📋 Copy Base64
          </button>
          <button
            onClick={handleDownload}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            ⬇ Download
          </button>
        </div>
      </div>
    </div>
  );
}
