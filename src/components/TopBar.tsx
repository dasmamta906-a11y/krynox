import React, { useState, useRef, useEffect } from 'react';
import { 
  Code2, File, Edit3, Eye, 
  ArrowRight, Play, Terminal,
  Maximize2, Minus, X, Search,
  FolderOpen, Save, SaveAll,
  Undo2, Redo2, Copy, Scissors,
  Clipboard, Replace, Columns,
  ZoomIn, ZoomOut, Monitor,
  PanelLeft, PanelBottom, Layout,
  List, TreeDeciduous, BookOpen,
  FileCode, History,
  Bug, PlayCircle, Square, Trash2,
  Plus, Settings, HelpCircle, Info,
  ChevronDown, Command, Keyboard
} from 'lucide-react';

interface MenuItem {
  label: string;
  shortcut?: string;
  action?: () => void;
  divider?: boolean;
  submenu?: MenuItem[];
  checkbox?: boolean;
  checked?: boolean;
}

interface Menu {
  label: string;
  items: MenuItem[];
}

interface TopBarProps {
  // File menu
  onNewFile?: () => void;
  onNewProject?: () => void;
  onOpenFile?: () => void;
  onSaveFile?: () => void;
  onSaveAs?: () => void;
  onSaveAll?: () => void;
  onOpenFolder?: () => void;
  onNewWindow?: () => void;
  onAutoSave?: () => void;
  onRevertFile?: () => void;
  onCloseEditor?: () => void;
  onCloseFolder?: () => void;
  onCloseWindow?: () => void;
  // View menu
  onToggleSidebar?: () => void;
  onToggleTerminal?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
  onToggleFullScreen?: () => void;
  onToggleZenMode?: () => void;
  onToggleMinimap?: () => void;
  onToggleBreadcrumbs?: () => void;
  onToggleWordWrap?: () => void;
  // Edit menu
  onUndo?: () => void;
  onRedo?: () => void;
  onCut?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onFind?: () => void;
  onReplace?: () => void;
  onSelectAll?: () => void;
  // Selection menu
  onExpandSelection?: () => void;
  onShrinkSelection?: () => void;
  onCopyLineUp?: () => void;
  onCopyLineDown?: () => void;
  onMoveLineUp?: () => void;
  onMoveLineDown?: () => void;
  onAddCursorAbove?: () => void;
  onAddCursorBelow?: () => void;
  // Go menu
  onGoToLine?: () => void;
  onGoToFile?: () => void;
  onGoToSymbol?: () => void;
  onGoBack?: () => void;
  onGoForward?: () => void;
  // Run menu
  onStartDebugging?: () => void;
  onRunWithoutDebug?: () => void;
  onStopDebugging?: () => void;
  // Terminal menu
  onNewTerminal?: () => void;
  onSplitTerminal?: () => void;
  // Settings
  onOpenSettings?: () => void;
  onOpenExtensions?: () => void;
}

export default function TopBar({ 
  // File
  onNewFile, 
  onNewProject,
  onOpenFile, 
  onSaveFile,
  onSaveAs,
  onSaveAll,
  onOpenFolder,
  onNewWindow,
  onAutoSave,
  onRevertFile,
  onCloseEditor,
  onCloseFolder,
  onCloseWindow,
  // View
  onToggleSidebar,
  onToggleTerminal,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleFullScreen,
  onToggleZenMode,
  onToggleMinimap,
  onToggleBreadcrumbs,
  onToggleWordWrap,
  // Edit
  onUndo,
  onRedo,
  onCut,
  onCopy,
  onPaste,
  onFind,
  onReplace,
  onSelectAll,
  // Selection
  onExpandSelection,
  onShrinkSelection,
  onCopyLineUp,
  onCopyLineDown,
  onMoveLineUp,
  onMoveLineDown,
  onAddCursorAbove,
  onAddCursorBelow,
  // Go
  onGoToLine,
  onGoToFile,
  onGoToSymbol,
  onGoBack,
  onGoForward,
  // Run
  onStartDebugging,
  onRunWithoutDebug,
  onStopDebugging,
  // Terminal
  onNewTerminal,
  onSplitTerminal,
  // Settings
  onOpenSettings,
  onOpenExtensions
}: TopBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showFind, setShowFind] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [showGoToLine, setShowGoToLine] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [goToLineNumber, setGoToLineNumber] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+P - Go to file
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        onGoToFile?.();
      }
      // Ctrl+G - Go to line
      if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        setShowGoToLine(true);
      }
      // Ctrl+Shift+P - Command palette
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      // Escape - Close modals
      if (e.key === 'Escape') {
        setShowFind(false);
        setShowReplace(false);
        setShowGoToLine(false);
        setShowCommandPalette(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onGoToFile]);

  const menus: Menu[] = [
    {
      label: 'File',
      items: [
        { label: 'New File', shortcut: 'Ctrl+N', action: onNewFile },
        { label: 'New Project...', action: onNewProject },
        { label: 'New Window', shortcut: 'Ctrl+Shift+N', action: onNewWindow },
        { label: 'New Text File', action: onNewFile },
        { divider: true, label: '' },
        { label: 'Open File...', shortcut: 'Ctrl+O', action: onOpenFile },
        { label: 'Open Folder...', shortcut: 'Ctrl+K O', action: onOpenFolder },
        { label: 'Open Workspace from File...', action: () => console.log('Open Workspace') },
        { divider: true, label: '' },
        { label: 'Add Folder to Workspace...', action: () => console.log('Add Folder') },
        { label: 'Save Workspace As...', action: () => console.log('Save Workspace') },
        { divider: true, label: '' },
        { label: 'Save', shortcut: 'Ctrl+S', action: onSaveFile },
        { label: 'Save As...', shortcut: 'Ctrl+Shift+S', action: onSaveAs },
        { label: 'Save All', shortcut: 'Ctrl+K S', action: onSaveAll },
        { divider: true, label: '' },
        { label: 'Auto Save', shortcut: 'Ctrl+Shift+A', action: onAutoSave },
        { label: 'Revert File', action: onRevertFile },
        { divider: true, label: '' },
        { label: 'Close Editor', shortcut: 'Ctrl+F4', action: onCloseEditor },
        { label: 'Close Folder', shortcut: 'Ctrl+K F', action: onCloseFolder },
        { label: 'Close Window', shortcut: 'Alt+F4', action: onCloseWindow },
        { divider: true, label: '' },
        { label: 'Exit', shortcut: 'Alt+F4', action: onCloseWindow },
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: 'Ctrl+Z', action: onUndo },
        { label: 'Redo', shortcut: 'Ctrl+Y', action: onRedo },
        { divider: true, label: '' },
        { label: 'Cut', shortcut: 'Ctrl+X', action: onCut },
        { label: 'Copy', shortcut: 'Ctrl+C', action: onCopy },
        { label: 'Paste', shortcut: 'Ctrl+V', action: onPaste },
        { divider: true, label: '' },
        { label: 'Find', shortcut: 'Ctrl+F', action: () => setShowFind(true) },
        { label: 'Replace', shortcut: 'Ctrl+H', action: () => { setShowFind(true); setShowReplace(true); } },
        { divider: true, label: '' },
        { label: 'Find and Replace', submenu: [
          { label: 'Find', shortcut: 'Ctrl+F' },
          { label: 'Replace', shortcut: 'Ctrl+H' },
          { label: 'Find Next', shortcut: 'F3' },
          { label: 'Find Previous', shortcut: 'Shift+F3' },
          { label: 'Replace All', shortcut: 'Ctrl+Alt+Enter' },
        ]},
        { label: 'Turn on Find Mode', shortcut: 'Ctrl+K Ctrl+F' },
        { divider: true, label: '' },
        { label: 'Select All', shortcut: 'Ctrl+A', action: onSelectAll },
      ]
    },
    {
      label: 'Selection',
      items: [
        { label: 'Select All', shortcut: 'Ctrl+A', action: onSelectAll },
        { label: 'Expand Selection', shortcut: 'Shift+Alt+Right', action: onExpandSelection },
        { label: 'Shrink Selection', shortcut: 'Shift+Alt+Left', action: onShrinkSelection },
        { divider: true, label: '' },
        { label: 'Copy Line Up', shortcut: 'Shift+Alt+Up', action: onCopyLineUp },
        { label: 'Copy Line Down', shortcut: 'Shift+Alt+Down', action: onCopyLineDown },
        { label: 'Move Line Up', shortcut: 'Alt+Up', action: onMoveLineUp },
        { label: 'Move Line Down', shortcut: 'Alt+Down', action: onMoveLineDown },
        { divider: true, label: '' },
        { label: 'Add Cursor Above', shortcut: 'Ctrl+Alt+Up', action: onAddCursorAbove },
        { label: 'Add Cursor Below', shortcut: 'Ctrl+Alt+Down', action: onAddCursorBelow },
        { label: 'Select Next Occurrence', shortcut: 'Ctrl+D' },
        { label: 'Select All Occurrences', shortcut: 'Ctrl+Shift+L' },
        { divider: true, label: '' },
        { label: 'Add Selection to Next Find Match', shortcut: 'Ctrl+Shift+D' },
        { label: 'Move Last Selection to Next Find Match', shortcut: 'Ctrl+K Ctrl+D' },
        { divider: true, label: '' },
        { label: 'Toggle Column Selection', shortcut: 'Shift+Alt+Z' },
        { label: 'Column Selection', submenu: [
          { label: 'Switch to Column Selection' },
          { label: 'Cursor Column Selection', shortcut: 'Shift+Alt+Drag' },
          { label: 'Cursor Column Selection Up', shortcut: 'Shift+Alt+Ctrl+Up' },
          { label: 'Cursor Column Selection Down', shortcut: 'Shift+Alt+Ctrl+Down' },
        ]},
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Toggle Sidebar', shortcut: 'Ctrl+B', action: onToggleSidebar },
        { label: 'Toggle Activity Bar', shortcut: 'Ctrl+Shift+A' },
        { label: 'Toggle Panel', shortcut: 'Ctrl+J', action: onToggleTerminal },
        { divider: true, label: '' },
        { label: 'Primary Side Bar', submenu: [
          { label: 'Explorer', shortcut: 'Ctrl+Shift+E' },
          { label: 'Search', shortcut: 'Ctrl+Shift+F' },
          { label: 'Source Control', shortcut: 'Ctrl+Shift+G' },
          { label: 'Run and Debug', shortcut: 'Ctrl+Shift+D' },
          { label: 'Extensions', shortcut: 'Ctrl+Shift+X' },
        ]},
        { label: 'Secondary Side Bar' },
        { label: 'Panel', submenu: [
          { label: 'Terminal', shortcut: 'Ctrl+`' },
          { label: 'Problems', shortcut: 'Ctrl+Shift+M' },
          { label: 'Output', shortcut: 'Ctrl+Shift+U' },
          { label: 'Debug Console', shortcut: 'Ctrl+Shift+Y' },
          { label: 'Markdown Preview', shortcut: 'Ctrl+Shift+V' },
        ]},
        { divider: true, label: '' },
        { label: 'Zoom In', shortcut: 'Ctrl++', action: onZoomIn },
        { label: 'Zoom Out', shortcut: 'Ctrl+-', action: onZoomOut },
        { label: 'Reset Zoom', shortcut: 'Ctrl+0', action: onResetZoom },
        { divider: true, label: '' },
        { label: 'Toggle Full Screen', shortcut: 'F11', action: onToggleFullScreen },
        { label: 'Toggle Zen Mode', shortcut: 'Ctrl+K Z', action: onToggleZenMode },
        { label: 'Centered Layout', action: onToggleZenMode },
        { divider: true, label: '' },
        { label: 'Show Minimap', shortcut: 'Ctrl+Shift+M', action: onToggleMinimap },
        { label: 'Show Breadcrumbs', action: onToggleBreadcrumbs },
        { label: 'Show Word Wrap', action: onToggleWordWrap },
        { label: 'Show Inline Suggestions', },
        { divider: true, label: '' },
        { label: 'Go to Next Editor', shortcut: 'Ctrl+PageDown' },
        { label: 'Go to Previous Editor', shortcut: 'Ctrl+PageUp' },
        { label: 'Go to Last Editor in Group', shortcut: 'Ctrl+K Ctrl+PageUp' },
        { divider: true, label: '' },
        { label: 'Pin Editor', shortcut: 'Ctrl+K Shift+Enter' },
        { label: 'Close Pinned Editor' },
        { divider: true, label: '' },
        { label: 'Split Editor', shortcut: 'Ctrl+\\' },
        { label: 'Close All Editors', shortcut: 'Ctrl+K W' },
        { label: 'Close editors in Group', },
        { divider: true, label: '' },
        { label: 'Toggle Word Wrap', shortcut: 'Alt+Z', action: onToggleWordWrap },
      ]
    },
    {
      label: 'Go',
      items: [
        { label: 'Go to Line/Column...', shortcut: 'Ctrl+G', action: () => setShowGoToLine(true) },
        { label: 'Go to File...', shortcut: 'Ctrl+P', action: onGoToFile },
        { label: 'Go to Symbol in File...', shortcut: 'Ctrl+Shift+O', action: onGoToSymbol },
        { label: 'Go to Symbol in Workspace...', shortcut: 'Ctrl+T', action: onGoToSymbol },
        { divider: true, label: '' },
        { label: 'Go Back', shortcut: 'Alt+Left', action: onGoBack },
        { label: 'Go Forward', shortcut: 'Alt+Right', action: onGoForward },
        { label: 'Go to Last Edit Location', shortcut: 'Ctrl+K Ctrl+Q' },
        { divider: true, label: '' },
        { label: 'Next Change', shortcut: 'Alt+F3' },
        { label: 'Previous Change', shortcut: 'Shift+Alt+F3' },
        { divider: true, label: '' },
        { label: 'Switch Editor', submenu: [
          { label: 'Quick Open Previous Editor' },
          { label: 'Next Editor' },
          { label: 'Previous Editor' },
          { label: 'Next Used Editor' },
          { label: 'Previous Used Editor' },
        ]},
        { label: 'Switch Group', submenu: [
          { label: 'Focus Left Group' },
          { label: 'Focus Right Group' },
          { label: 'Focus Above Group' },
          { label: 'Focus Below Group' },
        ]},
      ]
    },
    {
      label: 'Run',
      items: [
        { label: 'Start Debugging', shortcut: 'F5', action: onStartDebugging },
        { label: 'Run Without Debugging', shortcut: 'Ctrl+F5', action: onRunWithoutDebug },
        { label: 'Stop Debugging', shortcut: 'Shift+F5', action: onStopDebugging },
        { label: 'Restart Debugging', shortcut: 'Ctrl+Shift+F5', action: onStartDebugging },
        { divider: true, label: '' },
        { label: 'Open Configurations', action: () => console.log('Open Configurations') },
        { label: 'Add Configuration...', action: () => console.log('Add Configuration') },
        { divider: true, label: '' },
        { label: 'Step Over', shortcut: 'F10' },
        { label: 'Step Into', shortcut: 'F11' },
        { label: 'Step Out', shortcut: 'Shift+F11' },
        { label: 'Continue', shortcut: 'F5' },
        { divider: true, label: '' },
        { label: 'Toggle Breakpoint', shortcut: 'F9' },
        { label: 'New Breakpoint', submenu: [
          { label: 'Conditional Breakpoint...' },
          { label: 'Logpoint...' },
          { label: 'Inline Breakpoint', shortcut: 'Shift+F9' },
          { label: 'Function Breakpoint...' },
        ]},
        { divider: true, label: '' },
        { label: 'Enable All Breakpoints' },
        { label: 'Disable All Breakpoints' },
        { label: 'Remove All Breakpoints' },
        { divider: true, label: '' },
        { label: 'Install Additional Debuggers...', action: () => console.log('Install Debuggers') },
      ]
    },
    {
      label: 'Terminal',
      items: [
        { label: 'New Terminal', shortcut: 'Ctrl+Shift+`', action: onNewTerminal },
        { label: 'Split Terminal', shortcut: 'Ctrl+Shift+5', action: onSplitTerminal },
        { label: 'Run Selected Text in Active Terminal', shortcut: 'Ctrl+Alt+Enter' },
        { label: 'Run Active File in Active Terminal', shortcut: 'Ctrl+Shift+Enter' },
        { divider: true, label: '' },
        { label: 'Configure Tasks...', action: () => console.log('Configure Tasks') },
        { label: 'Configure Default Build Tasks...', action: () => console.log('Configure Build Tasks') },
        { divider: true, label: '' },
        { label: 'Clear Terminal', shortcut: 'Ctrl+Shift+K' },
        { label: 'Clear Previous Lines', shortcut: 'Ctrl+K' },
        { divider: true, label: '' },
        { label: 'Find', shortcut: 'Ctrl+Shift+F' },
        { label: 'Find Next', shortcut: 'F3' },
        { label: 'Find Previous', shortcut: 'Shift+F3' },
        { divider: true, label: '' },
        { label: 'Split', action: onSplitTerminal },
        { label: 'Go to Directory', shortcut: 'Alt+Down' },
        { label: 'Resize', submenu: [
          { label: 'Increase Height' },
          { label: 'Decrease Height' },
          { label: 'Increase Width' },
          { label: 'Decrease Width' },
        ]},
        { divider: true, label: '' },
        { label: 'Select Default Profile...' },
        { label: 'Default Shell' },
        { divider: true, label: '' },
        { label: 'Show Terminal Tasks', shortcut: 'Ctrl+Shift+E' },
        { label: 'Manage Workspace Terminals' },
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Documentation', shortcut: 'F1', action: () => console.log('Documentation') },
        { label: 'Keyboard Shortcuts', shortcut: 'Ctrl+K Ctrl+S', action: () => console.log('Keyboard Shortcuts') },
        { label: 'Search Features', shortcut: 'Ctrl+Shift+P', action: () => setShowCommandPalette(true) },
        { divider: true, label: '' },
        { label: 'API Reference' },
        { label: 'Extension Reference' },
        { divider: true, label: '' },
        { label: 'Release Notes', action: () => console.log('Release Notes') },
        { label: 'View Cloud Services Logs', },
        { label: 'Report Issue', action: () => console.log('Report Issue') },
        { divider: true, label: '' },
        { label: 'About', action: () => console.log('About') },
        { divider: true, label: '' },
        { label: 'Welcome', action: () => console.log('Welcome') },
        { label: 'Interactive Playground' },
        { label: 'Community', submenu: [
          { label: 'Stack Overflow' },
          { label: 'GitHub Discussions' },
          { label: 'VS Code Dev Community' },
        ]},
        { label: 'Tips and Tricks', action: () => console.log('Tips and Tricks') },
      ]
    },
  ];

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.submenu) {
      setActiveSubmenu(activeSubmenu === item.label ? null : item.label);
      return;
    }
    if (item.action) {
      item.action();
    }
    setActiveMenu(null);
    setActiveSubmenu(null);
  };

  return (
    <>
      <header className="h-9 bg-[#252526] border-b border-[#3c3c3c] flex items-center px-2 select-none" ref={menuRef}>
        {/* Logo & Title */}
        <div className="flex items-center gap-2 mr-4">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Code2 className="w-3 h-3 text-white" />
          </div>
          <span className="text-[#cccccc] font-medium text-xs">Krynox Coder</span>
        </div>

        {/* Menu Bar */}
        <div className="flex items-center">
          {menus.map((menu) => (
            <div key={menu.label} className="relative">
              <button
                onClick={() => handleMenuClick(menu.label)}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  activeMenu === menu.label 
                    ? 'bg-[#094771] text-white' 
                    : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                }`}
              >
                {menu.label}
              </button>
              
              {activeMenu === menu.label && (
                <div className="absolute top-full left-0 mt-1 bg-[#252526] border border-[#3c3c3c] rounded shadow-lg min-w-[240px] py-1 z-50">
                  {menu.items.map((item, idx) => (
                    item.divider ? (
                      <div key={idx} className="border-t border-[#3c3c3c] my-1" />
                    ) : (
                      <div key={idx} className="relative">
                        <button
                          onClick={() => handleItemClick(item)}
                          className="w-full px-3 py-1.5 text-left text-[#cccccc] hover:bg-[#094771] flex items-center justify-between gap-4 text-xs"
                        >
                          <span>{item.label}</span>
                          <div className="flex items-center gap-2">
                            {item.checkbox && (
                              <span className="w-3">{item.checked ? '✓' : ''}</span>
                            )}
                            {item.shortcut && (
                              <span className="text-[#6e7681] text-xs">{item.shortcut}</span>
                            )}
                            {item.submenu && (
                              <span className="text-[#6e7681] text-xs">▶</span>
                            )}
                          </div>
                        </button>
                        {item.submenu && activeSubmenu === item.label && (
                          <div className="absolute left-full top-0 ml-1 bg-[#252526] border border-[#3c3c3c] rounded shadow-lg min-w-[220px] py-1 z-50">
                            {item.submenu.map((subItem, subIdx) => (
                              subItem.divider ? (
                                <div key={subIdx} className="border-t border-[#3c3c3c] my-1" />
                              ) : (
                                <button
                                  key={subIdx}
                                  onClick={() => handleItemClick(subItem)}
                                  className="w-full px-3 py-1.5 text-left text-[#cccccc] hover:bg-[#094771] flex items-center justify-between gap-4 text-xs"
                                >
                                  <span>{subItem.label}</span>
                                  {subItem.shortcut && (
                                    <span className="text-[#6e7681] text-xs">{subItem.shortcut}</span>
                                  )}
                                </button>
                              )
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Quick Actions */}
        <div className="flex items-center gap-1 mr-2">
          <button 
            onClick={() => setShowCommandPalette(true)}
            className="flex items-center gap-1 px-2 py-1 text-[#8b8b8b] hover:text-[#c6c6c6] hover:bg-[#2a2d2e] rounded text-xs"
            title="Command Palette (Ctrl+Shift+P)"
          >
            <Command className="w-3 h-3" />
            <span className="text-[10px]">Ctrl+Shift+P</span>
          </button>
        </div>

        {/* Window Controls */}
        <div className="flex items-center">
          <button className="p-2 text-[#969696] hover:text-[#c6c6c6] hover:bg-[#2a2d2e] rounded transition-colors">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button className="p-2 text-[#969696] hover:text-[#c6c6c6] hover:bg-[#2a2d2e] rounded transition-colors">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-2 text-[#969696] hover:text-[#c6c6c6] hover:bg-[#e81123] rounded transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Click outside to close menu */}
      {activeMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => { setActiveMenu(null); setActiveSubmenu(null); }} 
        />
      )}

      {/* Go To Line Dialog */}
      {showGoToLine && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-32 z-50">
          <div className="bg-[#252526] border border-[#3c3c3c] rounded-lg shadow-xl w-80">
            <div className="p-3 border-b border-[#3c3c3c]">
              <span className="text-[#cccccc] text-sm">Go to Line</span>
            </div>
            <div className="p-3">
              <input
                type="text"
                value={goToLineNumber}
                onChange={(e) => setGoToLineNumber(e.target.value)}
                placeholder="Enter line number"
                className="w-full bg-[#3c3c3c] border border-[#3c3c3c] focus:border-[#007acc] rounded px-3 py-2 text-[#c6c6c6] text-sm outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    console.log('Go to line:', goToLineNumber);
                    setShowGoToLine(false);
                    setGoToLineNumber('');
                  }
                  if (e.key === 'Escape') {
                    setShowGoToLine(false);
                  }
                }}
              />
            </div>
            <div className="px-3 pb-3 text-xs text-[#6e7681]">
              Enter a line number between 1 and 1000
            </div>
          </div>
        </div>
      )}

      {/* Command Palette */}
      {showCommandPalette && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-24 z-50">
          <div className="bg-[#252526] border border-[#3c3c3c] rounded-lg shadow-xl w-[600px]">
            <div className="p-3 border-b border-[#3c3c3c]">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#6e7681]" />
                <input
                  type="text"
                  placeholder="Type '>' to run a command or search"
                  className="flex-1 bg-transparent text-[#c6c6c6] text-sm outline-none placeholder-[#6e7681]"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <div className="p-2">
                <div className="px-2 py-1 text-[#6e7681] text-xs font-medium">File</div>
                <button className="w-full px-3 py-2 text-left text-[#cccccc] hover:bg-[#094771] rounded flex items-center gap-2 text-sm">
                  <File className="w-4 h-4" />
                  New File
                  <span className="ml-auto text-[#6e7681] text-xs">Ctrl+N</span>
                </button>
                <button className="w-full px-3 py-2 text-left text-[#cccccc] hover:bg-[#094771] rounded flex items-center gap-2 text-sm">
                  <FolderOpen className="w-4 h-4" />
                  Open File
                  <span className="ml-auto text-[#6e7681] text-xs">Ctrl+O</span>
                </button>
                <button className="w-full px-3 py-2 text-left text-[#cccccc] hover:bg-[#094771] rounded flex items-center gap-2 text-sm">
                  <Save className="w-4 h-4" />
                  Save
                  <span className="ml-auto text-[#6e7681] text-xs">Ctrl+S</span>
                </button>
              </div>
              <div className="p-2 border-t border-[#3c3c3c]">
                <div className="px-2 py-1 text-[#6e7681] text-xs font-medium">View</div>
                <button className="w-full px-3 py-2 text-left text-[#cccccc] hover:bg-[#094771] rounded flex items-center gap-2 text-sm" onClick={onToggleSidebar}>
                  <PanelLeft className="w-4 h-4" />
                  Toggle Sidebar
                  <span className="ml-auto text-[#6e7681] text-xs">Ctrl+B</span>
                </button>
                <button className="w-full px-3 py-2 text-left text-[#cccccc] hover:bg-[#094771] rounded flex items-center gap-2 text-sm" onClick={onToggleTerminal}>
                  <Terminal className="w-4 h-4" />
                  Toggle Terminal
                  <span className="ml-auto text-[#6e7681] text-xs">Ctrl+`</span>
                </button>
                <button className="w-full px-3 py-2 text-left text-[#cccccc] hover:bg-[#094771] rounded flex items-center gap-2 text-sm" onClick={onToggleFullScreen}>
                  <Maximize2 className="w-4 h-4" />
                  Toggle Full Screen
                  <span className="ml-auto text-[#6e7681] text-xs">F11</span>
                </button>
              </div>
              <div className="p-2 border-t border-[#3c3c3c]">
                <div className="px-2 py-1 text-[#6e7681] text-xs font-medium">AI</div>
                <button className="w-full px-3 py-2 text-left text-[#cccccc] hover:bg-[#094771] rounded flex items-center gap-2 text-sm" onClick={onOpenSettings}>
                  <Settings className="w-4 h-4" />
                  AI Settings
                </button>
                <button className="w-full px-3 py-2 text-left text-[#cccccc] hover:bg-[#094771] rounded flex items-center gap-2 text-sm" onClick={onOpenExtensions}>
                  <List className="w-4 h-4" />
                  Extensions
                </button>
              </div>
            </div>
            <div className="p-2 border-t border-[#3c3c3c] flex items-center gap-4 text-xs text-[#6e7681]">
              <span><kbd className="bg-[#3c3c3c] px-1 rounded">↑↓</kbd> to navigate</span>
              <span><kbd className="bg-[#3c3c3c] px-1 rounded">Enter</kbd> to select</span>
              <span><kbd className="bg-[#3c3c3c] px-1 rounded">Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
