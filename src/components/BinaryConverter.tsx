import React, { useState, useEffect } from 'react';
import { Binary, X, Copy, Check } from 'lucide-react';

export default function BinaryConverter({ onClose }) {
  const [decimal, setDecimal] = useState('42');
  const [binary, setBinary] = useState('101010');
  const [hex, setHex] = useState('2A');
  const [octal, setOctal] = useState('52');
  const [copied, setCopied] = useState('');

  const convertFromDecimal = (val: string) => {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setBinary(num.toString(2));
      setHex(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
    }
  };

  const convertFromBinary = (val: string) => {
    const num = parseInt(val, 2);
    if (!isNaN(num)) {
      setDecimal(num.toString(10));
      setHex(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
    }
  };

  const convertFromHex = (val: string) => {
    const num = parseInt(val, 16);
    if (!isNaN(num)) {
      setDecimal(num.toString(10));
      setBinary(num.toString(2));
      setOctal(num.toString(8));
    }
  };

  const convertFromOctal = (val: string) => {
    const num = parseInt(val, 8);
    if (!isNaN(num)) {
      setDecimal(num.toString(10));
      setBinary(num.toString(2));
      setHex(num.toString(16).toUpperCase());
    }
  };

  const copyValue = (type: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-cyan-500/20 w-[500px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <Binary className="w-5 h-5 text-cyan-500" />
          <span className="text-white font-semibold">Binary/Hex Converter</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="flex-1 p-3 space-y-3 overflow-auto">
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-cyan-400 text-xs mb-1">Decimal (Base 10)</div>
          <div className="flex gap-2">
            <input type="text" value={decimal} onChange={(e) => { setDecimal(e.target.value); convertFromDecimal(e.target.value); }} className="flex-1 bg-gray-900 text-white px-3 py-2 rounded font-mono border border-gray-700" />
            <button onClick={() => copyValue('dec', decimal)} className="p-2 hover:bg-gray-700 rounded">
              {copied === 'dec' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-cyan-400 text-xs mb-1">Binary (Base 2)</div>
          <div className="flex gap-2">
            <input type="text" value={binary} onChange={(e) => { setBinary(e.target.value); convertFromBinary(e.target.value); }} className="flex-1 bg-gray-900 text-green-400 px-3 py-2 rounded font-mono border border-gray-700" />
            <button onClick={() => copyValue('bin', binary)} className="p-2 hover:bg-gray-700 rounded">
              {copied === 'bin' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-cyan-400 text-xs mb-1">Hexadecimal (Base 16)</div>
          <div className="flex gap-2">
            <input type="text" value={hex} onChange={(e) => { setHex(e.target.value); convertFromHex(e.target.value); }} className="flex-1 bg-gray-900 text-yellow-400 px-3 py-2 rounded font-mono border border-gray-700" />
            <button onClick={() => copyValue('hex', hex)} className="p-2 hover:bg-gray-700 rounded">
              {copied === 'hex' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-cyan-400 text-xs mb-1">Octal (Base 8)</div>
          <div className="flex gap-2">
            <input type="text" value={octal} onChange={(e) => { setOctal(e.target.value); convertFromOctal(e.target.value); }} className="flex-1 bg-gray-900 text-purple-400 px-3 py-2 rounded font-mono border border-gray-700" />
            <button onClick={() => copyValue('oct', octal)} className="p-2 hover:bg-gray-700 rounded">
              {copied === 'oct' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-cyan-400 text-xs mb-2">Quick Reference</div>
          <div className="grid grid-cols-4 gap-2 text-xs font-mono">
            <div className="bg-gray-700 p-2 rounded"><span className="text-gray-400">0</span> <span className="text-green-400">0000</span></div>
            <div className="bg-gray-700 p-2 rounded"><span className="text-gray-400">1</span> <span className="text-green-400">0001</span></div>
            <div className="bg-gray-700 p-2 rounded"><span className="text-gray-400">8</span> <span className="text-yellow-400">08</span></div>
            <div className="bg-gray-700 p-2 rounded"><span className="text-gray-400">15</span> <span className="text-yellow-400">0F</span></div>
            <div className="bg-gray-700 p-2 rounded"><span className="text-gray-400">255</span> <span className="text-yellow-400">FF</span></div>
            <div className="bg-gray-700 p-2 rounded"><span className="text-gray-400">16</span> <span className="text-yellow-400">10</span></div>
            <div className="bg-gray-700 p-2 rounded"><span className="text-gray-400">32</span> <span className="text-yellow-400">20</span></div>
            <div className="bg-gray-700 p-2 rounded"><span className="text-gray-400">64</span> <span className="text-yellow-400">40</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
