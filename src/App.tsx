import React, { useState, useRef, useEffect, useCallback } from 'react';
import CursorTopBar from './components/CursorTopBar';
import BottomPanel from './components/BottomPanel';
import ExtensionsPanel from './components/ExtensionsPanel';
import EditorWorkspace from './components/EditorWorkspace';
import KrynoxLayout from './components/KrynoxLayout';
import LicensePanel from './components/LicensePanel';
import * as monaco from 'monaco-editor';

// Define hover data for common JavaScript/TypeScript functions
const hoverData: Record<string, { 
  signature: string; 
  description: string; 
  example?: string;
  docs?: string;
}> = {
  // Console methods
  'console.log': {
    signature: 'console.log(...args: any[]): void',
    description: 'Outputs a message to the console with a newline.',
    example: "console.log('Hello, World!');",
    docs: 'MDN: The Console method log() outputs a message to the web console.'
  },
  'console.error': {
    signature: 'console.error(...args: any[]): void',
    description: 'Outputs an error message to the console.',
    example: "console.error('Something went wrong!');"
  },
  'console.warn': {
    signature: 'console.warn(...args: any[]): void',
    description: 'Outputs a warning message to the console.',
    example: "console.warn('Warning: Deprecated!');"
  },
  'console.info': {
    signature: 'console.info(...args: any[]): void',
    description: 'Outputs an informational message to the console.',
    example: "console.info('Information');"
  },
  // Array methods
  'map': {
    signature: 'Array<T>.map(callback: (element: T, index: number) => U): U[]',
    description: 'Creates a new array with the results of calling a function on every element.',
    example: "const doubled = [1, 2, 3].map(x => x * 2);",
    docs: 'MDN: The map() method creates a new array populated with the results of calling a function on every element.'
  },
  'filter': {
    signature: 'Array<T>.filter(predicate: (value: T) => boolean): T[]',
    description: 'Creates a new array with elements that pass a test.',
    example: "const evens = [1, 2, 3, 4].filter(x => x % 2 === 0);"
  },
  'reduce': {
    signature: 'Array<T>.reduce(callback: (acc: U, val: T) => U, initial: U): U',
    description: 'Reduces array to a single value.',
    example: "const sum = [1, 2, 3].reduce((a, b) => a + b, 0);"
  },
  'forEach': {
    signature: 'Array<T>.forEach(callback: (value: T) => void): void',
    description: 'Executes a function for each array element.',
    example: "[1, 2, 3].forEach(x => console.log(x));"
  },
  'find': {
    signature: 'Array<T>.find(predicate: (value: T) => boolean): T | undefined',
    description: 'Returns the first element that passes a test.',
    example: "const found = [1, 2, 3].find(x => x > 1);"
  },
  'includes': {
    signature: 'Array<T>.includes(searchElement: T): boolean',
    description: 'Checks if array contains an element.',
    example: "[1, 2, 3].includes(2); // true"
  },
  'slice': {
    signature: 'Array<T>.slice(start?: number, end?: number): T[]',
    description: 'Returns a shallow copy of a portion of an array.',
    example: "[1, 2, 3, 4].slice(1, 3); // [2, 3]"
  },
  'splice': {
    signature: 'Array<T>.splice(start: number, deleteCount?: number): T[]',
    description: 'Changes array by removing/adding elements.',
    example: "const arr = [1, 2, 3]; arr.splice(1, 0, 4); // [1, 4, 2, 3]"
  },
  // String methods
  'split': {
    signature: 'String.prototype.split(separator: string): string[]',
    description: 'Splits string into an array of substrings.',
    example: "'hello world'.split(' '); // ['hello', 'world']"
  },
  'trim': {
    signature: 'String.prototype.trim(): string',
    description: 'Removes whitespace from both ends.',
    example: "'  hello  '.trim(); // 'hello'"
  },
  'replace': {
    signature: 'String.prototype.replace(searchValue: string, replaceValue: string): string',
    description: 'Replaces text in a string.',
    example: "'hello'.replace('world', 'there');"
  },
  'toUpperCase': {
    signature: 'String.prototype.toUpperCase(): string',
    description: 'Converts string to uppercase.',
    example: "'hello'.toUpperCase(); // 'HELLO'"
  },
  'toLowerCase': {
    signature: 'String.prototype.toLowerCase(): string',
    description: 'Converts string to lowercase.',
    example: "'HELLO'.toLowerCase(); // 'hello'"
  },
  // Object methods
  'Object.keys': {
    signature: 'Object.keys(obj: object): string[]',
    description: 'Returns array of object keys.',
    example: "Object.keys({a: 1, b: 2}); // ['a', 'b']"
  },
  'Object.values': {
    signature: 'Object.values(obj: object): any[]',
    description: 'Returns array of object values.',
    example: "Object.values({a: 1, b: 2}); // [1, 2]"
  },
  'Object.entries': {
    signature: 'Object.entries(obj: object): [string, any][]',
    description: 'Returns array of key-value pairs.',
    example: "Object.entries({a: 1}); // [['a', 1]]"
  },
  // React methods
  'useState': {
    signature: 'function useState<T>(initialState: T): [T, (newState: T) => void]',
    description: 'React hook for managing state in functional components.',
    example: "const [count, setCount] = useState(0);"
  },
  'useEffect': {
    signature: 'function useEffect(effect: () => void, deps?: any[]): void',
    description: 'React hook for side effects in functional components.',
    example: "useEffect(() => { console.log('mounted'); }, []);"
  },
  'useRef': {
    signature: 'function useRef<T>(initialValue: T): { current: T }',
    description: 'React hook for persisting values across renders.',
    example: "const inputRef = useRef<HTMLInputElement>(null);"
  },
  'useCallback': {
    signature: 'function useCallback<T>(fn: T, deps: any[]): T',
    description: 'React hook for memoizing callbacks.',
    example: "const handleClick = useCallback(() => {}, [deps]);"
  },
  'useMemo': {
    signature: 'function useMemo<T>(factory: () => T, deps: any[]): T',
    description: 'React hook for memoizing computed values.',
    example: "const value = useMemo(() => compute(), [deps]);"
  },
  // Common functions
  'setTimeout': {
    signature: 'setTimeout(callback: () => void, ms: number): number',
    description: 'Executes function after specified delay.',
    example: "setTimeout(() => console.log('delayed'), 1000);"
  },
  'setInterval': {
    signature: 'setInterval(callback: () => void, ms: number): number',
    description: 'Executes function at specified intervals.',
    example: "const id = setInterval(() => {}, 1000);"
  },
  'fetch': {
    signature: 'fetch(url: string, options?: RequestInit): Promise<Response>',
    description: 'Fetch API for making HTTP requests.',
    example: "fetch('/api/data').then(r => r.json());"
  },
  'JSON.parse': {
    signature: 'JSON.parse(text: string): any',
    description: 'Parses JSON string to object.',
    example: "JSON.parse('{\"x\": 1}'); // {x: 1}"
  },
  'JSON.stringify': {
    signature: 'JSON.stringify(value: any): string',
    description: 'Converts object to JSON string.',
    example: "JSON.stringify({x: 1}); // '{\"x\":1}'"
  },
  // Math functions
  'Math.abs': {
    signature: 'Math.abs(x: number): number',
    description: 'Returns absolute value of a number.',
    example: "Math.abs(-5); // 5"
  },
  'Math.floor': {
    signature: 'Math.floor(x: number): number',
    description: 'Rounds down to nearest integer.',
    example: "Math.floor(4.9); // 4"
  },
  'Math.ceil': {
    signature: 'Math.ceil(x: number): number',
    description: 'Rounds up to nearest integer.',
    example: "Math.ceil(4.1); // 5"
  },
  'Math.round': {
    signature: 'Math.round(x: number): number',
    description: 'Rounds to nearest integer.',
    example: "Math.round(4.5); // 5"
  },
  'Math.random': {
    signature: 'Math.random(): number',
    description: 'Returns random number between 0 and 1.',
    example: "Math.random(); // 0.123..."
  },
};

type SidebarView = 'explorer' | 'extensions' | 'search' | 'git' | 'debug';

// Tab types for editor tabs
type TabType = 'editor' | 'extension' | 'settings';

interface Tab {
  id: string;
  type: TabType;
  title: string;
  icon?: string;
  extensionId?: string;
}

export default function App() {
  // License check
  const [licenseKey, setLicenseKey] = useState<string>(() => {
    return localStorage.getItem('krynox_license_key') || '';
  });
  const [isLicenseValid, setIsLicenseValid] = useState<boolean>(() => {
    return localStorage.getItem('krynox_license_valid') === 'true';
  });

  const handleLicenseValid = useCallback(() => {
    setIsLicenseValid(true);
  }, []);

  // Show license panel if not valid
  if (!isLicenseValid) {
    return <LicensePanel onLicenseValid={handleLicenseValid} currentLicense={licenseKey || undefined} />;
  }

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [leftSidebarView, setLeftSidebarView] = useState<SidebarView>('extensions');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [bottomPanelOpen, setBottomPanelOpen] = useState(true);
  const [bottomPanelHeight, setBottomPanelHeight] = useState(250);
  
  // Tab management state
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | undefined>(undefined);
  
  // Tab handlers
  const handleOpenTab = useCallback((tab: Tab) => {
    setTabs(prev => {
      const existing = prev.find(t => t.id === tab.id);
      if (existing) {
        setActiveTabId(tab.id);
        return prev;
      }
      setActiveTabId(tab.id);
      return [...prev, tab];
    });
  }, []);
  
  const handleCloseTab = useCallback((tabId: string) => {
    setTabs(prev => {
      const newTabs = prev.filter(t => t.id !== tabId);
      if (activeTabId === tabId && newTabs.length > 0) {
        setActiveTabId(newTabs[newTabs.length - 1].id);
      }
      return newTabs;
    });
  }, [activeTabId]);
  
  const handleOpenExtension = useCallback((extensionId: string, extensionName: string) => {
    const tab: Tab = {
      id: `ext-${extensionId}`,
      type: 'extension',
      title: extensionName,
      extensionId
    };
    handleOpenTab(tab);
  }, [handleOpenTab]);
  
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // Dummy handlers for editor actions (now handled by EditorWorkspace)

  // Sample code to display
  const sampleCode = `// Hover over any function to see its documentation!
// Try: console.log, map, filter, useState, fetch, etc.

function greet(name) {
  return \`Hello, \${name}!\`;
}

const numbers = [1, 2, 3, 4, 5];

// Array methods - hover to see docs
const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((a, b) => a + b, 0);

// React hooks
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);
  
  return <div>{count}</div>;
}

// Console methods
console.log('Hello World!');
console.error('Error message');
console.warn('Warning');

// Async operations
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data));

// Object methods
const obj = { name: 'John', age: 30 };
console.log(Object.keys(obj));
console.log(Object.values(obj));
`;

  useEffect(() => {
    if (editorRef.current && !editorInstanceRef.current) {
      // Create Monaco Editor
      editorInstanceRef.current = monaco.editor.create(editorRef.current, {
        value: sampleCode,
        language: 'javascript',
        theme: 'vs-dark',
        fontSize: 14,
        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
        minimap: { enabled: true },
        automaticLayout: true,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        padding: { top: 10 }
      });

      // Register Hover Provider
      monaco.languages.registerHoverProvider('javascript', {
        provideHover: (model, position) => {
          const word = model.getWordAtPosition(position);
          
          if (word && hoverData[word.word]) {
            const data = hoverData[word.word];
            
            // Build markdown content
            let markdown = `**${data.signature}**\n\n`;
            markdown += `${data.description}\n\n`;
            
            if (data.example) {
              markdown += `**Example:**\n\`\`\`javascript\n${data.example}\n\`\`\`\n\n`;
            }
            
            if (data.docs) {
              markdown += `_${data.docs}_`;
            }
            
            return {
              range: new monaco.Range(
                position.lineNumber,
                word.startColumn,
                position.lineNumber,
                word.endColumn
              ),
              contents: [
                { value: markdown }
              ]
            };
          }
          
          return null;
        }
      });

      // Also register for TypeScript
      monaco.languages.registerHoverProvider('typescript', {
        provideHover: (model, position) => {
          const word = model.getWordAtPosition(position);
          
          if (word && hoverData[word.word]) {
            const data = hoverData[word.word];
            
            let markdown = `**${data.signature}**\n\n`;
            markdown += `${data.description}\n\n`;
            
            if (data.example) {
              markdown += `**Example:**\n\`\`\`typescript\n${data.example}\n\`\`\`\n\n`;
            }
            
            if (data.docs) {
              markdown += `_${data.docs}_`;
            }
            
            return {
              range: new monaco.Range(
                position.lineNumber,
                word.startColumn,
                position.lineNumber,
                word.endColumn
              ),
              contents: [
                { value: markdown }
              ]
            };
          }
          
          return null;
        }
      });
    }

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
        editorInstanceRef.current = null;
      }
    };
  }, []);

  // Menu action handlers
  const handleOpenSearch = () => {
    console.log('Opening search/command palette...');
    setCommandPaletteOpen(true);
  };

  const handleNewFile = () => {
    console.log('Creating new file...');
  };

  const handleNewWindow = () => {
    console.log('Opening new window...');
  };

  const handleOpenFile = () => {
    console.log('Opening file...');
  };

  const handleOpenFolder = () => {
    console.log('Opening folder...');
  };

  const handleSave = () => {
    if (editorInstanceRef.current) {
      console.log('Saving:', editorInstanceRef.current.getValue().substring(0, 50));
    }
  };

  const handleSaveAs = () => {
    console.log('Saving file as...');
  };

  const handleSaveAll = () => {
    console.log('Saving all files...');
  };

  const handleUndo = () => {
    editorInstanceRef.current?.trigger('keyboard', 'undo', null);
  };

  const handleRedo = () => {
    editorInstanceRef.current?.trigger('keyboard', 'redo', null);
  };

  const handleCut = () => {
    editorInstanceRef.current?.trigger('keyboard', 'editor.action.clipboardCutAction', null);
  };

  const handleCopy = () => {
    editorInstanceRef.current?.trigger('keyboard', 'editor.action.clipboardCopyAction', null);
  };

  const handlePaste = () => {
    editorInstanceRef.current?.trigger('keyboard', 'editor.action.clipboardPasteAction', null);
  };

  const handleFind = () => {
    editorInstanceRef.current?.trigger('keyboard', 'actions.find', null);
  };

  const handleReplace = () => {
    editorInstanceRef.current?.trigger('keyboard', 'editor.action.startFindReplaceAction', null);
  };

  const handleSelectAll = () => {
    editorInstanceRef.current?.trigger('keyboard', 'editor.action.selectAll', null);
  };

  const handleToggleLeftSidebar = () => {
    console.log('Toggle left sidebar');
    // Toggle between different views
    const views: SidebarView[] = ['explorer', 'search', 'git', 'debug', 'extensions'];
    const currentIndex = views.indexOf(leftSidebarView);
    const nextIndex = (currentIndex + 1) % views.length;
    setLeftSidebarView(views[nextIndex]);
  };

  const handleToggleRightSidebar = () => {
    console.log('Toggle right sidebar/AI');
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const handleToggleBottomPanel = () => {
    console.log('Toggle bottom panel');
    setBottomPanelOpen(!bottomPanelOpen);
  };

  const handleToggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const handleGoToFile = () => {
    console.log('Go to file...');
  };

  const handleGoToSymbol = () => {
    console.log('Go to symbol...');
  };

  const handleGoToDefinition = () => {
    console.log('Go to definition...');
  };

  const handleGoBack = () => {
    console.log('Go back');
  };

  const handleGoForward = () => {
    console.log('Go forward');
  };

  const handleStartDebugging = () => {
    console.log('Start debugging');
  };

  const handleRunWithoutDebug = () => {
    console.log('Run without debugging');
  };

  const handleNewTerminal = () => {
    console.log('New terminal');
    setBottomPanelOpen(true);
  };

  const handleSplitTerminal = () => {
    console.log('Split terminal');
  };

  const handleExtensions = () => {
    console.log('Open extensions marketplace');
    setLeftSidebarView('extensions');
  };

  const handleAiChat = () => {
    console.log('Open AI chat');
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const handleSwitchAiModel = () => {
    console.log('Switch AI model');
  };

  const handleCheckUpdates = () => {
    console.log('Check for updates');
  };

  const handleAbout = () => {
    console.log('About Krynox');
  };

  const handleKeyboardShortcuts = () => {
    console.log('Keyboard shortcuts');
  };

  const handleSettings = () => {
    console.log('Open settings');
  };

  const handleColorTheme = () => {
    console.log('Open color theme');
  };

  const handleExit = () => {
    console.log('Exit application');
  };

  const handleBottomPanelHeightChange = (height: number) => {
    setBottomPanelHeight(height);
  };


  return (
    <div className="h-screen w-screen flex flex-col bg-[#1e1e1e] overflow-hidden">
      {/* Krynox Top Bar with Full Menu System and Layout Controls */}
      <CursorTopBar 
        onOpenSearch={handleOpenSearch}
        onNewFile={handleNewFile}
        onNewWindow={handleNewWindow}
        onOpenFile={handleOpenFile}
        onOpenFolder={handleOpenFolder}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        onSaveAll={handleSaveAll}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onCut={handleCut}
        onCopy={handleCopy}
        onPaste={handlePaste}
        onFind={handleFind}
        onReplace={handleReplace}
        onSelectAll={handleSelectAll}
        onToggleLeftSidebar={handleToggleLeftSidebar}
        onToggleRightSidebar={handleToggleRightSidebar}
        onToggleBottomPanel={handleToggleBottomPanel}
        onToggleFullScreen={handleToggleFullScreen}
        onGoToFile={handleGoToFile}
        onGoToSymbol={handleGoToSymbol}
        onGoToDefinition={handleGoToDefinition}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onStartDebugging={handleStartDebugging}
        onRunWithoutDebug={handleRunWithoutDebug}
        onNewTerminal={handleNewTerminal}
        onSplitTerminal={handleSplitTerminal}
        onExtensions={handleExtensions}
        onAiChat={handleAiChat}
        onSwitchAiModel={handleSwitchAiModel}
        onCheckUpdates={handleCheckUpdates}
        onAbout={handleAbout}
        onKeyboardShortcuts={handleKeyboardShortcuts}
        onSettings={handleSettings}
        onColorTheme={handleColorTheme}
        onExit={handleExit}
        leftSidebarOpen={true}
        rightSidebarOpen={rightSidebarOpen}
        bottomPanelOpen={bottomPanelOpen}
      />
      
      {/* Main Content Area - Using KrynoxLayout for Resizable Panels */}
      <KrynoxLayout 
        leftSidebarView={leftSidebarView}
        setLeftSidebarView={setLeftSidebarView}
        leftSidebarOpen={leftSidebarOpen}
        rightSidebarOpen={rightSidebarOpen}
        setRightSidebarOpen={setRightSidebarOpen}
        bottomPanelOpen={bottomPanelOpen}
        setBottomPanelOpen={setBottomPanelOpen}
        bottomPanelHeight={bottomPanelHeight}
        setBottomPanelHeight={setBottomPanelHeight}
        onToggleLeftSidebar={handleToggleLeftSidebar}
        onToggleRightSidebar={handleToggleRightSidebar}
        onToggleBottomPanel={handleToggleBottomPanel}
        tabs={tabs}
        activeTabId={activeTabId}
        onTabSelect={setActiveTabId}
        onTabClose={handleCloseTab}
        onOpenExtension={handleOpenExtension}
      />
    </div>
  );
}
