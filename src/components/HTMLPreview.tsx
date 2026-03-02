import React, { useState } from 'react';
import { Code, X, Eye, Copy, Check, RefreshCw } from 'lucide-react';

export default function HTMLPreview({ onClose }) {
  const [html, setHtml] = useState('<!DOCTYPE html>\n<html>\n<head>\n  <title>Preview</title>\n  <style>\n    body { font-family: Arial; padding: 20px; }\n    h1 { color: #333; }\n  </style>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>Your HTML preview here...</p>\n</body>\n</html>');
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const copyHTML = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const templates = [
    { name: 'Blank', html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>New Page</title>\n</head>\n<body>\n  \n</body>\n</html>' },
    { name: 'Bootstrap', html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">\n  <title>Bootstrap Page</title>\n</head>\n<body>\n  <div class="container mt-5">\n    <h1>Welcome to Bootstrap</h1>\n    <button class="btn btn-primary">Click Me</button>\n  </div>\n</body>\n</html>' },
    { name: 'React Style', html: '<!DOCTYPE html>\n<html>\n<head>\n  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>\n  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>\n  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>\n  <style>\n    .app { text-align: center; padding: 50px; }\n    button { padding: 10px 20px; font-size: 16px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <div id="root"></div>\n  <script type="text/babel">\n    const App = () => <div className="app"><h1>Hello React!</h1></div>;\n    ReactDOM.render(<App/>, document.getElementById("root"));\n  </script>\n</body>\n</html>' },
    { name: 'Form', html: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    form { max-width: 400px; margin: 20px auto; }\n    input, textarea { width: 100%; padding: 10px; margin: 5px 0; }\n    button { background: #007bff; color: white; padding: 10px 20px; border: none; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <form>\n    <h2>Contact Form</h2>\n    <input type="text" placeholder="Name" />\n    <input type="email" placeholder="Email" />\n    <textarea placeholder="Message"></textarea>\n    <button type="submit">Submit</button>\n  </form>\n</body>\n</html>' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-yellow-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-yellow-500/20">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-yellow-500" />
          <span className="text-white font-semibold">HTML Preview</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView(view === 'preview' ? 'code' : 'preview')} className="p-1 hover:bg-gray-700 rounded" title="Toggle view">
            {view === 'preview' ? <Code className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
          </button>
          <button onClick={copyHTML} className="p-1 hover:bg-gray-700 rounded" title="Copy">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      {/* Templates */}
      <div className="flex gap-1 p-2 border-b border-gray-800 overflow-x-auto">
        {templates.map((t, i) => (
          <button key={i} onClick={() => setHtml(t.html)} className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 whitespace-nowrap">{t.name}</button>
        ))}
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        <div className={`${view === 'code' ? 'flex-1' : 'w-1/2'} border-r border-gray-800 flex flex-col`}>
          <div className="px-3 py-1 bg-gray-800 text-gray-400 text-xs">HTML</div>
          <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="flex-1 bg-[#0a0a0a] text-yellow-300 p-3 font-mono text-sm resize-none border-none outline-none" />
        </div>
        {/* Preview */}
        {view === 'preview' && (
          <div className="flex-1 flex flex-col">
            <div className="px-3 py-1 bg-gray-800 text-gray-400 text-xs">Preview</div>
            <iframe srcDoc={html} className="flex-1 bg-white border-none" title="HTML Preview" sandbox="allow-scripts" />
          </div>
        )}
      </div>
    </div>
  );
}
