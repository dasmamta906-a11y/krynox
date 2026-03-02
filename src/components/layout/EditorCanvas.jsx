import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, Tablet, Smartphone, Undo2, Redo2, Eye, Grid3X3, 
  Trash2, GripVertical, Layout, Plus, Sparkles, Zap, Brain, Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { componentMap } from '../preview-elements/PreviewComponents';

export default function EditorCanvas() {
  const { state, dispatch } = useApp();
  const [device, setDevice] = useState('desktop');
  const [showGrid, setShowGrid] = useState(true);
  
  const handleRemoveComponent = (uniqueId) => {
    dispatch({ type: 'REMOVE_COMPONENT', payload: { componentId: uniqueId } });
  };
  
  const handleUndo = () => {
    dispatch({ type: 'UNDO', payload: {} });
  };
  
  const handleRedo = () => {
    dispatch({ type: 'REDO', payload: {} });
  };
  
  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;
  
  // Calculate canvas width based on device
  const getCanvasWidth = () => {
    switch (device) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'w-full';
    }
  };
  
  const getCanvasHeight = () => {
    switch (device) {
      case 'mobile': return 'min-h-[667px]';
      case 'tablet': return 'min-h-[1024px]';
      default: return 'min-h-[800px]';
    }
  };
  
  // Get preview component for a given component
  const getPreviewComponent = (component) => {
    const PreviewComponent = componentMap[component.id];
    if (PreviewComponent) {
      return <PreviewComponent />;
    }
    // Default placeholder for unmapped components
    return (
      <div className="p-6 rounded-xl glass border border-[rgba(255,255,255,0.1)]">
        <div className="aspect-video rounded-lg bg-gradient-to-r from-purple-600/20 to-cyan-600/20 mb-4 flex items-center justify-center">
          <Layout className="w-12 h-12 text-purple-500" />
        </div>
        <h4 className="text-white font-medium">{component.name}</h4>
        <p className="text-gray-500 text-xs">Component Preview</p>
      </div>
    );
  };
  
  // Determine layout based on components
  const getLayoutType = () => {
    const hasNavbar = state.addedComponents.some(c => c.id === 'navbar');
    const hasHero = state.addedComponents.some(c => c.id === 'hero');
    const hasFooter = state.addedComponents.some(c => c.id === 'footer');
    
    if (hasNavbar && hasHero && hasFooter) return 'full';
    if (hasNavbar || hasHero) return 'with-header';
    if (hasFooter) return 'with-footer';
    return 'stacked';
  };
  
  const layoutType = getLayoutType();
  
  return (
    <main className="flex-1 flex flex-col h-full bg-[#0a0a0f] overflow-hidden">
      {/* Toolbar */}
      <div className="h-12 glass border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between px-4">
        {/* Device Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg glass">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-2 rounded-md transition-colors ${
              device === 'desktop' ? 'bg-[#a855f7] text-white' : 'text-[#a1a1aa] hover:text-white'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`p-2 rounded-md transition-colors ${
              device === 'tablet' ? 'bg-[#a855f7] text-white' : 'text-[#a1a1aa] hover:text-white'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-2 rounded-md transition-colors ${
              device === 'mobile' ? 'bg-[#a855f7] text-white' : 'text-[#a1a1aa] hover:text-white'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
        
        {/* Layout Info */}
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
          {state.addedComponents.length > 0 && (
            <span className="text-purple-400 capitalize">{layoutType} layout</span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded-md transition-colors ${
              showGrid ? 'text-[#a855f7]' : 'text-[#a1a1aa] hover:text-white'
            }`}
            title="Toggle Grid"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button 
            onClick={handleUndo}
            disabled={!canUndo}
            className={`p-2 rounded-md transition-colors ${canUndo ? 'text-[#a1a1aa] hover:text-white' : 'text-[#52525b] cursor-not-allowed'}`} 
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button 
            onClick={handleRedo}
            disabled={!canRedo}
            className={`p-2 rounded-md transition-colors ${canRedo ? 'text-[#a1a1aa] hover:text-white' : 'text-[#52525b] cursor-not-allowed'}`} 
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-[rgba(255,255,255,0.1)] mx-2" />
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <Eye className="w-4 h-4" />
            Preview
          </button>
        </div>
      </div>
      
      {/* Canvas Area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center items-start">
        <motion.div 
          className={`${getCanvasHeight()} bg-[#12121a] rounded-2xl transition-all duration-300 overflow-hidden ${
            showGrid ? 'bg-dots' : ''
          } shadow-2xl`}
          style={{
            width: device === 'mobile' ? 375 : device === 'tablet' ? 768 : '100%',
            minWidth: device === 'mobile' ? 375 : device === 'tablet' ? 768 : 800,
            backgroundImage: showGrid 
              ? `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)` 
              : 'none',
            backgroundSize: '40px 40px',
          }}
        >
          {/* Empty State with Glowing KRYNOX Logo */}
          {state.addedComponents.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <motion.div 
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Glow Effect */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl"
                  animate={{ 
                    boxShadow: [
                      '0 0 40px rgba(168, 85, 247, 0.4)',
                      '0 0 80px rgba(168, 85, 247, 0.6)',
                      '0 0 40px rgba(168, 85, 247, 0.4)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Logo */}
                <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-600 flex items-center justify-center mb-6 border border-purple-500/50">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-1 rounded-2xl border border-white/10"
                  />
                  <span className="text-4xl font-black text-white tracking-tighter">K</span>
                </div>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mb-2"
              >
                KRYNOX
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 mb-8 max-w-md"
              >
                Drag high-value modules here to initialize your infrastructure
              </motion.p>
              
              {/* Quick Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3 justify-center"
              >
                <div className="px-4 py-2 rounded-lg glass border border-purple-500/30 text-purple-300 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Try: "Add a Navbar"
                </div>
                <div className="px-4 py-2 rounded-lg glass border border-cyan-500/30 text-cyan-300 text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Try: "Add Crypto Charts"
                </div>
                <div className="px-4 py-2 rounded-lg glass border border-yellow-500/30 text-yellow-300 text-sm flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Try: "AI Assistant"
                </div>
              </motion.div>
              
              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex items-center gap-6 text-xs text-gray-500"
              >
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3" /> 170+ Components
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" /> 11 Categories
                </span>
              </motion.div>
            </div>
          ) : (
            /* Live Preview Canvas */
            <div className="w-full">
              <AnimatePresence mode="popLayout">
                {state.addedComponents.map((component, index) => {
                  const PreviewComponent = componentMap[component.id];
                  
                  // Smart positioning based on component type
                  const getPosition = () => {
                    if (component.id === 'navbar') return 'sticky top-0 z-50';
                    if (component.id === 'footer') return 'relative';
                    return 'relative';
                  };
                  
                  return (
                    <motion.div
                      key={component.uniqueId}
                      layout
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 25,
                        layout: { type: "spring", stiffness: 500, damping: 35 }
                      }}
                      className={`${getPosition()} group`}
                    >
                      {/* Live Preview */}
                      <div className="w-full">
                        {getPreviewComponent(component)}
                      </div>
                      
                      {/* Delete Button */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveComponent(component.uniqueId);
                        }}
                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#ef4444] text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                      
                      {/* Component Label */}
                      <div className="absolute -top-3 left-3 px-2 py-1 rounded bg-purple-600/80 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {component.name}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Canvas Footer Info */}
      <div className="h-10 glass border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between px-4 text-xs text-[#71717a]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Layout className="w-3 h-3" />
            {state.addedComponents.length} components
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Monitor className="w-3 h-3" />
            {device.charAt(0).toUpperCase() + device.slice(1)}
          </span>
          {layoutType !== 'stacked' && (
            <>
              <span>•</span>
              <span className="text-purple-400 capitalize">{layoutType} layout</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#a855f7] flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Project Value: ${state.billTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </main>
  );
}
