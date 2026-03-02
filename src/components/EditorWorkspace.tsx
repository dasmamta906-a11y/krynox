import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as monaco from 'monaco-editor';

// File interface for open files
interface OpenFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isDirty: boolean;
}

// File icon mapping based on extension
const getFileIcon = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const icons: Record<string, string> = {
    js: '📜',
    jsx: '⚛️',
    ts: '📘',
    tsx: '⚛️',
    json: '📋',
    html: '🌐',
    css: '🎨',
    scss: '🎨',
    less: '🎨',
    py: '🐍',
    rs: '🦀',
    go: '🔵',
    java: '☕',
    cpp: '⚙️',
    c: '⚙️',
    md: '📝',
    txt: '📄',
    yml: '⚙️',
    yaml: '⚙️',
    xml: '📰',
    sql: '🗃️',
    sh: '💻',
    bash: '💻',
    ps1: '💻',
    dockerfile: '🐳',
    gitignore: '📦',
    env: '🔐',
    lock: '🔒'
  };
  return icons[ext] || '📄';
};

// Get language from file extension
const getLanguage = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const languages: Record<string, string> = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    json: 'json',
    html: 'html',
    css: 'css',
    scss: 'scss',
    less: 'less',
    py: 'python',
    rs: 'rust',
    go: 'go',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    md: 'markdown',
    txt: 'plaintext',
    yml: 'yaml',
    yaml: 'yaml',
    xml: 'xml',
    sql: 'sql',
    sh: 'shell',
    bash: 'shell',
    ps1: 'powershell'
  };
  return languages[ext] || 'plaintext';
};

// Generate AI suggestions based on context
const generateAISuggestions = (currentLine: string, contextCode: string, languageId: number): { text: string }[] => {
  const suggestions: { text: string }[] = [];
  const trimmedLine = currentLine.trim();
  
  // TypeScript/JavaScript suggestions
  if (languageId === 3 || languageId === 4 || languageId === 299 || languageId === 300) {
    // Function suggestions
    if (trimmedLine.endsWith('()') || trimmedLine.includes('function')) {
      suggestions.push({ text: ' {\n  // TODO: implement\n}' });
    }
    // Console.log
    if (trimmedLine.startsWith('con') || trimmedLine.startsWith('cl')) {
      suggestions.push({ text: 'console.log()' });
    }
    // Return statement
    if (trimmedLine.startsWith('ret')) {
      suggestions.push({ text: 'return ' });
    }
    // Arrow function
    if (trimmedLine.endsWith('=>')) {
      suggestions.push({ text: ' {\n  \n}' });
    }
    // Import suggestions
    if (trimmedLine.startsWith('im')) {
      suggestions.push({ text: 'import { } from ""' });
    }
    // Class constructor
    if (trimmedLine.includes('class') && trimmedLine.includes('{')) {
      suggestions.push({ text: '\n  constructor() {\n    super();\n  }\n}' });
    }
    // React component
    if (trimmedLine.includes('const') && trimmedLine.includes('=') && !trimmedLine.includes('==')) {
      suggestions.push({ text: ' = () => {\n  return (\n    <div></div>\n  );\n};' });
    }
  }
  
  // Python suggestions (languageId 6)
  if (languageId === 6) {
    if (trimmedLine.startsWith('def')) {
      suggestions.push({ text: '():\n    pass' });
    }
    if (trimmedLine.startsWith('cla')) {
      suggestions.push({ text: ':\n    def __init__(self):\n        pass' });
    }
    if (trimmedLine.startsWith('pr')) {
      suggestions.push({ text: 'int()' });
    }
  }
  
  // CSS suggestions (languageId 7, 10, 12)
  if (languageId === 7 || languageId === 10 || languageId === 12) {
    if (trimmedLine.endsWith('{')) {
      suggestions.push({ text: '\n  color: ;\n  background: ;\n}' });
    }
    if (trimmedLine.startsWith('.')) {
      suggestions.push({ text: ' {\n  \n}' });
    }
  }
  
  // Generic suggestions based on common patterns
  if (suggestions.length === 0) {
    if (trimmedLine.includes('if') && trimmedLine.includes('{')) {
      suggestions.push({ text: '\n  \n}' });
    }
    if (trimmedLine.includes('for') && trimmedLine.includes('{')) {
      suggestions.push({ text: '\n  \n}' });
    }
    if (trimmedLine.includes('while') && trimmedLine.includes('{')) {
      suggestions.push({ text: '\n  \n}' });
    }
  }
  
  return suggestions.slice(0, 1); // Return max 1 suggestion
};

interface EditorWorkspaceProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  terminalHeight?: number;
  sidebarWidth?: number;
  onCursorChange?: (position: { line: number; column: number }) => void;
  onThinkingChange?: (thinking: boolean) => void;
}

export default function EditorWorkspace({ 
  initialContent = '', 
  onContentChange, 
  terminalHeight, 
  sidebarWidth,
  onCursorChange,
  onThinkingChange
}: EditorWorkspaceProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  
  // State for open files and active tab
  const [openFiles, setOpenFiles] = useState<OpenFile[]>([
    {
      id: '1',
      name: 'App.tsx',
      path: 'src/App.tsx',
      content: initialContent || `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="App">\n      <h1>Welcome to Krynox</h1>\n    </div>\n  );\n}\n\nexport default App;`,
      language: 'typescript',
      isDirty: false
    },
    {
      id: '2',
      name: 'index.js',
      path: 'src/index.js',
      content: `// Entry point for Krynox\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\nReactDOM.render(<App />, document.getElementById('root'));`,
      language: 'javascript',
      isDirty: false
    },
    {
      id: '3',
      name: 'styles.css',
      path: 'src/styles.css',
      content: `/* Krynox Styles */\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n}\n\n.App {\n  text-align: center;\n  padding: 20px;\n}`,
      language: 'css',
      isDirty: false
    }
  ]);
  
  const [activeFileId, setActiveFileId] = useState<string>('1');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; fileId: string } | null>(null);
  
  // Inline AI Command state
  const [inlineAICommand, setInlineAICommand] = useState<{ open: boolean; x: number; y: number }>({ open: false, x: 0, y: 0 });
  const [aiCommandInput, setAiCommandInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const commandInputRef = useRef<HTMLInputElement>(null);
  
  // Ghost Text state
  const ghostTextRef = useRef<monaco.languages.InlineCompletionsProvider | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const ghostTextTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get active file
  const activeFile = openFiles.find(f => f.id === activeFileId);
  
  // Initialize Monaco editor
  useEffect(() => {
    if (!editorRef.current) return;
    
    // Create editor instance
    const editor = monaco.editor.create(editorRef.current, {
      value: activeFile?.content || '',
      language: activeFile?.language || 'typescript',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: true },
      fontSize: 14,
      fontFamily: "'Fira Code', 'Consolas', 'Courier New', monospace",
      lineNumbers: 'on',
      roundedSelection: false,
      scrollBeyondLastLine: false,
      padding: { top: 10 },
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      wordWrap: 'off',
      tabSize: 2
    });
    
    monacoInstanceRef.current = editor;
    
    // Setup AI Ghost Text Provider
    const ghostTextProvider: any = {
      provideInlineCompletions: async (model, position, context) => {
        // Cancel any pending request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        
        // Get context - lines above and below cursor
        const lineNumber = position.lineNumber;
        const totalLines = model.getLineCount();
        
        // Get 20 lines above and 5 lines below
        const startLine = Math.max(1, lineNumber - 20);
        const endLine = Math.min(totalLines, lineNumber + 5);
        
        let contextCode = '';
        for (let i = startLine; i <= endLine; i++) {
          const lineContent = model.getLineContent(i);
          contextCode += lineContent + '\n';
        }
        
        // Get current line prefix (what user has typed)
        const currentLineContent = model.getLineContent(lineNumber);
        const currentLinePrefix = currentLineContent.substring(0, position.column - 1);
        
        // Only suggest if user has typed at least 3 characters
        if (currentLinePrefix.length < 3) {
          return { items: [] };
        }
        
        // Simulate AI suggestion (in production, this would call Gemini API)
        const langId = Number(model.getLanguageId());
        const suggestions = generateAISuggestions(currentLinePrefix, contextCode, langId);
        
        return {
          items: suggestions.map(suggestion => ({
            insertText: suggestion.text,
            range: new monaco.Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column
            ),
            command: undefined
          }))
        };
      }
    };
    
    // Register the provider
    monaco.languages.registerInlineCompletionsProvider('*', ghostTextProvider);
    ghostTextRef.current = ghostTextProvider;
    
    // Advanced ResizeObserver for smooth dragging (prevents jitter)
    if (editorRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        if (monacoInstanceRef.current) {
          // Use requestAnimationFrame for 60fps smooth resizing
          requestAnimationFrame(() => {
            monacoInstanceRef.current?.layout();
          });
        }
      });
      resizeObserverRef.current.observe(editorRef.current);
    }
    
    // Handle content changes
    editor.onDidChangeModelContent(() => {
      const content = editor.getValue();
      
      // Update file content and mark as dirty
      setOpenFiles(prev => prev.map(f => 
        f.id === activeFileId 
          ? { ...f, content, isDirty: true }
          : f
      ));
      
      // Notify parent of content change
      if (onContentChange) {
        onContentChange(content);
      }
    });
    
    // Handle cursor position changes - sync with StatusBar
    editor.onDidChangeCursorPosition((e) => {
      if (onCursorChange) {
        onCursorChange({
          line: e.position.lineNumber,
          column: e.position.column
        });
      }
    });
    
    return () => {
      editor.dispose();
      resizeObserverRef.current?.disconnect();
    };
  }, []);
  
  // Force layout update when terminal or sidebar resize
  useEffect(() => {
    if (monacoInstanceRef.current) {
      requestAnimationFrame(() => {
        monacoInstanceRef.current?.layout();
      });
    }
  }, [terminalHeight, sidebarWidth]);
  useEffect(() => {
    if (!monacoInstanceRef.current || !activeFile) return;
    
    const model = monaco.editor.createModel(
      activeFile.content,
      activeFile.language
    );
    
    monacoInstanceRef.current.setModel(model);
    
    return () => {
      model.dispose();
    };
  }, [activeFileId, activeFile?.language]);
  
  // Switch to a different tab
  const handleTabClick = useCallback((fileId: string) => {
    setActiveFileId(fileId);
  }, []);
  
  // Close a tab
  const handleCloseTab = useCallback((e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    
    const fileIndex = openFiles.findIndex(f => f.id === fileId);
    const newFiles = openFiles.filter(f => f.id !== fileId);
    
    // If closing active file, switch to adjacent tab
    if (fileId === activeFileId && newFiles.length > 0) {
      const newIndex = fileIndex === 0 ? 0 : fileIndex - 1;
      setActiveFileId(newFiles[newIndex].id);
    }
    
    setOpenFiles(newFiles);
  }, [activeFileId, openFiles]);
  
  // Context menu handlers
  const handleContextMenu = useCallback((e: React.MouseEvent, fileId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, fileId });
  }, []);
  
  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);
  
  const handleCloseAll = useCallback(() => {
    if (activeFile) {
      setOpenFiles([activeFile]);
    }
    closeContextMenu();
  }, [activeFile, closeContextMenu]);
  
  const handleCloseOthers = useCallback(() => {
    if (contextMenu) {
      setOpenFiles(openFiles.filter(f => f.id === contextMenu.fileId));
      setActiveFileId(contextMenu.fileId);
    }
    closeContextMenu();
  }, [contextMenu, openFiles, closeContextMenu]);
  
  // Handle click outside context menu
  useEffect(() => {
    const handleClick = () => closeContextMenu();
    if (contextMenu) {
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, [contextMenu, closeContextMenu]);
  
  // Save file (mark as not dirty)
  const handleSave = useCallback(() => {
    setOpenFiles(prev => prev.map(f => 
      f.id === activeFileId 
        ? { ...f, isDirty: false }
        : f
    ));
  }, [activeFileId]);
  
  // New file
  const handleNewFile = useCallback(() => {
    const newId = String(Date.now());
    const newFile: OpenFile = {
      id: newId,
      name: 'untitled.js',
      path: 'untitled.js',
      content: '',
      language: 'javascript',
      isDirty: true
    };
    setOpenFiles([...openFiles, newFile]);
    setActiveFileId(newId);
  }, [openFiles]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        handleNewFile();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
        e.preventDefault();
        if (openFiles.length > 1) {
          handleCloseTab(e as any, activeFileId);
        }
      }
      // Ctrl+I for Inline AI Command
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        openAICommandAtCursor();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, handleNewFile, openFiles, activeFileId]);
  
  // Open AI Command at cursor position
  const openAICommandAtCursor = useCallback(() => {
    if (!monacoInstanceRef.current) return;
    
    const position = monacoInstanceRef.current.getPosition();
    if (position) {
      const coordinates = monacoInstanceRef.current.getScrolledVisiblePosition({
        lineNumber: position.lineNumber,
        column: position.column
      });
      
      if (coordinates) {
        const editorDom = monacoInstanceRef.current.getDomNode();
        if (editorDom) {
          const rect = editorDom.getBoundingClientRect();
          const scrollTop = monacoInstanceRef.current.getScrollTop();
          const scrollLeft = monacoInstanceRef.current.getScrollLeft();
          
          const x = rect.left + coordinates.left - scrollLeft;
          const y = rect.top + coordinates.top - scrollTop + 25;
          
          setInlineAICommand({ open: true, x, y });
          setAiCommandInput('');
          
          setTimeout(() => commandInputRef.current?.focus(), 50);
        }
      }
    }
  }, []);
  
  // Execute AI Command
  const executeAICommand = useCallback(async () => {
    if (!aiCommandInput.trim() || !monacoInstanceRef.current) return;
    
    setAiLoading(true);
    onThinkingChange?.(true);
    
    try {
      const editor = monacoInstanceRef.current;
      const model = editor.getModel();
      
      if (model && editor) {
        const position = editor.getPosition();
        if (position) {
          // Get context - code around cursor (30 lines)
          const startLine = Math.max(1, position.lineNumber - 30);
          const contextCode = model.getValueInRange({
            startLineNumber: startLine,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          });
          
          // Generate response based on command
          let response = '';
          const cmd = aiCommandInput.toLowerCase();
          
          if (cmd.includes('add') && cmd.includes('error')) {
            response = 'try {\n  // existing code\n} catch (error) {\n  console.error(error);\n}';
          } else if (cmd.includes('create') || cmd.includes('make')) {
            if (cmd.includes('function')) {
              response = 'function newFunction() {\n  // TODO: implement\n}';
            } else if (cmd.includes('class')) {
              response = 'class NewClass {\n  constructor() {\n    // TODO\n  }\n}';
            } else if (cmd.includes('form') || cmd.includes('login')) {
              response = '<form onSubmit={handleSubmit}>\n  <input type="text" placeholder="Username" />\n  <input type="password" placeholder="Password" />\n  <button type="submit">Login</button>\n</form>';
            } else {
              response = '// Created: ' + aiCommandInput;
            }
          } else if (cmd.includes('fix') || cmd.includes('bug')) {
            response = '// Fix: Check for null/undefined values\nif (value !== null && value !== undefined) {\n  // proceed\n}';
          } else if (cmd.includes('comment')) {
            response = '// ' + aiCommandInput.replace(/comment/i, '').trim();
          } else {
            response = '// Processed: ' + aiCommandInput;
          }
          
          // Insert response
          const newPos = editor.getPosition();
          if (newPos) {
            editor.executeEdits('krynox-ai', [{
              range: new monaco.Range(
                newPos.lineNumber,
                newPos.column,
                newPos.lineNumber,
                newPos.column
              ),
              text: '\n' + response
            }]);
          }
        }
      }
    } catch (error) {
      console.error('AI Command Error:', error);
    } finally {
      setAiLoading(false);
      onThinkingChange?.(false);
      setInlineAICommand({ open: false, x: 0, y: 0 });
    }
  }, [aiCommandInput, onThinkingChange]);
  
  // Get breadcrumb path
  const breadcrumbs = activeFile?.path.split(/[/\\]/).filter(Boolean) || [];
  
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* 1. TABS BAR */}
      <div className="flex bg-[#252526] overflow-x-auto no-scrollbar border-b border-[#3c3c3c]">
        {openFiles.map((file) => (
          <div
            key={file.id}
            onClick={() => handleTabClick(file.id)}
            onContextMenu={(e) => handleContextMenu(e, file.id)}
            className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-sm min-w-[120px] max-w-[200px] border-r border-[#1e1e1e] group
              ${file.id === activeFileId 
                ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' 
                : 'text-[#858585] hover:bg-[#2b2b2b] border-t-2 border-t-transparent'}`}
          >
            <span className="text-xs">{getFileIcon(file.name)}</span>
            <span className="truncate flex-1">{file.name}</span>
            
            {/* Dirty indicator */}
            {file.isDirty && (
              <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" title="Unsaved changes" />
            )}
            
            {/* Close button */}
            <button
              onClick={(e) => handleCloseTab(e, file.id)}
              className={`opacity-0 group-hover:opacity-100 text-[#858585] hover:text-white p-0.5 rounded 
                ${file.id === activeFileId ? 'opacity-100' : ''}`}
              title="Close"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        
        {/* New tab button */}
        <button
          onClick={handleNewFile}
          className="flex items-center justify-center w-8 text-[#858585] hover:text-white hover:bg-[#2b2b2b]"
          title="New File"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
      
      {/* 2. BREADCRUMBS */}
      {activeFile && (
        <div className="px-4 py-1.5 text-[11px] text-[#858585] bg-[#1e1e1e] flex items-center gap-1 border-b border-[#2d2d2d]">
          {breadcrumbs.map((part, index) => (
            <React.Fragment key={index}>
              <span 
                className="hover:text-[#cccccc] cursor-pointer transition-colors"
                onClick={() => console.log('Navigate to:', part)}
              >
                {part}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span className="text-[#5a5a5a] mx-0.5">›</span>
              )}
            </React.Fragment>
          ))}
          
          {/* Language indicator */}
          <span className="ml-auto text-[#6e7681] capitalize">
            {activeFile.language}
          </span>
        </div>
      )}
      
      {/* 3. MONACO EDITOR */}
      <div 
        ref={editorRef} 
        className="flex-1 w-full"
        style={{ minHeight: '200px' }}
      />
      
      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-[#252526] border border-[#3c3c3c] rounded shadow-lg py-1 z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={handleCloseAll}
            className="w-full px-4 py-1.5 text-left text-sm text-[#cccccc] hover:bg-[#094771]"
          >
            Close All
          </button>
          <button
            onClick={handleCloseOthers}
            className="w-full px-4 py-1.5 text-left text-sm text-[#cccccc] hover:bg-[#094771]"
          >
            Close Others
          </button>
          <div className="border-t border-[#3c3c3c] my-1" />
          <button
            onClick={closeContextMenu}
            className="w-full px-4 py-1.5 text-left text-sm text-[#cccccc] hover:bg-[#094771]"
          >
            Reveal in Explorer
          </button>
        </div>
      )}
      
      {/* Inline AI Command Bar (Ctrl+I) */}
      {inlineAICommand.open && (
        <div
          style={{
            position: 'fixed',
            left: inlineAICommand.x,
            top: inlineAICommand.y,
            zIndex: 1000,
            backgroundColor: '#1e1e1e',
            border: '2px solid #007acc',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 20px rgba(0, 122, 204, 0.4)',
            minWidth: '320px',
            maxWidth: '500px',
            fontFamily: "'Fira Code', 'Consolas', monospace",
          }}
        >
          <div style={{
            color: '#007acc',
            fontSize: '12px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ fontSize: '14px' }}>🤖</span>
            <span>Krynox AI Command</span>
            {aiLoading && <span style={{ color: '#4ec9b0' }}>Thinking...</span>}
          </div>
          
          <input
            ref={commandInputRef}
            type="text"
            value={aiCommandInput}
            onChange={(e) => setAiCommandInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !aiLoading) {
                executeAICommand();
              }
              if (e.key === 'Escape') {
                setInlineAICommand({ open: false, x: 0, y: 0 });
              }
            }}
            placeholder="Describe what you want to do..."
            disabled={aiLoading}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: '#2d2d2d',
              border: '1px solid #3c3c3c',
              borderRadius: '4px',
              color: '#d4d4d4',
              fontSize: '14px',
              fontFamily: 'inherit',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          
          <div style={{
            marginTop: '8px',
            fontSize: '11px',
            color: '#808080',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>Try: "add error handling" or "create function"</span>
          </div>
        </div>
      )}
    </div>
  );
}
