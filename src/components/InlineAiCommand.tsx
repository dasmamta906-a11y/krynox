import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Loader2, X, Wand2, Code2, Bug, BookOpen, Zap, ArrowRight, Send } from 'lucide-react';
import { callAI } from '../services/ai';

interface InlineAiCommandProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  onCodeUpdate: (newCode: string) => void;
  selectedCode?: string;
}

// Command presets
const COMMANDS = [
  { id: 'generate', label: 'Generate code', icon: Wand2, placeholder: 'Describe what you want to generate...' },
  { id: 'explain', label: 'Explain code', icon: BookOpen, placeholder: 'Explain selected code...' },
  { id: 'refactor', label: 'Refactor', icon: Code2, placeholder: 'How should I refactor this?' },
  { id: 'fix', label: 'Fix bugs', icon: Bug, placeholder: 'Fix any bugs in this code...' },
  { id: 'optimize', label: 'Optimize', icon: Zap, placeholder: 'Optimize this code for...' },
  { id: 'custom', label: 'Custom', icon: Sparkles, placeholder: 'Enter your request...' },
];

export default function InlineAiCommand({ isOpen, onClose, code, onCodeUpdate, selectedCode }: InlineAiCommandProps) {
  const [prompt, setPrompt] = useState('');
  const [command, setCommand] = useState(COMMANDS[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    if (!prompt.trim() || loading) return;

    const codeContext = selectedCode || code;
    setLoading(true);

    try {
      let fullPrompt = prompt;
      
      switch (command.id) {
        case 'generate':
          fullPrompt = `Generate code for: ${prompt}\n\nContext:\n${codeContext}`;
          break;
        case 'explain':
          fullPrompt = `Explain this code:\n\`\`\`\n${codeContext}\n\`\`\``;
          break;
        case 'refactor':
          fullPrompt = `Refactor this code: ${prompt ? `(${prompt})` : ''}\n\`\`\`\n${codeContext}\n\`\`\``;
          break;
        case 'fix':
          fullPrompt = `Find and fix bugs in:\n\`\`\`\n${codeContext}\n\`\`\``;
          break;
        case 'optimize':
          fullPrompt = `Optimize this code for ${prompt || 'performance'}:\n\`\`\`\n${codeContext}\n\`\`\``;
          break;
        default:
          fullPrompt = `${prompt}\n\nContext:\n${codeContext}`;
      }

      const response = await callAI('chat', fullPrompt, codeContext);
      
      if (response.status === 'success') {
        // Extract code from response if present
        const codeMatch = response.message?.match(/```(?:\w+)?\n([\s\S]*?)```/);
        if (codeMatch) {
          setResult(codeMatch[1]);
        } else {
          setResult(response.message || 'Done!');
        }
      } else {
        setResult(`Error: ${response.message}`);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (result && !result.startsWith('Error:')) {
      onCodeUpdate(result);
      handleClose();
    }
  };

  const handleClose = () => {
    setPrompt('');
    setResult(null);
    setCommand(COMMANDS[0]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="w-full max-w-2xl bg-[#1e1e1e] border border-[#333] rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Command Selector */}
        <div className="flex items-center gap-1 p-2 border-b border-[#333] bg-[#252525] overflow-x-auto">
          {COMMANDS.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => { setCommand(cmd); setResult(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                command.id === cmd.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#333]'
              }`}
            >
              <cmd.icon className="w-3.5 h-3.5" />
              {cmd.label}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={command.placeholder}
              rows={3}
              className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none pr-12"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSubmit();
                }
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !prompt.trim()}
              className="absolute right-2 top-2 p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Keyboard hint */}
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press <kbd className="px-1.5 py-0.5 bg-[#333] rounded">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-[#333] rounded">Enter</kbd> to submit</span>
            <span>Press <kbd className="px-1.5 py-0.5 bg-[#333] rounded">Esc</kbd> to close</span>
          </div>
        </div>

        {/* Result Preview */}
        {result && (
          <div className="border-t border-[#333]">
            <div className="flex items-center justify-between p-3 bg-[#252525]">
              <span className="text-sm text-gray-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Result Preview
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleClose}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                {result.startsWith('Error:') ? null : (
                  <button
                    onClick={handleApply}
                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg flex items-center gap-1"
                  >
                    <ArrowRight className="w-3.5 h-3.5" /> Apply to Editor
                  </button>
                )}
              </div>
            </div>
            <div className="max-h-64 overflow-auto p-3 bg-[#111]">
              <pre className="text-sm text-gray-200 whitespace-pre-wrap font-mono">
                {result}
              </pre>
            </div>
          </div>
        )}

        {/* Context Info */}
        <div className="p-2 border-t border-[#333] bg-[#252525] text-xs text-gray-500">
          {selectedCode ? (
            <span>Using selected code ({selectedCode.length} chars)</span>
          ) : (
            <span>Using full file ({code.length} chars)</span>
          )}
        </div>
      </div>
    </div>
  );
}
