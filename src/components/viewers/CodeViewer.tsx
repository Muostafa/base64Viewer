import { useEffect, useRef } from 'react';
import type { DecodedFile } from '../../types';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface CodeViewerProps {
  file: DecodedFile;
  base64Data: string;
}

export function CodeViewer({ file, base64Data }: CodeViewerProps) {
  const codeRef = useRef<HTMLElement>(null);
  const decodedText = atob(base64Data);

  // Determine language from MIME type
  const getLanguage = (mimeType: string): string => {
    const languageMap: { [key: string]: string } = {
      'text/javascript': 'javascript',
      'application/javascript': 'javascript',
      'text/css': 'css',
      'text/x-python': 'python',
      'text/x-java': 'java',
      'text/x-c': 'c',
      'text/x-c++': 'cpp',
      'application/json': 'json',
      'text/html': 'html',
      'application/xml': 'xml',
      'text/xml': 'xml',
    };

    return languageMap[mimeType] || 'plaintext';
  };

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [decodedText]);

  const language = getLanguage(file.mimeType);

  return (
    <div className="code-viewer">
      <div
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0d1117',
          color: '#c9d1d9',
          borderBottom: '1px solid #30363d',
        }}
      >
        <small>Language: {language}</small>
      </div>
      <pre style={{ margin: 0, maxHeight: '600px', overflow: 'auto' }}>
        <code ref={codeRef} className={`language-${language}`}>
          {decodedText}
        </code>
      </pre>
    </div>
  );
}
