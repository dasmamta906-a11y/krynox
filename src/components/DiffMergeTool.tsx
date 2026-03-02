import React, { useState, useEffect } from 'react';
import { GitCompare, X, ArrowRight, Copy, Check } from 'lucide-react';

export default function DiffMergeTool({ onClose }) {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [diffResult, setDiffResult] = useState<{type: string; text: string}[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!leftText && !rightText) {
      setDiffResult([]);
      return;
    }
    const leftLines = leftText.split('\n');
    const rightLines = rightText.split('\n');
    const result: {type: string; text: string}[] = [];
    const maxLen = Math.max(leftLines.length, rightLines.length);
    
    for (let i = 0; i < maxLen; i++) {
      const leftLine = leftLines[i] || '';
      const rightLine = rightLines[i] || '';
      if (leftLine === rightLine) {
        result.push({ type: 'equal', text: leftLine });
      } else if (!leftLine && rightLine) {
        result.push({ type: 'added', text: rightLine });
      } else if (leftLine && !rightLine) {
        result.push({ type: 'removed', text: leftLine });
      } else {
        result.push({ type: 'removed', text: leftLine });
        result.push({ type: 'added', text: rightLine });
      }
    }
    setDiffResult(result);
  }, [leftText, rightText]);

  const copyDiff = () => {
    const text = diffResult.map(d => (d.type === 'added' ? '+ ' : d.type === 'removed' ? '- ' : '  ') + d.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapTexts = () => {
    const temp = leftText;
    setLeftText(rightText);
    setRightText(temp);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-purple-500/20 w-[700px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-purple-500" />
          <span className="text-white font-semibold">Diff & Merge Tool</span>
        </div>
        <div className="flex gap-2">
          <button onClick={swapTexts} className="p-1 hover:bg-gray-700 rounded" title="Swap texts">
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={copyDiff} className="p-1 hover:bg-gray-700 rounded" title="Copy diff">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="flex-1 flex">
        {/* Left Input */}
        <div className="flex-1 flex flex-col border-r border-gray-800">
          <div className="px-3 py-2 bg-gray-800 text-gray-400 text-xs font-medium">Original / Left</div>
          <textarea value={leftText} onChange={(e) => setLeftText(e.target.value)} placeholder="Paste original text here..." className="flex-1 bg-[#0a0a0a] text-red-300 p-3 font-mono text-sm resize-none border-none outline-none" />
        </div>
        {/* Right Input */}
        <div className="flex-1 flex flex-col">
          <div className="px-3 py-2 bg-gray-800 text-gray-400 text-xs font-medium">Modified / Right</div>
          <textarea value={rightText} onChange={(e) => setRightText(e.target.value)} placeholder="Paste modified text here..." className="flex-1 bg-[#0a0a0a] text-green-300 p-3 font-mono text-sm resize-none border-none outline-none" />
        </div>
      </div>
      {/* Diff Result */}
      {diffResult.length > 0 && (
        <div className="border-t border-gray-800 max-h-40 overflow-auto">
          <div className="px-3 py-2 bg-gray-800 text-gray-400 text-xs font-medium flex justify-between">
            <span>Diff Result</span>
            <span className="text-gray-500">{diffResult.filter(d => d.type === 'added').length} added, {diffResult.filter(d => d.type === 'removed').length} removed</span>
          </div>
          <div className="p-2 font-mono text-xs">
            {diffResult.map((line, i) => (
              <div key={i} className={`py-0.5 px-2 ${line.type === 'added' ? 'bg-green-900/30 text-green-300' : line.type === 'removed' ? 'bg-red-900/30 text-red-300' : 'text-gray-500'}`}>
                <span className="mr-2">{line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}</span>
                {line.text || ' '}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
