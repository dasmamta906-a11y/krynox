import React, { useState } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  GitMerge, 
  Plus, 
  RefreshCw, 
  ChevronRight, 
  ChevronDown,
  Check,
  X,
  AlertCircle,
  Clock,
  User,
  FilePlus,
  FolderOpen
} from 'lucide-react';

// Mock Git data
const mockBranches = [
  { name: 'main', isCurrent: true, isRemote: false },
  { name: 'develop', isCurrent: false, isRemote: false },
  { name: 'feature/new-ui', isCurrent: false, isRemote: false },
  { name: 'bugfix/login', isCurrent: false, isRemote: false },
  { name: 'origin/main', isCurrent: false, isRemote: true },
  { name: 'origin/develop', isCurrent: false, isRemote: true },
];

const mockCommits = [
  { 
    hash: 'a1b2c3d', 
    message: 'feat: Add terminal integration panel', 
    author: 'Krynox User',
    time: '2 hours ago',
    filesChanged: 5
  },
  { 
    hash: 'e4f5g6h', 
    message: 'fix: Resolve file explorer bug', 
    author: 'Krynox User',
    time: '5 hours ago',
    filesChanged: 2
  },
  { 
    hash: 'i7j8k9l', 
    message: 'chore: Update dependencies', 
    author: 'Krynox User',
    time: '1 day ago',
    filesChanged: 8
  },
  { 
    hash: 'm0n1o2p', 
    message: 'docs: Add README documentation', 
    author: 'Krynox User',
    time: '2 days ago',
    filesChanged: 1
  },
];

const mockStagedChanges = [
  { path: 'src/App.jsx', status: 'M', isStaged: true },
  { path: 'src/components/TerminalPanel.tsx', status: 'A', isStaged: true },
];

const mockUnstagedChanges = [
  { path: 'src/components/EditorPanel.tsx', status: 'M', isStaged: false },
  { path: 'src/services/ai.ts', status: 'D', isStaged: false },
  { path: 'src/components/FileExplorer.tsx', status: 'M', isStaged: false },
];

const mockRemotes = [
  { name: 'origin', url: 'https://github.com/krynox/krynox-coder.git', branches: 12 },
];

export default function GitPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState<'changes' | 'commits' | 'branches' | 'pull'>('changes');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('main');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'M': return <span className="text-yellow-400">M</span>;
      case 'A': return <span className="text-green-400">A</span>;
      case 'D': return <span className="text-red-400">D</span>;
      case 'R': return <span className="text-purple-400">R</span>;
      default: return <span className="text-gray-400">{status}</span>;
    }
  };

  return (
    <div className="w-80 bg-[#0f0f0f] border-l border-purple-500/20 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-purple-500" />
          <span className="text-white font-semibold">Git</span>
        </div>
        <button 
          onClick={handleRefresh}
          className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Current Branch */}
      <div className="px-4 py-2 border-b border-purple-500/20 bg-[#1a1a1a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-green-400" />
            <span className="text-white text-sm font-medium">{selectedBranch}</span>
          </div>
          <button className="text-xs text-purple-400 hover:text-purple-300">Switch</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-purple-500/20">
        <button
          onClick={() => setActiveTab('changes')}
          className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'changes' 
              ? 'text-purple-400 border-b-2 border-purple-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Changes
        </button>
        <button
          onClick={() => setActiveTab('commits')}
          className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'commits' 
              ? 'text-purple-400 border-b-2 border-purple-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          History
        </button>
        <button
          onClick={() => setActiveTab('branches')}
          className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'branches' 
              ? 'text-purple-400 border-b-2 border-purple-500' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Branches
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Changes Tab */}
        {activeTab === 'changes' && (
          <div className="p-2">
            {/* Staged Changes */}
            <div className="mb-3">
              <div className="flex items-center gap-1 px-2 py-1 text-xs text-green-400 font-medium">
                <Check className="w-3 h-3" />
                Staged Changes ({mockStagedChanges.length})
              </div>
              {mockStagedChanges.map((file, i) => (
                <div key={i} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-800 rounded text-sm">
                  {getStatusIcon(file.status)}
                  <span className="text-gray-300 truncate">{file.path}</span>
                </div>
              ))}
              {mockStagedChanges.length > 0 && (
                <button className="w-full mt-2 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors">
                  Commit ({mockStagedChanges.length})
                </button>
              )}
            </div>

            {/* Unstaged Changes */}
            <div>
              <div className="flex items-center gap-1 px-2 py-1 text-xs text-yellow-400 font-medium">
                <AlertCircle className="w-3 h-3" />
                Unstaged Changes ({mockUnstagedChanges.length})
              </div>
              {mockUnstagedChanges.map((file, i) => (
                <div key={i} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-800 rounded text-sm">
                  {getStatusIcon(file.status)}
                  <span className="text-gray-300 truncate">{file.path}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors">
                Stage All
              </button>
              <button className="flex-1 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors">
                Discard
              </button>
            </div>
          </div>
        )}

        {/* Commits Tab */}
        {activeTab === 'commits' && (
          <div className="p-2">
            {mockCommits.map((commit, i) => (
              <div key={i} className="p-3 hover:bg-gray-800 rounded-lg mb-2 cursor-pointer border-l-2 border-transparent hover:border-purple-500">
                <div className="flex items-start gap-2">
                  <GitCommit className="w-4 h-4 text-purple-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{commit.message}</div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <span className="text-purple-400 font-mono">{commit.hash}</span>
                      <span>•</span>
                      <span>{commit.author}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {commit.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Branches Tab */}
        {activeTab === 'branches' && (
          <div className="p-2">
            {/* Remote */}
            <div className="mb-3">
              <div className="flex items-center gap-1 px-2 py-1 text-xs text-blue-400 font-medium">
                <FolderOpen className="w-3 h-3" />
                Remotes
              </div>
              {mockRemotes.map((remote, i) => (
                <div key={i} className="px-2 py-1.5">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <GitBranch className="w-4 h-4 text-blue-400" />
                    {remote.name}
                  </div>
                  <div className="text-xs text-gray-500 ml-6">{remote.url}</div>
                </div>
              ))}
            </div>

            {/* Local Branches */}
            <div>
              <div className="flex items-center gap-1 px-2 py-1 text-xs text-green-400 font-medium">
                <GitBranch className="w-3 h-3" />
                Local Branches
              </div>
              {mockBranches.filter(b => !b.isRemote).map((branch, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm cursor-pointer ${
                    branch.isCurrent ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-gray-800 text-gray-300'
                  }`}
                  onClick={() => setSelectedBranch(branch.name)}
                >
                  <GitBranch className="w-4 h-4" />
                  {branch.name}
                  {branch.isCurrent && <Check className="w-3 h-3 text-green-400 ml-auto" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-2 border-t border-purple-500/20">
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors">
            <GitPullRequest className="w-4 h-4" />
            Pull
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-colors">
            <GitPush className="w-4 h-4" />
            Push
          </button>
        </div>
      </div>
    </div>
  );
}

function GitPush(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>;
}
