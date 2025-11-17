import type { DecodedFile } from '../../types';

interface TextViewerProps {
  file: DecodedFile;
  base64Data: string;
}

export function TextViewer({ base64Data }: TextViewerProps) {
  const decodedText = atob(base64Data);

  return (
    <div className="text-viewer">
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          maxHeight: '600px',
          overflow: 'auto',
          fontFamily: 'monospace',
        }}
      >
        {decodedText}
      </pre>
    </div>
  );
}
