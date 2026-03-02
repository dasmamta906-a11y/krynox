import React, { useState } from 'react';
import { Palette, X, Sun, Moon, Monitor, Check, RefreshCw, Download } from 'lucide-react';

const themes = [
  { id: 'dark', name: 'Dark Modern', preview: '#1e1e1e', accent: '#007acc', text: '#cccccc' },
  { id: 'light', name: 'Light Modern', preview: '#ffffff', accent: '#0066b8', text: '#333333' },
  { id: 'monokai', name: 'Monokai', preview: '#272822', accent: '#f92672', text: '#f8f8f2' },
  { id: 'dracula', name: 'Dracula', preview: '#282a36', accent: '#bd93f9', text: '#f8f8f2' },
  { id: 'nord', name: 'Nord', preview: '#2e3440', accent: '#88c0d0', text: '#eceff4' },
  { id: 'gruvbox', name: 'Gruvbox', preview: '#282828', accent: '#fabd2f', text: '#ebdbb2' },
  { id: 'one-dark', name: 'One Dark', preview: '#282c34', accent: '#61afef', text: '#abb2bf' },
  { id: 'solarized', name: 'Solarized Dark', preview: '#002b36', accent: '#2aa198', text: '#839496' },
];

const fonts = [
  { id: 'fira', name: 'Fira Code', size: '14px' },
  { id: 'jetbrains', name: 'JetBrains Mono', size: '14px' },
  { id: 'consolas', name: 'Consolas', size: '14px' },
  { id: 'monaco', name: 'Monaco', size: '13px' },
  { id: 'source', name: 'Source Code Pro', size: '14px' },
];

const UIThemes = [
  { id: 'vs-dark', name: 'VS Code Dark', colors: { bg: '#1e1e1e', fg: '#cccccc', accent: '#007acc' } },
  { id: 'vs-light', name: 'VS Code Light', colors: { bg: '#ffffff', fg: '#333333', accent: '#0066b8' } },
  { id: 'hc-black', name: 'High Contrast', colors: { bg: '#000000', fg: '#ffffff', accent: '#ffff00' } },
];

export default function ThemeCustomizerPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('editor');
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [selectedFont, setSelectedFont] = useState('fira');
  const [fontSize, setFontSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [tabSize, setTabSize] = useState(2);

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-pink-500/20 w-[700px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-pink-500/20">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-pink-500" />
          <span className="text-white font-semibold">Theme Customizer</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-700 rounded">
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded">
            <Download className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex border-b border-pink-500/20">
        {['editor', 'ui', 'fonts'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm capitalize ${
              activeTab === tab 
                ? 'text-white border-b-2 border-pink-500 bg-gray-800/50' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {tab} Theme
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'editor' && (
          <div>
            <h3 className="text-white font-medium mb-4">Syntax Themes</h3>
            <div className="grid grid-cols-4 gap-3">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTheme === theme.id 
                      ? 'border-pink-500 bg-gray-800' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div 
                    className="w-full h-12 rounded mb-2 flex items-center justify-center"
                    style={{ backgroundColor: theme.preview }}
                  >
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                  </div>
                  <div className="text-xs text-white">{theme.name}</div>
                  {selectedTheme === theme.id && (
                    <Check className="w-4 h-4 text-pink-500 mx-auto mt-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ui' && (
          <div>
            <h3 className="text-white font-medium mb-4">UI Theme</h3>
            <div className="grid grid-cols-3 gap-3">
              {UIThemes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => {}}
                  className="p-4 rounded-lg border-2 border-gray-700 hover:border-gray-600"
                >
                  <div 
                    className="w-full h-16 rounded mb-2 flex items-center justify-center"
                    style={{ backgroundColor: theme.colors.bg }}
                  >
                    <div className="text-xs" style={{ color: theme.colors.fg }}>
                      Aa
                    </div>
                  </div>
                  <div className="text-xs text-white">{theme.name}</div>
                </button>
              ))}
            </div>

            <h3 className="text-white font-medium mt-6 mb-4">Accent Color</h3>
            <div className="flex gap-2">
              {['#007acc', '#e06c75', '#98c379', '#e5c07b', '#61afef', '#c678dd', '#56b6c2', '#be5046'].map(color => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border-2 border-gray-600 hover:border-white"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fonts' && (
          <div>
            <h3 className="text-white font-medium mb-4">Font Family</h3>
            <div className="space-y-2 mb-6">
              {fonts.map(font => (
                <button
                  key={font.id}
                  onClick={() => setSelectedFont(font.id)}
                  className={`w-full p-3 rounded-lg border text-left ${
                    selectedFont === font.id 
                      ? 'border-pink-500 bg-gray-800' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <span className="text-white">{font.name}</span>
                  <span className="text-gray-500 ml-2 text-sm">monospace</span>
                </button>
              ))}
            </div>

            <h3 className="text-white font-medium mb-4">Font Size: {fontSize}px</h3>
            <input
              type="range"
              min="10"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full mb-6"
            />

            <h3 className="text-white font-medium mb-4">Line Height: {lineHeight}</h3>
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full mb-6"
            />

            <h3 className="text-white font-medium mb-4">Tab Size: {tabSize} spaces</h3>
            <div className="flex gap-2">
              {[2, 4, 8].map(size => (
                <button
                  key={size}
                  onClick={() => setTabSize(size)}
                  className={`px-4 py-2 rounded ${
                    tabSize === size ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-pink-500/20">
        <div className="text-xs text-gray-500">
          Preview: <span className="text-white">const x = 42;</span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300">
            Reset
          </button>
          <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded text-white">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
