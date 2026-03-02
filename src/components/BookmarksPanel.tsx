import React, { useState } from 'react';
import { Bookmark, Search, X, Plus, Trash2, ChevronRight, FileText } from 'lucide-react';

const mockBookmarks = [
  { id: 1, file: 'src/App.tsx', line: 42, label: 'Main Component', color: '#f59e0b' },
  { id: 2, file: 'src/components/Editor.tsx', line: 15, label: 'Editor Setup', color: '#3b82f6' },
  { id: 3, file: 'src/services/api.ts', line: 78, label: 'API Handler', color: '#10b981' },
  { id: 4, file: 'src/utils/helpers.ts', line: 23, label: 'Utility Functions', color: '#ef4444' },
  { id: 5, file: 'src/components/Terminal.tsx', line: 56, label: 'Terminal Config', color: '#8b5cf6' },
];

export default function BookmarksPanel({ onClose }) {
  const [search, setSearch] = useState('');
  const [bookmarks] = useState(mockBookmarks);

  const filtered = bookmarks.filter(b => 
    b.file.toLowerCase().includes(search.toLowerCase()) ||
    b.label.toLowerCase().includes(search.toLowerCase())
  );

  const goToBookmark = (bookmark) => {
    console.log(`Go to ${bookmark.file}:${bookmark.line}`);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-orange-500/20 w-80">
      <div className="flex items-center justify-between px-4 py-3 border-b border-orange-500/20">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-orange-500" />
          <span className="text-white font-semibold">Bookmarks</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-700 rounded">
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-3 border-b border-orange-500/20">
        <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookmarks..."
            className="bg-transparent text-white text-sm outline-none flex-1"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filtered.map(bookmark => (
          <div 
            key={bookmark.id} 
            onClick={() => goToBookmark(bookmark)}
            className="flex items-start gap-3 p-3 hover:bg-gray-800 rounded-lg mb-1 cursor-pointer group"
          >
            <div 
              className="w-3 h-3 rounded-full mt-1 flex-shrink-0" 
              style={{ backgroundColor: bookmark.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium">{bookmark.label}</div>
              <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                <FileText className="w-3 h-3" />
                <span className="truncate">{bookmark.file}:{bookmark.line}</span>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded">
              <Trash2 className="w-3 h-3 text-red-400" />
            </button>
          </div>
        ))}
        
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No bookmarks found</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-orange-500/20 text-xs text-gray-500">
        Press Ctrl+Shift+L to add bookmark
      </div>
    </div>
  );
}
