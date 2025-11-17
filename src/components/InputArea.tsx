import { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';

interface InputAreaProps {
  onBase64Input: (base64: string) => void;
  onClear: () => void;
}

export function InputArea({ onBase64Input, onClear }: InputAreaProps) {
  const [input, setInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (input.trim()) {
      onBase64Input(input.trim());
    }
  };

  const handleClear = () => {
    setInput('');
    onClear();
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        // Extract base64 data from data URL
        const base64Data = result.split(',')[1] || result;
        const dataUrl = `data:${file.type};base64,${base64Data}`;
        setInput(dataUrl);
        onBase64Input(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="input-area">
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Input Base64 Data</h3>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Upload File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: isDragging ? '2px dashed #007bff' : '2px dashed #ddd',
          borderRadius: '4px',
          padding: '1rem',
          backgroundColor: isDragging ? '#f0f8ff' : 'white',
          marginBottom: '1rem',
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste base64 string here or drag and drop a file...&#10;&#10;Supports:&#10;- Plain base64 string&#10;- Data URI (data:image/png;base64,...)"
          style={{
            width: '100%',
            minHeight: '150px',
            padding: '0.75rem',
            fontSize: '14px',
            fontFamily: 'monospace',
            border: '1px solid #ddd',
            borderRadius: '4px',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: input.trim() ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          View
        </button>
        <button
          onClick={handleClear}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
