import React, { useState } from 'react';
import { Table, X, Copy, Check } from 'lucide-react';

export default function ASCIITable({ onClose }) {
  const [copied, setCopied] = useState('');
  
  const asciiChars: { code: number; char: string; desc: string }[] = [];
  for (let i = 0; i <= 127; i++) {
    let char = String.fromCharCode(i);
    if (i < 32) char = '␀␁␂␃␄␅␆␇␈␉␊␋␌␍␎␏␐␑␒␓␔␕␖␗␘␙␚␛␜␝␞␟'[i] || '';
    let desc = ['', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 'BS', 'TAB', 'LF', 'VT', 'FF', 'CR', 'SO', 'SI', 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 'CAN', 'EM', 'SUB', 'ESC', 'FS', 'GS', 'RS', 'US', ' '][i] || char;
    if (i === 32) desc = 'Space';
    if (i >= 33 && i <= 126) desc = char;
    asciiChars.push({ code: i, char: i === 32 ? '␣' : char, desc });
  }

  const copyChar = (code: number, char: string) => {
    navigator.clipboard.writeText(String.fromCharCode(code));
    setCopied(String(code));
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-gray-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-500/20">
        <div className="flex items-center gap-2">
          <Table className="w-5 h-5 text-gray-400" />
          <span className="text-white font-semibold">ASCII Table</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-3">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-400 sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left">Decimal</th>
              <th className="px-3 py-2 text-left">Hex</th>
              <th className="px-3 py-2 text-left">Octal</th>
              <th className="px-3 py-2 text-left">Char</th>
              <th className="px-3 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {asciiChars.map(c => (
              <tr key={c.code} onClick={() => copyChar(c.code, c.char)} className="border-t border-gray-800 hover:bg-gray-800 cursor-pointer">
                <td className="px-3 py-2 text-blue-400 font-mono">{c.code}</td>
                <td className="px-3 py-2 text-purple-400 font-mono">0x{c.code.toString(16).toUpperCase().padStart(2, '0')}</td>
                <td className="px-3 py-2 text-green-400 font-mono">{c.code.toString(8).padStart(3, '0')}</td>
                <td className="px-3 py-2 text-white font-mono text-lg">{copied === String(c.code) ? '✓' : c.char}</td>
                <td className="px-3 py-2 text-gray-400">{c.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
