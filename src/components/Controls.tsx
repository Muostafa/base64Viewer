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
      <div className="controls-container">
        <div className="controls-info">
          <div className="controls-info-title">File Info:</div>
          <div className="controls-info-details">
            <div>Type: {getFileTypeName(file.type, file.mimeType)}</div>
            <div>MIME: {file.mimeType}</div>
            <div>Size: {formatFileSize(file.size)}</div>
          </div>
        </div>
        <div className="controls-buttons">
          <button onClick={handleCopy} className="btn-copy">
            📋 Copy Base64
          </button>
          <button onClick={handleDownload} className="btn-download">
            ⬇ Download
          </button>
        </div>
      </div>
    </div>
  );
}
