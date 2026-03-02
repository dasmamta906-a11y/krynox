import { motion } from 'framer-motion';
import { Edit2, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ViewModeSwitcher() {
  const { state, dispatch } = useApp();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_VIEW_MODE' });
  };

  const isLiveMode = state.viewMode === 'live';

  return (
    <motion.div
      className="relative inline-flex items-center gap-0 p-1 rounded-full glass border border-purple-500/30 cursor-pointer"
      whileHover={{ borderColor: 'rgba(168,85,247,0.5)' }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full"
        initial={false}
        animate={{
          x: isLiveMode ? '100%' : '0%',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        style={{ width: 'calc(50% - 2px)' }}
      />

      {/* Edit button */}
      <button
        onClick={handleToggle}
        className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-sm font-medium ${
          !isLiveMode
            ? 'text-white'
            : 'text-gray-400 hover:text-gray-300'
        }`}
        aria-label="Switch to edit mode"
      >
        <Edit2 className="w-4 h-4" />
        <span>Edit</span>
      </button>

      {/* Preview button */}
      <button
        onClick={handleToggle}
        className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-sm font-medium ${
          isLiveMode
            ? 'text-white'
            : 'text-gray-400 hover:text-gray-300'
        }`}
        aria-label="Switch to preview mode"
      >
        <Eye className="w-4 h-4" />
        <span>Preview</span>
      </button>
    </motion.div>
  );
}
