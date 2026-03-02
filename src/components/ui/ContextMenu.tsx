import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  divider?: boolean;
  disabled?: boolean;
}

interface ContextMenuProps {
  items: MenuItem[];
  x: number;
  y: number;
  onClose: () => void;
  onAction: (id: string) => void;
}

export default function ContextMenu({ items, x, y, onClose, onAction }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Adjust position to stay within viewport
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      if (rect.right > viewportWidth) {
        menuRef.current.style.left = `${x - rect.width}px`;
      }
      if (rect.bottom > viewportHeight) {
        menuRef.current.style.top = `${y - rect.height}px`;
      }
    }
  }, [x, y]);

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="fixed z-[100] bg-[#252526] border border-[#3c3c3c] rounded-md shadow-lg min-w-[180px] py-1"
        style={{ left: x, top: y }}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {item.divider ? (
              <div className="h-px bg-[#3c3c3c] my-1" />
            ) : (
              <button
                onClick={() => {
                  if (!item.disabled) {
                    onAction(item.id);
                    onClose();
                  }
                }}
                disabled={item.disabled}
                className={`w-full px-3 py-1.5 flex items-center justify-between text-sm transition-colors ${
                  item.disabled
                    ? 'text-[#6e7681] cursor-not-allowed'
                    : 'text-[#cccccc] hover:bg-[#094771]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span className="w-4">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <span className="text-[#6e7681] text-xs ml-4">{item.shortcut}</span>
                )}
              </button>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
