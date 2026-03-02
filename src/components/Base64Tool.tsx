import React, { useState } from 'react';
import { Binary, X, ArrowRightLeft, Copy, Check } from 'lucide-react';

export default function Base64Tool({ onClose }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput('Error: Invalid input for ' + mode);
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-lime-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-lime-500/20">
        <div className="flex items-center gap-2">
          <Binary className="w-5 h-5 text-lime-500" />
          <span className="text-white font-semibold">Base64 Encoder/Decoder</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex border-b border-lime-500/20">
        <button
          onClick={() => { setMode('encode'); convert(); }}
          className={`flex-1 px-4 py-2 text-sm ${
            mode === 'encode' ? 'text-white bg-gray-800' : 'text-gray-400'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => { setMode('decode'); convert(); }}
          className={`flex-1 px-4 py-2 text-sm ${
            mode === 'decode' ? 'text-white bg-gray-800' : 'text-gray-400'
          }`}
        >
          Decode
        </button>
      </div>

      <div className="flex-1 flex flex-col p-3">
        <div className="flex-1 flex flex-col mb-3">
          <label className="text-gray-400 text-sm mb-2">
            {mode === 'encode' ? 'Plain Text' : 'Base64'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={convert}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm font-mono resize-none"
          />
        </div>

        <div className="flex justify-center mb-3">
          <button
            onClick={swapMode}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full"
          >
            <ArrowRightLeft className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-gray-400 text-sm">
              {mode === 'encode' ? 'Base64' : 'Plain Text'}
            </label>
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
            placeholder="Output will appear here..."
            className="flex-1 bg-gray-800 text-lime-300 px-3 py-2 rounded border border-gray-700 text-sm font-mono resize-none"
          />
        </div>
      </div>
    </div>
  );
}
