import React, { useState } from 'react';
import { Link, X, ArrowRightLeft, Copy, Check } from 'lucide-react';

export default function URLEncoder({ onClose }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setOutput('Error: Invalid input');
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
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-green-500/20 w-[500px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/20">
        <div className="flex items-center gap-2">
          <Link className="w-5 h-5 text-green-500" />
          <span className="text-white font-semibold">URL Encoder/Decoder</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="flex border-b border-green-500/20">
        <button onClick={() => { setMode('encode'); convert(); }} className={`flex-1 py-2 ${mode === 'encode' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}>Encode</button>
        <button onClick={() => { setMode('decode'); convert(); }} className={`flex-1 py-2 ${mode === 'decode' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}>Decode</button>
      </div>
      <div className="flex-1 p-3 flex flex-col gap-3">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} onBlur={convert} placeholder="Enter URL..." className="flex-1 bg-gray-800 text-white p-3 rounded border border-gray-700 font-mono text-sm resize-none" />
        <div className="flex justify-center">
          <button onClick={swapMode} className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full"><ArrowRightLeft className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="relative">
          <textarea value={output} readOnly placeholder="Output..." className="flex-1 bg-gray-800 text-green-300 p-3 rounded border border-gray-700 font-mono text-sm resize-none" />
          {output && (
            <button onClick={copyOutput} className="absolute top-2 right-2 p-1 bg-gray-700 rounded">
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
