import { useState } from 'react';
import type { DecodedFile } from './types';
import { decodeBase64, Base64DecoderError } from './utils/base64Decoder';
import { InputArea } from './components/InputArea';
import { Controls } from './components/Controls';
import { Viewer } from './components/Viewer';
import './App.css';

function App() {
  const [decodedFile, setDecodedFile] = useState<DecodedFile | null>(null);
  const [base64Data, setBase64Data] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleBase64Input = (input: string) => {
    setError(null);

    try {
      // Extract base64 data from input (handle data URI or plain base64)
      let base64String = input;
      if (input.includes(',')) {
        base64String = input.split(',')[1];
      }

      const decoded = decodeBase64(input);
      setDecodedFile(decoded);
      setBase64Data(base64String);
    } catch (err) {
      if (err instanceof Base64DecoderError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred: ' + (err as Error).message);
      }
      setDecodedFile(null);
      setBase64Data('');
    }
  };

  const handleClear = () => {
    setDecodedFile(null);
    setBase64Data('');
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Base64 Viewer</h1>
        <p>View base64-encoded files online without downloading</p>
      </header>

      <main className="app-main">
        <div className="container">
          <InputArea onBase64Input={handleBase64Input} onClear={handleClear} />

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          {decodedFile && (
            <div className="preview-section">
              <h3 style={{ marginBottom: '1rem' }}>Preview</h3>
              <Controls file={decodedFile} base64Data={base64Data} />
              <Viewer file={decodedFile} base64Data={base64Data} />
            </div>
          )}

          {!decodedFile && !error && (
            <div className="info-section">
              <h3>Supported File Types</h3>
              <div className="supported-types">
                <div className="type-category">
                  <h4>Images</h4>
                  <p>PNG, JPEG, GIF, SVG, WebP, BMP, ICO</p>
                </div>
                <div className="type-category">
                  <h4>Documents</h4>
                  <p>PDF, Text, Markdown</p>
                </div>
                <div className="type-category">
                  <h4>Media</h4>
                  <p>MP3, WAV, OGG (Audio)<br/>MP4, WebM, OGG (Video)</p>
                </div>
                <div className="type-category">
                  <h4>Data & Code</h4>
                  <p>JSON, XML, CSV, Excel (XLS/XLSX), HTML<br/>JavaScript, CSS, Python, Java, C/C++</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>All processing happens in your browser. No data is sent to any server.</p>
      </footer>
    </div>
  );
}

export default App;
