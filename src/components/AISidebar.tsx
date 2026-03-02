import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Copy, Code2, Sparkles, Settings, X, ChevronDown, Zap, Brain, MessageSquare } from 'lucide-react';

// AI Model types
type AIModel = 'gemini' | 'gpt4' | 'claude';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  model?: AIModel;
  timestamp: Date;
}

interface AISidebarProps {
  onClose: () => void;
  editorContent?: string;
  selectedCode?: string;
  fileName?: string;
}

// Mock AI responses for demo
const mockAIResponses: Record<AIModel, string[]> = {
  gemini: [
    "I've analyzed your code. Here's what I found:\n\nThe function `map` creates a new array by applying a function to each element. This is useful for transforming data.\n\n```javascript\nconst doubled = numbers.map(x => x * 2);\n```\n\nWould you like me to explain any specific part?",
    "Looking at your code, I can see you're using React hooks. The `useState` hook manages component state.\n\n```tsx\nconst [count, setCount] = useState(0);\n```\n\nThis creates a state variable `count` with initial value `0`, and `setCount` is the function to update it.",
  ],
  gpt4: [
    "I see you're working with TypeScript! Let me help optimize this code:\n\n```typescript\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst getUserById = (id: number): User | undefined => {\n  return users.find(user => user.id === id);\n};\n```\n\nThis pattern provides type safety while finding users by ID.",
    "Your code looks good! Here's a suggestion to improve performance:\n\n```javascript\n// Instead of multiple filters, combine them\nconst result = items\n  .filter(item => item.active)\n  .map(item => item.value)\n  .reduce((sum, val) => sum + val, 0);\n```",
  ],
  claude: [
    "I'd be happy to help explain your code! Looking at the structure:\n\n```javascript\n// Your code uses modern ES6+ features\nconst processData = async (data) => {\n  const results = await Promise.all(\n    data.map(async item => {\n      const processed = await transform(item);\n      return processed;\n    })\n  );\n  return results;\n};\n```\n\nThis pattern handles concurrent async operations efficiently.",
    "I notice you're using console methods. Here's a quick reference:\n\n| Method | Use Case |\n|--------|----------|\n| `console.log()` | General output |\n| `console.error()` | Error messages |\n| `console.warn()` | Warnings |\n| `console.debug()` | Debug info |",
  ]
};

export default function AISidebar({ onClose, editorContent = '', selectedCode = '', fileName = 'Untitled' }: AISidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: `👋 Welcome to **Krynox AI**!\n\nI'm here to help you with:\n- 📝 **Code explanations**\n- 🐛 **Bug detection & fixes**\n- 💡 **Code optimization**\n- 📖 **Documentation**\n- 🔧 **Refactoring suggestions**\n\nJust select any code in the editor or ask me a question!\n\n_current file: ${fileName}_`,
      model: 'gemini',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState<AIModel>('gemini');
  const [isTyping, setIsTyping] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [input]);

  const getModelName = (model: AIModel): string => {
    switch (model) {
      case 'gemini': return 'Gemini 1.5 Pro';
      case 'gpt4': return 'GPT-4o';
      case 'claude': return 'Claude 3.5 Sonnet';
    }
  };

  const getModelColor = (model: AIModel): string => {
    switch (model) {
      case 'gemini': return 'from-blue-500 to-purple-500';
      case 'gpt4': return 'from-green-500 to-emerald-500';
      case 'claude': return 'from-orange-500 to-red-500';
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && !selectedCode) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: selectedCode ? `${input}\n\n\`\`\`\n${selectedCode}\n\`\`\`` : input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responses = mockAIResponses[selectedModel];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Add context from editor if available
      const contextMessage = editorContent 
        ? `Context from ${fileName}:\n\`\`\`\n${editorContent.substring(0, 500)}...\n\`\`\`\n\n---\n\n` 
        : '';
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: contextMessage + randomResponse,
        model: selectedModel,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const insertCodeToEditor = (code: string) => {
    console.log('Inserting code to editor:', code);
    // This would communicate with the EditorWorkspace component
    // to insert the code at the cursor position
  };

  const quickActions = [
    { label: 'Explain this code', icon: <MessageSquare size={14} />, prompt: 'Explain this code:' },
    { label: 'Fix bugs', icon: <Zap size={14} />, prompt: 'Find and fix bugs in this code:' },
    { label: 'Optimize', icon: <Sparkles size={14} />, prompt: 'Optimize this code:' },
    { label: 'Add comments', icon: <Code2 size={14} />, prompt: 'Add comments to this code:' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-[#333]">
      {/* Header with Model Selector */}
      <div className="p-3 border-b border-[#333] flex justify-between items-center bg-[#252526]">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          <span className="text-xs font-bold text-gray-300">KRYNOX AI</span>
        </div>
        
        {/* Model Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded bg-gradient-to-r ${getModelColor(selectedModel)} text-white text-xs font-medium`}
          >
            {getModelName(selectedModel)}
            <ChevronDown size={12} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-[#252526] border border-[#333] rounded shadow-lg z-50">
              {(['gemini', 'gpt4', 'claude'] as AIModel[]).map((model) => (
                <button
                  key={model}
                  onClick={() => {
                    setSelectedModel(model);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 hover:bg-[#37373d] ${
                    selectedModel === model ? 'bg-[#37373d]' : ''
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${getModelColor(model)}`} />
                  {getModelName(model)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`animate-fade-in`}>
            {/* Role indicator */}
            <div className="flex items-center gap-2 mb-1">
              {msg.role === 'ai' ? (
                <>
                  <Brain size={12} className="text-purple-400" />
                  <span className="text-xs text-gray-500">
                    {msg.model ? getModelName(msg.model) : 'AI'}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xs text-gray-500">You</span>
                </>
              )}
            </div>
            
            {/* Message bubble */}
            <div className={`p-3 rounded-lg text-sm ${
              msg.role === 'user' 
                ? 'bg-[#2d2d2d] ml-4 border border-[#3c3c3c]' 
                : 'bg-[#1a2b3c] mr-4 border border-blue-900/30'
            }`}>
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    code({ node, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      const codeContent = String(children).replace(/\n$/, '');
                      
                      if (match) {
                        return (
                          <div className="relative group my-2">
                            <pre className="bg-[#0d1117] rounded p-3 overflow-x-auto text-xs">
                              <code className={className} {...props}>
                                {codeContent}
                              </code>
                            </pre>
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => copyToClipboard(codeContent)}
                                className="p-1 bg-[#333] rounded hover:bg-[#444] text-gray-300"
                                title="Copy"
                              >
                                <Copy size={12} />
                              </button>
                              <button
                                onClick={() => insertCodeToEditor(codeContent)}
                                className="p-1 bg-blue-600 rounded hover:bg-blue-700 text-white"
                                title="Insert to Editor"
                              >
                                <Code2 size={12} />
                              </button>
                            </div>
                          </div>
                        );
                      }
                      return <code className="bg-[#333] px-1 py-0.5 rounded text-xs" {...props}>{children}</code>;
                    },
                    table({ children }) {
                      return <div className="overflow-x-auto my-2"><table className="w-full text-xs border border-[#333]">{children}</table></div>;
                    },
                    th({ children }) {
                      return <th className="border border-[#333] px-2 py-1 bg-[#252526]">{children}</th>;
                    },
                    td({ children }) {
                      return <td className="border border-[#333] px-2 py-1">{children}</td>;
                    }
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 ml-4">
            <Brain size={12} className="text-purple-400" />
            <span className="text-xs text-gray-500">AI is typing...</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <div className="text-xs text-gray-500 mb-2">Quick actions:</div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => setInput(action.prompt + (selectedCode ? '\n\n' + selectedCode : ''))}
                className="flex items-center gap-1 px-2 py-1 bg-[#2d2d2d] hover:bg-[#37373d] rounded text-xs text-gray-400 border border-[#333]"
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-[#333]">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selectedCode ? "Ask about the selected code..." : "Ask Krynox AI anything..."}
            className="w-full bg-[#2a2d2e] p-3 text-sm rounded border border-[#444] focus:border-blue-500 focus:outline-none resize-none text-gray-200 placeholder-gray-500"
            rows={3}
          />
          
          {/* Selected code indicator */}
          {selectedCode && (
            <div className="absolute -top-8 left-0 right-0 bg-[#2d2d2d] rounded px-2 py-1 text-xs text-gray-400 border border-[#444] flex items-center gap-2">
              <Code2 size={12} />
              <span className="truncate flex-1">{selectedCode.substring(0, 50)}...</span>
              <button 
                onClick={() => setInput('')}
                className="text-gray-500 hover:text-white"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-[10px] text-gray-500">Press Enter to send, Shift+Enter for new line</span>
          <button
            onClick={sendMessage}
            disabled={!input.trim() && !selectedCode}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 rounded text-sm font-medium text-white transition-all"
          >
            <Send size={14} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
