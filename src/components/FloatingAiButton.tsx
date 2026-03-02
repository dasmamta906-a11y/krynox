import React, { useState } from 'react';
import { Sparkles, MessageSquare, X, Zap, ChevronRight, Keyboard } from 'lucide-react';

interface FloatingAiButtonProps {
  onClick: () => void;
  isPanelOpen: boolean;
  unreadCount?: number;
}

export default function FloatingAiButton({ onClick, isPanelOpen, unreadCount = 0 }: FloatingAiButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full mb-3 right-0 w-48 bg-[#252525] border border-[#333] rounded-lg p-3 shadow-xl transition-all ${
          showTooltip && !isPanelOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="text-white text-sm font-medium mb-1">AI Agent</div>
        <div className="text-gray-400 text-xs">
          Press <kbd className="px-1 py-0.5 bg-[#333] rounded text-gray-300">⌘K</kbd> for quick commands
        </div>
        <div className="mt-2 flex items-center gap-1 text-purple-400 text-xs">
          <Zap className="w-3 h-3" /> Cursor-style AI
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`group relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          isPanelOpen 
            ? 'bg-purple-600 text-white' 
            : 'bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:scale-110 shadow-lg shadow-purple-500/30'
        }`}
      >
        {/* Pulse animation when panel is closed */}
        {!isPanelOpen && (
          <span className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-75"></span>
        )}
        
        {isPanelOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Sparkles className="w-6 h-6 animate-pulse" />
        )}

        {/* Unread badge */}
        {unreadCount > 0 && !isPanelOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Keyboard shortcut hint (always visible) */}
      {!isPanelOpen && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
          <kbd className="px-1.5 py-0.5 bg-[#333] rounded text-gray-400">⌘K</kbd>
        </div>
      )}
    </div>
  );
}
