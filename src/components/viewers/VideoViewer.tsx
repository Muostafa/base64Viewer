import type { DecodedFile } from '../../types';

interface VideoViewerProps {
  file: DecodedFile;
  base64Data: string;
}

export function VideoViewer({ file, base64Data }: VideoViewerProps) {
  const videoUrl = `data:${file.mimeType};base64,${base64Data}`;

  return (
    <div className="video-viewer" style={{ padding: '1rem', textAlign: 'center' }}>
      <video
        controls
        style={{
          width: '100%',
          maxWidth: '800px',
          maxHeight: '600px',
          borderRadius: '4px',
        }}
      >
        <source src={videoUrl} type={file.mimeType} />
        Your browser does not support the video element.
      </video>
    </div>
  );
}
