import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface Command {
  id: string;
  name: string;
  shortcut?: string;
  category: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}

export function CommandPalette({ isOpen, onClose, commands }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
          setSearch('');
        }
        break;
      case 'Escape':
        onClose();
        setSearch('');
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-24">
      <div 
        className="w-full max-w-xl bg-[#252526] rounded-lg shadow-2xl border border-[#3c3c3c] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-[#3c3c3c]">
          <Search className="w-4 h-4 text-[#858585] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-[#858585]"
          />
          <span className="text-[#858585] text-xs">Ctrl+Shift+P</span>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-[#858585] text-sm">
              No commands found
            </div>
          ) : (
            filteredCommands.map((cmd, index) => (
              <div
                key={cmd.id}
                className={`px-4 py-2 cursor-pointer flex items-center justify-between ${
                  index === selectedIndex 
                    ? 'bg-[#37373d] text-white' 
                    : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                }`}
                onClick={() => {
                  cmd.action();
                  onClose();
                  setSearch('');
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#858585] text-xs w-16">{cmd.category}</span>
                  <span className="text-sm">{cmd.name}</span>
                </div>
                {cmd.shortcut && (
                  <span className="text-[#858585] text-xs">{cmd.shortcut}</span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#3c3c3c] flex items-center gap-4 text-[10px] text-[#858585]">
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded border border-[#858585] flex items-center justify-center">↑↓</span>
            to navigate
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded border border-[#858585] flex items-center justify-center">↵</span>
            to select
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded border border-[#858585] flex items-center justify-center">esc</span>
            to close
          </span>
        </div>
      </div>
    </div>
  );
}
