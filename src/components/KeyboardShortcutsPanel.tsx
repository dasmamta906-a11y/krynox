import React, { useState } from 'react';
import { Keyboard, Search, X, Copy, Check } from 'lucide-react';

const shortcuts = [
  { id: 1, action: 'Save File', keys: ['Ctrl', 'S'], category: 'File' },
  { id: 2, action: 'Find', keys: ['Ctrl', 'F'], category: 'Search' },
  { id: 3, action: 'Replace', keys: ['Ctrl', 'H'], category: 'Search' },
  { id: 4, action: 'Quick Open', keys: ['Ctrl', 'P'], category: 'Navigation' },
  { id: 5, action: 'Command Palette', keys: ['Ctrl', 'Shift', 'P'], category: 'General' },
  { id: 6, action: 'Toggle Terminal', keys: ['Ctrl', '`'], category: 'View' },
  { id: 7, action: 'Split Editor', keys: ['Ctrl', '\\'], category: 'View' },
  { id: 8, action: 'Go to Line', keys: ['Ctrl', 'G'], category: 'Navigation' },
  { id: 9, action: 'Comment Line', keys: ['Ctrl', '/'], category: 'Editing' },
  { id: 10, action: 'Format Document', keys: ['Shift', 'Alt', 'F'], category: 'Editing' },
  { id: 11, action: 'Multi-cursor', keys: ['Ctrl', 'Alt', 'Down'], category: 'Editing' },
  { id: 12, action: 'Select All', keys: ['Ctrl', 'A'], category: 'Selection' },
  { id: 13, action: 'Copy Line Down', keys: ['Shift', 'Alt', 'Down'], category: 'Editing' },
  { id: 14, action: 'Undo', keys: ['Ctrl', 'Z'], category: 'Editing' },
  { id: 15, action: 'Redo', keys: ['Ctrl', 'Y'], category: 'Editing' },
];

const categories = ['All', 'File', 'Edit', 'Selection', 'View', 'Navigation', 'Search', 'General'];

export default function KeyboardShortcutsPanel({ onClose }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copied, setCopied] = useState<number | null>(null);

  const filtered = shortcuts.filter(s => {
    const matchesSearch = s.action.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyShortcut = (id: number) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-purple-500/20 w-96">
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-purple-500" />
          <span className="text-white font-semibold">Keyboard Shortcuts</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shortcuts..."
            className="bg-transparent text-white text-sm outline-none flex-1"
          />
        </div>
      </div>

      <div className="flex gap-1 p-2 border-b border-purple-500/20 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap ${
              selectedCategory === cat ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filtered.map(shortcut => (
          <div key={shortcut.id} className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg mb-1">
            <div>
              <div className="text-white text-sm">{shortcut.action}</div>
              <div className="text-gray-500 text-xs">{shortcut.category}</div>
            </div>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, i) => (
                <React.Fragment key={i}>
                  <kbd className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">{key}</kbd>
                  {i < shortcut.keys.length - 1 && <span className="text-gray-500">+</span>}
                </React.Fragment>
              ))}
              <button
                onClick={() => copyShortcut(shortcut.id)}
                className="ml-2 p-1 hover:bg-gray-700 rounded"
              >
                {copied === shortcut.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-gray-400" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
