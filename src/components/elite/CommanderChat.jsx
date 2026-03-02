import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Send, X, ChevronUp, ChevronDown, Activity, Zap, Brain, LineChart, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CommanderChat() {
  const { state, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'system', 
      text: '[SYSTEM]: Elite Tier Assets Detected.',
      time: new Date().toLocaleTimeString()
    },
    { 
      id: 2, 
      type: 'commander', 
      text: 'Welcome, Architect. Your infrastructure has reached $3,000+. I am now calculating the most profitable crypto strategies for your platform. What would you like to optimize?',
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const commanderResponses = [
    "Analyzing market volatility... Strategy adjusted for maximum yield.",
    "Gas optimization in progress. Estimated savings: 15% on transactions.",
    "Cross-exchange arbitrage opportunity detected. Potential profit: 2.3%",
    "Portfolio rebalancing recommended. AI predicts 87% confidence for ETH breakout.",
    "Risk assessment complete. Shield protocols active for your assets.",
    "Smart contract audit running... No vulnerabilities detected.",
    "Yield farming optimization active. APY increased to 12.4%",
    " Whale movement detected. Adjusting trading parameters...",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate commander typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const randomResponse = commanderResponses[Math.floor(Math.random() * commanderResponses.length)];
      const commanderMessage = {
        id: Date.now() + 1,
        type: 'commander',
        text: randomResponse,
        time: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, commanderMessage]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Don't render if not unlocked
  if (!state.isCommanderUnlocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed bottom-6 right-6 w-96 bg-[#0f0f0f] border-2 border-purple-500/50 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] overflow-hidden z-[100]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Bot className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <span className="text-white font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                KRYNOX Commander
                <Sparkles className="w-3 h-3 text-yellow-300" />
              </span>
              <span className="text-[10px] text-purple-200 flex items-center gap-1">
                <Activity className="w-2 h-2" /> Elite AI Active
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white/80 hover:text-white transition-colors"
          >
            {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 320 }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              {/* Stats Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-black/30 border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-[10px] text-green-400 font-mono">Auto-Trading: ON</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-3 h-3 text-cyan-400" />
                  <span className="text-[10px] text-cyan-400 font-mono">AI: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-purple-400" />
                  <span className="text-[10px] text-purple-400 font-mono">Risk: Low</span>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 h-64 overflow-y-auto text-gray-300 font-mono text-xs space-y-3 bg-[#0a0a0a]">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] p-3 rounded-lg ${
                      msg.type === 'system' 
                        ? 'bg-purple-900/30 border border-purple-500/30 text-purple-300' 
                        : msg.type === 'user'
                          ? 'bg-cyan-900/30 border border-cyan-500/30 text-cyan-200'
                          : 'bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-purple-500/30 text-white'
                    }`}>
                      {msg.type === 'system' && <span className="text-[10px] text-purple-400 block mb-1">[SYSTEM]</span>}
                      {msg.type === 'commander' && <span className="text-[10px] text-cyan-400 block mb-1 flex items-center gap-1"><Bot className="w-2 h-2" /> Commander</span>}
                      {msg.type === 'user' && <span className="text-[10px] text-cyan-300 block mb-1">You</span>}
                      <p>{msg.text}</p>
                      <span className="text-[9px] text-gray-500 mt-1">{msg.time}</span>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-purple-400"
                  >
                    <Bot className="w-3 h-3 animate-pulse" />
                    <span className="text-[10px]">Commander is analyzing...</span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-[10px]"
                    >●</motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                      className="text-[10px]"
                    >●</motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                      className="text-[10px]"
                    >●</motion.span>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-gray-800 bg-[#0f0f0f]">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask the Commander..." 
                    className="flex-1 bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 outline-none font-mono placeholder:text-gray-600"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 p-2 rounded-lg text-white"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimized State */}
        {!isOpen && (
          <div className="p-3 bg-[#0a0a0a] flex items-center justify-center gap-2">
            <LineChart className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] text-purple-400 font-mono">Commander Active - Click to expand</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
