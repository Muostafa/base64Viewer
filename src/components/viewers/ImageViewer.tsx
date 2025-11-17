import { useState } from 'react';
import type { DecodedFile } from '../../types';

interface ImageViewerProps {
  file: DecodedFile;
  base64Data: string;
}

export function ImageViewer({ file, base64Data }: ImageViewerProps) {
  const [zoom, setZoom] = useState(100);
  const imageUrl = `data:${file.mimeType};base64,${base64Data}`;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 25));
  const handleResetZoom = () => setZoom(100);

  return (
    <div className="image-viewer">
      <div className="viewer-controls">
        <button onClick={handleZoomOut} disabled={zoom <= 25}>
          Zoom Out (-)
        </button>
        <span>{zoom}%</span>
        <button onClick={handleZoomIn} disabled={zoom >= 300}>
          Zoom In (+)
        </button>
        <button onClick={handleResetZoom}>Reset</button>
      </div>
      <div className="image-container" style={{ overflow: 'auto', maxHeight: '600px' }}>
        <img
          src={imageUrl}
          alt="Decoded content"
          style={{
            width: `${zoom}%`,
            height: 'auto',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </div>
    </div>
  );
}
