import type { DecodedFile } from '../types';
import { ImageViewer } from './viewers/ImageViewer';
import { TextViewer } from './viewers/TextViewer';
import { PDFViewer } from './viewers/PDFViewer';
import { AudioViewer } from './viewers/AudioViewer';
import { VideoViewer } from './viewers/VideoViewer';
import { CodeViewer } from './viewers/CodeViewer';
import { JSONViewer } from './viewers/JSONViewer';
import { CSVViewer } from './viewers/CSVViewer';
import { HTMLViewer } from './viewers/HTMLViewer';

interface ViewerProps {
  file: DecodedFile;
  base64Data: string;
}

export function Viewer({ file, base64Data }: ViewerProps) {
  const renderViewer = () => {
    switch (file.type) {
      case 'image':
        return <ImageViewer file={file} base64Data={base64Data} />;

      case 'pdf':
        return <PDFViewer file={file} base64Data={base64Data} />;

      case 'text':
      case 'markdown':
        return <TextViewer file={file} base64Data={base64Data} />;

      case 'audio':
        return <AudioViewer file={file} base64Data={base64Data} />;

      case 'video':
        return <VideoViewer file={file} base64Data={base64Data} />;

      case 'json':
        return <JSONViewer file={file} base64Data={base64Data} />;

      case 'csv':
        return <CSVViewer file={file} base64Data={base64Data} />;

      case 'html':
        return <HTMLViewer file={file} base64Data={base64Data} />;

      case 'code':
      case 'xml':
        return <CodeViewer file={file} base64Data={base64Data} />;

      case 'unknown':
      default:
        return (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            <p>Unsupported file type: {file.mimeType}</p>
            <p>Unable to preview this file.</p>
          </div>
        );
    }
  };

  return (
    <div className="viewer-container" style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
      {renderViewer()}
    </div>
  );
}
