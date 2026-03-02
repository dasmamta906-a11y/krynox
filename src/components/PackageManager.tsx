import React, { useState } from 'react';
import { Package, X, Search, Plus, Trash2, RefreshCw, ExternalLink, ArrowDown, ArrowUp, Check } from 'lucide-react';

const mockPackages = [
  { name: 'react', version: '18.2.0', latest: '18.2.0', outdated: false, dev: false },
  { name: 'react-dom', version: '18.2.0', latest: '18.2.0', outdated: false, dev: false },
  { name: 'typescript', version: '5.0.4', latest: '5.3.3', outdated: true, dev: true },
  { name: '@types/react', version: '18.0.37', latest: '18.2.48', outdated: true, dev: true },
  { name: 'tailwindcss', version: '3.3.0', latest: '3.4.0', outdated: true, dev: true },
  { name: 'lucide-react', version: '0.263.1', latest: '0.309.0', outdated: true, dev: true },
  { name: 'monaco-editor', version: '0.44.0', latest: '0.45.0', outdated: true, dev: true },
  { name: 'xterm', version: '5.2.3', latest: '5.3.0', outdated: true, dev: true },
];

export default function PackageManager({ onClose }) {
  const [packages, setPackages] = useState(mockPackages);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('installed');
  const [installing, setInstalling] = useState(null);

  const filtered = packages.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const outdatedCount = packages.filter(p => p.outdated).length;

  const installPackage = (name) => {
    setInstalling(name);
    setTimeout(() => {
      setPackages(prev => prev.map(p => 
        p.name === name ? { ...p, version: p.latest, outdated: false } : p
      ));
      setInstalling(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-orange-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-orange-500/20">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-orange-500" />
          <span className="text-white font-semibold">Package Manager</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-700 rounded">
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex border-b border-orange-500/20">
        <button
          onClick={() => setActiveTab('installed')}
          className={`px-6 py-2 text-sm ${
            activeTab === 'installed' 
              ? 'text-white border-b-2 border-orange-500 bg-gray-800/50' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Installed ({packages.length})
        </button>
        <button
          onClick={() => setActiveTab('updates')}
          className={`px-6 py-2 text-sm flex items-center gap-2 ${
            activeTab === 'updates' 
              ? 'text-white border-b-2 border-orange-500 bg-gray-800/50' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Updates
          {outdatedCount > 0 && (
            <span className="px-1.5 py-0.5 bg-orange-600 text-white text-xs rounded-full">{outdatedCount}</span>
          )}
        </button>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search packages..."
            className="bg-transparent text-white text-sm outline-none flex-1"
          />
          <button className="px-2 py-1 bg-orange-600 hover:bg-orange-700 rounded text-white text-xs flex items-center gap-1">
            <Plus className="w-3 h-3" /> Install
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-400 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left">Package</th>
              <th className="px-4 py-2 text-right">Current</th>
              <th className="px-4 py-2 text-right">Latest</th>
              <th className="px-4 py-2 text-center">Type</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === 'updates' ? filtered.filter(p => p.outdated) : filtered).map(pkg => (
              <tr key={pkg.name} className="border-t border-gray-800 hover:bg-gray-800/50">
                <td className="px-4 py-3">
                  <div className="text-white font-medium">{pkg.name}</div>
                  {pkg.outdated && (
                    <div className="text-orange-400 text-xs flex items-center gap-1 mt-1">
                      <RefreshCw className="w-3 h-3" /> Update available
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-mono ${pkg.outdated ? 'text-gray-400' : 'text-gray-300'}`}>
                    {pkg.version}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="font-mono text-green-400">{pkg.latest}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    pkg.dev ? 'bg-purple-900/30 text-purple-400' : 'bg-blue-900/30 text-blue-400'
                  }`}>
                    {pkg.dev ? 'dev' : 'dep'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {pkg.outdated ? (
                    <button
                      onClick={() => installPackage(pkg.name)}
                      disabled={installing === pkg.name}
                      className="px-2 py-1 bg-orange-600 hover:bg-orange-700 rounded text-white text-xs flex items-center gap-1"
                    >
                      {installing === pkg.name ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )}
                      Update
                    </button>
                  ) : (
                    <Check className="w-4 h-4 text-green-400" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(activeTab === 'updates' && outdatedCount === 0) && (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">All packages up to date</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-orange-500/20 flex items-center justify-between text-sm text-gray-500">
        <div>
          {packages.length} packages • {outdatedCount} updates available
        </div>
        <button className="text-orange-400 hover:text-orange-300 flex items-center gap-1">
          <ExternalLink className="w-4 h-4" /> View in npm
        </button>
      </div>
    </div>
  );
}
