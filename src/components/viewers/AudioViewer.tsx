import type { DecodedFile } from '../../types';

interface AudioViewerProps {
  file: DecodedFile;
  base64Data: string;
}

export function AudioViewer({ file, base64Data }: AudioViewerProps) {
  const audioUrl = `data:${file.mimeType};base64,${base64Data}`;

  return (
    <div className="audio-viewer" style={{ padding: '2rem', textAlign: 'center' }}>
      <div style={{ marginBottom: '1rem' }}>
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ opacity: 0.5 }}
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </div>
      <audio controls style={{ width: '100%', maxWidth: '500px' }}>
        <source src={audioUrl} type={file.mimeType} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
