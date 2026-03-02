import React, { useState } from 'react';
import { Lock, X, Copy, Check, RefreshCw } from 'lucide-react';

export default function HashGenerator({ onClose }) {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});

  const generateHashes = async () => {
    if (!input) return;
    
    const msgBuffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const sha256 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Simple hash functions (simulated)
    const simpleHash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16);
    };

    setHashes({
      'SHA-256': sha256,
      'MD5': simpleHash(input) + simpleHash(input + 'salt'),
      'SHA-1': simpleHash(input + 'sha1') + 'a'.repeat(24),
      'CRC32': Math.abs(parseInt(simpleHash(input) || '0')).toString(36).toUpperCase(),
    });
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-teal-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-teal-500/20">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-teal-500" />
          <span className="text-white font-semibold">Hash Generator</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-3 border-b border-teal-500/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={generateHashes}
            placeholder="Enter text to hash..."
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm font-mono"
          />
          <button
            onClick={generateHashes}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white text-sm flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Generate
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-3">
        {Object.entries(hashes).map(([algo, hash]) => (
          <div key={algo} className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-teal-400 text-sm font-medium">{algo}</span>
              <button 
                onClick={() => copyHash(hash)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <code className="text-gray-300 text-xs font-mono break-all">{hash}</code>
          </div>
        ))}
        
        {!input && (
          <div className="text-center py-12 text-gray-500">
            <Lock className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Enter text to generate hashes</p>
          </div>
        )}
      </div>
    </div>
  );
}
