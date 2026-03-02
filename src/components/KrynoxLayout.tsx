import React, { useState, useCallback, useRef, useEffect, MouseEvent } from 'react';
import EditorWorkspace from './EditorWorkspace';
import BottomPanel from './BottomPanel';
import ExtensionsPanel from './ExtensionsPanel';
import AISidebar from './AISidebar';
import StatusBar from './StatusBar';

// Tab types
type TabType = 'editor' | 'extension' | 'settings';

interface Tab {
  id: string;
  type: TabType;
  title: string;
  icon?: string;
  extensionId?: string;
}

// Icons for the activity bar
const ActivityBarIcon = ({ children, isActive, title, onClick }: { 
  children: React.ReactNode; 
  isActive: boolean; 
  title: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`w-full h-10 flex items-center justify-center transition-colors ${
      isActive 
        ? 'text-white border-l-2 border-blue-500 bg-[#37373d]' 
        : 'text-[#858585] hover:text-white hover:bg-[#2d2d2d] border-l-2 border-transparent'
    }`}
  >
    {children}
  </button>
);

interface KrynoxLayoutProps {
  leftSidebarView: 'explorer' | 'search' | 'git' | 'debug' | 'extensions';
  setLeftSidebarView: (view: 'explorer' | 'search' | 'git' | 'debug' | 'extensions') => void;
  leftSidebarOpen: boolean;
  
  rightSidebarOpen: boolean;
  setRightSidebarOpen: (open: boolean) => void;
  
  bottomPanelOpen: boolean;
  setBottomPanelOpen: (open: boolean) => void;
  bottomPanelHeight: number;
  setBottomPanelHeight: (height: number) => void;
  
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
  onToggleBottomPanel: () => void;
  
  // Tab props
  tabs?: Tab[];
  activeTabId?: string;
  onTabSelect?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  onOpenExtension?: (extensionId: string, extensionName: string) => void;
}

export default function KrynoxLayout({
  leftSidebarView,
  setLeftSidebarView,
  leftSidebarOpen,
  rightSidebarOpen,
  setRightSidebarOpen,
  bottomPanelOpen,
  setBottomPanelOpen,
  bottomPanelHeight,
  setBottomPanelHeight,
  onToggleLeftSidebar,
  onToggleRightSidebar,
  onToggleBottomPanel,
  tabs = [],
  activeTabId,
  onTabSelect,
  onTabClose,
  onOpenExtension
}: KrynoxLayoutProps) {
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [aiThinking, setAiThinking] = useState(false);
  const [activeLanguage] = useState('TypeScript');
  const [activeModel] = useState('Gemini 2.0 Pro');
  const [isDebugging] = useState(false);
  
  // Manual resize state
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(20);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(30);
  const [terminalHeight, setTerminalHeight] = useState(25);
  
  const [isResizing, setIsResizing] = useState<'left' | 'right' | 'bottom' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle resize start
  const handleResizeStart = useCallback((direction: 'left' | 'right' | 'bottom') => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(direction);
  }, []);

  // Handle resize move
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;

      if (isResizing === 'left') {
        const newWidth = ((e.clientX - containerRect.left) / containerWidth) * 100;
        setLeftSidebarWidth(Math.max(10, Math.min(40, newWidth)));
      } else if (isResizing === 'right') {
        const rightEdge = containerRect.right;
        const newWidth = ((rightEdge - e.clientX) / containerWidth) * 100;
        setRightSidebarWidth(Math.max(15, Math.min(50, newWidth)));
      } else if (isResizing === 'bottom') {
        const bottomEdge = containerRect.bottom;
        const newHeight = ((bottomEdge - e.clientY) / containerHeight) * 100;
        setTerminalHeight(Math.max(10, Math.min(80, newHeight)));
      }
    };

    const handleMouseUp = () => {
      setIsResizing(null);
    };

    window.addEventListener('mousemove', handleMouseMove as any);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Render left sidebar content
  const renderLeftSidebarContent = () => {
    switch (leftSidebarView) {
      case 'extensions':
        return <ExtensionsPanel onOpenExtension={onOpenExtension} />;
      case 'explorer':
        return (
          <div className="flex-1 flex flex-col h-full">
            <div className="h-9 flex items-center px-3 border-b border-[#3c3c3c]">
              <span className="text-[#cccccc] text-xs font-medium">Explorer</span>
            </div>
            <div className="flex-1 p-2 overflow-auto">
              <div className="text-[#858585] text-xs">No folder opened</div>
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="flex-1 flex flex-col h-full">
            <div className="h-9 flex items-center px-3 border-b border-[#3c3c3c]">
              <span className="text-[#cccccc] text-xs font-medium">Search</span>
            </div>
            <div className="flex-1 p-2 overflow-auto">
              <div className="text-[#858585] text-xs">Search in files...</div>
            </div>
          </div>
        );
      case 'git':
        return (
          <div className="flex-1 flex flex-col h-full">
            <div className="h-9 flex items-center px-3 border-b border-[#3c3c3c]">
              <span className="text-[#cccccc] text-xs font-medium">Source Control</span>
            </div>
            <div className="flex-1 p-2 overflow-auto">
              <div className="text-[#858585] text-xs">No changes</div>
            </div>
          </div>
        );
      case 'debug':
        return (
          <div className="flex-1 flex flex-col h-full">
            <div className="h-9 flex items-center px-3 border-b border-[#3c3c3c]">
              <span className="text-[#cccccc] text-xs font-medium">Run and Debug</span>
            </div>
            <div className="flex-1 p-2 overflow-auto">
              <div className="text-[#858585] text-xs">No configurations</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Calculate editor width
  const editorWidth = rightSidebarOpen 
    ? 100 - leftSidebarWidth - rightSidebarWidth 
    : 100 - leftSidebarWidth;

  // Get active tab
  const activeTab = tabs.find(t => t.id === activeTabId);

  // Render tab content
  const renderTabContent = () => {
    if (!activeTab) {
      return <EditorWorkspace 
        terminalHeight={bottomPanelOpen ? (100 - terminalHeight) : 100}
        sidebarWidth={leftSidebarWidth}
        onCursorChange={(pos) => setCursorPosition(pos)}
        onThinkingChange={(thinking) => setAiThinking(thinking)}
      />;
    }

    switch (activeTab.type) {
      case 'extension':
        return (
          <div className="h-full bg-[#1e1e1e] overflow-auto p-4">
            <div className="text-white text-xl mb-4">{activeTab.title}</div>
            <div className="text-[#858585]">Extension Details</div>
            <div className="mt-4 p-4 bg-[#252526] rounded">
              <div className="text-[#cccccc]">Extension ID: {activeTab.extensionId}</div>
              <div className="text-[#858585] text-sm mt-2">Loading extension details...</div>
            </div>
          </div>
        );
      default:
        return <EditorWorkspace 
          terminalHeight={bottomPanelOpen ? (100 - terminalHeight) : 100}
          sidebarWidth={leftSidebarWidth}
          onCursorChange={(pos) => setCursorPosition(pos)}
          onThinkingChange={(thinking) => setAiThinking(thinking)}
        />;
    }
  };

  return (
    <div 
      className={`h-screen w-screen flex flex-col overflow-hidden bg-[#1e1e1e] select-none ${
        isResizing ? 'cursor-col-resize' : ''
      }`}
      style={{ cursor: isResizing === 'bottom' ? 'row-resize' : isResizing ? 'col-resize' : 'default' }}
    >
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden" ref={containerRef}>
        {/* Activity Bar */}
        <div className="w-10 bg-[#333333] flex flex-col border-r border-[#1e1e1e] flex-shrink-0">
          <ActivityBarIcon 
            isActive={leftSidebarView === 'explorer'} 
            title="Explorer"
            onClick={() => setLeftSidebarView('explorer')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h7l2 2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            </svg>
          </ActivityBarIcon>
          
          <ActivityBarIcon 
            isActive={leftSidebarView === 'search'} 
            title="Search"
            onClick={() => setLeftSidebarView('search')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </ActivityBarIcon>
          
          <ActivityBarIcon 
            isActive={leftSidebarView === 'git'} 
            title="Source Control"
            onClick={() => setLeftSidebarView('git')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <path d="M6 21V9a9 9 0 0 0 9 9" />
            </svg>
          </ActivityBarIcon>
          
          <ActivityBarIcon 
            isActive={leftSidebarView === 'debug'} 
            title="Debug"
            onClick={() => setLeftSidebarView('debug')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </ActivityBarIcon>
          
          <ActivityBarIcon 
            isActive={leftSidebarView === 'extensions'} 
            title="Extensions"
            onClick={() => setLeftSidebarView('extensions')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </ActivityBarIcon>
          
          <div className="flex-1" />
          
          <ActivityBarIcon isActive={false} title="Settings" onClick={() => {}}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 2-2h-.09a1.652 1.652 0 0 0-1.51 1z" />
            </svg>
          </ActivityBarIcon>
        </div>
        
        {/* Left Sidebar */}
        {leftSidebarOpen && (
          <>
            <div 
              className="bg-[#252526] overflow-hidden"
              style={{ width: `${leftSidebarWidth}%` }}
            >
              {renderLeftSidebarContent()}
            </div>
            {/* Left Resize Handle */}
            <div 
              className={`w-1 bg-transparent hover:bg-[#007acc] cursor-col-resize transition-colors flex-shrink-0 ${
                isResizing === 'left' ? 'bg-[#007acc]' : ''
              }`}
              onMouseDown={handleResizeStart('left')}
            />
          </>
        )}
        
        {/* Main Editor Area */}
        <div 
          className="flex-1 flex flex-col overflow-hidden"
          style={{ width: `${editorWidth}%` }}
        >
          {/* Tab Bar */}
          {tabs.length > 0 && (
            <div className="h-9 bg-[#252526] flex items-center overflow-x-auto flex-shrink-0">
              {tabs.map(tab => (
                <div 
                  key={tab.id}
                  onClick={() => onTabSelect?.(tab.id)}
                  className={`h-full px-4 flex items-center gap-2 text-xs border-r border-[#1e1e1e] cursor-pointer min-w-[100px] max-w-[200px] ${
                    activeTabId === tab.id 
                      ? 'bg-[#1e1e1e] text-white' 
                      : 'text-[#969696] hover:bg-[#2d2d2d]'
                  }`}
                >
                  <span>{tab.icon || '📄'}</span>
                  <span className="truncate flex-1">{tab.title}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabClose?.(tab.id);
                    }}
                    className="ml-auto text-[#969696] hover:text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Top: Editor + Right Sidebar */}
          <div className="flex-1 flex overflow-hidden">
            {/* Monaco Editor / Tab Content */}
            <div className="flex-1 overflow-hidden">
              {renderTabContent()}
            </div>
            
            {/* Right Sidebar */}
            {rightSidebarOpen && (
              <>
                <div 
                  className="bg-[#252526] overflow-hidden"
                  style={{ width: `${rightSidebarWidth}%` }}
                >
                  <AISidebar onClose={() => setRightSidebarOpen(false)} fileName="App.tsx" />
                </div>
                {/* Right Resize Handle */}
                <div 
                  className={`w-1 bg-transparent hover:bg-[#007acc] cursor-col-resize transition-colors flex-shrink-0 ${
                    isResizing === 'right' ? 'bg-[#007acc]' : ''
                  }`}
                  onMouseDown={handleResizeStart('right')}
                />
              </>
            )}
          </div>
          
          {/* Bottom Panel (Terminal) */}
          {bottomPanelOpen && (
            <>
              {/* Bottom Resize Handle */}
              <div 
                className={`h-1 bg-transparent hover:bg-[#007acc] cursor-row-resize transition-colors flex-shrink-0 ${
                  isResizing === 'bottom' ? 'bg-[#007acc]' : ''
                }`}
                onMouseDown={handleResizeStart('bottom')}
              />
              <div 
                className="bg-[#181818] overflow-hidden"
                style={{ height: `${terminalHeight}%` }}
              >
                <BottomPanel 
                  isOpen={bottomPanelOpen}
                  onClose={onToggleBottomPanel}
                  height={terminalHeight}
                  onHeightChange={setTerminalHeight}
                />
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Status Bar */}
      <StatusBar 
        line={cursorPosition.line}
        column={cursorPosition.column}
        language={activeLanguage}
        activeModel={activeModel}
        isDebugging={isDebugging}
        aiThinking={aiThinking}
      />
    </div>
  );
}
