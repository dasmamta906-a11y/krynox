import React, { useState } from 'react';
import { Search, Replace, ChevronDown, ChevronRight, X, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';

interface SearchResult {
  file: string;
  line: number;
  content: string;
  matchStart: number;
  matchEnd: number;
}

const mockResults: SearchResult[] = [
  { file: 'src/App.jsx', line: 45, content: 'const [searchTerm, setSearchTerm] = useState("");', matchStart: 23, matchEnd: 35 },
  { file: 'src/components/EditorPanel.tsx', line: 123, content: 'const searchTerm = localStorage.getItem("search");', matchStart: 19, matchEnd: 31 },
  { file: 'src/services/ai.ts', line: 67, content: 'if (searchTerm.length > 0) {', matchStart: 6, matchEnd: 17 },
  { file: 'src/context/AppContext.tsx', line: 89, content: 'searchTerm: "",', matchStart: 0, matchEnd: 11 },
];

export default function SearchReplacePanel({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceTerm, setReplaceTerm] = useState("");
  const [isRegex, setIsRegex] = useState(false);
  const [isCaseSensitive, setIsCaseSensitive] = useState(true);
  const [isWholeWord, setIsWholeWord] = useState(false);
  const [results, setResults] = useState<SearchResult[]>(mockResults);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-purple-500/20 w-96">
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-purple-500" />
          <span className="text-white font-semibold">Search</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded px-3 py-2 text-white text-sm"
            autoFocus
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            placeholder="Replace with..."
            className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded px-3 py-2 text-white text-sm"
          />
          <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded text-white">
            <Replace className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-3 py-2 border-b border-purple-500/20 flex items-center gap-2 flex-wrap">
        <button 
          onClick={() => setIsCaseSensitive(!isCaseSensitive)}
          className={`px-2 py-1 text-xs rounded ${isCaseSensitive ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          Match Case
        </button>
        <button 
          onClick={() => setIsRegex(!isRegex)}
          className={`px-2 py-1 text-xs rounded ${isRegex ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          Regex
        </button>
        <button 
          onClick={() => setIsWholeWord(!isWholeWord)}
          className={`px-2 py-1 text-xs rounded ${isWholeWord ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
        >
          Whole Word
        </button>
      </div>

      <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-500 border-b border-purple-500/20">
        <span>{results.length} results</span>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-gray-700 rounded"><ArrowUp className="w-3 h-3" /></button>
          <button className="p-1 hover:bg-gray-700 rounded"><ArrowDown className="w-3 h-3" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {results.map((result, i) => (
          <div 
            key={i}
            className={`p-3 border-b border-gray-800 hover:bg-gray-800 cursor-pointer ${i === selectedIndex ? 'bg-purple-500/20' : ''}`}
            onClick={() => setSelectedIndex(i)}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-purple-400 text-sm font-medium">{result.file}</span>
              <span className="text-gray-500 text-xs">:{result.line}</span>
            </div>
            <div className="text-gray-300 text-sm font-mono truncate">
              {result.content.slice(0, result.matchStart)}
              <span className="bg-yellow-400/30 text-yellow-300">{result.content.slice(result.matchStart, result.matchEnd)}</span>
              {result.content.slice(result.matchEnd)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
