# Base64 Viewer - File Type Examples

This document provides comprehensive examples for all supported file types in the Base64 Viewer application. Each section includes sample base64 data and usage instructions.

## Table of Contents

- [Document Files](#document-files)
  - [PDF](#pdf)
  - [Text Files](#text-files)
  - [Markdown](#markdown)
- [Image Files](#image-files)
  - [PNG](#png)
  - [JPEG](#jpeg)
  - [GIF](#gif)
  - [SVG](#svg)
  - [WebP](#webp)
  - [BMP](#bmp)
  - [ICO](#ico)
- [Data Files](#data-files)
  - [JSON](#json)
  - [CSV](#csv)
  - [XML](#xml)
- [Code Files](#code-files)
  - [JavaScript](#javascript)
  - [Python](#python)
  - [Java](#java)
  - [C/C++](#cc)
  - [CSS](#css)
- [Web Files](#web-files)
  - [HTML](#html)
- [Media Files](#media-files)
  - [Audio (MP3, WAV, OGG, M4A)](#audio)
  - [Video (MP4, WebM, MOV)](#video)

---

## Document Files

### PDF

**Description:** Portable Document Format files with full page navigation and zoom controls.

**Features:**
- Page-by-page navigation
- Zoom controls (50% - 300%)
- Responsive rendering
- Memory-efficient loading

**Example 1: Minimal PDF (Hello World)**

```
data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAyNCBUZgoxMDAgNzAwIFRkCihIZWxsbyBXb3JsZCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYKMDAwMDAwMDAwOSAwMDAwMCBuCjAwMDAwMDAwNTggMDAwMDAgbgowMDAwMDAwMTE1IDAwMDAwIG4KMDAwMDAwMDI2MiAwMDAwMCBuCjAwMDAwMDAzNDEgMDAwMDAgbgp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjQzNQolJUVPRg==
```

**Example 2: Using URL Parameter**

You can share PDF files by encoding them in the URL:

```
https://your-app.com/?data=data:application/pdf;base64,JVBERi0xLjQ...
```

**How to Generate PDF Base64:**

```bash
# Using command line
base64 document.pdf | tr -d '\n' | sed 's/^/data:application\/pdf;base64,/'

# Using Node.js
const fs = require('fs');
const pdfBuffer = fs.readFileSync('document.pdf');
const base64 = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;
console.log(base64);
```

```python
# Using Python
import base64

with open('document.pdf', 'rb') as f:
    pdf_data = f.read()
    base64_data = base64.b64encode(pdf_data).decode('utf-8')
    print(f'data:application/pdf;base64,{base64_data}')
```

---

### Text Files

**Description:** Plain text files with monospace formatting.

**Features:**
- Preserves line breaks and spacing
- Monospace font rendering
- Scrollable for long content

**Example 1: Simple Text**

```
data:text/plain;base64,SGVsbG8sIFdvcmxkIQoKVGhpcyBpcyBhIHNpbXBsZSB0ZXh0IGZpbGUuCkl0IGNhbiBjb250YWluIG11bHRpcGxlIGxpbmVzLg==
```

**Decoded content:**
```
Hello, World!

This is a simple text file.
It can contain multiple lines.
```

**Example 2: Configuration File**

```
data:text/plain;base64,W2FwcGxpY2F0aW9uXQpuYW1lID0gQmFzZTY0IFZpZXdlcgp2ZXJzaW9uID0gMS4wLjAKCltzZXJ2ZXJdCnBvcnQgPSA4MDgwCmhvc3QgPSBsb2NhbGhvc3Q=
```

**Decoded content:**
```ini
[application]
name = Base64 Viewer
version = 1.0.0

[server]
port = 8080
host = localhost
```

---

### Markdown

**Description:** Markdown files rendered as formatted text.

**Features:**
- Plain text display with markdown syntax
- Preserves formatting characters
- Useful for reviewing markdown source

**Example:**

```
data:text/markdown;base64,IyBCYXNlNjQgVmlld2VyCgojIyBGZWF0dXJlcwoKLSBTdXBwb3J0cyBtdWx0aXBsZSBmaWxlIHR5cGVzCi0gQ2xpZW50LXNpZGUgcHJvY2Vzc2luZwotIE5vIGRhdGEgdXBsb2FkZWQgdG8gc2VydmVycwoKYGBgamF2YXNjcmlwdApjb25zdCBncmVldGluZyA9ICJIZWxsbyI7CmNvbnNvbGUubG9nKGdyZWV0aW5nKTsKYGBg
```

**Decoded content:**
```markdown
# Base64 Viewer

## Features

- Supports multiple file types
- Client-side processing
- No data uploaded to servers

```javascript
const greeting = "Hello";
console.log(greeting);
```
```

---

## Image Files

### PNG

**Description:** Portable Network Graphics with transparency support.

**Features:**
- Zoom controls (50% - 300%)
- Transparency preserved
- High-quality rendering

**Example: 16x16 Red Square**

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAE0lEQVR42mP8z8DwHx8GkQEJAACyAAP+A8cQAAAAAElFTkSuQmCC
```

**Example: Transparent PNG with Alpha Channel**

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGklEQVR42mNgYGD4z8DAwMBIhAISAYHogf8APK8H/QO+QCQAAAAASUVORK5CYII=
```

**How to Generate:**

```javascript
// Using JavaScript
const canvas = document.createElement('canvas');
canvas.width = 16;
canvas.height = 16;
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 16, 16);
const base64 = canvas.toDataURL('image/png');
```

---

### JPEG

**Description:** Joint Photographic Experts Group format, ideal for photographs.

**Features:**
- Efficient compression for photos
- Zoom controls
- No transparency support

**Example: Small JPEG Image**

```
data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAACAAIDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=
```

---

### GIF

**Description:** Graphics Interchange Format supporting animations.

**Features:**
- Animation support
- Transparency (binary - yes/no per pixel)
- 256 color palette

**Example: Animated GIF (Simple 2-frame)**

```
data:image/gif;base64,R0lGODlhCgAKAPABAP8AAP///yH5BAEKAAEALAAAAAAKAAoAAAIRjI+py+0PYwC02ouz3pwXAgA7
```

---

### SVG

**Description:** Scalable Vector Graphics - XML-based vector image format.

**Features:**
- Infinite scaling without quality loss
- Supports animations and interactivity
- Text remains selectable

**Example: Simple Circle**

```
data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0icmVkIiAvPgo8L3N2Zz4=
```

**Decoded content:**
```xml
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>
```

**Example: Complex SVG with Gradient**

```
data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYigyNTUsMCwwKTtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjpyZ2IoMCwwLDI1NSk7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNncmFkKSIgLz4KPC9zdmc+
```

---

### WebP

**Description:** Modern image format with superior compression.

**Features:**
- Smaller file sizes than JPEG/PNG
- Supports both lossy and lossless compression
- Transparency support

**Example:**

```
data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=
```

---

### BMP

**Description:** Bitmap image format, typically uncompressed.

**Features:**
- Simple format
- Large file sizes (uncompressed)
- Full color support

**Example: 2x2 BMP**

```
data:image/bmp;base64,Qk0+AAAAAAAAADYAAAAoAAAAAgAAAAIAAAABABgAAAAAAAQAAADEDgAAxA4AAAAAAAAAAAAA/0JC/0JC/0JC/0JC
```

---

### ICO

**Description:** Icon format used for favicons and Windows icons.

**Features:**
- Multiple sizes in one file
- Transparency support
- Legacy format support

**Example: 16x16 ICO**

```
data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
```

---

## Data Files

### JSON

**Description:** JavaScript Object Notation with formatted and raw views.

**Features:**
- Toggle between formatted and raw view
- Syntax highlighting
- Automatic indentation
- Collapsible tree structure

**Example 1: Simple Object**

```
data:application/json;base64,ewogICJuYW1lIjogIkpvaG4gRG9lIiwKICAiYWdlIjogMzAsCiAgImVtYWlsIjogImpvaG4uZG9lQGV4YW1wbGUuY29tIiwKICAiaXNBY3RpdmUiOiB0cnVlCn0=
```

**Decoded content:**
```json
{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "isActive": true
}
```

**Example 2: Complex Nested Structure**

```
data:application/json;base64,ewogICJ1c2VycyI6IFsKICAgIHsKICAgICAgImlkIjogMSwKICAgICAgIm5hbWUiOiAiQWxpY2UiLAogICAgICAicm9sZXMiOiBbImFkbWluIiwgImVkaXRvciJdLAogICAgICAic2V0dGluZ3MiOiB7CiAgICAgICAgInRoZW1lIjogImRhcmsiLAogICAgICAgICJub3RpZmljYXRpb25zIjogdHJ1ZQogICAgICB9CiAgICB9LAogICAgewogICAgICAiaWQiOiAyLAogICAgICAibmFtZSI6ICJCb2IiLAogICAgICAicm9sZXMiOiBbInZpZXdlciJdLAogICAgICAic2V0dGluZ3MiOiB7CiAgICAgICAgInRoZW1lIjogImxpZ2h0IiwKICAgICAgICAibm90aWZpY2F0aW9ucyI6IGZhbHNlCiAgICAgIH0KICAgIH0KICBdLAogICJ0b3RhbCI6IDIKfQ==
```

**Decoded content:**
```json
{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "roles": ["admin", "editor"],
      "settings": {
        "theme": "dark",
        "notifications": true
      }
    },
    {
      "id": 2,
      "name": "Bob",
      "roles": ["viewer"],
      "settings": {
        "theme": "light",
        "notifications": false
      }
    }
  ],
  "total": 2
}
```

---

### CSV

**Description:** Comma-Separated Values displayed as a formatted table.

**Features:**
- Automatic table rendering
- Header row detection
- Scrollable for large datasets
- Proper handling of quotes and commas

**Example 1: Simple CSV**

```
data:text/csv;base64,TmFtZSxBZ2UsQ2l0eQpKb2huIERvZSwzMCxOZXcgWW9yawpKYW5lIFNtaXRoLDI1LFNhbiBGcmFuY2lzY28KQm9iIEpvaG5zb24sNDUsQ2hpY2Fnbw==
```

**Decoded content:**
```csv
Name,Age,City
John Doe,30,New York
Jane Smith,25,San Francisco
Bob Johnson,45,Chicago
```

**Example 2: CSV with Quoted Fields**

```
data:text/csv;base64,UHJvZHVjdCxQcmljZSxEZXNjcmlwdGlvbgoiTGFwdG9wLCAyMDI0IE1vZGVsIiwxMjk5Ljk5LCJIYXMggY29tbWEsIGFuZCBxdW90ZXMiClBob25lLDY5OS45OSwiU21hcnRwaG9uZSB3aXRoIDUiIHNjcmVlbiIKVGFibGV0LDM5OS45OSwiMTAuNSIgZGlzcGxheSI=
```

**Example 3: Large Dataset Sample**

```
data:text/csv;base64,SWQsRGF0ZSxBbW91bnQsU3RhdHVzCjEsMjAyNC0wMS0xNSw1MC4wMCxDb21wbGV0ZWQKMiwyMDI0LTAxLTE2LDc1LjUwLFBlbmRpbmcKMywyMDI0LTAxLTE3LDEyMC4wMCxDb21wbGV0ZWQKNCwyMDI0LTAxLTE4LDM1LjI1LENhbmNlbGxlZAo1LDIwMjQtMDEtMTksMjAwLjAwLENvbXBsZXRlZA==
```

---

### XML

**Description:** Extensible Markup Language with syntax highlighting.

**Features:**
- Syntax highlighting
- Monospace formatting
- Preserves indentation

**Example 1: Simple XML**

```
data:application/xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPGJvb2tzPgogIDxib29rIGlkPSIxIj4KICAgIDx0aXRsZT5UaGUgR3JlYXQgR2F0c2J5PC90aXRsZT4KICAgIDxhdXRob3I+Ri4gU2NvdHQgRml0emdlcmFsZDwvYXV0aG9yPgogICAgPHllYXI+MTkyNTwveWVhcj4KICA8L2Jvb2s+CiAgPGJvb2sgaWQ9IjIiPgogICAgPHRpdGxlPjE5ODQ8L3RpdGxlPgogICAgPGF1dGhvcj5HZW9yZ2UgT3J3ZWxsPC9hdXRob3I+CiAgICA8eWVhcj4xOTQ5PC95ZWFyPgogIDwvYm9vaz4KPC9ib29rcz4=
```

**Decoded content:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<books>
  <book id="1">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
  </book>
  <book id="2">
    <title>1984</title>
    <author>George Orwell</author>
    <year>1949</year>
  </book>
</books>
```

**Example 2: Configuration XML**

```
data:application/xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxjb25maWd1cmF0aW9uPgogIDxhcHBTZXR0aW5ncz4KICAgIDxhZGQga2V5PSJEYXRhYmFzZVVybCIgdmFsdWU9ImxvY2FsaG9zdDo1NDMyIiAvPgogICAgPGFkZCBrZXk9IkFwcE5hbWUiIHZhbHVlPSJCYXNlNjQgVmlld2VyIiAvPgogIDwvYXBwU2V0dGluZ3M+CjwvY29uZmlndXJhdGlvbj4=
```

---

## Code Files

### JavaScript

**Description:** JavaScript code with full syntax highlighting.

**Features:**
- Syntax highlighting for all JS features
- Monospace formatting
- Line numbers
- Supports modern ES6+ syntax

**Example 1: Simple Function**

```
data:text/javascript;base64,Ly8gSGVsbG8gV29ybGQgRnVuY3Rpb24KZnVuY3Rpb24gZ3JlZXQobmFtZSkgewogIHJldHVybiBgSGVsbG8sICR7bmFtZX0hYDsKfQoKY29uc3QgdXNlck5hbWUgPSAiV29ybGQiOwpjb25zb2xlLmxvZyhncmVldCh1c2VyTmFtZSkpOw==
```

**Decoded content:**
```javascript
// Hello World Function
function greet(name) {
  return `Hello, ${name}!`;
}

const userName = "World";
console.log(greet(userName));
```

**Example 2: React Component**

```
data:text/javascript;base64,aW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnOwoKZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ291bnRlcigpIHsKICBjb25zdCBbY291bnQsIHNldENvdW50XSA9IHVzZVN0YXRlKDApOwoKICByZXR1cm4gKAogICAgPGRpdj4KICAgICAgPHA+Q291bnQ6IHtjb3VudH08L3A+CiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0Q291bnQoY291bnQgKyAxKX0+CiAgICAgICAgSW5jcmVtZW50CiAgICAgIDwvYnV0dG9uPgogICAgPC9kaXY+CiAgKTsKfQ==
```

**Example 3: Async/Await Pattern**

```
data:text/javascript;base64,YXN5bmMgZnVuY3Rpb24gZmV0Y2hVc2VyRGF0YSh1c2VySWQpIHsKICB0cnkgewogICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgKICAgICAgYGh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL3VzZXJzLyR7dXNlcklkfWAKICAgICk7CiAgICAKICAgIGlmICghcmVzcG9uc2Uub2spIHsKICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApOwogICAgfQogICAgCiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOwogICAgcmV0dXJuIGRhdGE7CiAgfSBjYXRjaCAoZXJyb3IpIHsKICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCB1c2VyOicsIGVycm9yKTsKICAgIHRocm93IGVycm9yOwogIH0KfQ==
```

---

### Python

**Description:** Python code with syntax highlighting.

**Features:**
- Python-specific syntax highlighting
- Indentation preservation
- Comment highlighting

**Example 1: Simple Script**

```
data:text/x-python;base64,IyBQeXRob24gSGVsbG8gV29ybGQKZGVmIGdyZWV0KG5hbWUpOgogICAgcmV0dXJuIGYiSGVsbG8sIHtuYW1lfSEiCgppZiBfX25hbWVfXyA9PSAiX19tYWluX18iOgogICAgdXNlcl9uYW1lID0gIldvcmxkIgogICAgcHJpbnQoZ3JlZXQodXNlcl9uYW1lKSk=
```

**Decoded content:**
```python
# Python Hello World
def greet(name):
    return f"Hello, {name}!"

if __name__ == "__main__":
    user_name = "World"
    print(greet(user_name))
```

**Example 2: Class Definition**

```
data:text/x-python;base64,Y2xhc3MgVXNlcjoKICAgIGRlZiBfX2luaXRfXyhzZWxmLCBuYW1lLCBlbWFpbCk6CiAgICAgICAgc2VsZi5uYW1lID0gbmFtZQogICAgICAgIHNlbGYuZW1haWwgPSBlbWFpbAogICAgCiAgICBkZWYgZ2V0X2luZm8oc2VsZik6CiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAgJ25hbWUnOiBzZWxmLm5hbWUsCiAgICAgICAgICAgICdlbWFpbCc6IHNlbGYuZW1haWwKICAgICAgICB9CgojIFVzYWdlCnVzZXIgPSBVc2VyKCJKb2huIERvZSIsICJqb2huQGV4YW1wbGUuY29tIikKcHJpbnQodXNlci5nZXRfaW5mbygpKQ==
```

---

### Java

**Description:** Java code with syntax highlighting.

**Features:**
- Java syntax highlighting
- Package and import highlighting
- Class and method highlighting

**Example:**

```
data:text/x-java;base64,cHVibGljIGNsYXNzIEhlbGxvV29ybGQgewogICAgcHVibGljIHN0YXRpYyB2b2lkIG1haW4oU3RyaW5nW10gYXJncykgewogICAgICAgIFN0cmluZyBtZXNzYWdlID0gIkhlbGxvLCBXb3JsZCEiOwogICAgICAgIFN5c3RlbS5vdXQucHJpbnRsbihtZXNzYWdlKTsKICAgIH0KfQ==
```

**Decoded content:**
```java
public class HelloWorld {
    public static void main(String[] args) {
        String message = "Hello, World!";
        System.out.println(message);
    }
}
```

---

### C/C++

**Description:** C and C++ code with syntax highlighting.

**Features:**
- Preprocessor directive highlighting
- Pointer syntax support
- Standard library highlighting

**Example 1: C Program**

```
data:text/x-c;base64,I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbigpIHsKICAgIGNoYXIgbmFtZVsyMF0gPSAiV29ybGQiOwogICAgcHJpbnRmKCJIZWxsbywgJXMhXG4iLCBuYW1lKTsKICAgIHJldHVybiAwOwp9
```

**Decoded content:**
```c
#include <stdio.h>

int main() {
    char name[20] = "World";
    printf("Hello, %s!\n", name);
    return 0;
}
```

**Example 2: C++ Program**

```
data:text/x-c++;base64,I2luY2x1ZGUgPGlvc3RyZWFtPgojaW5jbHVkZSA8c3RyaW5nPgoKdXNpbmcgbmFtZXNwYWNlIHN0ZDsKCmNsYXNzIEdyZWV0ZXIgewpwdWJsaWM6CiAgICBHcmVldGVyKHN0cmluZyBuKSA6IG5hbWUobikge30KICAgIAogICAgdm9pZCBncmVldCgpIHsKICAgICAgICBjb3V0IDw8ICJIZWxsbywgIiA8PCBuYW1lIDw8ICIhIiA8PCBlbmRsOwogICAgfQoKcHJpdmF0ZToKICAgIHN0cmluZyBuYW1lOwp9OwoKaW50IG1haW4oKSB7CiAgICBHcmVldGVyIGcoIldvcmxkIik7CiAgICBnLmdyZWV0KCk7CiAgICByZXR1cm4gMDsKfQ==
```

---

### CSS

**Description:** Cascading Style Sheets with syntax highlighting.

**Features:**
- Selector highlighting
- Property/value highlighting
- Comment support

**Example:**

```
data:text/css;base64,LyogTW9kZXJuIENTUyBFeGFtcGxlICovCgouY29udGFpbmVyIHsKICBtYXgtd2lkdGg6IDEyMDBweDsKICBtYXJnaW46IDAgYXV0bzsKICBwYWRkaW5nOiAycmVtOwogIGRpc3BsYXk6IGdyaWQ7CiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyNTBweCwgMWZyKSk7CiAgZ2FwOiAycmVtOwp9CgouY2FyZCB7CiAgYmFja2dyb3VuZDogd2hpdGU7CiAgYm9yZGVyLXJhZGl1czogOHB4OwogIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMSk7CiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTsKfQoKLmNhcmQ6aG92ZXIgewogIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTsKfQ==
```

**Decoded content:**
```css
/* Modern CSS Example */

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
```

---

## Web Files

### HTML

**Description:** HTML files with sanitized preview and source view.

**Features:**
- Live preview (sanitized for security)
- Source code view with syntax highlighting
- Toggle between preview and source

**Example:**

```
data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KPGhlYWQ+CiAgPG1ldGEgY2hhcnNldD0iVVRGLTgiPgogIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wIj4KICA8dGl0bGU+U2FtcGxlIFBhZ2U8L3RpdGxlPgogIDxzdHlsZT4KICAgIGJvZHkgeyBmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IH0KICAgIC5jb250YWluZXIgeyBtYXgtd2lkdGg6IDgwMHB4OyBtYXJnaW46IDAgYXV0bzsgcGFkZGluZzogMnJlbTsgfQogIDwvc3R5bGU+CjwvaGVhZD4KPGJvZHk+CiAgPGRpdiBjbGFzcz0iY29udGFpbmVyIj4KICAgIDxoMT5XZWxjb21lIHRvIEJhc2U2NCBWaWV3ZXI8L2gxPgogICAgPHA+VGhpcyBpcyBhIHNhbXBsZSBIVE1MIGZpbGUuPC9wPgogICAgPHVsPgogICAgICA8bGk+U3VwcG9ydHMgbXVsdGlwbGUgZmlsZSB0eXBlczwvbGk+CiAgICAgIDxsaT5DbGllbnQtc2lkZSBwcm9jZXNzaW5nPC9saT4KICAgICAgPGxpPlNlY3VyZSBhbmQgcHJpdmF0ZTwvbGk+CiAgICA8L3VsPgogIDwvZGl2Pgo8L2JvZHk+CjwvaHRtbD4=
```

**Decoded content:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample Page</title>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Base64 Viewer</h1>
    <p>This is a sample HTML file.</p>
    <ul>
      <li>Supports multiple file types</li>
      <li>Client-side processing</li>
      <li>Secure and private</li>
    </ul>
  </div>
</body>
</html>
```

---

## Media Files

### Audio

**Description:** Audio files with HTML5 player controls.

**Supported Formats:**
- MP3 (audio/mpeg)
- WAV (audio/wav)
- OGG (audio/ogg)
- M4A (audio/mp4)

**Features:**
- Play/Pause controls
- Volume control
- Seeking
- Download option

**Example: MP3 Audio (Minimal)**

```
data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFLADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjkxAAAAAAAAAAAAAAAAJAUHAAAAAAAAASwgIiLeAA==
```

**Example: WAV Audio**

```
data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=
```

**How to Generate Audio Base64:**

```javascript
// JavaScript - Convert audio file to base64
const audioFile = document.getElementById('audioInput').files[0];
const reader = new FileReader();
reader.onloadend = () => {
  const base64 = reader.result;
  console.log(base64);
};
reader.readAsDataURL(audioFile);
```

```python
# Python - Convert audio to base64
import base64

with open('audio.mp3', 'rb') as audio_file:
    audio_data = audio_file.read()
    base64_audio = base64.b64encode(audio_data).decode('utf-8')
    data_uri = f'data:audio/mpeg;base64,{base64_audio}'
    print(data_uri)
```

---

### Video

**Description:** Video files with HTML5 video player.

**Supported Formats:**
- MP4 (video/mp4)
- WebM (video/webm)
- MOV/QuickTime (video/quicktime)

**Features:**
- Play/Pause controls
- Volume control
- Fullscreen mode
- Seeking
- Download option

**Example: Minimal MP4 Video**

```
data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC7wYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjc0MyA1Yj2yMWU1IC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNiAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTMgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTIwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAACMmVkdHMAAAAcZWxzdAAAAAAAAAABAAAAAAAAAAAAAA==
```

**How to Generate Video Base64:**

```javascript
// JavaScript - Convert video file to base64
const videoFile = document.getElementById('videoInput').files[0];
const reader = new FileReader();
reader.onloadend = () => {
  const base64 = reader.result;
  console.log(base64);
};
reader.readAsDataURL(videoFile);
```

```bash
# Command line - Convert video to base64
base64 video.mp4 | tr -d '\n' | sed 's/^/data:video\/mp4;base64,/'
```

**Note:** Video files can be very large when base64 encoded. The application supports up to 50MB files by default.

---

## Usage Tips

### Converting Files to Base64

#### Using Command Line (Linux/Mac)

```bash
# Generic file conversion
base64 -w 0 filename.ext

# With data URI prefix for images
echo "data:image/png;base64,$(base64 -w 0 image.png)"

# For PDFs
echo "data:application/pdf;base64,$(base64 -w 0 document.pdf)"
```

#### Using Node.js

```javascript
const fs = require('fs');

function fileToBase64(filePath, mimeType) {
  const fileBuffer = fs.readFileSync(filePath);
  const base64 = fileBuffer.toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

// Usage
const pdfBase64 = fileToBase64('document.pdf', 'application/pdf');
const imageBase64 = fileToBase64('image.png', 'image/png');
```

#### Using Python

```python
import base64
import mimetypes

def file_to_base64(file_path):
    mime_type, _ = mimetypes.guess_type(file_path)
    with open(file_path, 'rb') as file:
        encoded = base64.b64encode(file.read()).decode('utf-8')
        return f'data:{mime_type};base64,{encoded}'

# Usage
pdf_base64 = file_to_base64('document.pdf')
image_base64 = file_to_base64('image.png')
```

#### Using Browser JavaScript

```javascript
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Usage
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const base64 = await fileToBase64(file);
  console.log(base64);
});
```

---

## Best Practices

1. **File Size Limits**: Keep files under 50MB for optimal performance
2. **Use Appropriate MIME Types**: Always include the correct MIME type in your data URI
3. **Testing**: Use small test files before processing large files
4. **Security**: Never include sensitive credentials or private keys in base64-encoded files
5. **Sharing**: When sharing URLs with base64 data, ensure they're properly encoded
6. **Browser Compatibility**: Modern browsers support all features, but test on your target browsers

---

## Troubleshooting

### Common Issues

**Problem**: PDF won't load
- **Solution**: Ensure the base64 data is valid PDF data
- **Check**: MIME type should be `application/pdf` or `data:application/pdf;base64,`

**Problem**: Image appears broken
- **Solution**: Verify the base64 encoding is complete (no truncation)
- **Check**: Data URI format includes proper MIME type

**Problem**: File too large
- **Solution**: The default limit is 50MB. Reduce file size or split into smaller chunks

**Problem**: CSV not displaying as table
- **Solution**: Ensure MIME type is `text/csv` and data is properly formatted

**Problem**: Syntax highlighting not working
- **Solution**: Verify the MIME type matches the code language (e.g., `text/javascript` for JS)

---

## Additional Resources

- [Base64 Encoding on Wikipedia](https://en.wikipedia.org/wiki/Base64)
- [Data URIs on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
- [MIME Types List](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)

---

## Contributing Examples

If you have additional examples or use cases, please contribute by:

1. Adding your example to the appropriate section
2. Including both the base64 data and decoded content
3. Providing context on when the example is useful
4. Testing the example in the application

---

**Last Updated:** 2024
**Application Version:** 1.0.0
