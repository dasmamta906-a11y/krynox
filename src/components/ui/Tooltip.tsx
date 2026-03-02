import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  shortcut?: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ content, shortcut, children, position = 'right' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      switch (position) {
        case 'right':
          setCoords({ x: rect.right + 10, y: rect.top + rect.height / 2 });
          break;
        case 'left':
          setCoords({ x: rect.left - 10, y: rect.top + rect.height / 2 });
          break;
        case 'top':
          setCoords({ x: rect.left + rect.width / 2, y: rect.top - 10 });
          break;
        case 'bottom':
          setCoords({ x: rect.left + rect.width / 2, y: rect.bottom + 10 });
          break;
      }
    }
  }, [isVisible, position]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-flex"
      >
        {children}
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            className="fixed z-[100] bg-[#252526] border border-[#3c3c3c] rounded-md px-2 py-1.5 shadow-lg pointer-events-none"
            style={{
              left: position === 'top' || position === 'bottom' ? coords.x : undefined,
              top: position === 'left' || position === 'right' ? coords.y : undefined,
              transform: position === 'top' || position === 'bottom' 
                ? 'translateX(-50%)' 
                : 'translateY(-50%)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-[#cccccc] text-xs whitespace-nowrap">{content}</span>
              {shortcut && (
                <span className="text-[#6e7681] text-xs bg-[#3c3c3c] px-1 rounded">
                  {shortcut}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
