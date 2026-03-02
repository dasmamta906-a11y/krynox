import React, { useState, useEffect } from 'react';
import { X, Save, Key, Bot, Settings } from 'lucide-react';

interface AiSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AISettings {
  openaiKey: string;
  anthropicKey: string;
  googleKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

const MODELS = [
  // OpenAI Models
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  // Claude Models
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic' },
  // Gemini Models
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
  { id: 'gemini-ultra', name: 'Gemini Ultra', provider: 'Google' },
  { id: 'gemini-flash', name: 'Gemini Flash', provider: 'Google' },
];

// AI Provider Configuration
const PROVIDERS = {
  OpenAI: {
    name: 'OpenAI',
    apiKeyLabel: 'OpenAI API Key',
    apiKeyPlaceholder: 'Enter your OpenAI API key...',
    color: 'text-green-400',
  },
  Anthropic: {
    name: 'Anthropic (Claude)',
    apiKeyLabel: 'Anthropic API Key',
    apiKeyPlaceholder: 'Enter your Anthropic API key...',
    color: 'text-purple-400',
  },
  Google: {
    name: 'Google (Gemini)',
    apiKeyLabel: 'Google AI API Key',
    apiKeyPlaceholder: 'Enter your Google AI API key...',
    color: 'text-blue-400',
  },
};

export default function AiSettings({ isOpen, onClose }: AiSettingsProps) {
  const [settings, setSettings] = useState<AISettings>({
    openaiKey: '',
    anthropicKey: '',
    googleKey: '',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
  });

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem('aiSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('aiSettings', JSON.stringify(settings));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#252526] border border-[#3c3c3c] rounded-lg w-[500px] max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="h-12 bg-[#2d2d2d] border-b border-[#3c3c3c] flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-purple-400" />
            <span className="text-white font-medium">AI Settings</span>
          </div>
          <button onClick={onClose} className="text-[#969696] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* AI Provider Section */}
          <div>
            <label className="flex items-center gap-2 text-[#cccccc] text-sm mb-2">
              <Bot className="w-4 h-4" />
              AI Provider
            </label>
            <select
              value={settings.model.split('-')[0].includes('claude') ? 'Anthropic' : settings.model.split('-')[0].includes('gemini') ? 'Google' : 'OpenAI'}
              onChange={(e) => {
                const provider = e.target.value;
                const model = MODELS.find(m => m.provider === provider);
                if (model) {
                  setSettings({ ...settings, model: model.id });
                }
              }}
              className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-2 text-white text-sm"
            >
              <optgroup label="OpenAI">
                {MODELS.filter(m => m.provider === 'OpenAI').map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </optgroup>
              <optgroup label="Anthropic">
                {MODELS.filter(m => m.provider === 'Anthropic').map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </optgroup>
              <optgroup label="Google">
                {MODELS.filter(m => m.provider === 'Google').map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* OpenAI API Key */}
          <div>
            <label className="flex items-center gap-2 text-[#cccccc] text-sm mb-2">
              <Key className="w-4 h-4 text-green-400" />
              OpenAI API Key
            </label>
            <input
              type="password"
              value={settings.openaiKey}
              onChange={(e) => setSettings({ ...settings, openaiKey: e.target.value })}
              placeholder="sk-..."
              className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-2 text-white text-sm placeholder-[#6e7681]"
            />
          </div>

          {/* Anthropic API Key */}
          <div>
            <label className="flex items-center gap-2 text-[#cccccc] text-sm mb-2">
              <Key className="w-4 h-4 text-purple-400" />
              Anthropic API Key
            </label>
            <input
              type="password"
              value={settings.anthropicKey}
              onChange={(e) => setSettings({ ...settings, anthropicKey: e.target.value })}
              placeholder="sk-ant-..."
              className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-2 text-white text-sm placeholder-[#6e7681]"
            />
          </div>

          {/* Google API Key */}
          <div>
            <label className="flex items-center gap-2 text-[#cccccc] text-sm mb-2">
              <Key className="w-4 h-4 text-blue-400" />
              Google AI API Key
            </label>
            <input
              type="password"
              value={settings.googleKey}
              onChange={(e) => setSettings({ ...settings, googleKey: e.target.value })}
              placeholder="AIza..."
              className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-2 text-white text-sm placeholder-[#6e7681]"
            />
            <p className="text-[#6e7681] text-xs mt-1">
              Your API keys are stored locally and never sent to our servers
            </p>
          </div>

          {/* Model Selection */}
          <div>
            <label className="flex items-center gap-2 text-[#cccccc] text-sm mb-2">
              <Bot className="w-4 h-4" />
              Selected Model
            </label>
            <select
              value={settings.model}
              onChange={(e) => setSettings({ ...settings, model: e.target.value })}
              className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-2 text-white text-sm"
            >
              {MODELS.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} ({model.provider})
                </option>
              ))}
            </select>
          </div>

          {/* Temperature */}
          <div>
            <label className="text-[#cccccc] text-sm mb-2 block">
              Temperature: {settings.temperature}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-[#6e7681] text-xs mt-1">
              <span>Precise</span>
              <span>Balanced</span>
              <span>Creative</span>
            </div>
          </div>

          {/* Max Tokens */}
          <div>
            <label className="text-[#cccccc] text-sm mb-2 block">
              Max Tokens: {settings.maxTokens}
            </label>
            <input
              type="range"
              min="100"
              max="8000"
              step="100"
              value={settings.maxTokens}
              onChange={(e) => setSettings({ ...settings, maxTokens: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="h-16 bg-[#2d2d2d] border-t border-[#3c3c3c] flex items-center justify-end px-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#cccccc] hover:text-white text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#007acc] hover:bg-[#106ebe] text-white rounded text-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
