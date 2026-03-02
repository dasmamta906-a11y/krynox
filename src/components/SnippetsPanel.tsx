import React, { useState } from 'react';
import { 
  Code2, 
  Plus, 
  Search, 
  FolderPlus, 
  FileCode, 
  Copy, 
  Edit, 
  Trash2, 
  Tag,
  Star,
  Clock,
  ChevronRight,
  ChevronDown,
  X,
  Save
} from 'lucide-react';

// Mock snippets data
const mockSnippets = [
  {
    id: 1,
    title: 'React useState Hook',
    language: 'javascript',
    code: `const [state, setState] = useState(initialValue);`,
    tags: ['react', 'hooks', 'state'],
    favorite: true,
    createdAt: '2 days ago'
  },
  {
    id: 2,
    title: 'React useEffect Hook',
    language: 'javascript',
    code: `useEffect(() => {\n  // side effects\n  return () => {\n    // cleanup\n  };\n}, [dependencies]);`,
    tags: ['react', 'hooks', 'effects'],
    favorite: true,
    createdAt: '3 days ago'
  },
  {
    id: 3,
    title: 'Async Function',
    language: 'javascript',
    code: `async function fetchData() {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n}`,
    tags: ['async', 'fetch', 'api'],
    favorite: false,
    createdAt: '1 week ago'
  },
  {
    id: 4,
    title: 'Python List Comprehension',
    language: 'python',
    code: `result = [expression for item in iterable if condition]`,
    tags: ['python', 'list', 'comprehension'],
    favorite: false,
    createdAt: '2 weeks ago'
  },
  {
    id: 5,
    title: 'CSS Flexbox Center',
    language: 'css',
    code: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
    tags: ['css', 'flexbox', 'layout'],
    favorite: true,
    createdAt: '3 weeks ago'
  },
];

const LANGUAGES = ['All', 'JavaScript', 'TypeScript', 'Python', 'CSS', 'HTML', 'Java', 'Go', 'Rust'];

export default function SnippetsPanel({ onClose, onInsert }) {
  const [snippets, setSnippets] = useState(mockSnippets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<typeof mockSnippets[0] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['favorites', 'recent']);

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLanguage = selectedLanguage === 'All' || snippet.language.toLowerCase() === selectedLanguage.toLowerCase();
    const matchesFavorite = !showFavorites || snippet.favorite;
    return matchesSearch && matchesLanguage && matchesFavorite;
  });

  const favoriteSnippets = snippets.filter(s => s.favorite);
  const recentSnippets = [...snippets].sort((a, b) => a.createdAt.localeCompare(b.createdAt)).slice(0, 5);

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => 
      prev.includes(folder) ? prev.filter(f => f !== folder) : [...prev, folder]
    );
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const toggleFavorite = (id: number) => {
    setSnippets(snippets.map(s => 
      s.id === id ? { ...s, favorite: !s.favorite } : s
    ));
  };

  const deleteSnippet = (id: number) => {
    setSnippets(snippets.filter(s => s.id !== id));
    if (selectedSnippet?.id === id) setSelectedSnippet(null);
  };

  return (
    <div className="flex h-full bg-[#0f0f0f]">
      {/* Left Panel - Snippets List */}
      <div className="w-72 border-r border-purple-500/20 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-purple-500" />
            <span className="text-white font-semibold">Snippets</span>
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            title="New Snippet"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-purple-500/20">
          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search snippets..."
              className="bg-transparent text-white text-sm placeholder-gray-500 outline-none flex-1"
            />
          </div>
        </div>

        {/* Language Filter */}
        <div className="px-3 py-2 border-b border-purple-500/20 overflow-x-auto flex gap-1">
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                selectedLanguage === lang 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Favorites Toggle */}
        <div className="px-3 py-2 border-b border-purple-500/20">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`flex items-center gap-2 text-sm ${showFavorites ? 'text-yellow-400' : 'text-gray-400'}`}
          >
            <Star className={`w-4 h-4 ${showFavorites ? 'fill-yellow-400' : ''}`} />
            Favorites ({favoriteSnippets.length})
          </button>
        </div>

        {/* Snippets List */}
        <div className="flex-1 overflow-y-auto p-2">
          {showFavorites ? (
            <div>
              <div className="flex items-center gap-1 px-2 py-1 text-xs text-yellow-400 font-medium mb-1">
                <Star className="w-3 h-3 fill-yellow-400" />
                Favorites
              </div>
              {favoriteSnippets.map(snippet => (
                <SnippetItem 
                  key={snippet.id} 
                  snippet={snippet} 
                  onClick={() => setSelectedSnippet(snippet)}
                  onCopy={() => copyToClipboard(snippet.code)}
                  onDelete={() => deleteSnippet(snippet.id)}
                  onToggleFavorite={() => toggleFavorite(snippet.id)}
                />
              ))}
            </div>
          ) : (
            filteredSnippets.map(snippet => (
              <SnippetItem 
                key={snippet.id} 
                snippet={snippet} 
                onClick={() => setSelectedSnippet(snippet)}
                onCopy={() => copyToClipboard(snippet.code)}
                onDelete={() => deleteSnippet(snippet.id)}
                onToggleFavorite={() => toggleFavorite(snippet.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Snippet Detail */}
      <div className="flex-1 flex flex-col">
        {selectedSnippet ? (
          <>
            {/* Snippet Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
              <div>
                <h3 className="text-white font-semibold">{selectedSnippet.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded">
                    {selectedSnippet.language}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedSnippet.createdAt}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => copyToClipboard(selectedSnippet.code)}
                  className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                  title="Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {onInsert && (
                  <button
                    onClick={() => onInsert(selectedSnippet.code)}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-medium transition-colors"
                  >
                    Insert
                  </button>
                )}
                <button
                  onClick={() => toggleFavorite(selectedSnippet.id)}
                  className="p-2 hover:bg-gray-700 rounded transition-colors"
                  title="Favorite"
                >
                  <Star className={`w-4 h-4 ${selectedSnippet.favorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="px-4 py-2 border-b border-purple-500/20 flex items-center gap-2 flex-wrap">
              {selectedSnippet.tags.map((tag, i) => (
                <span key={i} className="flex items-center gap-1 text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Code */}
            <div className="flex-1 p-4 overflow-auto">
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap bg-[#1a1a1a] p-4 rounded-lg">
                {selectedSnippet.code}
              </pre>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select a snippet to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SnippetItem({ snippet, onClick, onCopy, onDelete, onToggleFavorite }) {
  return (
    <div 
      className="p-2 hover:bg-gray-800 rounded-lg cursor-pointer group mb-1"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-purple-400" />
            <span className="text-white text-sm font-medium truncate">{snippet.title}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 ml-6">
            <span className="text-xs text-purple-400">{snippet.language}</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">{snippet.code.split('\n').length} lines</span>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <Star className={`w-3 h-3 ${snippet.favorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onCopy(); }}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
          >
            <Copy className="w-3 h-3" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-red-400"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
