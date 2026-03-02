import React, { useState } from 'react';
import { Pipette, X, Copy, Check, Plus } from 'lucide-react';

const presetColors = [
  '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00',
  '#ff00ff', '#00ffff', '#ff8800', '#8800ff', '#00ff88', '#880000',
  '#008800', '#000088', '#888800', '#880088', '#008888', '#ffaaaa',
  '#aaffaa', '#aaaaff', '#ffffaa', '#ffaaff', '#aaffff', '#444444',
];

const palettes = [
  { name: 'Tailwind', colors: ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1', '#f1f5f9', '#f8fafc', '#ffffff', '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'] },
  { name: 'Material', colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b', '#000000', '#ffffff'] },
  { name: 'Pastel', colors: ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#f0f0f0', '#d4a5a5', '#a5d4d4', '#d4d4a5', '#a5a5d4', '#b3e5fc', '#fff9c4', '#ffccbc', '#c8e6c9', '#e1bee7', '#f8bbd9'] },
];

export default function ColorPickerPanel({ onClose }) {
  const [color, setColor] = useState('#3b82f6');
  const [hexInput, setHexInput] = useState('#3b82f6');
  const [copied, setCopied] = useState(false);
  const [activePalette, setActivePalette] = useState('Tailwind');

  const copyColor = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
  };

  const hexToHsl = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-violet-500/20 w-80">
      <div className="flex items-center justify-between px-4 py-3 border-b border-violet-500/20">
        <div className="flex items-center gap-2">
          <Pipette className="w-5 h-5 text-violet-500" />
          <span className="text-white font-semibold">Color Picker</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-4">
        <div 
          className="w-full h-32 rounded-lg mb-4 border-2 border-gray-700"
          style={{ backgroundColor: color }}
        />

        <div className="flex gap-2 mb-4">
          <input
            type="color"
            value={color}
            onChange={(e) => { setColor(e.target.value); setHexInput(e.target.value); }}
            className="w-10 h-10 rounded cursor-pointer bg-transparent"
          />
          <input
            type="text"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            onBlur={() => { if (/^#[0-9A-Fa-f]{6}$/.test(hexInput)) { setColor(hexInput); } }}
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 font-mono"
          />
          <button 
            onClick={copyColor}
            className="px-3 bg-gray-800 hover:bg-gray-700 rounded border border-gray-700"
          >
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
          </button>
        </div>

        <div className="grid grid-cols-6 gap-1 mb-4">
          {presetColors.map(c => (
            <button
              key={c}
              onClick={() => { setColor(c); setHexInput(c); }}
              className={`w-full aspect-square rounded border-2 ${color === c ? 'border-white' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between py-1 border-b border-gray-800">
            <span className="text-gray-400">HEX</span>
            <span className="text-white font-mono">{color}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-800">
            <span className="text-gray-400">RGB</span>
            <span className="text-white font-mono">{hexToRgb(color)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-800">
            <span className="text-gray-400">HSL</span>
            <span className="text-white font-mono">{hexToHsl(color)}</span>
          </div>
        </div>

        <div className="mb-2">
          <div className="text-gray-400 text-xs mb-2">Palettes</div>
          <div className="flex gap-1 mb-2">
            {palettes.map(p => (
              <button
                key={p.name}
                onClick={() => setActivePalette(p.name)}
                className={`px-2 py-1 rounded text-xs ${
                  activePalette === p.name ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-300'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {palettes.find(p => p.name === activePalette)?.colors.map(c => (
              <button
                key={c}
                onClick={() => { setColor(c); setHexInput(c); }}
                className={`w-full aspect-square rounded border-1 ${color === c ? 'border-white' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
