import React from 'react';
import { GitBranch, AlertCircle, Check, Loader2, Bug, Cpu } from 'lucide-react';

interface StatusBarProps {
  line?: number;
  column?: number;
  language?: string;
  activeModel?: string;
  isDebugging?: boolean;
  errors?: number;
  warnings?: number;
  branch?: string;
  loading?: boolean;
  aiThinking?: boolean;
}

// AI Model color mapping
const getModelColor = (model: string) => {
  const modelLower = model?.toLowerCase() || '';
  if (modelLower.includes('gemini')) return '#4285f4'; // Blue
  if (modelLower.includes('claude')) return '#f97316';  // Orange
  if (modelLower.includes('gpt') || modelLower.includes('openai')) return '#10a37f'; // Green
  if (modelLower.includes('llama') || modelLower.includes('meta')) return '#0668de'; // Facebook Blue
  return '#007acc'; // Default blue
};

export default function StatusBar({ 
  line = 1, 
  column = 1, 
  language = 'TypeScript', 
  activeModel = 'Gemini 2.0 Pro',
  isDebugging = false,
  errors = 0,
  warnings = 0,
  branch = 'main',
  loading = false,
  aiThinking = false
}: StatusBarProps) {
  const modelColor = getModelColor(activeModel);
  
  return (
    <footer 
      className={`h-6 flex items-center justify-between px-3 text-white text-[11px] select-none transition-colors duration-300 ${
        isDebugging ? 'bg-[#d97706]' : 'bg-[#007acc]'
      }`}
    >
      {/* Left Side: Git & Errors */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 hover:bg-[#106ebe] px-1.5 py-0.5 rounded transition-colors cursor-pointer">
          <GitBranch className="w-3 h-3" />
          <span>{branch}</span>
        </div>
        <div className="flex items-center gap-1.5 hover:bg-[#106ebe] px-1.5 py-0.5 rounded transition-colors cursor-pointer">
          <AlertCircle className={`w-3 h-3 ${errors > 0 ? 'text-red-300' : ''}`} />
          <span>{errors}</span>
        </div>
        <div className="flex items-center gap-1.5 hover:bg-[#106ebe] px-1.5 py-0.5 rounded transition-colors cursor-pointer">
          <Check className={`w-3 h-3 ${warnings > 0 ? 'text-yellow-300' : ''}`} />
          <span>{warnings}</span>
        </div>
        {isDebugging && (
          <div className="flex items-center gap-1.5 bg-[#b45309] px-2 py-0.5 rounded animate-pulse">
            <Bug className="w-3 h-3" />
            <span>Debugging</span>
          </div>
        )}
        {aiThinking && (
          <div className="flex items-center gap-1.5 bg-[#4ec9b0] px-2 py-0.5 rounded animate-pulse text-[#1e1e1e]">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Krynox AI: Thinking...</span>
          </div>
        )}
      </div>
      
      {/* Right Side: Editor Info & AI Model */}
      <div className="flex items-center gap-1">
        {/* Line & Column Info */}
        <div className="hover:bg-[#106ebe] px-2 py-0.5 rounded transition-colors cursor-pointer">
          Ln {line}, Col {column}
        </div>
        
        {/* Encoding */}
        <div className="hover:bg-[#106ebe] px-2 py-0.5 rounded transition-colors cursor-pointer">
          UTF-8
        </div>
        
        {/* Selected Language */}
        <div className="hover:bg-[#106ebe] px-2 py-0.5 rounded transition-colors cursor-pointer uppercase font-semibold">
          {language}
        </div>
        
        {/* KRYNOX AI MODEL SELECTOR - Special Feature */}
        <div 
          className="flex items-center gap-1.5 px-2 py-0.5 cursor-pointer border-l border-[#005a9e] ml-2 hover:brightness-110 transition-all"
          style={{ backgroundColor: modelColor }}
          title={`Active AI: ${activeModel}`}
        >
          <Cpu className="w-3 h-3" />
          <span className="font-bold tracking-tight">{activeModel}</span>
        </div>
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center gap-1.5 ml-2">
            <Loader2 className="w-3 h-3 animate-spin" />
          </div>
        )}
      </div>
    </footer>
  );
}
