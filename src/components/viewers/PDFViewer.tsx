import { useEffect, useRef, useState } from 'react';
import type { DecodedFile } from '../../types';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: DecodedFile;
  base64Data: string;
}

export function PDFViewer({ base64Data }: PDFViewerProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pdfDocRef = useRef<any>(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);

        // Convert base64 to Uint8Array
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const loadingTask = pdfjsLib.getDocument({ data: bytes });
        const pdf = await loadingTask.promise;
        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);
        setLoading(false);
      } catch (err) {
        setError('Failed to load PDF: ' + (err as Error).message);
        setLoading(false);
      }
    };

    loadPDF();
  }, [base64Data]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDocRef.current || !canvasRef.current) return;

      try {
        const page = await pdfDocRef.current.getPage(currentPage);
        const viewport = page.getViewport({ scale });

        // Clear previous canvases
        canvasRef.current.innerHTML = '';

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';

        canvasRef.current.appendChild(canvas);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        setError('Failed to render page: ' + (err as Error).message);
      }
    };

    renderPage();
  }, [currentPage, scale]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading PDF...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-controls" style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage <= 1}>
          Previous
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {currentPage} of {numPages}
        </span>
        <button onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))} disabled={currentPage >= numPages}>
          Next
        </button>
        <span style={{ marginLeft: '2rem' }}>
          <button onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}>-</button>
          <span style={{ margin: '0 0.5rem' }}>{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale((s) => Math.min(3, s + 0.25))}>+</button>
        </span>
      </div>
      <div ref={canvasRef} style={{ padding: '1rem', maxHeight: '700px', overflow: 'auto' }} />
    </div>
  );
}
