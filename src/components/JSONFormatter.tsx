import React, { useState } from 'react';
import { Braces, X, Copy, Check, AlertCircle, Download } from 'lucide-react';

const sampleJSON = `{"name":"John","age":30,"skills":["JavaScript","React","Node.js"],"address":{"city":"NYC","zip":"10001"}}`;

export default function JSONFormatter({ onClose }) {
  const [input, setInput] = useState(sampleJSON);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSON = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-blue-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20">
        <div className="flex items-center gap-2">
          <Braces className="w-5 h-5 text-blue-500" />
          <span className="text-white font-semibold">JSON Formatter</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={downloadJSON} className="p-1 hover:bg-gray-700 rounded" title="Download">
            <Download className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-3 gap-3">
        <div className="flex-1 flex flex-col">
          <label className="text-gray-400 text-sm mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={formatJSON}
            placeholder="Paste JSON here..."
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm font-mono resize-none"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={formatJSON}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
          >
            Format
          </button>
          <button
            onClick={minifyJSON}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-white text-sm"
          >
            Minify
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-400 text-sm">Output</label>
            <button 
              onClick={copyOutput}
              className="p-1 hover:bg-gray-700 rounded"
              disabled={!output}
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="flex-1 bg-gray-800 text-green-300 px-3 py-2 rounded border border-gray-700 text-sm font-mono resize-none"
          />
        </div>
      </div>
    </div>
  );
}
