import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, X, Code, MessageSquare, Zap, ChevronRight, Copy, Check } from 'lucide-react';

export default function DocumentationView({ onClose }) {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState(null);
  
  const sections = [
    { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
    { id: 'commands', label: 'AI Commands', icon: MessageSquare },
    { id: 'api', label: 'API Integration', icon: Code },
    { id: 'billing', label: 'Billing System', icon: Zap },
  ];
  
  const commands = [
    { cmd: 'add navbar', desc: 'Add a glassmorphism navbar to your canvas' },
    { cmd: 'add crypto wallet', desc: 'Add multi-wallet connect component' },
    { cmd: 'add mobility engine', desc: 'Add Uber/Ola clone tools' },
    { cmd: 'add dashboard', desc: 'Add admin dashboard' },
    { cmd: 'add ai chatbot', desc: 'Add AI chatbot to your project' },
    { cmd: 'show pricing', desc: 'View subscription tiers' },
    { cmd: 'create template', desc: 'Generate a complete template' },
  ];
  
  const apiExamples = [
    {
      title: 'Wallet Connection',
      code: `// Connect MetaMask
const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    return accounts[0];
  }
}`,
      language: 'javascript'
    },
    {
      title: 'TradingView Chart Integration',
      code: `// Initialize TradingView Widget
new TradingView.widget({
  "autosize": true,
  "symbol": "BINANCE:BTCUSDT",
  "interval": "D",
  "theme": "dark",
  "style": "1",
  "locale": "en"
});`,
      language: 'javascript'
    },
    {
      title: 'AI Chat Integration',
      code: `// Initialize KRYNOX AI
const ai = new KrynoxAI({
  apiKey: 'your-api-key',
  memory: '2years',
  persona: 'elite'
});`,
      language: 'javascript'
    }
  ];
  
  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl glass"
      >
        {/* Header */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Documentation</h2>
              <p className="text-sm text-[#a1a1aa]">Learn how to use KRYNOX</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[rgba(255,255,255,0.1)]">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex h-[60vh]">
          {/* Sidebar */}
          <div className="w-64 border-r border-[rgba(255,255,255,0.1)] p-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeSection === section.id 
                      ? 'bg-[#a855f7]/20 text-[#a855f7]' 
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeSection === 'getting-started' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-xl font-bold text-white mb-4">Getting Started with KRYNOX</h3>
                <div className="space-y-4 text-[#a1a1aa]">
                  <p>Welcome to KRYNOX - the ultimate AI-powered crypto builder platform. This guide will help you get started.</p>
                  
                  <div className="p-4 rounded-xl glass">
                    <h4 className="text-white font-semibold mb-2">Step 1: Choose Your Tools</h4>
                    <p className="text-sm">Browse through our 170+ pre-built components and drag them to your canvas. You can also use templates for quick setup.</p>
                  </div>
                  
                  <div className="p-4 rounded-xl glass">
                    <h4 className="text-white font-semibold mb-2">Step 2: AI Assistance</h4>
                    <p className="text-sm">Use the KRYNOX AI assistant to add components, modify your project, or get recommendations for your infrastructure.</p>
                  </div>
                  
                  <div className="p-4 rounded-xl glass">
                    <h4 className="text-white font-semibold mb-2">Step 3: Launch Your Project</h4>
                    <p className="text-sm">When you're ready, click "Launch Project" to see your invoice and download the source code.</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeSection === 'commands' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-xl font-bold text-white mb-4">AI Command List</h3>
                <p className="text-[#a1a1aa] mb-4">Use these commands with the KRYNOX AI assistant:</p>
                <div className="space-y-2">
                  {commands.map((cmd, index) => (
                    <div key={index} className="p-3 rounded-xl glass flex items-center justify-between">
                      <div>
                        <code className="text-[#a855f7] font-mono">"{cmd.cmd}"</code>
                        <p className="text-sm text-[#71717a] mt-1">{cmd.desc}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#71717a]" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeSection === 'api' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-xl font-bold text-white mb-4">API Integration</h3>
                <p className="text-[#a1a1aa] mb-4">Code examples for integrating KRYNOX components:</p>
                <div className="space-y-4">
                  {apiExamples.map((example, index) => (
                    <div key={index} className="rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a]">
                        <span className="text-sm text-white">{example.title}</span>
                        <button 
                          onClick={() => handleCopy(example.code, index)}
                          className="p-1 rounded text-[#71717a] hover:text-white"
                        >
                          {copiedCode === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <pre className="p-4 bg-[#0a0a0a] text-sm text-[#a1a1aa] overflow-x-auto">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeSection === 'billing' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-xl font-bold text-white mb-4">Billing System</h3>
                <div className="space-y-4 text-[#a1a1aa]">
                  <p>KRYNOX uses a hidden billing system to provide a seamless building experience.</p>
                  
                  <div className="p-4 rounded-xl glass">
                    <h4 className="text-white font-semibold mb-2">How It Works</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Add components to your canvas using the sidebar or AI</li>
                      <li>• The system tracks your "Project Value" in the background</li>
                      <li>• Prices are only revealed when you launch your project</li>
                      <li>• At $3,000+, you unlock the Elite AI Commander</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-xl glass border border-[#a855f7]/30">
                    <h4 className="text-white font-semibold mb-2">Note</h4>
                    <p className="text-sm">Project-specific infrastructure costs are calculated at launch. The AI Crypto Commander subscription is billed separately at $500/week.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
