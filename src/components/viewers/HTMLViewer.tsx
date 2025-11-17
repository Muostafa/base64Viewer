import { useState } from 'react';
import type { DecodedFile } from '../../types';
import DOMPurify from 'dompurify';

interface HTMLViewerProps {
  file: DecodedFile;
  base64Data: string;
}

export function HTMLViewer({ base64Data }: HTMLViewerProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'source'>('preview');
  const decodedHTML = atob(base64Data);
  const sanitizedHTML = DOMPurify.sanitize(decodedHTML);

  return (
    <div className="html-viewer">
      <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #ddd' }}>
        <button
          onClick={() => setViewMode('preview')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: viewMode === 'preview' ? '#007bff' : '#f0f0f0',
            color: viewMode === 'preview' ? 'white' : 'black',
            border: 'none',
            cursor: 'pointer',
            marginRight: '0.5rem',
          }}
        >
          Preview
        </button>
        <button
          onClick={() => setViewMode('source')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: viewMode === 'source' ? '#007bff' : '#f0f0f0',
            color: viewMode === 'source' ? 'white' : 'black',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Source
        </button>
      </div>
      {viewMode === 'preview' ? (
        <div
          style={{
            padding: '1rem',
            maxHeight: '600px',
            overflow: 'auto',
            border: '1px solid #ddd',
            backgroundColor: 'white',
          }}
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        />
      ) : (
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
            margin: 0,
          }}
        >
          {decodedHTML}
        </pre>
      )}
    </div>
  );
}
