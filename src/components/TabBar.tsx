import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileJson, FileCode, FileText, File, Circle } from 'lucide-react';

interface Tab {
  id: string;
  name: string;
  language: string;
  content: string;
  isDirty: boolean;
  isPreview?: boolean;
}

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string | null;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onTabMiddleClick: (tabId: string) => void;
  onTabDoubleClick: (tabId: string) => void;
}

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'json':
      return <FileJson className="w-3.5 h-3.5 text-yellow-400" />;
    case 'py':
      return <span className="text-xs">🐍</span>;
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
      return <FileCode className="w-3.5 h-3.5 text-blue-400" />;
    case 'md':
      return <FileText className="w-3.5 h-3.5 text-gray-400" />;
    case 'html':
      return <FileCode className="w-3.5 h-3.5 text-orange-500" />;
    case 'css':
      return <FileCode className="w-3.5 h-3.5 text-cyan-400" />;
    default:
      return <File className="w-3.5 h-3.5 text-gray-400" />;
  }
};

export function TabBar({ 
  tabs, 
  activeTabId, 
  onTabClick, 
  onTabClose,
  onTabMiddleClick,
  onTabDoubleClick 
}: TabBarProps) {
  const handleMiddleClick = (e: React.MouseEvent, tabId: string) => {
    if (e.button === 1) {
      e.preventDefault();
      onTabMiddleClick(tabId);
    }
  };

  return (
    <div className="h-9 bg-[#1e1e1e] flex items-end overflow-x-auto scrollbar-thin">
      <AnimatePresence mode="popLayout">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          
          return (
            <motion.div
              key={tab.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={() => onTabClick(tab.id)}
              onDoubleClick={() => onTabDoubleClick(tab.id)}
              onMouseDown={(e) => handleMiddleClick(e, tab.id)}
              className={`
                group relative h-8 min-w-[100px] max-w-[180px] flex items-center gap-1.5 px-3 
                cursor-pointer transition-colors border-r border-[#1e1e1e]
                ${isActive 
                  ? 'bg-[#1e1e1e] border-t-2 border-t-[#007acc]' 
                  : 'bg-[#2d2d2d] border-t border-t-transparent hover:bg-[#2a2d2e]'
                }
              `}
            >
              {/* File Icon */}
              <span className="flex-shrink-0">
                {getFileIcon(tab.name)}
              </span>
              
              {/* File Name */}
              <span 
                className={`
                  text-xs truncate flex-1
                  ${tab.isPreview ? 'italic text-[#969696]' : 'text-[#cccccc]'}
                  ${isActive ? 'text-white' : ''}
                `}
              >
                {tab.name}
              </span>
              
              {/* Dirty Indicator / Close Button */}
              <div className="flex-shrink-0">
                {tab.isDirty ? (
                  <div 
                    className="w-2.5 h-2.5 rounded-full bg-white/60 hover:bg-white/80 transition-colors"
                    title="Unsaved changes"
                  />
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabClose(tab.id);
                    }}
                    className={`
                      w-4 h-4 rounded flex items-center justify-center
                      opacity-0 group-hover:opacity-100
                      hover:bg-[#4b4b4b] text-[#969696] hover:text-white
                      transition-all
                    `}
                    title="Close"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default TabBar;
