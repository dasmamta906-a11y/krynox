import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Rocket, Menu, X, Layers, BookOpen, DollarSign, Home, Wallet, User, ChevronDown, Bitcoin, Car, Bot, Zap, Briefcase, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ViewModeSwitcher from './ViewModeSwitcher';

export default function Header({ currentView = 'editor', onNavigate }) {
  const { state, dispatch } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [componentsDropdownOpen, setComponentsDropdownOpen] = useState(false);
  const [documentationOpen, setDocumentationOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setComponentsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleLaunchClick = () => {
    dispatch({ type: 'TOGGLE_INVOICE_MODAL', payload: {} });
  };
  
  const handleTemplatesClick = () => {
    onNavigate('templates');
  };
  
  // Navigation menu items
  const navItems = [
    { id: 'templates', label: 'Templates', action: handleTemplatesClick },
    { id: 'documentation', label: 'Documentation', action: () => setDocumentationOpen(true) },
    { id: 'pricing', label: 'Pricing', action: () => onNavigate('pricing') },
  ];
  
  // Components dropdown items
  const componentCategories = [
    { id: 'crypto', label: 'Crypto & DeFi', icon: Bitcoin, count: 15 },
    { id: 'mobility', label: 'Ride-Hailing', icon: Car, count: 12 },
    { id: 'ai', label: 'AI Modules', icon: Bot, count: 8 },
    { id: 'enterprise', label: 'Enterprise', icon: Briefcase, count: 10 },
    { id: 'web', label: 'Web UI', icon: Globe, count: 25 },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] h-16 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo - Left Side */}
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center"
              animate={{ 
                boxShadow: ['0 0 20px rgba(168,85,247,0.4)', '0 0 40px rgba(168,85,247,0.6)', '0 0 20px rgba(168,85,247,0.4)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Orbitron, sans-serif' }}>K</span>
            </motion.div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>KRYNOX</h1>
            </div>
          </div>
          
          {/* Right Section - Menu */}
          <div className="flex items-center gap-4">
            {/* Menu Items */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={handleTemplatesClick}
                className="px-3 py-2 text-[#a1a1aa] hover:text-white text-sm font-medium transition-colors"
              >
                Templates
              </button>
              <button
                onClick={() => setDocumentationOpen(true)}
                className="px-3 py-2 text-[#a1a1aa] hover:text-white text-sm font-medium transition-colors"
              >
                Docs
              </button>
            </div>
            
            {/* Connect Wallet Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-xl text-white font-medium text-sm"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </motion.button>
            
            {/* User Profile Icon */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <User className="w-5 h-5 text-white" />
            </motion.button>
            
            {/* Mobile Hamburger Menu */}
            <button 
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-[99] lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#a1a1aa] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium">{item.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              ))}
              
              {/* Mobile Connect Wallet */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-xl text-white font-medium mt-4"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Documentation Drawer */}
      <AnimatePresence>
        {documentationOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[101]"
              onClick={() => setDocumentationOpen(false)}
            />
            
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-[#0f0f0f] border-l border-white/10 z-[102] overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="sticky top-0 bg-[#0f0f0f] border-b border-white/10 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Documentation</h2>
                  <p className="text-sm text-[#71717a] mt-1">Learn how to use KRYNOX</p>
                </div>
                <button 
                  onClick={() => setDocumentationOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              {/* Drawer Content */}
              <div className="p-6 space-y-6">
                {/* Getting Started */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#a855f7]/20 flex items-center justify-center text-[#a855f7]">1</span>
                    Getting Started
                  </h3>
                  <div className="pl-8 space-y-2 text-sm text-[#a1a1aa]">
                    <p>KRYNOX is an AI-powered website and app builder. Start by:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Choosing a template or starting from scratch</li>
                      <li>Using AI to generate components</li>
                      <li>Customizing the design and content</li>
                    </ul>
                  </div>
                </div>
                
                {/* Components */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#a855f7]/20 flex items-center justify-center text-[#a855f7]">2</span>
                    Using Components
                  </h3>
                  <div className="pl-8 space-y-2 text-sm text-[#a1a1aa]">
                    <p>Browse our 170+ pre-built components:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><span className="text-[#a855f7]">Crypto:</span> Wallets, trading, DeFi</li>
                      <li><span className="text-[#a855f7]">Mobility:</span> Ride-hailing, delivery</li>
                      <li><span className="text-[#a855f7]">AI:</span> Chatbots, analytics</li>
                      <li><span className="text-[#a855f7]">Enterprise:</span> CRM, ERP, dashboards</li>
                    </ul>
                  </div>
                </div>
                
                {/* AI Features */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#a855f7]/20 flex items-center justify-center text-[#a855f7]">3</span>
                    AI Features
                  </h3>
                  <div className="pl-8 space-y-2 text-sm text-[#a1a1aa]">
                    <p>Use the Floating AI Command Center to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Describe your project in plain English</li>
                      <li>Generate entire websites from prompts</li>
                      <li>Modify specific sections</li>
                    </ul>
                  </div>
                </div>
                
                {/* Tips */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#a855f7]/10 to-[#ec4899]/10 border border-[#a855f7]/20">
                  <p className="text-sm text-white font-medium">💡 Pro Tip</p>
                  <p className="text-xs text-[#a1a1aa] mt-1">Try: "Build an Uber clone with crypto payments" - the AI will automatically select the right components!</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
