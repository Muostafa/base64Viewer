# Base64 Viewer

A modern, feature-rich web application for viewing base64-encoded files online without downloading them. Built with React, TypeScript, and Vite.

## Features

### Comprehensive File Support
- **Images**: PNG, JPEG, GIF, SVG, WebP, BMP, ICO
- **Documents**: PDF (with page navigation), Plain Text, Markdown
- **Media**: MP3, WAV, OGG (Audio) | MP4, WebM, OGG (Video)
- **Data & Code**: JSON, XML, CSV, HTML, JavaScript, CSS, Python, Java, C/C++

### Key Capabilities
- Real-time base64 decoding and preview
- Automatic file type detection from magic numbers
- Multiple input methods: paste, upload file, or drag-and-drop
- Download decoded files with correct extensions
- Copy base64 data to clipboard
- Client-side only - no server processing, fully private
- Responsive design for mobile and desktop

### Viewer Features
- **Image Viewer**: Zoom in/out, pan support
- **PDF Viewer**: Page navigation, zoom controls
- **Code Viewer**: Syntax highlighting for multiple languages
- **JSON Viewer**: Formatted/raw view toggle
- **CSV Viewer**: Table rendering with row/column display
- **HTML Viewer**: Safe preview (sanitized) + source view
- **Audio/Video**: Built-in HTML5 players with controls

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## Usage

### 1. Paste Base64 Data
Simply paste your base64 string into the textarea. The app supports:
- Plain base64: `iVBORw0KGgoAAAANSUhEUgAA...`
- Data URI: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...`

### 2. Upload a File
Click the "Upload File" button to select a file from your computer. The app will automatically convert it to base64 and display it.

### 3. Drag and Drop
Drag any file directly into the input area for instant preview.

### 4. View and Interact
- Preview the decoded content in the appropriate viewer
- Download the file with the correct extension
- Copy the base64 data to clipboard
- View file information (type, MIME, size)

## Project Structure

```
src/
├── components/
│   ├── viewers/          # File type-specific viewer components
│   │   ├── ImageViewer.tsx
│   │   ├── PDFViewer.tsx
│   │   ├── AudioViewer.tsx
│   │   ├── VideoViewer.tsx
│   │   ├── TextViewer.tsx
│   │   ├── CodeViewer.tsx
│   │   ├── JSONViewer.tsx
│   │   ├── CSVViewer.tsx
│   │   └── HTMLViewer.tsx
│   ├── Viewer.tsx        # Main viewer router component
│   ├── InputArea.tsx     # Input handling component
│   └── Controls.tsx      # Download/copy controls
├── utils/
│   ├── base64Decoder.ts       # Base64 encoding/decoding utilities
│   ├── fileTypeDetector.ts    # File type detection logic
│   └── validators.ts          # Input validation
├── types/
│   └── index.ts          # TypeScript type definitions
├── App.tsx               # Main application component
├── App.css              # Global styles
└── main.tsx             # Application entry point
```

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **PDF.js** - PDF rendering
- **Highlight.js** - Syntax highlighting
- **PapaParse** - CSV parsing
- **DOMPurify** - HTML sanitization
- **JSZip** - ZIP file inspection (planned)

## Security

- All processing happens client-side in your browser
- No data is transmitted to any server
- HTML content is sanitized before rendering using DOMPurify
- Safe handling of potentially malicious files

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Performance

- Maximum file size: 50MB (configurable)
- Optimized for large files with chunked processing
- Lazy loading of viewer components
- Efficient memory management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Roadmap

- [ ] Dark mode toggle
- [ ] URL fetching for remote base64 data
- [ ] Archive file viewing (ZIP contents)
- [ ] Multiple file batch processing
- [ ] Export to different formats
- [ ] PWA support for offline use
- [ ] Custom viewer themes
- [ ] Keyboard shortcuts

## Acknowledgments

Built with modern web technologies and open-source libraries. Special thanks to:
- PDF.js team for excellent PDF rendering
- Highlight.js for syntax highlighting
- All contributors to the open-source libraries used
