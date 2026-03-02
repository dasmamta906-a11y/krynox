import React, { useState } from 'react';
import { FileText, X, Copy, Check } from 'lucide-react';

const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat'];

function generateLorem(count: number): string {
  let result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result.join(' ');
}

export default function LoremIpsum({ onClose }) {
  const [count, setCount] = useState(10);
  const [paragraphs, setParagraphs] = useState(1);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const paras: string[] = [];
    for (let p = 0; p < paragraphs; p++) {
      paras.push(generateLorem(count));
    }
    setOutput(paras.join('\n\n'));
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-blue-500/20 w-[500px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          <span className="text-white font-semibold">Lorem Ipsum Generator</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="p-3 border-b border-blue-500/20">
        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <label className="text-gray-400 text-xs">Words per paragraph</label>
            <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700" />
          </div>
          <div className="flex-1">
            <label className="text-gray-400 text-xs">Paragraphs</label>
            <input type="number" value={paragraphs} onChange={(e) => setParagraphs(Number(e.target.value))} className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700" />
          </div>
        </div>
        <button onClick={generate} className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">Generate</button>
      </div>
      {output && (
        <div className="flex-1 p-3 overflow-auto">
          <div className="flex justify-end mb-2">
            <button onClick={copyOutput} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-gray-300 text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
