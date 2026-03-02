import React, { useState } from 'react';
import { Search, Command, Minus, Square, X, Settings, User, Sparkles, ChevronDown, FolderOpen, FileText, Save, Keyboard, Info, Layers, Plug, Bot, PanelLeft, PanelBottom, PanelRight, Maximize2, GripHorizontal } from 'lucide-react';

interface MenuItem {
  label: string;
  shortcut?: string;
  action?: () => void;
  divider?: boolean;
  submenu?: MenuItem[];
  toggle?: boolean;
  checked?: boolean;
}

interface CursorTopBarProps {
  onOpenSearch?: () => void;
  onNewFile?: () => void;
  onNewWindow?: () => void;
  onOpenFile?: () => void;
  onOpenFolder?: () => void;
  onSave?: () => void;
  onSaveAs?: () => void;
  onSaveAll?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onCut?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onFind?: () => void;
  onReplace?: () => void;
  onSelectAll?: () => void;
  onToggleLeftSidebar?: () => void;
  onToggleRightSidebar?: () => void;
  onToggleBottomPanel?: () => void;
  onToggleFullScreen?: () => void;
  onGoToFile?: () => void;
  onGoToSymbol?: () => void;
  onGoToDefinition?: () => void;
  onGoBack?: () => void;
  onGoForward?: () => void;
  onStartDebugging?: () => void;
  onRunWithoutDebug?: () => void;
  onNewTerminal?: () => void;
  onSplitTerminal?: () => void;
  onExtensions?: () => void;
  onAiChat?: () => void;
  onSwitchAiModel?: () => void;
  onCheckUpdates?: () => void;
  onAbout?: () => void;
  onKeyboardShortcuts?: () => void;
  onSettings?: () => void;
  onColorTheme?: () => void;
  onExit?: () => void;
  // Layout state
  leftSidebarOpen?: boolean;
  rightSidebarOpen?: boolean;
  bottomPanelOpen?: boolean;
}

export default function CursorTopBar({ 
  onOpenSearch,
  onNewFile,
  onNewWindow,
  onOpenFile,
  onOpenFolder,
  onSave,
  onSaveAs,
  onSaveAll,
  onUndo,
  onRedo,
  onCut,
  onCopy,
  onPaste,
  onFind,
  onReplace,
  onSelectAll,
  onToggleLeftSidebar,
  onToggleRightSidebar,
  onToggleBottomPanel,
  onToggleFullScreen,
  onGoToFile,
  onGoToSymbol,
  onGoToDefinition,
  onGoBack,
  onGoForward,
  onStartDebugging,
  onRunWithoutDebug,
  onNewTerminal,
  onSplitTerminal,
  onExtensions,
  onAiChat,
  onSwitchAiModel,
  onCheckUpdates,
  onAbout,
  onKeyboardShortcuts,
  onSettings,
  onColorTheme,
  onExit,
  leftSidebarOpen = true,
  rightSidebarOpen = false,
  bottomPanelOpen = true
}: CursorTopBarProps) {
  
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  const menus: Record<string, MenuItem[]> = {
    File: [
      { label: 'New Text File', shortcut: 'Ctrl+N', action: onNewFile },
      { label: 'New File...', shortcut: 'Ctrl+Alt+N' },
      { label: 'New Window', shortcut: 'Ctrl+Shift+N', action: onNewWindow },
      { divider: true, label: '' },
      { label: 'Open File...', shortcut: 'Ctrl+O', action: onOpenFile },
      { label: 'Open Folder...', shortcut: 'Ctrl+K Ctrl+O', action: onOpenFolder },
      { label: 'Open Workspace from File...' },
      { divider: true, label: '' },
      { label: 'Open Recent', submenu: [
        { label: 'No recent files' }
      ]},
      { label: 'Add Folder to Workspace...' },
      { label: 'Duplicate Workspace' },
      { divider: true, label: '' },
      { label: 'Save', shortcut: 'Ctrl+S', action: onSave },
      { label: 'Save As...', shortcut: 'Ctrl+Shift+S', action: onSaveAs },
      { label: 'Save All', shortcut: 'Ctrl+K S', action: onSaveAll },
      { divider: true, label: '' },
      { label: 'Auto Save', toggle: true, checked: true },
      { divider: true, label: '' },
      { label: 'Preferences', submenu: [
        { label: 'Settings', shortcut: 'Ctrl+,', action: onSettings },
        { label: 'Keyboard Shortcuts', shortcut: 'Ctrl+K Ctrl+S', action: onKeyboardShortcuts },
        { label: 'Color Theme', action: onColorTheme }
      ]},
      { divider: true, label: '' },
      { label: 'Close Editor', shortcut: 'Ctrl+F4' },
      { label: 'Close Folder' },
      { label: 'Close Window', shortcut: 'Alt+F4' },
      { divider: true, label: '' },
      { label: 'Exit', action: onExit }
    ],
    Edit: [
      { label: 'Undo', shortcut: 'Ctrl+Z', action: onUndo },
      { label: 'Redo', shortcut: 'Ctrl+Y', action: onRedo },
      { divider: true, label: '' },
      { label: 'Cut', shortcut: 'Ctrl+X', action: onCut },
      { label: 'Copy', shortcut: 'Ctrl+C', action: onCopy },
      { label: 'Paste', shortcut: 'Ctrl+V', action: onPaste },
      { divider: true, label: '' },
      { label: 'Find', shortcut: 'Ctrl+F', action: onFind },
      { label: 'Replace', shortcut: 'Ctrl+H', action: onReplace },
      { label: 'Find in Files', shortcut: 'Ctrl+Shift+F' },
      { label: 'Replace in Files', shortcut: 'Ctrl+Shift+H' },
      { divider: true, label: '' },
      { label: 'Toggle Line Comment', shortcut: 'Ctrl+/' }
    ],
    Selection: [
      { label: 'Select All', shortcut: 'Ctrl+A', action: onSelectAll },
      { divider: true, label: '' },
      { label: 'Expand Selection' },
      { label: 'Shrink Selection' },
      { divider: true, label: '' },
      { label: 'Copy Line Up', shortcut: 'Alt+Shift+Up' },
      { label: 'Copy Line Down', shortcut: 'Alt+Shift+Down' },
      { divider: true, label: '' },
      { label: 'Add Cursors to Line Ends', shortcut: 'Alt+Shift+I' },
      { label: 'Select All Occurrences', shortcut: 'Ctrl+Shift+L' },
      { label: 'Add Selection to Next Match', shortcut: 'Ctrl+D' }
    ],
    View: [
      { label: 'Command Palette...', shortcut: 'Ctrl+Shift+P', action: onOpenSearch },
      { divider: true, label: '' },
      { label: 'Open View', submenu: [
        { label: 'Explorer', shortcut: 'Ctrl+Shift+E' },
        { label: 'Search', shortcut: 'Ctrl+Shift+F' },
        { label: 'Source Control', shortcut: 'Ctrl+Shift+G' },
        { label: 'Extensions', shortcut: 'Ctrl+Shift+X' },
        { label: 'Debug', shortcut: 'Ctrl+Shift+D' }
      ]},
      { divider: true, label: '' },
      { label: 'Toggle Sidebar', shortcut: 'Ctrl+B', action: onToggleLeftSidebar, toggle: true, checked: leftSidebarOpen },
      { label: 'Toggle Panel', shortcut: 'Ctrl+J', action: onToggleBottomPanel, toggle: true, checked: bottomPanelOpen },
      { label: 'Toggle AI Chat', shortcut: 'Ctrl+Alt+B', action: onToggleRightSidebar, toggle: true, checked: rightSidebarOpen },
      { label: 'Toggle Full Screen', shortcut: 'F11', action: onToggleFullScreen },
      { divider: true, label: '' },
      { label: 'Editor Layout', submenu: [
        { label: 'Split Up' },
        { label: 'Split Down' },
        { label: 'Split Left' },
        { label: 'Split Right' },
        { divider: true, label: '' },
        { label: 'Single' },
        { label: 'Two Columns' },
        { label: 'Three Columns' },
        { divider: true, label: '' },
        { label: 'Reset Layout' }
      ]},
      { divider: true, label: '' },
      { label: 'Zoom In', shortcut: 'Ctrl+=' },
      { label: 'Zoom Out', shortcut: 'Ctrl+-' },
      { label: 'Reset Zoom', shortcut: 'Ctrl+0' }
    ],
    Go: [
      { label: 'Go to File...', shortcut: 'Ctrl+P', action: onGoToFile },
      { label: 'Go to Symbol...', shortcut: 'Ctrl+Shift+O', action: onGoToSymbol },
      { label: 'Go to Definition', shortcut: 'F12', action: onGoToDefinition },
      { divider: true, label: '' },
      { label: 'Back', shortcut: 'Alt+Left', action: onGoBack },
      { label: 'Forward', shortcut: 'Alt+Right', action: onGoForward },
      { divider: true, label: '' },
      { label: 'Go to Line...', shortcut: 'Ctrl+G' },
      { label: 'Go to Bracket', shortcut: 'Ctrl+Shift+\\' }
    ],
    Run: [
      { label: 'Start Debugging', shortcut: 'F5', action: onStartDebugging },
      { label: 'Run Without Debugging', shortcut: 'Ctrl+F5', action: onRunWithoutDebug },
      { divider: true, label: '' },
      { label: 'Build', shortcut: 'Ctrl+Shift+B' },
      { divider: true, label: '' },
      { label: 'Run Build Task...', shortcut: 'Ctrl+Shift+B' },
      { label: 'Terminate Task...', shortcut: 'Ctrl+Shift+F5' }
    ],
    Terminal: [
      { label: 'New Terminal', shortcut: 'Ctrl+Shift+`', action: onNewTerminal },
      { label: 'Split Terminal', shortcut: 'Ctrl+Shift+5', action: onSplitTerminal },
      { divider: true, label: '' },
      { label: 'Run Active File' },
      { label: 'Run Selected Text' },
      { divider: true, label: '' },
      { label: 'Configure Tasks...' }
    ],
    Extensions: [
      { label: 'Extensions Marketplace', shortcut: 'Ctrl+Shift+X', action: onExtensions },
      { divider: true, label: '' },
      { label: 'Krynox AI Chat', shortcut: 'Ctrl+Alt+K', action: onAiChat },
      { label: 'Switch AI Model', submenu: [
        { label: 'Gemini 1.5 Pro', checked: true },
        { label: 'GPT-4o' },
        { label: 'Claude 3.5 Sonnet' },
        { label: 'Llama 3.1' }
      ]},
      { divider: true, label: '' },
      { label: 'Check for Extension Updates', action: onCheckUpdates },
      { label: 'Install Updates...' }
    ],
    Help: [
      { label: 'Documentation', action: onAbout },
      { label: 'Keyboard Shortcuts', shortcut: 'Ctrl+K Ctrl+S', action: onKeyboardShortcuts },
      { divider: true, label: '' },
      { label: 'Report Issue' },
      { label: 'View License' },
      { divider: true, label: '' },
      { label: 'About Krynox', action: onAbout }
    ]
  };

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    }
    setActiveMenu(null);
  };

  const renderMenuItem = (item: MenuItem, idx: number) => {
    if (item.divider) {
      return <div key={idx} className="h-px bg-[#3c3c3c] my-1" />;
    }

    if (item.submenu) {
      return (
        <div key={idx} className="relative group">
          <button
            className="w-full px-3 py-1.5 text-left text-[#cccccc] text-xs hover:bg-[#094771] flex items-center justify-between"
          >
            <span>{item.label}</span>
            <span className="ml-2 text-[#858585]">▶</span>
          </button>
          <div className="absolute left-full top-0 ml-1 w-56 bg-[#252526] border border-[#3c3c3c] rounded-md shadow-lg z-50 py-1 hidden group-hover:block">
            {item.submenu.map((subItem, subIdx) => renderMenuItem(subItem, subIdx))}
          </div>
        </div>
      );
    }

    return (
      <button
        key={idx}
        className="w-full px-3 py-1.5 text-left text-[#cccccc] text-xs hover:bg-[#094771] flex items-center justify-between"
        onClick={() => handleMenuItemClick(item)}
      >
        <div className="flex items-center gap-2">
          {item.toggle && (
            <span className="w-3 text-green-400">{item.checked ? '✓' : ''}</span>
          )}
          <span>{item.label}</span>
        </div>
        {item.shortcut && <span className="text-[#858585] text-[10px]">{item.shortcut}</span>}
      </button>
    );
  };

  return (
    <div className="h-10 bg-[#1e1e1e] flex items-center justify-between px-3 select-none" style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}>
      {/* Left: Logo and Menu */}
      <div className="flex items-center gap-3" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        {/* Logo */}
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">K</span>
          </div>
          <span className="text-white text-xs font-medium">Krynox</span>
        </div>

        {/* Menu Items */}
        <div className="flex items-center gap-1 ml-2">
          {Object.keys(menus).map((menuName) => (
            <div key={menuName} className="relative">
              <button 
                className={`px-2 py-1 text-xs hover:bg-[#2d2d2d] rounded flex items-center gap-1 ${activeMenu === menuName ? 'bg-[#2d2d2d]' : 'text-[#cccccc]'}`}
                onClick={() => handleMenuClick(menuName)}
              >
                {menuName}
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {activeMenu === menuName && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-[#252526] border border-[#3c3c3c] rounded-md shadow-lg z-50 py-1">
                  {menus[menuName].map((item, idx) => renderMenuItem(item, idx))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center: Search Bar - Like Cursor */}
      <div 
        className="flex-1 max-w-2xl mx-4"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <div 
          className="flex items-center gap-2 bg-[#2d2d2d] hover:bg-[#333333] rounded-md px-3 py-1.5 cursor-pointer transition-colors"
          onClick={onOpenSearch}
        >
          <Search className="w-3.5 h-3.5 text-[#858585]" />
          <span className="text-[#858585] text-xs">Search files, commands, and more</span>
          <span className="ml-auto text-[#6e7681] text-xs flex items-center gap-0.5">
            <Command className="w-3 h-3" />K
          </span>
        </div>
      </div>

      {/* Right: Layout Controls, Window Controls and User */}
      <div className="flex items-center gap-1" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        {/* Layout Control Icons (3 Square Boxes) */}
        <div className="flex items-center gap-0.5 mr-2 bg-[#252526] rounded px-1 py-0.5">
          {/* Left Sidebar Toggle */}
          <button 
            className={`p-1 rounded transition-colors ${leftSidebarOpen ? 'text-blue-400 bg-[#094771]' : 'text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d]'}`}
            onClick={onToggleLeftSidebar}
            title="Toggle Primary Sidebar (Ctrl+B)"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          
          {/* Bottom Panel Toggle */}
          <button 
            className={`p-1 rounded transition-colors ${bottomPanelOpen ? 'text-blue-400 bg-[#094771]' : 'text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d]'}`}
            onClick={onToggleBottomPanel}
            title="Toggle Bottom Panel (Ctrl+J)"
          >
            <PanelBottom className="w-4 h-4" />
          </button>
          
          {/* Right Sidebar/AI Toggle */}
          <button 
            className={`p-1 rounded transition-colors ${rightSidebarOpen ? 'text-blue-400 bg-[#094771]' : 'text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d]'}`}
            onClick={onToggleRightSidebar}
            title="Toggle AI Chat (Ctrl+Alt+B)"
          >
            <Bot className="w-4 h-4" />
          </button>
        </div>

        {/* AI Button */}
        <button className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded transition-colors" title="AI Chat" onClick={onAiChat}>
          <Sparkles className="w-4 h-4" />
        </button>
        
        {/* Extensions Button */}
        <button className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded transition-colors" title="Extensions" onClick={onExtensions}>
          <Plug className="w-4 h-4" />
        </button>
        
        {/* Settings */}
        <button className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded transition-colors" title="Settings" onClick={onSettings}>
          <Settings className="w-4 h-4" />
        </button>

        {/* Window Controls */}
        <div className="flex items-center ml-2 gap-1">
          <button className="p-1.5 text-[#858585] hover:bg-[#2d2d2d] rounded transition-colors" title="Minimize">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-[#858585] hover:bg-[#2d2d2d] rounded transition-colors" title="Maximize">
            <Maximize2 className="w-3 h-3" />
          </button>
          <button className="p-1.5 text-[#858585] hover:bg-[#c42b1c] hover:text-white rounded transition-colors" title="Close">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Click outside to close menu */}
      {activeMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
}
