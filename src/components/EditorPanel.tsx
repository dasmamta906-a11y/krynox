import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { X, Circle } from 'lucide-react';

interface EditorFile {
  name: string;
  path: string;
  content: string;
  language: string;
  isDirty: boolean;
}

interface EditorPanelProps {
  files: EditorFile[];
  activeFile: string;
  onFileSelect: (path: string) => void;
  onFileClose: (path: string) => void;
  onContentChange: (path: string, content: string) => void;
}

export function EditorPanel({ 
  files, 
  activeFile, 
  onFileSelect, 
  onFileClose,
  onContentChange 
}: EditorPanelProps) {
  const currentFile = files.find(f => f.path === activeFile);

  const getLanguage = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const langMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'json': 'json',
      'html': 'html',
      'css': 'css',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'md': 'markdown',
      'txt': 'plaintext',
    };
    return langMap[ext || ''] || 'plaintext';
  };

  if (files.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#1e1e1e]">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-xl font-medium text-[#cccccc] mb-2">No files open</h2>
          <p className="text-[#858585]">Open a file from the explorer to start editing</p>
          <div className="mt-4 text-[#858585] text-sm">
            <p>Ctrl+P to quick open</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e]">
      {/* Tab Bar */}
      <div className="h-9 bg-[#252526] flex items-center border-b border-[#1e1e1e] overflow-x-auto">
        {files.map((file) => (
          <div
            key={file.path}
            className={`flex items-center h-full px-3 min-w-[120px] max-w-[200px] cursor-pointer border-r border-[#1e1e1e] group ${
              file.path === activeFile
                ? 'bg-[#1e1e1e] border-t-2 border-t-[#007acc]'
                : 'bg-[#2d2d2d] hover:bg-[#2a2d2e]'
            }`}
            onClick={() => onFileSelect(file.path)}
          >
            {/* File Icon */}
            <span className="mr-2 text-sm">
              {file.language === 'javascript' && '🟨'}
              {file.language === 'typescript' && '🔷'}
              {file.language === 'python' && '🐍'}
              {file.language === 'json' && '📋'}
              {file.language === 'html' && '🌐'}
              {file.language === 'css' && '🎨'}
              {file.language === 'markdown' && '📝'}
              {!['javascript', 'typescript', 'python', 'json', 'html', 'css', 'markdown'].includes(file.language) && '📄'}
            </span>
            
            {/* File Name */}
            <span className="text-[#cccccc] text-sm truncate flex-1">{file.name}</span>
            
            {/* Dirty Indicator */}
            {file.isDirty && (
              <Circle className="w-2 h-2 fill-[#007acc] text-[#007acc] mr-2" />
            )}
            
            {/* Close Button */}
            <button
              className="opacity-0 group-hover:opacity-100 hover:bg-[#3c3c3c] rounded p-0.5 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onFileClose(file.path);
              }}
            >
              <X className="w-3 h-3 text-[#858585] hover:text-white" />
            </button>
          </div>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1">
        {currentFile && (
          <Editor
            height="100%"
            language={getLanguage(currentFile.name)}
            value={currentFile.content}
            theme="vs-dark"
            onChange={(value) => onContentChange(currentFile.path, value || '')}
            options={{
              fontSize: 14,
              fontFamily: "'Fira Code', 'Consolas', monospace",
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              renderWhitespace: 'selection',
              bracketPairColorization: { enabled: true },
              padding: { top: 10 },
            }}
          />
        )}
      </div>

      {/* Editor Footer */}
      {currentFile && (
        <div className="h-6 bg-[#007acc] flex items-center px-3 text-white text-xs justify-between">
          <div className="flex items-center gap-4">
            <span>Ln 1, Col 1</span>
            <span>UTF-8</span>
            <span>{currentFile.language.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Spaces: 2</span>
            <span>UTF-8</span>
          </div>
        </div>
      )}
    </div>
  );
}
