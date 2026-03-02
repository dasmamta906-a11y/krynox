import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  File, 
  FileCode, 
  FileJson, 
  FileText, 
  ChevronRight, 
  ChevronDown,
  Plus,
  MoreHorizontal,
  Search,
  RefreshCw
} from 'lucide-react';

// Mock file system data
const fileSystem = {
  name: 'krynox',
  type: 'folder',
  children: [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'components', type: 'folder', children: [
          { name: 'TopBar.tsx', type: 'file', language: 'typescript' },
          { name: 'EditorPanel.tsx', type: 'file', language: 'typescript' },
          { name: 'StatusBar.tsx', type: 'file', language: 'typescript' },
          { name: 'AiPanel.tsx', type: 'file', language: 'typescript' },
          { name: 'TerminalPanel.tsx', type: 'file', language: 'typescript' },
        ]},
        { name: 'services', type: 'folder', children: [
          { name: 'ai.ts', type: 'file', language: 'typescript' },
        ]},
        { name: 'context', type: 'folder', children: [
          { name: 'AppContext.tsx', type: 'file', language: 'typescript' },
        ]},
        { name: 'App.jsx', type: 'file', language: 'javascript' },
        { name: 'main.jsx', type: 'file', language: 'javascript' },
      ]
    },
    {
      name: 'public',
      type: 'folder',
      children: [
        { name: 'index.html', type: 'file', language: 'html' },
      ]
    },
    {
      name: 'api-router',
      type: 'folder',
      children: [
        { name: 'src', type: 'folder', children: [
          { name: 'server.ts', type: 'file', language: 'typescript' },
          { name: 'index.ts', type: 'file', language: 'typescript' },
        ]},
        { name: 'package.json', type: 'file', language: 'json' },
        { name: 'tsconfig.json', type: 'file', language: 'json' },
      ]
    },
    { name: 'package.json', type: 'file', language: 'json' },
    { name: 'vite.config.js', type: 'file', language: 'javascript' },
    { name: 'README.md', type: 'file', language: 'markdown' },
  ]
};

const getFileIcon = (file) => {
  if (file.type === 'folder') return <Folder className="w-4 h-4 text-yellow-400" />;
  
  switch (file.language) {
    case 'typescript':
    case 'javascript':
      return <FileCode className="w-4 h-4 text-blue-400" />;
    case 'json':
      return <FileJson className="w-4 h-4 text-yellow-300" />;
    case 'html':
      return <FileCode className="w-4 h-4 text-orange-500" />;
    case 'markdown':
      return <FileText className="w-4 h-4 text-gray-400" />;
    default:
      return <File className="w-4 h-4 text-gray-400" />;
  }
};

function FileTreeItem({ item, depth = 0, onFileClick }) {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      setIsSelected(true);
      if (onFileClick) onFileClick(item);
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-purple-500/20 transition-colors ${
          isSelected ? 'bg-purple-500/30 text-white' : 'text-gray-300'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={handleClick}
      >
        {item.type === 'folder' && (
          <span className="text-gray-500">
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </span>
        )}
        {item.type === 'folder' ? (
          isExpanded ? <FolderOpen className="w-4 h-4 text-yellow-400" /> : <Folder className="w-4 h-4 text-yellow-400" />
        ) : (
          <span className="w-3" />
        )}
        <span className="text-sm truncate">{item.name}</span>
      </div>
      
      {item.type === 'folder' && isExpanded && item.children && (
        <div>
          {item.children.map((child, index) => (
            <FileTreeItem 
              key={`${child.name}-${index}`} 
              item={child} 
              depth={depth + 1}
              onFileClick={onFileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorer({ onFileSelect, isOpen = true }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState(['src', 'components']);

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="w-64 bg-[#0f0f0f] border-r border-purple-500/20 flex flex-col">
      {/* Explorer Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-purple-500/20">
        <h3 className="text-white font-semibold text-sm">Explorer</h3>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors" title="New File">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors" title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-2 py-2 border-b border-purple-500/10">
        <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-2 py-1.5">
          <Search className="w-3 h-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-gray-500 outline-none flex-1"
          />
        </div>
      </div>

      {/* Workspace Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-1">
          <div 
            className="flex items-center gap-1 px-2 py-1 text-gray-400 hover:bg-purple-500/10 cursor-pointer"
            onClick={() => toggleFolder('krynox')}
          >
            <ChevronRight className={`w-3 h-3 transition-transform ${expandedFolders.includes('krynox') ? 'rotate-90' : ''}`} />
            <Folder className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">KRYNOX</span>
          </div>
          
          {expandedFolders.includes('krynox') && (
            <div>
              <FileTreeItem item={fileSystem} depth={1} onFileClick={onFileSelect} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-purple-500/20 text-xs text-gray-500">
        {fileSystem.children?.length || 0} files
      </div>
    </div>
  );
}
