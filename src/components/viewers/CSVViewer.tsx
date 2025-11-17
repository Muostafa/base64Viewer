import { useEffect, useState } from 'react';
import type { DecodedFile } from '../../types';
import Papa from 'papaparse';

interface CSVViewerProps {
  file: DecodedFile;
  base64Data: string;
}

export function CSVViewer({ base64Data }: CSVViewerProps) {
  const [data, setData] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const decodedText = atob(base64Data);
      const result = Papa.parse(decodedText, {
        skipEmptyLines: true,
      });

      if (result.errors.length > 0) {
        setError('CSV parsing errors: ' + result.errors[0].message);
      } else {
        setData(result.data as string[][]);
      }
    } catch (err) {
      setError('Failed to parse CSV: ' + (err as Error).message);
    }
  }, [base64Data]);

  if (error) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (data.length === 0) {
    return <div style={{ padding: '2rem' }}>No data to display</div>;
  }

  return (
    <div className="csv-viewer" style={{ padding: '1rem', maxHeight: '600px', overflow: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            {data[0].map((header, index) => (
              <th
                key={index}
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? 'white' : '#f9f9f9' }}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    border: '1px solid #ddd',
                    padding: '8px',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '1rem', color: '#666', fontSize: '12px' }}>
        Showing {data.length - 1} rows, {data[0].length} columns
      </div>
    </div>
  );
}
