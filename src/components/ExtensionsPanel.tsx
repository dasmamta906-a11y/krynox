import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Star, Download, X, ExternalLink, 
  BookOpen, Settings, Trash2, RefreshCw, 
  ChevronRight, Info, Hammer, 
  Check, AlertCircle, Sparkles, Loader2, Tag,
  Grid, List, Clock, ThumbsUp
} from 'lucide-react';
import { 
  searchExtensions, 
  getExtensionDetail, 
  getExtensionReadme,
  getPopularExtensions,
  formatDownloadCount,
  OpenVSXExtension,
  OpenVSXExtensionDetail,
  POPULAR_TAGS
} from '../services/OpenVSXService';

// Built-in extensions for Krynox
const BUILT_IN_EXTENSIONS = [
  {
    id: 'christiankohler.npm-intellisense',
    name: 'npm Intellisense',
    publisher: 'Christian Kohler',
    description: 'This plugin autocompletes npm modules in import statements in Visual Studio Code.',
    icon: undefined,
    downloads: 1455000,
    rating: 4.8,
    version: '1.4.5',
    tags: ['IntelliSense', 'JavaScript', 'TypeScript', 'npm', 'Node.js'],
    installed: false,
    readme: `# npm Intellisense

Autocompletes npm modules in import statements.

## Features

- Autocompletes npm modules in import statements
- Supports ES6, TypeScript, and CommonJS
- Shows module details on hover
- Works with scoped packages

## Installation

Press F1 in Visual Studio Code, type "ext install" and then look for "npm Intellisense".

## Configuration

You can configure which types of imports should be autocompleted:

\`\`\`json
{
  "npmIntellisense.autocompleteTriggerModules": ["import", "require"]
}
\`\`\`

## Credits

Author: Christian Kohler
Version: 1.4.5
`,
    namespace: 'christiankohler',
    isBuiltIn: true
  },
  {
    id: 'esbenp.prettier-vscode',
    name: 'Prettier - Code formatter',
    publisher: 'Prettier',
    description: 'Code formatter using prettier',
    icon: undefined,
    downloads: 25000000,
    rating: 4.9,
    version: '10.1.0',
    tags: ['Formatter', 'JavaScript', 'TypeScript'],
    installed: true,
    namespace: 'esbenp',
    isBuiltIn: false
  },
  {
    id: 'dbaeumer.vscode-eslint',
    name: 'ESLint',
    publisher: 'Microsoft',
    description: 'Integrates ESLint into VS Code',
    icon: undefined,
    downloads: 22000000,
    rating: 4.7,
    version: '2.4.4',
    tags: ['Linting', 'JavaScript', 'TypeScript'],
    installed: true,
    namespace: 'dbaeumer',
    isBuiltIn: false
  },
  {
    id: 'ms-python.python',
    name: 'Python',
    publisher: 'Microsoft',
    description: 'IntelliSense, linting, debugging, code navigation, code formatting, Jupyter notebook support',
    icon: undefined,
    downloads: 45000000,
    rating: 4.8,
    version: '2023.3.0',
    tags: ['Python', 'IntelliSense', 'Debugging'],
    installed: false,
    namespace: 'ms-python',
    isBuiltIn: false
  },
  {
    id: 'rust-lang.rust-analyzer',
    name: 'rust-analyzer',
    publisher: 'rust-lang',
    description: 'Rust language support for VS Code',
    icon: undefined,
    downloads: 12000000,
    rating: 4.6,
    version: '0.3.1685',
    tags: ['Rust', 'IntelliSense', 'Linting'],
    installed: false,
    namespace: 'rust-lang',
    isBuiltIn: false
  },
  {
    id: 'golang.go',
    name: 'Go',
    publisher: 'Go',
    description: 'Rich Go language support for Visual Studio Code',
    icon: undefined,
    downloads: 8500000,
    rating: 4.5,
    version: '0.39.1',
    tags: ['Go', 'IntelliSense', 'Debugging'],
    installed: false,
    namespace: 'golang',
    isBuiltIn: false
  }
];

interface Extension {
  id: string;
  name: string;
  publisher: string;
  description: string;
  icon?: string;
  downloads: number;
  rating: number;
  version: string;
  tags: string[];
  installed?: boolean;
  readme?: string;
  namespace?: string;
  isBuiltIn?: boolean;
}

export default function ExtensionsPanel({ onClose, onOpenExtension }: { onClose?: () => void; onOpenExtension?: (extensionId: string, extensionName: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExtension, setSelectedExtension] = useState<Extension | null>(null);
  const [installedOnly, setInstalledOnly] = useState(false);
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'popular' | 'installed' | 'recommended'>('popular');
  const [sortBy, setSortBy] = useState<'downloads' | 'rating' | 'recent'>('downloads');

  // Load popular extensions from OpenVSX on mount
  useEffect(() => {
    const loadExtensions = async () => {
      setLoading(true);
      try {
        const result = await getPopularExtensions(20);
        const mapped = mapOpenVSXExtensions(result);
        setExtensions(mapped);
      } catch (error) {
        console.error('Failed to load extensions:', error);
        // Fallback to built-in extensions
        setExtensions(BUILT_IN_EXTENSIONS);
      } finally {
        setLoading(false);
      }
    };
    loadExtensions();
  }, []);

  const handleSearch = useCallback(async () => {
    const query = searchQuery.toLowerCase().trim();
    
    // If searching for "kilo code", prioritize npm Intellisense
    if (query === 'kilo code' || query.includes('kilo')) {
      const results = BUILT_IN_EXTENSIONS.filter(ext => 
        ext.name.toLowerCase().includes('npm') || 
        ext.id.includes('npm-intellisense')
      );
      setExtensions(results);
      return;
    }
    
    if (!query) {
      setExtensions(BUILT_IN_EXTENSIONS);
      return;
    }
    
    // Search in built-in extensions first
    const localResults = BUILT_IN_EXTENSIONS.filter(ext =>
      ext.name.toLowerCase().includes(query) ||
      ext.description.toLowerCase().includes(query) ||
      ext.publisher.toLowerCase().includes(query) ||
      ext.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    if (localResults.length > 0) {
      setExtensions(localResults);
      return;
    }
    
    // Also search Open VSX
    setLoading(true);
    try {
      const result = await searchExtensions(query);
      const mapped = mapOpenVSXExtensions(result.extensions);
      setExtensions([...BUILT_IN_EXTENSIONS, ...mapped]);
    } catch (error) {
      console.error('Error searching:', error);
      setExtensions(BUILT_IN_EXTENSIONS);
    }
    setLoading(false);
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(timer);
  }, [handleSearch]);

  const mapOpenVSXExtensions = (openVSXExts: OpenVSXExtension[]): Extension[] => {
    return openVSXExts.map(ext => ({
      id: `${ext.namespace}.${ext.name}`,
      name: ext.displayName || ext.name,
      publisher: ext.publisher,
      description: ext.description,
      icon: ext.icon,
      downloads: ext.downloadCount,
      rating: ext.rating || 0,
      version: ext.version,
      tags: ext.tags,
      installed: false,
      namespace: ext.namespace,
      isBuiltIn: false
    }));
  };

  const handleExtensionClick = async (ext: Extension) => {
    // Open extension in new tab
    if (onOpenExtension) {
      onOpenExtension(ext.id, ext.name);
    }
    
    if (ext.isBuiltIn && ext.readme) {
      setSelectedExtension(ext);
      return;
    }
    
    if (!ext.namespace) return;
    
    setLoadingDetail(true);
    setSelectedExtension({ ...ext, readme: 'Loading...' });
    
    try {
      const detail = await getExtensionDetail(ext.namespace, ext.name);
      if (detail) {
        let readme = '';
        try {
          readme = await getExtensionReadme(ext.namespace, ext.name, detail.version) || '';
        } catch (e) {
          readme = `# ${detail.displayName || detail.name}\n\n${detail.description}\n\n*README not available*`;
        }
        
        setSelectedExtension({
          ...ext,
          version: detail.version,
          downloads: detail.downloadCount,
          rating: detail.rating || 0,
          tags: detail.tags,
          readme: readme
        });
      }
    } catch (error) {
      console.error('Error loading extension detail:', error);
      setSelectedExtension(ext);
    }
    
    setLoadingDetail(false);
  };

  const filteredExtensions = extensions.filter(ext => {
    // Filter by view mode
    if (viewMode === 'installed' && !ext.installed) return false;
    if (viewMode === 'recommended' && ext.installed) return false;
    return true;
  }).sort((a, b) => {
    // Sort by selected option
    if (sortBy === 'downloads') return b.downloads - a.downloads;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recent - would need date field
  });

  const handleInstall = (extId: string) => {
    setExtensions(prev => prev.map(ext => 
      ext.id === extId ? { ...ext, installed: true } : ext
    ));
    if (selectedExtension?.id === extId) {
      setSelectedExtension(prev => prev ? { ...prev, installed: true } : null);
    }
  };

  const handleUninstall = (extId: string) => {
    setExtensions(prev => prev.map(ext => 
      ext.id === extId ? { ...ext, installed: false } : ext
    ));
    if (selectedExtension?.id === extId) {
      setSelectedExtension(prev => prev ? { ...prev, installed: false } : null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#3c3c3c]">
        <h2 className="text-[#cccccc] font-medium text-sm">Extensions</h2>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setExtensions(BUILT_IN_EXTENSIONS)}
            className="p-1 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded" 
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          {onClose && (
            <button onClick={onClose} className="p-1 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded" title="Close">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#858585]" />
          <input
            type="text"
            placeholder="Search extensions in Marketplace"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2d2d2d] text-[#cccccc] text-sm pl-9 pr-3 py-2 rounded border border-[#3c3c3c] focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2 text-xs text-[#858585] cursor-pointer">
            <input 
              type="checkbox" 
              checked={installedOnly}
              onChange={(e) => setInstalledOnly(e.target.checked)}
              className="rounded bg-[#2d2d2d] border-[#3c3c3c]"
            />
            Show installed only
          </label>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 px-3 pb-2 border-b border-[#2d2d2d]">
        <button
          onClick={() => setViewMode('popular')}
          className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
            viewMode === 'popular'
              ? 'text-[#ffffff] border-blue-500'
              : 'text-[#858585] border-transparent hover:text-[#cccccc]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Popular
          </span>
        </button>
        <button
          onClick={() => setViewMode('installed')}
          className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
            viewMode === 'installed'
              ? 'text-[#ffffff] border-blue-500'
              : 'text-[#858585] border-transparent hover:text-[#cccccc]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Check className="w-3 h-3" />
            Installed
          </span>
        </button>
        <button
          onClick={() => setViewMode('recommended')}
          className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
            viewMode === 'recommended'
              ? 'text-[#ffffff] border-blue-500'
              : 'text-[#858585] border-transparent hover:text-[#cccccc]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <ThumbsUp className="w-3 h-3" />
            Recommended
          </span>
        </button>
        
        {/* Sort Dropdown */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[#858585] text-xs">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'downloads' | 'rating' | 'recent')}
            className="bg-[#2d2d2d] text-[#cccccc] text-xs px-2 py-1 rounded border border-[#3c3c3c] focus:outline-none"
          >
            <option value="downloads">Downloads</option>
            <option value="rating">Rating</option>
            <option value="recent">Recent</option>
          </select>
        </div>
      </div>

      {/* Popular Tags */}
      {!searchQuery && (
        <div className="px-3 pb-2">
          <div className="flex items-center gap-1 flex-wrap">
            <Tag className="w-3 h-3 text-[#858585]" />
            {POPULAR_TAGS.slice(0, 8).map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2 py-0.5 text-xs rounded ${
                  selectedTag === tag 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-[#2d2d2d] text-[#858585] hover:text-[#cccccc]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Extension List */}
      <div className="flex-1 overflow-y-auto">
        {!selectedExtension ? (
          <div className="p-2">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-[#858585] animate-spin" />
              </div>
            ) : filteredExtensions.length === 0 ? (
              <div className="text-center py-8 text-[#858585] text-sm">
                No extensions found
              </div>
            ) : (
              filteredExtensions.map((ext) => (
                <div
                  key={ext.id}
                  onClick={() => handleExtensionClick(ext)}
                  className="flex gap-3 p-3 rounded cursor-pointer hover:bg-[#2d2d2d] transition-colors"
                >
                  {/* Extension Icon */}
                  <div className="w-16 h-16 bg-[#0e639c] rounded flex items-center justify-center flex-shrink-0">
                    {ext.icon ? (
                      <img src={ext.icon} alt={ext.name} className="w-12 h-12 rounded" />
                    ) : (
                      <span className="text-white text-xl font-bold">{ext.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  
                  {/* Extension Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[#cccccc] text-sm font-medium truncate">{ext.name}</span>
                      {ext.installed && (
                        <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded">Installed</span>
                      )}
                      {ext.isBuiltIn && (
                        <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] rounded">Built-in</span>
                      )}
                    </div>
                    <span className="text-[#858585] text-xs">{ext.publisher}</span>
                    <p className="text-[#858585] text-xs mt-1 line-clamp-2">{ext.description}</p>
                    <div className="flex items-center gap-3 mt-1 text-[#858585] text-xs">
                      <span>{formatDownloadCount(ext.downloads)} downloads</span>
                      <span>⭐ {ext.rating.toFixed(1)}</span>
                      <span className="text-[#6e7681]">v{ext.version}</span>
                    </div>
                  </div>
                  
                  {/* Install Button */}
                  <div className="flex items-start">
                    {ext.installed ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleUninstall(ext.id); }}
                        className="px-2 py-1 text-xs text-[#858585] hover:text-[#cccccc] border border-[#3c3c3c] rounded hover:bg-[#2d2d2d]"
                      >
                        Uninstall
                      </button>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleInstall(ext.id); }}
                        className="px-2 py-1 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded"
                      >
                        Install
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Extension Detail View */
          <div className="p-4">
            {/* Back Button */}
            <button
              onClick={() => setSelectedExtension(null)}
              className="flex items-center gap-1 text-[#858585] hover:text-[#cccccc] text-sm mb-4"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Extensions
            </button>

            {/* Loading State */}
            {loadingDetail ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#858585] animate-spin" />
              </div>
            ) : (
              <>
                {/* Extension Header */}
                <div className="flex gap-4">
                  <div className="w-32 h-32 bg-[#0e639c] rounded flex items-center justify-center flex-shrink-0">
                    {selectedExtension.icon ? (
                      <img src={selectedExtension.icon} alt={selectedExtension.name} className="w-24 h-24 rounded" />
                    ) : (
                      <span className="text-white text-4xl font-bold">{selectedExtension.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-[#cccccc] text-xl font-medium">{selectedExtension.name}</h2>
                    <p className="text-[#858585] text-sm">{selectedExtension.publisher}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {selectedExtension.installed ? (
                        <button
                          onClick={() => handleUninstall(selectedExtension.id)}
                          className="px-3 py-1.5 text-sm text-[#858585] hover:text-[#cccccc] border border-[#3c3c3c] rounded hover:bg-[#2d2d2d]"
                        >
                          Uninstall
                        </button>
                      ) : (
                        <button
                          onClick={() => handleInstall(selectedExtension.id)}
                          className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                        >
                          Install
                        </button>
                      )}
                      <button className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Extension Stats */}
                <div className="flex items-center gap-6 mt-4 py-3 border-t border-b border-[#3c3c3c]">
                  <div>
                    <div className="text-[#858585] text-xs">Version</div>
                    <div className="text-[#cccccc] text-sm">{selectedExtension.version}</div>
                  </div>
                  <div>
                    <div className="text-[#858585] text-xs">Last Updated</div>
                    <div className="text-[#cccccc] text-sm">
                      {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#858585] text-xs">Downloads</div>
                    <div className="text-[#cccccc] text-sm">{formatDownloadCount(selectedExtension.downloads)}</div>
                  </div>
                  <div>
                    <div className="text-[#858585] text-xs">Rating</div>
                    <div className="text-[#cccccc] text-sm">⭐ {selectedExtension.rating.toFixed(1)}</div>
                  </div>
                </div>

                {/* Tags */}
                {selectedExtension.tags.length > 0 && (
                  <div className="mt-4">
                    <div className="text-[#858585] text-xs mb-2">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedExtension.tags.map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTag(tag)}
                          className="px-2 py-1 bg-[#2d2d2d] text-[#858585] text-xs rounded hover:text-[#cccccc]"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mt-4">
                  <h3 className="text-[#cccccc] text-sm font-medium mb-2">Description</h3>
                  <p className="text-[#858585] text-sm">{selectedExtension.description}</p>
                </div>

                {/* README Preview */}
                {selectedExtension.readme && (
                  <div className="mt-4">
                    <h3 className="text-[#cccccc] text-sm font-medium mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      README
                    </h3>
                    <div className="bg-[#252526] p-4 rounded text-[#858585] text-sm font-mono overflow-y-auto max-h-64">
                      <pre className="whitespace-pre-wrap">{selectedExtension.readme}</pre>
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#3c3c3c]">
                  <button className="flex items-center gap-1 text-[#858585] hover:text-[#cccccc] text-sm">
                    <ExternalLink className="w-4 h-4" />
                    View on Open VSX
                  </button>
                  <button className="flex items-center gap-1 text-[#858585] hover:text-[#cccccc] text-sm">
                    <Hammer className="w-4 h-4" />
                    Build Extension
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
