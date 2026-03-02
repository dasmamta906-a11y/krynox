import React, { useState } from 'react';
import { GitCompare, X, ChevronLeft, ChevronRight, Plus, Minus, RefreshCw } from 'lucide-react';

const mockDiff = [
  { line: 1, type: 'same', content: 'import React from "react";' },
  { line: 2, type: 'same', content: 'import { useState } from "react";' },
  { line: 3, type: 'same', content: '' },
  { line: 4, type: 'same', content: 'interface Props {' },
  { line: 5, type: 'removed', content: '  title: string;' },
  { line: 5, type: 'added', content: '  title?: string;' },
  { line: 6, type: 'same', content: '  count?: number;' },
  { line: 7, type: 'same', content: '}' },
  { line: 8, type: 'same', content: '' },
  { line: 9, type: 'removed', content: 'export function MyComponent(props: Props) {' },
  { line: 9, type: 'added', content: 'export const MyComponent: React.FC<Props> = (props) => {' },
  { line: 10, type: 'same', content: '  const [state, setState] = useState(0);' },
  { line: 11, type: 'same', content: '' },
  { line: 12, type: 'added', content: '  // TODO: Implement component' },
  { line: 13, type: 'same', content: '  return <div>{props.title}</div>;' },
  { line: 14, type: 'same', content: '}' },
];

const mockFiles = [
  { id: 1, name: 'src/App.tsx', left: 'main', right: 'feature' },
  { id: 2, name: 'src/components/Header.tsx', left: 'main', right: 'feature' },
  { id: 3, name: 'src/utils/api.ts', left: 'v1.0', right: 'v1.1' },
];

export default function DiffViewerPanel({ onClose }) {
  const [selectedFile, setSelectedFile] = useState(mockFiles[0]);
  const [viewMode, setViewMode] = useState<'split' | 'inline'>('split');

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-blue-500/20 w-[800px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20">
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-blue-500" />
          <span className="text-white font-semibold">Diff Viewer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-800 rounded overflow-hidden">
            <button 
              onClick={() => setViewMode('inline')}
              className={`px-3 py-1 text-xs ${viewMode === 'inline' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            >
              Inline
            </button>
            <button 
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 text-xs ${viewMode === 'split' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            >
              Split
            </button>
          </div>
          <button className="p-1 hover:bg-gray-700 rounded">
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex border-b border-blue-500/20">
        {mockFiles.map(file => (
          <button
            key={file.id}
            onClick={() => setSelectedFile(file)}
            className={`flex-1 px-4 py-2 text-sm text-left hover:bg-gray-800 ${
              selectedFile.id === file.id ? 'bg-gray-800 text-white' : 'text-gray-400'
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      <div className="flex text-xs text-gray-500 border-b border-blue-500/20">
        <div className="w-12 px-2 py-1 text-center border-r border-blue-500/20">{selectedFile.left}</div>
        <div className="flex-1 px-2 py-1">src/App.tsx</div>
        <div className="w-12 px-2 py-1 text-center border-l border-blue-500/20">{selectedFile.right}</div>
      </div>

      <div className="flex-1 overflow-auto font-mono text-sm">
        {viewMode === 'inline' ? (
          <div className="flex">
            <div className="flex-1">
              {mockDiff.map((line, i) => (
                <div 
                  key={i} 
                  className={`flex ${
                    line.type === 'removed' ? 'bg-red-900/30' : 
                    line.type === 'added' ? 'bg-green-900/30' : ''
                  }`}
                >
                  <span className="w-10 px-2 py-0.5 text-gray-500 text-right border-r border-gray-700 select-none">
                    {line.type === 'removed' ? '-' : line.type === 'added' ? '+' : line.line}
                  </span>
                  <span className={`flex-1 px-2 py-0.5 ${
                    line.type === 'removed' ? 'text-red-400' : 
                    line.type === 'added' ? 'text-green-400' : 'text-gray-300'
                  }`}>
                    {line.content}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="flex-1 border-r border-gray-700">
              {mockDiff.filter(l => l.type !== 'added').map((line, i) => (
                <div 
                  key={i} 
                  className={`flex ${line.type === 'removed' ? 'bg-red-900/30' : ''}`}
                >
                  <span className="w-10 px-2 py-0.5 text-gray-500 text-right border-r border-gray-700 select-none">
                    {line.line}
                  </span>
                  <span className={`flex-1 px-2 py-0.5 ${line.type === 'removed' ? 'text-red-400' : 'text-gray-300'}`}>
                    {line.content}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex-1">
              {mockDiff.filter(l => l.type !== 'removed').map((line, i) => (
                <div 
                  key={i} 
                  className={`flex ${line.type === 'added' ? 'bg-green-900/30' : ''}`}
                >
                  <span className="w-10 px-2 py-0.5 text-gray-500 text-right border-r border-gray-700 select-none">
                    {line.line}
                  </span>
                  <span className={`flex-1 px-2 py-0.5 ${line.type === 'added' ? 'text-green-400' : 'text-gray-300'}`}>
                    {line.content}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-t border-blue-500/20 text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Minus className="w-3 h-3 text-red-400" /> 2 removed
          </span>
          <span className="flex items-center gap-1">
            <Plus className="w-3 h-3 text-green-400" /> 2 added
          </span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-300">
            <ChevronLeft className="w-4 h-4 inline mr-1" /> Prev
          </button>
          <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-300">
            Next <ChevronRight className="w-4 h-4 inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
