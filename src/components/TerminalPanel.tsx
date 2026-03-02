import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

interface TerminalPanelProps {
  activeTab: 'terminal' | 'output' | 'debug' | 'problems';
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function TerminalPanel({ activeTab, isExpanded, onToggleExpand }: TerminalPanelProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Welcome to Krynox Terminal v1.0.0',
    'Type "help" for available commands',
    '',
    '$'
  ]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current && activeTab === 'terminal') {
      // Initialize Xterm.js
      const terminal = new Terminal({
        theme: {
          background: '#1e1e1e',
          foreground: '#cccccc',
          cursor: '#cccccc',
          cursorAccent: '#1e1e1e',
          selectionBackground: '#264f78',
          black: '#000000',
          red: '#cd3131',
          green: '#0dbc79',
          yellow: '#e5e510',
          blue: '#2472c8',
          magenta: '#bc3fbc',
          cyan: '#11a8cd',
          white: '#e5e5e5',
          brightBlack: '#666666',
          brightRed: '#f14c4c',
          brightGreen: '#23d18b',
          brightYellow: '#f5f543',
          brightBlue: '#3b8eea',
          brightMagenta: '#d670d6',
          brightCyan: '#29b8db',
          brightWhite: '#ffffff',
        },
        fontSize: 13,
        fontFamily: "'Cascadia Code', 'Fira Code', Consolas, monospace",
        cursorBlink: true,
        scrollback: 1000,
      });

      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      terminal.open(terminalRef.current);
      fitAddon.fit();

      terminal.writeln('\x1b[36mWelcome to Krynox Terminal v1.0.0\x1b[0m');
      terminal.writeln('Type "help" for available commands');
      terminal.writeln('');
      terminal.write('\x1b[32m$\x1b[0m ');

      xtermRef.current = terminal;

      // Handle user input
      let currentLine = '';
      
      terminal.onData((data) => {
        const code = data.charCodeAt(0);
        
        if (code === 13) { // Enter
          terminal.writeln('');
          processCommand(currentLine, terminal);
          currentLine = '';
          terminal.write('\x1b[32m$\x1b[0m ');
        } else if (code === 127) { // Backspace
          if (currentLine.length > 0) {
            currentLine = currentLine.slice(0, -1);
            terminal.write('\b \b');
          }
        } else if (code >= 32) { // Printable characters
          currentLine += data;
          terminal.write(data);
        }
      });

      const processCommand = (cmd: string, term: Terminal) => {
        const parts = cmd.trim().split(' ');
        const command = parts[0].toLowerCase();
        
        switch (command) {
          case 'help':
            term.writeln('');
            term.writeln('\x1b[33mAvailable commands:\x1b[0m');
            term.writeln('  help     - Show this help message');
            term.writeln('  clear    - Clear terminal');
            term.writeln('  ls       - List files');
            term.writeln('  pwd      - Print working directory');
            term.writeln('  date     - Show current date');
            term.writeln('  echo     - Print text');
            term.writeln('  node     - Run Node.js');
            term.writeln('  npm      - Node package manager');
            term.writeln('  git      - Git version control');
            term.writeln('');
            break;
          case 'clear':
            term.clear();
            break;
          case 'ls':
            term.writeln('\x1b[34mmy-project\x1b[0m  \x1b[36msrc\x1b[0m  \x1b[36mpublic\x1b[0m  package.json  README.md');
            break;
          case 'pwd':
            term.writeln('/home/user/project');
            break;
          case 'date':
            term.writeln(new Date().toString());
            break;
          case 'echo':
            term.writeln(parts.slice(1).join(' ') || '');
            break;
          case '':
            break;
          default:
            if (command) {
              term.writeln(`\x1b[31mCommand not found: ${command}\x1b[0m`);
              term.writeln('Type "help" for available commands');
            }
        }
      };

      // Handle resize
      const handleResize = () => {
        fitAddon.fit();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        terminal.dispose();
      };
    }
  }, [activeTab]);

  // Output tab content
  if (activeTab === 'output') {
    return (
      <div className="flex-1 bg-[#1e1e1e] p-2 font-mono text-xs overflow-auto">
        <div className="text-[#858585]">
          <div className="mb-2">Build Output</div>
          <div className="text-green-400">[INFO] Building project...</div>
          <div className="text-green-400">[INFO] Compiling 15 files...</div>
          <div className="text-yellow-400">[WARN] Deprecated API usage in src/main.ts</div>
          <div className="text-green-400">[DONE] Build completed in 2.3s</div>
          <div className="text-blue-400">[INFO] Starting dev server...</div>
          <div className="text-blue-400">[INFO] Server running at http://localhost:5173</div>
        </div>
      </div>
    );
  }

  // Problems tab content
  if (activeTab === 'problems') {
    return (
      <div className="flex-1 bg-[#1e1e1e] p-2 font-mono text-xs overflow-auto">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#858585] mb-4">
            <span>Problems</span>
            <span className="bg-[#3c3c3c] px-2 py-0.5 rounded text-[10px]">0 errors, 2 warnings</span>
          </div>
          <div className="flex items-start gap-2 p-2 bg-[#2d2d2d] rounded border-l-2 border-yellow-500">
            <span className="text-yellow-500">⚠</span>
            <div>
              <div className="text-white">Unused variable 'unusedVar'</div>
              <div className="text-[#858585] text-[10px]">src/App.tsx - Line 42</div>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2 bg-[#2d2d2d] rounded border-l-2 border-yellow-500">
            <span className="text-yellow-500">⚠</span>
            <div>
              <div className="text-white">Missing semicolon</div>
              <div className="text-[#858585] text-[10px]">src/utils.ts - Line 15</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Debug console content
  if (activeTab === 'debug') {
    return (
      <div className="flex-1 bg-[#1e1e1e] p-2 font-mono text-xs overflow-auto">
        <div className="text-[#858585]">
          <div className="mb-2">Debug Console</div>
          <div className="text-blue-400">Debug: Application started</div>
          <div className="text-blue-400">Debug: Loading configuration...</div>
          <div className="text-green-400">Debug: Configuration loaded successfully</div>
          <div className="text-blue-400">Debug: Initializing components...</div>
          <div className="text-green-400">Debug: Components initialized</div>
          <div className="mt-2">
            <span className="text-green-400">▶</span>
            <span className="ml-2">Press F5 to start debugging</span>
          </div>
        </div>
      </div>
    );
  }

  // Terminal content
  return (
    <div className="flex-1 bg-[#1e1e1e] overflow-hidden">
      <div ref={terminalRef} className="h-full w-full" />
    </div>
  );
}
