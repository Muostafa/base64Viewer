import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import type { DecodedFile } from '../../types';

interface ExcelViewerProps {
  file: DecodedFile;
  base64Data: string;
}

interface SheetData {
  name: string;
  data: string[][];
}

export function ExcelViewer({ base64Data }: ExcelViewerProps) {
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExcel = () => {
      try {
        setLoading(true);
        setError(null);

        // Convert base64 to binary
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Read workbook
        const workbook = XLSX.read(bytes, { type: 'array' });

        // Convert all sheets to array data
        const sheetsData: SheetData[] = workbook.SheetNames.map((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
          return {
            name: sheetName,
            data,
          };
        });

        setSheets(sheetsData);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Failed to load Excel file: ${errorMessage}`);
        setLoading(false);
        console.error('Excel loading error:', err);
      }
    };

    loadExcel();
  }, [base64Data]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Excel file...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  if (sheets.length === 0) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No sheets found in Excel file.</div>;
  }

  const currentSheet = sheets[currentSheetIndex];

  return (
    <div className="excel-viewer" style={{ padding: '1rem' }}>
      {/* Sheet tabs */}
      {sheets.length > 1 && (
        <div style={{ marginBottom: '1rem', borderBottom: '1px solid #ddd' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {sheets.map((sheet, index) => (
              <button
                key={index}
                onClick={() => setCurrentSheetIndex(index)}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderBottom: currentSheetIndex === index ? '2px solid #007bff' : '2px solid transparent',
                  background: currentSheetIndex === index ? '#f8f9fa' : 'transparent',
                  cursor: 'pointer',
                  fontWeight: currentSheetIndex === index ? 'bold' : 'normal',
                  color: currentSheetIndex === index ? '#007bff' : '#333',
                }}
              >
                {sheet.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sheet info */}
      <div style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
        Sheet: <strong>{currentSheet.name}</strong> ({currentSheet.data.length} rows)
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', maxHeight: '600px', overflowY: 'auto', border: '1px solid #ddd' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <tbody>
            {currentSheet.data.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ background: rowIndex === 0 ? '#f8f9fa' : rowIndex % 2 === 0 ? 'white' : '#fafafa' }}>
                {row.map((cell, cellIndex) => {
                  const CellTag = rowIndex === 0 ? 'th' : 'td';
                  return (
                    <CellTag
                      key={cellIndex}
                      style={{
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        textAlign: 'left',
                        fontWeight: rowIndex === 0 ? 'bold' : 'normal',
                        whiteSpace: 'nowrap',
                        minWidth: '100px',
                      }}
                    >
                      {cell !== null && cell !== undefined ? String(cell) : ''}
                    </CellTag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentSheet.data.length === 0 && (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
          Sheet is empty
        </div>
      )}
    </div>
  );
}
