import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, X, MemoryStick, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function LeftSidebar() {
  const { state, dispatch } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [memoryExpanded, setMemoryExpanded] = useState(true);
  const messagesEndRef = useRef(null);
  
  const messages = state.chatMessages.length > 0 
    ? state.chatMessages 
    : [
        { id: 1, role: 'assistant', content: 'Hello! I\'m KRYNOX AI, your elite building assistant. I can help you create powerful crypto infrastructure, from wallets to exchanges. What would you like to build today?', timestamp: new Date().toISOString() }
      ];
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // AI responses that encourage adding Super Tools
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: { message: userMessage } });
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response - encourage high-level infrastructure
    setTimeout(() => {
      const responses = [
        "I've added the Multi-Wallet Connect component to your canvas. For a complete exchange, consider adding our Token Swap and TradingView Charts - powerful pro tools!",
        "Great choice! To make this a full-featured platform, I recommend adding the Fleet Tracking and Auto-Dispatch systems - these Super Tools will set your project apart.",
        "I can see you're building something powerful. For enterprise-level functionality, consider adding the SaaS Subscription module and AI Sales Avatar - these are game-changers!",
        "For a complete crypto exchange, you'll want the Wallet Balance Dashboard, Liquidity Pool Tracker, and Yield Farming calculator - these are must-haves for any serious DeFi project.",
        "To take this to the next level, add the God-Eye Master Dashboard and User Management Vault - these Enterprise modules will give you complete control.",
      ];
      
      const inputLower = input.toLowerCase();
      let randomResponse;
      
      // Tailor response based on user input
      if (inputLower.includes('taxi') || inputLower.includes('uber') || inputLower.includes('ola') || inputLower.includes('mobility')) {
        randomResponse = "I've added the basic mobility components. For a complete ride-sharing platform, add our Super Tools: Live Fleet Tracking, Surge Pricing Engine, and Auto-Dispatch System - these are essential for production apps!";
      } else if (inputLower.includes('exchange') || inputLower.includes('swap') || inputLower.includes('trade')) {
        randomResponse = "Perfect for DeFi! To build a complete exchange, add these Pro tools: TradingView Charts, Token Swap UI, and Liquidity Pool Tracker - your users will love the professional features!";
      } else if (inputLower.includes('dashboard') || inputLower.includes('admin')) {
        randomResponse = "Great choice! The God-Eye Master Dashboard is our most powerful Enterprise module. Add User Management, Revenue Center, and Security Monitor for complete control.";
      } else {
        randomResponse = responses[Math.floor(Math.random() * responses.length)];
      }
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date().toISOString()
      };
      
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: { message: aiMessage } });
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <aside className="w-80 h-full glass border-r border-[rgba(255,255,255,0.1)] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center"
            animate={{ 
              boxShadow: ['0 0 15px rgba(168,85,247,0.4)', '0 0 30px rgba(168,85,247,0.6)', '0 0 15px rgba(168,85,247,0.4)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Bot className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h2 className="text-white font-semibold">KRYNOX AI</h2>
            <p className="text-xs text-[#a1a1aa]">Elite Building Assistant</p>
          </div>
        </div>
      </div>
      
      {/* Memory Status */}
      <div className="p-3 border-b border-[rgba(255,255,255,0.1)]">
        <button 
          onClick={() => setMemoryExpanded(!memoryExpanded)}
          className="w-full flex items-center justify-between text-sm text-[#a1a1aa] hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <MemoryStick className="w-4 h-4" />
            <span>Memory Status</span>
          </div>
          {memoryExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        <AnimatePresence>
          {memoryExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 space-y-2 text-xs"
            >
              <div className="flex justify-between">
                <span className="text-[#a1a1aa]">Conversations:</span>
                <span className="text-white">{state.aiMemory.conversationHistory.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a1a1aa]">Projects:</span>
                <span className="text-white">{state.aiMemory.projectHistory?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a1a1aa]">Preferences:</span>
                <span className="text-[#a855f7]">Saved (2 Years)</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' 
                    ? 'bg-[#a855f7]' 
                    : 'glass'
                }`}>
                  {msg.role === 'user' 
                    ? <User className="w-4 h-4 text-white" />
                    : <Bot className="w-4 h-4 text-[#a855f7]" />
                  }
                </div>
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-[#a855f7] text-white rounded-tr-sm'
                    : 'glass text-[#e4e4e7] rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
              <p className={`text-[10px] text-[#71717a] mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-[#a1a1aa] text-sm"
          >
            <div className="flex gap-1">
              <motion.span 
                className="w-2 h-2 rounded-full bg-[#a855f7]"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
              />
              <motion.span 
                className="w-2 h-2 rounded-full bg-[#a855f7]"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
              />
              <motion.span 
                className="w-2 h-2 rounded-full bg-[#a855f7]"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
              />
            </div>
            <span>ARCANE is thinking...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask ARCANE to add Super Tools..."
            className="input-glass flex-1 text-sm"
          />
          <motion.button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-lg bg-[#a855f7] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </aside>
  );
}
