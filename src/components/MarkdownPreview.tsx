import React, { useState } from 'react';
import { FileText, X, Edit, Eye, Download, Copy, Check, Maximize2 } from 'lucide-react';

const sampleMarkdown = `# Welcome to Krynox

This is a **powerful** code editor built with React and Tauri.

## Features

- Syntax highlighting
- Multiple file support
- AI-powered assistance
- Terminal integration

## Code Example

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('Developer');
\`\`\`

## Lists

### Ordered
1. First item
2. Second item
3. Third item

### Unordered
- Item A
- Item B
- Item C

## Links

[Visit GitHub](https://github.com)

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Table

| Feature | Status |
|---------|--------|
| Editor | ✅ Ready |
| Terminal | ✅ Ready |
| AI | ✅ Ready |

---

*Italic text* and **bold text** work too!
`;

export default function MarkdownPreview({ onClose }) {
  const [viewMode, setViewMode] = useState('preview');
  const [copied, setCopied] = useState(false);

  const copyContent = () => {
    navigator.clipboard.writeText(sampleMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderMarkdown = (md) => {
    return md
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-white mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-white mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-white mb-4">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code class="text-sm font-mono text-green-400">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-1.5 py-0.5 rounded text-pink-400 font-mono text-sm">$1</code>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 text-gray-300">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 text-gray-300 list-decimal">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-600 pl-4 my-4 text-gray-400 italic">$1</blockquote>')
      .replace(/\|([^|]+)\|([^|]+)\|/g, (match, c1, c2) => {
        return `<tr><td class="border border-gray-700 px-3 py-1 text-gray-300">${c1}</td><td class="border border-gray-700 px-3 py-1 text-gray-300">${c2}</td></tr>`;
      })
      .replace(/^---$/gim, '<hr class="my-6 border-gray-700" />')
      .replace(/\n\n/g, '</p><p class="my-2 text-gray-300">')
      .replace(/^(?!<[hltbpq])/gm, '<p class="my-2 text-gray-300">');
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-indigo-500/20 w-[700px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-500/20">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" />
          <span className="text-white font-semibold">Markdown Preview</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={copyContent}
            className="p-1 hover:bg-gray-700 rounded"
            title="Copy source"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
          <button className="p-1 hover:bg-gray-700 rounded" title="Download">
            <Download className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded" title="Fullscreen">
            <Maximize2 className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex border-b border-indigo-500/20">
        <button
          onClick={() => setViewMode('edit')}
          className={`flex items-center gap-2 px-4 py-2 text-sm ${
            viewMode === 'edit' 
              ? 'text-white border-b-2 border-indigo-500 bg-gray-800/50' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Edit className="w-4 h-4" /> Edit
        </button>
        <button
          onClick={() => setViewMode('preview')}
          className={`flex items-center gap-2 px-4 py-2 text-sm ${
            viewMode === 'preview' 
              ? 'text-white border-b-2 border-indigo-500 bg-gray-800/50' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" /> Preview
        </button>
        <button
          onClick={() => setViewMode('split')}
          className={`flex items-center gap-2 px-4 py-2 text-sm ${
            viewMode === 'split' 
              ? 'text-white border-b-2 border-indigo-500 bg-gray-800/50' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Split View
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-1/2 border-r border-gray-700' : 'w-full'} p-4`}>
            <textarea
              value={sampleMarkdown}
              readOnly
              className="w-full h-full bg-transparent text-white font-mono text-sm outline-none resize-none"
            />
          </div>
        )}

        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} p-6 overflow-auto`}>
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(sampleMarkdown) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
