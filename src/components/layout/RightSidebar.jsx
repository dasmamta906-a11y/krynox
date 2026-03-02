import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { 
  Search, Layout, FormInput, MousePointer, Box, Bitcoin, Car, Building, 
  Settings, Sparkles, Crown, GripVertical, Plus, X, Layers, Grid3X3,
  Zap, Brain, Shield, Activity, Wallet, FileText, MessageSquare, Calculator,
  Globe, Server, Database, Cloud, Lock, Eye, Terminal, Cpu, Network,
  Smartphone, Tablet, Monitor, LineChart, BarChart3, Menu, Bell, User, Star,
  Quote, MapPin, Clock, DollarSign, TrendingUp, Send, CreditCard, Image,
  Video, Music, Folder, Upload, PlayCircle, Pause, Volume2, Maximize2,
  RotateCw, RefreshCw, ChevronDown, Binary, ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { componentLibrary } from '../../data/components';

// Icon mapping - no duplicates
const iconMap = {
  Layout, FormInput, MousePointer, Box, Bitcoin, Car, Building, Settings, 
  Sparkles, Crown, Layers, Zap, Brain, Shield, Activity, Wallet, FileText,
  MessageSquare, Calculator, Globe, Server, Database, Cloud, Lock, Eye,
  Terminal, Cpu, Network, Smartphone, Tablet, Monitor, Grid3X3,
  Menu, Bell, User, Star, Quote, MapPin, Clock, DollarSign, TrendingUp,
  Send, CreditCard, Image, Video, Music, Folder, Upload,
  PlayCircle, Pause, Volume2, Maximize2, RotateCw, RefreshCw, ChevronDown,
  LineChart, BarChart3, Binary, ShieldAlert,
};

// Category mapping
const categoryMap = {
  all: { label: 'All', icon: Grid3X3 },
  layouts: { label: 'Standard', icon: Layout },
  forms: { label: 'Standard', icon: FormInput },
  buttons: { label: 'Standard', icon: MousePointer },
  elements: { label: 'Standard', icon: Box },
  crypto: { label: 'Crypto Pro', icon: Bitcoin },
  mobility: { label: 'Mobility Super', icon: Car },
  enterprise: { label: 'Enterprise', icon: Building },
  admin: { label: 'Enterprise Admin', icon: Settings },
  ai: { label: 'AI Intelligence', icon: Sparkles },
  elite: { label: 'Elite Tier', icon: Crown },
  templates: { label: 'Templates', icon: Layers },
};

// Draggable Tool Card
function DraggableToolCard({ component, isAdded }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: component.id,
    data: { component },
  });
  
  const Icon = iconMap[component.icon] || Box;
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 1000 : 1,
  } : undefined;
  
  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className={`p-3 rounded-xl cursor-grab active:cursor-grabbing transition-all group relative ${
        isDragging ? 'opacity-50' : ''
      } ${
        isAdded 
          ? 'glass border-[#a855f7] border' 
          : 'glass hover:border-[rgba(255,255,255,0.2)]'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isAdded ? 'bg-[#a855f7]' : 'bg-[rgba(255,255,255,0.1)] group-hover:bg-[rgba(168,85,247,0.2)]'
        }`}>
          <Icon className={`w-4 h-4 ${isAdded ? 'text-white' : 'text-[#a1a1aa]'}`} />
        </div>
        {isAdded ? (
          <span className="text-[10px] text-[#a855f7] font-medium">Added</span>
        ) : (
          <Plus className="w-4 h-4 text-[#71717a] opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      <h3 className="text-xs font-medium text-white line-clamp-2">{component.name}</h3>
      <p className="text-[10px] text-[#71717a] mt-1 opacity-0">
        ${component.price}
      </p>
    </motion.div>
  );
}

// Category Pills
function CategoryPills({ activeCategory, onCategoryChange, counts }) {
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'standard', label: 'Standard' },
    { id: 'crypto', label: 'Crypto Pro' },
    { id: 'mobility', label: 'Mobility Super' },
    { id: 'enterprise', label: 'Enterprise Admin' },
    { id: 'ai', label: 'AI Intelligence' },
    { id: 'elite', label: 'Elite' },
  ];
  
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
            }`}
          >
            {cat.label}
            {counts[cat.id] > 0 && (
              <span className={`ml-1.5 text-[10px] ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
                ({counts[cat.id]})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function RightSidebar() {
  const { state, dispatch, COMPONENT_PRICES } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Flatten all components from all categories
  const allComponents = useMemo(() => {
    const components = [];
    Object.entries(componentLibrary).forEach(([category, items]) => {
      items.forEach(item => {
        components.push({ ...item, sourceCategory: category });
      });
    });
    return components;
  }, []);
  
  // Map components to new category structure
  const getComponentCategory = (sourceCategory) => {
    const map = {
      layouts: 'standard',
      forms: 'standard',
      buttons: 'standard',
      elements: 'standard',
      crypto: 'crypto',
      mobility: 'mobility',
      enterprise: 'enterprise',
      admin: 'enterprise',
      ai: 'ai',
      elite: 'elite',
      templates: 'standard',
    };
    return map[sourceCategory] || 'standard';
  };
  
  // Filter components by category and search
  const filteredComponents = useMemo(() => {
    let filtered = allComponents;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(comp => 
        getComponentCategory(comp.sourceCategory) === activeCategory
      );
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(comp => 
        comp.name.toLowerCase().includes(query) ||
        comp.id.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [allComponents, activeCategory, searchQuery]);
  
  // Count components by category
  const categoryCounts = useMemo(() => {
    const counts = { all: allComponents.length };
    ['standard', 'crypto', 'mobility', 'enterprise', 'ai', 'elite'].forEach(cat => {
      counts[cat] = allComponents.filter(comp => 
        getComponentCategory(comp.sourceCategory) === cat
      ).length;
    });
    return counts;
  }, [allComponents]);
  
  const handleAddComponent = (component) => {
    const newComponent = {
      ...component,
      uniqueId: `${component.id}-${Date.now()}`,
      id: Date.now(),
    };
    dispatch({ type: 'ADD_COMPONENT', payload: { component: newComponent } });
  };
  
  return (
    <aside className="w-80 h-full glass border-l border-[rgba(255,255,255,0.1)] flex flex-col">
      <div className="p-4 border-b border-[rgba(255,255,255,0.1)]">
        <h2 className="text-white font-semibold mb-3">KRYNOX Toolbox</h2>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717a]" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-glass w-full pl-10 pr-10 text-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      <div className="border-b border-[rgba(255,255,255,0.1)]">
        <CategoryPills 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
          counts={categoryCounts}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        <motion.div 
          className="grid grid-cols-2 gap-2"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredComponents.map((component) => {
              const isAdded = state.addedComponents.some(c => c.id === component.id);
              const Icon = iconMap[component.icon] || Box;
              
              return (
                <motion.div
                  key={component.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-xl cursor-pointer transition-all group relative ${
                    isAdded 
                      ? 'glass border-[#a855f7] border' 
                      : 'glass hover:border-[rgba(255,255,255,0.2)]'
                  }`}
                  onClick={() => !isAdded && handleAddComponent(component)}
                >
                  {/* AI Ready Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isAdded ? 'bg-[#a855f7]' : 'bg-[rgba(255,255,255,0.1)] group-hover:bg-[rgba(168,85,247,0.2)]'
                    }`}>
                      <Icon className={`w-4 h-4 ${isAdded ? 'text-white' : 'text-[#a1a1aa]'}`} />
                    </div>
                    {isAdded ? (
                      <span className="text-[10px] text-[#a855f7] font-medium">Added</span>
                    ) : (
                      <span className="text-[8px] bg-purple-900/50 text-purple-300 px-1.5 py-0.5 rounded italic opacity-0 group-hover:opacity-100 transition-opacity">AI Ready</span>
                    )}
                  </div>
                  
                  <h3 className="text-xs font-medium text-white line-clamp-2">{component.name}</h3>
                  
                  {/* Description - shows on hover */}
                  <div className="mt-2 text-[10px] text-gray-400 line-clamp-2 group-hover:line-clamp-none transition-all font-mono">
                    {component.description || 'Initializing high-value KRYNOX module...'}
                  </div>
                  
                  {/* Hidden info - shows on hover */}
                  <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] text-green-400 font-mono">
                      ROI: +{Math.floor(Math.random() * 30 + 10)}%
                    </span>
                    <span className="text-[9px] text-blue-400 font-mono">
                      LATENCY: {Math.floor(Math.random() * 20 + 5)}ms
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="mt-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] text-[#a855f7] font-bold">
                      ${component.price}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {filteredComponents.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 px-4"
          >
            <div className="w-16 h-16 rounded-2xl glass mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-400 text-sm mb-2">No high-value modules found in this sector.</p>
            <p className="text-gray-600 text-xs">Try a different category or search term.</p>
          </motion.div>
        )}
      </div>
      
      <div className="p-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">
            {filteredComponents.length} modules
          </span>
          <span className="text-[#a855f7]">
            {state.addedComponents.length} selected
          </span>
        </div>
      </div>
    </aside>
  );
}
