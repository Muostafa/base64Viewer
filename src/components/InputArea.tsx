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
      <div className="input-section-header">
        <h3 className="input-section-title">Input Base64 Data</h3>
        <div className="input-buttons">
          <button onClick={() => fileInputRef.current?.click()} className="btn-upload">
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
        className={isDragging ? 'drop-zone dragging' : 'drop-zone not-dragging'}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste base64 string here or drag and drop a file...&#10;&#10;Supports:&#10;- Plain base64 string&#10;- Data URI (data:image/png;base64,...)"
          className="input-textarea"
        />
      </div>

      <div className="input-actions">
        <button onClick={handleSubmit} disabled={!input.trim()} className="btn-view">
          View
        </button>
        <button onClick={handleClear} className="btn-clear">
          Clear
        </button>
      </div>
    </div>
  );
}
