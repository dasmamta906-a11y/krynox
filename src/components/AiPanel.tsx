import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../services/ai';

interface AiPanelProps {
  messages: ChatMessage[];
  loading: boolean;
  onSendMessage: (message: string) => void;
  onEditCode: () => void;
}

export default function AiPanel({ messages, loading, onSendMessage, onEditCode }: AiPanelProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Header */}
      <div className="h-10 border-b border-[#333] flex items-center px-4">
        <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
        <span className="text-white font-medium text-sm">AI Agent</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-gray-500 text-sm text-center">
            Ask me anything or click "Edit Code" to improve your code
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#2d2d2d] text-gray-200'
              }`}
            >
              <pre className="text-sm whitespace-pre-wrap font-sans">{msg.content}</pre>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#2d2d2d] rounded-lg px-4 py-2">
              <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Actions */}
      <div className="p-2 border-t border-[#333]">
        <button
          onClick={onEditCode}
          disabled={loading}
          className="w-full mb-2 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          AI Edit Code
        </button>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-2 border-t border-[#333] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI..."
          disabled={loading}
          className="flex-1 bg-[#2d2d2d] border border-[#444] rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
