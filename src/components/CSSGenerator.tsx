import React, { useState } from 'react';
import { Palette, X, Copy, Check } from 'lucide-react';

export default function CSSGenerator({ onClose }) {
  const [gradient, setGradient] = useState({ color1: '#ff0000', color2: '#0000ff', direction: '90deg' });
  const [shadow, setShadow] = useState({ x: '5px', y: '5px', blur: '10px', color: 'rgba(0,0,0,0.5)' });
  const [border, setBorder] = useState({ width: '2px', style: 'solid', color: '#333', radius: '8px' });
  const [copied, setCopied] = useState('');

  const generateGradient = () => `background: linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2});`;
  const generateShadow = () => `box-shadow: ${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.color};`;
  const generateBorder = () => `border: ${border.width} ${border.style} ${border.color};\nborder-radius: ${border.radius};`;

  const copyCSS = (type: string, css: string) => {
    navigator.clipboard.writeText(css);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-pink-500/20 w-[500px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-pink-500/20">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-pink-500" />
          <span className="text-white font-semibold">CSS Generator</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-3 space-y-4">
        {/* Gradient */}
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-pink-400 text-sm font-medium mb-2">Linear Gradient</div>
          <div className="h-20 rounded mb-3" style={{ background: `linear-gradient(${gradient.direction}, ${gradient.color1}, ${gradient.color2})` }} />
          <div className="flex gap-2 mb-2">
            <input type="color" value={gradient.color1} onChange={(e) => setGradient({ ...gradient, color1: e.target.value })} className="w-10 h-8" />
            <input type="color" value={gradient.color2} onChange={(e) => setGradient({ ...gradient, color2: e.target.value })} className="w-10 h-8" />
            <select value={gradient.direction} onChange={(e) => setGradient({ ...gradient, direction: e.target.value })} className="flex-1 bg-gray-700 text-white px-2 rounded">
              <option value="0deg">0°</option>
              <option value="45deg">45°</option>
              <option value="90deg">90°</option>
              <option value="135deg">135°</option>
              <option value="180deg">180°</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <code className="text-xs text-gray-400">{generateGradient()}</code>
            <button onClick={() => copyCSS('gradient', generateGradient())} className="p-1 hover:bg-gray-700 rounded">
              {copied === 'gradient' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>
        {/* Box Shadow */}
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-pink-400 text-sm font-medium mb-2">Box Shadow</div>
          <div className="h-20 bg-gray-700 rounded mb-3 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-500" style={{ boxShadow: `${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.color}` }} />
          </div>
          <div className="flex gap-2 mb-2">
            <input type="text" value={shadow.x} onChange={(e) => setShadow({ ...shadow, x: e.target.value })} placeholder="X" className="w-16 bg-gray-700 text-white px-2 py-1 rounded" />
            <input type="text" value={shadow.y} onChange={(e) => setShadow({ ...shadow, y: e.target.value })} placeholder="Y" className="w-16 bg-gray-700 text-white px-2 py-1 rounded" />
            <input type="text" value={shadow.blur} onChange={(e) => setShadow({ ...shadow, blur: e.target.value })} placeholder="Blur" className="w-16 bg-gray-700 text-white px-2 py-1 rounded" />
            <input type="color" value={shadow.color.slice(0,7)} onChange={(e) => setShadow({ ...shadow, color: e.target.value + '80' })} className="w-8 h-8" />
          </div>
          <div className="flex justify-between items-center">
            <code className="text-xs text-gray-400">{generateShadow()}</code>
            <button onClick={() => copyCSS('shadow', generateShadow())} className="p-1 hover:bg-gray-700 rounded">
              {copied === 'shadow' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>
        {/* Border */}
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-pink-400 text-sm font-medium mb-2">Border</div>
          <div className="h-20 bg-gray-700 rounded mb-3 flex items-center justify-center">
            <div className="w-24 h-12 bg-blue-500" style={{ border: `${border.width} ${border.style} ${border.color}`, borderRadius: border.radius }} />
          </div>
          <div className="flex gap-2 mb-2">
            <input type="text" value={border.width} onChange={(e) => setBorder({ ...border, width: e.target.value })} className="w-16 bg-gray-700 text-white px-2 py-1 rounded" />
            <select value={border.style} onChange={(e) => setBorder({ ...border, style: e.target.value })} className="w-24 bg-gray-700 text-white px-2 py-1 rounded">
              <option>solid</option><option>dashed</option><option>dotted</option>
            </select>
            <input type="color" value={border.color} onChange={(e) => setBorder({ ...border, color: e.target.value })} className="w-8 h-8" />
            <input type="text" value={border.radius} onChange={(e) => setBorder({ ...border, radius: e.target.value })} placeholder="Radius" className="w-20 bg-gray-700 text-white px-2 py-1 rounded" />
          </div>
          <div className="flex justify-between items-center">
            <code className="text-xs text-gray-400 whitespace-pre">{generateBorder()}</code>
            <button onClick={() => copyCSS('border', generateBorder())} className="p-1 hover:bg-gray-700 rounded">
              {copied === 'border' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
