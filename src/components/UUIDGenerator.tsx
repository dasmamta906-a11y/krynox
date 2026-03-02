import React, { useState } from 'react';
import { Hash, X, Copy, Check, RefreshCw } from 'lucide-react';

export default function UUIDGenerator({ onClose }) {
  const [uuids, setUuids] = useState<string[]>([]);
  const [version, setVersion] = useState('4');
  const [count, setCount] = useState(5);
  const [copied, setCopied] = useState<number | null>(null);

  const generateUUID = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      if (version === '4') {
        // UUID v4
        newUuids.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        }));
      } else if (version === '1') {
        // UUID v1 - timestamp based
        const timestamp = Date.now().toString(16).padStart(12, '0');
        const random = Math.random().toString(16).slice(2, 14);
        newUuids.push(`${timestamp.slice(0,8)}-${timestamp.slice(8,12)}-1${random.slice(0,3)}-${random.slice(3,7)}${Math.random().toString(16).slice(2,6)}`);
      } else {
        // Random hex
        newUuids.push(Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''));
      }
    }
    setUuids(newUuids);
  };

  const copyUUID = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-violet-500/20 w-[500px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-violet-500/20">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-violet-500" />
          <span className="text-white font-semibold">UUID Generator</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-3 border-b border-violet-500/20">
        <div className="flex gap-2 mb-2">
          <select
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm"
          >
            <option value="4">UUID v4 (Random)</option>
            <option value="1">UUID v1 (Timestamp)</option>
            <option value="nil">Nil UUID</option>
          </select>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-20 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm"
          />
          <button
            onClick={generateUUID}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded text-white text-sm flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Generate
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3">
        {uuids.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Hash className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Click Generate to create UUIDs</p>
          </div>
        ) : (
          <div className="space-y-2">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg group">
                <code className="flex-1 text-violet-300 font-mono text-sm">{uuid}</code>
                <button 
                  onClick={() => copyUUID(uuid, i)}
                  className="p-1 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100"
                >
                  {copied === i ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {uuids.length > 0 && (
        <div className="p-3 border-t border-violet-500/20">
          <button
            onClick={copyAll}
            className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 text-sm flex items-center justify-center gap-2"
          >
            {copied === -1 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            Copy All
          </button>
        </div>
      )}
    </div>
  );
}
