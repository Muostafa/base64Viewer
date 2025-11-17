import { useState } from 'react';
import type { DecodedFile } from '../../types';

interface JSONViewerProps {
  file: DecodedFile;
  base64Data: string;
}

export function JSONViewer({ base64Data }: JSONViewerProps) {
  const [error, setError] = useState<string | null>(null);
  const [formatted, setFormatted] = useState<string>('');
  const [viewMode, setViewMode] = useState<'tree' | 'raw'>('tree');

  useState(() => {
    try {
      const decodedText = atob(base64Data);
      const parsed = JSON.parse(decodedText);
      setFormatted(JSON.stringify(parsed, null, 2));
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
    }
  });

  if (error) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="json-viewer">
      <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #ddd' }}>
        <button
          onClick={() => setViewMode('tree')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: viewMode === 'tree' ? '#007bff' : '#f0f0f0',
            color: viewMode === 'tree' ? 'white' : 'black',
            border: 'none',
            cursor: 'pointer',
            marginRight: '0.5rem',
          }}
        >
          Formatted
        </button>
        <button
          onClick={() => setViewMode('raw')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: viewMode === 'raw' ? '#007bff' : '#f0f0f0',
            color: viewMode === 'raw' ? 'white' : 'black',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Raw
        </button>
      </div>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          padding: '1rem',
          backgroundColor: '#282c34',
          color: '#abb2bf',
          borderRadius: '4px',
          maxHeight: '600px',
          overflow: 'auto',
          fontFamily: 'monospace',
          margin: 0,
        }}
      >
        {viewMode === 'tree' ? formatted : atob(base64Data)}
      </pre>
    </div>
  );
}
