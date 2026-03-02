import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Sparkles, Loader2, X, Code2, FileText, Wand2, Bug, BookOpen, Copy, Check, ChevronRight, Zap, MessageSquare, ArrowDown, Terminal, RefreshCw, Eye, EyeOff, CheckCircle, XCircle, Play, Settings, Cpu } from 'lucide-react';
import { callAI, ChatMessage } from '../services/ai';

// AI Models
const AI_MODELS = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', icon: '🤖' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5', provider: 'OpenAI', icon: '⚡' },
  { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', icon: '🧠' },
];

interface CursorAiPanelProps {
  code: string;
  onCodeUpdate: (newCode: string) => void;
  onClose?: () => void;
}

// Quick action buttons for common tasks
const QUICK_ACTIONS = [
  { id: 'generate', label: 'Generate Code', icon: Wand2, prompt: 'Generate' },
  { id: 'explain', label: 'Explain Code', icon: BookOpen, prompt: 'Explain' },
  { id: 'refactor', label: 'Refactor', icon: Code2, prompt: 'Refactor' },
  { id: 'fix', label: 'Fix Bugs', icon: Bug, prompt: 'Fix bugs in' },
  { id: 'docs', label: 'Add Comments', icon: FileText, prompt: 'Add documentation and comments to' },
  { id: 'optimize', label: 'Optimize', icon: Zap, prompt: 'Optimize performance of' },
];

export default function CursorAiPanel({ code, onCodeUpdate, onClose }: CursorAiPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '👋 Hi! I\'m your AI coding assistant, just like Cursor.\n\n**Quick Tips:**\n- Use **Cmd+K** (Mac) or **Ctrl+K** (Windows) for inline AI\n- Select code and ask me to explain, refactor, or fix it\n- Click quick actions below for common tasks' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const [suggestedCode, setSuggestedCode] = useState<string | null>(null);
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [aiStatus, setAiStatus] = useState<'idle' | 'thinking' | 'generating' | 'ready' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [temperature, setTemperature] = useState(0.7);
  const [showSettings, setShowSettings] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle quick action
  const handleQuickAction = async (action: typeof QUICK_ACTIONS[0]) => {
    const userMessage: ChatMessage = { role: 'user', content: `${action.prompt} this code:\n\`\`\`\n${code}\n\`\`\`` };
    setMessages(prev => [...prev, userMessage]);
    setShowActions(false);
    setLoading(true);
    setAiStatus('thinking');
    setStatusMessage('🤔 Analyzing your code...');

    try {
      setStatusMessage('⚡ Processing with AI...');
      setAiStatus('generating');
      
      const response = await callAI('chat', `${action.prompt} the following code:\n\n${code}`, code);
      
      if (response.status === 'success' && response.message) {
        // Check if there's code in the response
        const codeMatch = response.message.match(/```(?:\w+)?\n([\s\S]*?)```/);
        if (codeMatch) {
          setSuggestedCode(codeMatch[1]);
          setAiStatus('ready');
          setStatusMessage('✅ Code ready! Click Accept to apply.');
        } else {
          setAiStatus('ready');
          setStatusMessage('✅ Done!');
        }
        
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response.message || 'I\'ve analyzed your code.'
        }]);
      } else {
        setAiStatus('error');
        setStatusMessage('❌ Error: ' + (response.message || 'Failed'));
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Error: ${response.message || 'Failed to get response'}` 
        }]);
      }
    } catch (error) {
      setAiStatus('error');
      setStatusMessage('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown'));
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Handle message send
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowActions(false);
    setLoading(true);
    setAiStatus('thinking');
    setStatusMessage('🤔 Thinking...');

    try {
      // Check if user wants code generation
      const isCodeRequest = input.toLowerCase().includes('generate') || 
                           input.toLowerCase().includes('write code') ||
                           input.toLowerCase().includes('create function') ||
                           input.toLowerCase().includes('make');
      
      if (isCodeRequest) {
        setStatusMessage('⚡ Generating code...');
        setAiStatus('generating');
      }
      
      const response = await callAI(isCodeRequest ? 'edit' : 'chat', input, code);
      
      if (response.status === 'success') {
        if (isCodeRequest && response.updatedCode) {
          setSuggestedCode(response.updatedCode);
          setAiStatus('ready');
          setStatusMessage('✅ Code generated! Preview below.');
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'Here\'s the generated code:\n\n' + response.message
          }]);
        } else {
          setAiStatus('ready');
          setStatusMessage('✅ Done!');
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: response.message || 'I\'ve processed your request.'
          }]);
        }
      } else {
        setAiStatus('error');
        setStatusMessage('❌ Error: ' + (response.message || 'Failed'));
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Error: ${response.message || 'Failed to get response'}` 
        }]);
      }
    } catch (error) {
      setAiStatus('error');
      setStatusMessage('❌ Error: ' + (error instanceof Error ? error.message : 'Unknown'));
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Accept suggested code
  const acceptCode = () => {
    if (suggestedCode) {
      onCodeUpdate(suggestedCode);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '✅ Code applied successfully!' 
      }]);
      setSuggestedCode(null);
      setAiStatus('idle');
      setStatusMessage('');
    }
  };

  // Reject suggested code
  const rejectCode = () => {
    setSuggestedCode(null);
    setAiStatus('idle');
    setStatusMessage('');
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: 'Code rejected. Feel free to ask for modifications.' 
    }]);
  };

  // Copy code to clipboard
  const copyToClipboard = () => {
    if (suggestedCode) {
      navigator.clipboard.writeText(suggestedCode);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] border-l border-[#333]">
      {/* Header */}
      <div className="h-12 border-b border-[#333] flex items-center justify-between px-4 bg-[#252525]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm">AI Agent</h2>
            <p className="text-gray-400 text-xs">Cursor-style coding help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`p-2 rounded-lg transition-colors ${showLivePreview ? 'bg-purple-600 text-white' : 'bg-[#333] text-gray-400'}`}
            title="Toggle Live Preview"
          >
            {showLivePreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-[#333] rounded">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* AI Status Bar - LIVE */}
      {aiStatus !== 'idle' && (
        <div className={`px-4 py-2 border-b border-[#333] flex items-center justify-between ${
          aiStatus === 'ready' ? 'bg-green-900/30' :
          aiStatus === 'error' ? 'bg-red-900/30' :
          aiStatus === 'generating' ? 'bg-purple-900/30' : 'bg-yellow-900/30'
        }`}>
          <div className="flex items-center gap-2">
            {loading ? (
              <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
            ) : aiStatus === 'ready' ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : aiStatus === 'error' ? (
              <XCircle className="w-4 h-4 text-red-500" />
            ) : (
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            )}
            <span className={`text-xs ${
              aiStatus === 'ready' ? 'text-green-400' :
              aiStatus === 'error' ? 'text-red-400' :
              'text-yellow-400'
            }`}>
              {statusMessage}
            </span>
          </div>
          {aiStatus === 'ready' && suggestedCode && (
            <div className="flex gap-1">
              <button
                onClick={acceptCode}
                className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded"
              >
                <Check className="w-3 h-3" /> Accept
              </button>
              <button
                onClick={rejectCode}
                className="flex items-center gap-1 px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
              >
                <X className="w-3 h-3" /> Reject
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      {showActions && messages.length === 1 && (
        <div className="p-3 border-b border-[#333]">
          <p className="text-gray-400 text-xs mb-2">Quick Actions:</p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map(action => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action)}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] hover:bg-[#333] border border-[#333] rounded-lg text-left transition-colors disabled:opacity-50"
              >
                <action.icon className="w-4 h-4 text-purple-400" />
                <span className="text-gray-200 text-xs">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Code Preview Panel - SUGGESTED CODE */}
      {showLivePreview && suggestedCode && (
        <div className="border-b border-[#333] bg-[#1e1e1e]">
          <div className="flex items-center justify-between px-4 py-2 bg-[#252525] border-b border-[#333]">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Suggested Code</span>
              <span className="text-gray-500 text-xs">({suggestedCode.split('\n').length} lines)</span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={copyToClipboard}
                className="p-1.5 bg-[#333] hover:bg-[#444] rounded text-gray-400"
                title="Copy to clipboard"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="max-h-48 overflow-auto">
            <pre className="text-sm text-gray-200 p-3 font-mono bg-[#111]">
              {suggestedCode}
            </pre>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-[#252525] border-t border-[#333]">
            <span className="text-xs text-gray-400">This code will replace your current editor content</span>
            <div className="flex gap-2">
              <button
                onClick={rejectCode}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#333] hover:bg-red-600 text-gray-300 hover:text-white text-xs rounded transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" /> Reject
              </button>
              <button
                onClick={acceptCode}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5" /> Accept & Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#2a2a2a] text-gray-200 border border-[#333]'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-purple-400 font-medium">AI</span>
                </div>
              )}
              <div className="text-sm whitespace-pre-wrap font-sans">
                {msg.content.split(/(```[\s\S]*?```)/g).map((part, i) => {
                  if (part.startsWith('```')) {
                    return (
                      <pre key={i} className="bg-[#111] text-gray-300 p-2 rounded mt-2 text-xs overflow-x-auto">
                        {part.replace(/```\w*\n?/g, '')}
                      </pre>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#2a2a2d] rounded-xl px-4 py-3 border border-[#333]">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
                <span className="text-gray-400 text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#333] bg-[#252525]">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI to generate, explain, or fix code... (Shift+Enter for new line)"
            disabled={loading}
            rows={2}
            className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-2 bottom-2 p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" /> Powered by Gemini
          </span>
        </div>
      </div>
    </div>
  );
}
