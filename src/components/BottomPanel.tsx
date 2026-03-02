import React, { useState } from 'react';
import { 
  X, Plus, Split, Trash2, Maximize2, Minimize2, 
  ChevronUp, ChevronDown, Terminal, AlertCircle, 
  FileOutput, Bug, Network, Sparkles, RefreshCw,
  MoreHorizontal, Search, Filter, ScrollText
} from 'lucide-react';

interface BottomPanelProps {
  isOpen: boolean;
  onClose: () => void;
  height?: number;
  onHeightChange?: (height: number) => void;
}

type TabType = 'problems' | 'output' | 'debugConsole' | 'terminal' | 'ports' | 'aiFix';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const tabs: Tab[] = [
  { id: 'problems', label: 'PROBLEMS', icon: <AlertCircle className="w-3.5 h-3.5" />, badge: 0 },
  { id: 'output', label: 'OUTPUT', icon: <FileOutput className="w-3.5 h-3.5" /> },
  { id: 'debugConsole', label: 'DEBUG CONSOLE', icon: <Bug className="w-3.5 h-3.5" /> },
  { id: 'terminal', label: 'TERMINAL', icon: <Terminal className="w-3.5 h-3.5" /> },
  { id: 'ports', label: 'PORTS', icon: <Network className="w-3.5 h-3.5" /> },
  { id: 'aiFix', label: 'AI FIX', icon: <Sparkles className="w-3.5 h-3.5" /> },
];

export default function BottomPanel({ isOpen, onClose, height = 250, onHeightChange }: BottomPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('terminal');
  const [isMaximized, setIsMaximized] = useState(false);
  const [terminalCount, setTerminalCount] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  const handleAddTerminal = () => {
    setTerminalCount(prev => prev + 1);
  };

  const handleSplitTerminal = () => {
    console.log('Split terminal');
  };

  const handleKillTerminal = () => {
    if (terminalCount > 1) {
      setTerminalCount(prev => prev - 1);
    }
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (onHeightChange) {
      onHeightChange(isMaximized ? 250 : window.innerHeight * 0.6);
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startY = e.clientY;
    const startHeight = height;

    const handleDrag = (e: MouseEvent) => {
      const delta = startY - e.clientY;
      const newHeight = Math.max(100, Math.min(window.innerHeight * 0.7, startHeight + delta));
      if (onHeightChange) {
        onHeightChange(newHeight);
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };

  if (!isOpen) return null;

  const currentTab = tabs.find(t => t.id === activeTab);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'problems':
        return (
          <div className="flex-1 p-3 text-[#cccccc] text-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-[#858585]">0 errors, 0 warnings</span>
            </div>
            <div className="text-[#858585] text-xs">No problems detected</div>
          </div>
        );
      case 'output':
        return (
          <div className="flex-1 p-3 text-[#cccccc] text-sm font-mono">
            <div className="text-[#858585] text-xs mb-2">[9:14:23] Krynox IDE started successfully</div>
            <div className="text-[#858585] text-xs mb-2">[9:14:24] Loading extensions...</div>
            <div className="text-[#858585] text-xs mb-2">[9:14:25] Extensions loaded</div>
            <div className="text-green-400 text-xs mb-2">[9:14:25] Ready</div>
          </div>
        );
      case 'debugConsole':
        return (
          <div className="flex-1 p-3 text-[#cccccc] text-sm">
            <div className="text-[#858585] text-xs">Debug console is empty</div>
            <div className="mt-2 text-[#858585] text-xs">Start debugging to see output here</div>
          </div>
        );
      case 'terminal':
        return (
          <div className="flex-1 flex">
            {Array.from({ length: terminalCount }).map((_, index) => (
              <div 
                key={index} 
                className={`flex-1 ${index > 0 ? 'border-l border-[#3c3c3c]' : ''} p-2`}
              >
                <div className="text-[#858585] text-xs mb-1">Terminal {index + 1}</div>
                <div className="h-full bg-[#0c0c0c] rounded p-2 font-mono text-xs text-[#cccccc]">
                  <div className="text-green-400">PS C:\Users\hp\Desktop\krynox&gt; <span className="animate-pulse">_</span></div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'ports':
        return (
          <div className="flex-1 p-3 text-[#cccccc] text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#858585]">Forwarded Ports</span>
              <button className="p-1 hover:bg-[#2d2d2d] rounded">
                <RefreshCw className="w-3 h-3 text-[#858585]" />
              </button>
            </div>
            <div className="text-[#858585] text-xs">No ports forwarded</div>
            <div className="mt-2 text-xs text-[#858585]">
              Click + to forward a port
            </div>
          </div>
        );
      case 'aiFix':
        return (
          <div className="flex-1 p-3 text-[#cccccc] text-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium">Krynox AI Fix</span>
            </div>
            <div className="bg-[#1e1e1e] rounded p-3 mb-2">
              <div className="text-xs text-[#858585] mb-2">No errors to fix</div>
              <div className="text-xs text-[#858585]">
                AI Fix will appear here when there are errors in your code
              </div>
            </div>
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded flex items-center justify-center gap-2">
              <Sparkles className="w-3 h-3" />
              Analyze Code
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="bg-[#181818] border-t border-[#333333] flex flex-col"
      style={{ height: `${height}px` }}
    >
      {/* Drag Handle */}
      <div 
        className={`h-1 w-full cursor-ns-resize hover:bg-blue-500 ${isDragging ? 'bg-blue-500' : ''}`}
        onMouseDown={handleDragStart}
      />
      
      {/* Tab Bar */}
      <div className="h-9 flex items-center justify-between bg-[#181818] border-b border-[#333333]">
        {/* Left: Tabs */}
        <div className="flex items-center h-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`h-full px-3 flex items-center gap-1.5 text-xs border-r border-[#333333] transition-colors ${
                activeTab === tab.id 
                  ? 'text-[#ffffff] bg-[#181818] border-b-2 border-b-blue-500' 
                  : 'text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right: Action Toolbar */}
        <div className="flex items-center gap-0.5 px-2">
          {/* Terminal-specific actions */}
          {activeTab === 'terminal' && (
            <>
              {/* Shell Selector */}
              <button 
                className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded flex items-center gap-1 text-xs"
                title="Select Default Shell"
              >
                <span className="text-[10px]">PS</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {/* Add Terminal */}
              <button 
                onClick={handleAddTerminal}
                className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded"
                title="New Terminal (Ctrl+Shift+`)"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              
              {/* Split Terminal */}
              <button 
                onClick={handleSplitTerminal}
                className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded"
                title="Split Terminal"
              >
                <Split className="w-3.5 h-3.5" />
              </button>
              
              {/* Kill Terminal */}
              <button 
                onClick={handleKillTerminal}
                className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded"
                title="Kill Terminal"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* Problems-specific actions */}
          {activeTab === 'problems' && (
            <>
              <button 
                className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded"
                title="Filter"
              >
                <Filter className="w-3.5 h-3.5" />
              </button>
              <button 
                className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded"
                title="Clear"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* Output-specific actions */}
          {activeTab === 'output' && (
            <>
              <button 
                className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded"
                title="Clear Output"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button 
                className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded"
                title="Toggle Auto-scroll"
              >
                <ScrollText className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* Ports-specific actions */}
          {activeTab === 'ports' && (
            <>
              <button 
                className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded"
                title="Refresh"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button 
                className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded"
                title="Add Port"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* Common actions */}
          <div className="w-px h-4 bg-[#333333] mx-1" />
          
          {/* Maximize/Minimize */}
          <button 
            onClick={handleMaximize}
            className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          
          {/* Close Panel */}
          <button 
            onClick={onClose}
            className="p-1.5 text-[#858585] hover:text-[#cccccc] hover:bg-[#2d2d2d] rounded"
            title="Close Panel (Ctrl+J)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {renderTabContent()}
      </div>
    </div>
  );
}
