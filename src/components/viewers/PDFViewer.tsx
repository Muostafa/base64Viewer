import { useEffect, useRef, useState } from 'react';
import type { DecodedFile } from '../../types';
import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';

// Set worker path to use local worker instead of CDN
// This provides better reliability and avoids external dependencies
if (typeof window !== 'undefined') {
  try {
    // Use the worker from node_modules for development
    // Vite will bundle this appropriately for production
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.mjs',
      import.meta.url
    ).toString();
  } catch (error) {
    // Fallback to CDN if local worker fails to load
    console.warn('Failed to load local PDF.js worker, falling back to CDN:', error);
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }
}

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
  const pdfDocRef = useRef<PDFDocumentProxy | null>(null);

  useEffect(() => {
    let mounted = true;

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

        if (!mounted) {
          // Cleanup if component unmounted during loading
          pdf.destroy();
          return;
        }

        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);
        setLoading(false);
      } catch (err) {
        if (!mounted) return;

        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Failed to load PDF: ${errorMessage}. Please ensure the base64 data is a valid PDF file.`);
        setLoading(false);
        console.error('PDF loading error:', err);
      }
    };

    loadPDF();

    // Cleanup function to prevent memory leaks
    return () => {
      mounted = false;
      if (pdfDocRef.current) {
        pdfDocRef.current.destroy();
        pdfDocRef.current = null;
      }
    };
  }, [base64Data]);

  useEffect(() => {
    let renderTask: any = null;

    const renderPage = async () => {
      if (!pdfDocRef.current || !canvasRef.current) return;

      try {
        const page = await pdfDocRef.current.getPage(currentPage);
        const viewport = page.getViewport({ scale });

        // Clear previous canvases
        canvasRef.current.innerHTML = '';

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { alpha: false });

        if (!context) {
          console.error('Failed to get 2D context for canvas');
          setError('Failed to initialize PDF renderer. Your browser may not support this feature.');
          return;
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';

        canvasRef.current.appendChild(canvas);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;

        // Cleanup page resources
        page.cleanup();
      } catch (err) {
        if (err instanceof Error && err.name === 'RenderingCancelledException') {
          // Rendering was cancelled (e.g., user changed page quickly)
          return;
        }
        const errorMessage = err instanceof Error ? err.message : 'Unknown rendering error';
        setError(`Failed to render page: ${errorMessage}`);
        console.error('PDF rendering error:', err);
      }
    };

    renderPage();

    // Cleanup function to cancel ongoing render task
    return () => {
      if (renderTask) {
        renderTask.cancel?.();
      }
    };
  }, [currentPage, scale]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading PDF...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  return (
    <div className="pdf-viewer" role="document" aria-label="PDF Viewer">
      <div
        className="pdf-controls"
        style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #ddd' }}
        role="toolbar"
        aria-label="PDF navigation and zoom controls"
      >
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          aria-label="Go to previous page"
          title="Previous page"
        >
          Previous
        </button>
        <span style={{ margin: '0 1rem' }} aria-live="polite" aria-atomic="true">
          Page {currentPage} of {numPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
          disabled={currentPage >= numPages}
          aria-label="Go to next page"
          title="Next page"
        >
          Next
        </button>
        <span style={{ marginLeft: '2rem' }}>
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
            disabled={scale <= 0.5}
            aria-label="Zoom out"
            title="Zoom out (minimum 50%)"
          >
            -
          </button>
          <span style={{ margin: '0 0.5rem' }} aria-live="polite">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(3, s + 0.25))}
            disabled={scale >= 3}
            aria-label="Zoom in"
            title="Zoom in (maximum 300%)"
          >
            +
          </button>
        </span>
      </div>
      <div
        ref={canvasRef}
        style={{ padding: '1rem', maxHeight: '700px', overflow: 'auto' }}
        role="img"
        aria-label={`PDF page ${currentPage} of ${numPages} at ${Math.round(scale * 100)}% zoom`}
      />
    </div>
  );
}
