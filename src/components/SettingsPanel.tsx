import React, { useState } from 'react';
import { Settings, X, Search, ChevronRight, User, Code, Terminal, Palette, Bell, Shield, HardDrive, Globe, Key } from 'lucide-react';

const settingsSections = [
  { id: 'general', name: 'General', icon: Settings },
  { id: 'account', name: 'Account', icon: User },
  { id: 'editor', name: 'Editor', icon: Code },
  { id: 'terminal', name: 'Terminal', icon: Terminal },
  { id: 'appearance', name: 'Appearance', icon: Palette },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'storage', name: 'Storage', icon: HardDrive },
  { id: 'network', name: 'Network', icon: Globe },
  { id: 'keys', name: 'Keys & Tokens', icon: Key },
];

const settings = {
  general: [
    { id: 'autoSave', name: 'Auto Save', type: 'toggle', value: true },
    { id: 'formatOnSave', name: 'Format on Save', type: 'toggle', value: true },
    { id: 'minimap', name: 'Show Minimap', type: 'toggle', value: true },
    { id: 'wordWrap', name: 'Word Wrap', type: 'toggle', value: false },
  ],
  editor: [
    { id: 'fontSize', name: 'Font Size', type: 'select', value: '14', options: ['12', '14', '16', '18', '20'] },
    { id: 'tabSize', name: 'Tab Size', type: 'select', value: '2', options: ['2', '4', '8'] },
    { id: 'insertSpaces', name: 'Insert Spaces', type: 'toggle', value: true },
    { id: 'renderWhitespace', name: 'Render Whitespace', type: 'select', value: 'selection', options: ['none', 'selection', 'all'] },
  ],
  terminal: [
    { id: 'shell', name: 'Shell', type: 'select', value: 'powershell', options: ['powershell', 'cmd', 'bash'] },
    { id: 'fontSize', name: 'Font Size', type: 'select', value: '14', options: ['12', '14', '16'] },
    { id: 'cursorStyle', name: 'Cursor Style', type: 'select', value: 'block', options: ['block', 'underline', 'bar'] },
  ],
  appearance: [
    { id: 'theme', name: 'Theme', type: 'select', value: 'dark', options: ['dark', 'light', 'system'] },
    { id: 'titleBar', name: 'Title Bar Style', type: 'select', value: 'custom', options: ['native', 'custom'] },
    { id: 'activityBar', name: 'Show Activity Bar', type: 'toggle', value: true },
    { id: 'statusBar', name: 'Show Status Bar', type: 'toggle', value: true },
  ],
  notifications: [
    { id: 'enable', name: 'Enable Notifications', type: 'toggle', value: true },
    { id: 'sound', name: 'Sound', type: 'toggle', value: false },
    { id: 'preview', name: 'Show Preview', type: 'toggle', value: true },
  ],
};

export default function SettingsPanel({ onClose }) {
  const [activeSection, setActiveSection] = useState('general');
  const [search, setSearch] = useState('');
  const [settingsValues, setSettingsValues] = useState(settings);

  const toggleSetting = (section, id) => {
    setSettingsValues(prev => ({
      ...prev,
      [section]: prev[section].map(s => 
        s.id === id ? { ...s, value: !s.value } : s
      )
    }));
  };

  const changeSetting = (section, id, value) => {
    setSettingsValues(prev => ({
      ...prev,
      [section]: prev[section].map(s => 
        s.id === id ? { ...s, value } : s
      )
    }));
  };

  return (
    <div className="flex h-full bg-[#0f0f0f] border-l border-gray-500/20 w-[900px]">
      <div className="w-64 border-r border-gray-500/20 flex flex-col">
        <div className="p-4 border-b border-gray-500/20">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5" /> Settings
          </h2>
        </div>
        
        <div className="p-2">
          <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search settings..."
              className="bg-transparent text-white text-sm outline-none flex-1"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {settingsSections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                  activeSection === section.id 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{section.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-500/20">
          <h2 className="text-white font-semibold capitalize">{activeSection} Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {settings[activeSection] ? (
            <div className="space-y-4">
              {settings[activeSection].map(setting => (
                <div key={setting.id} className="flex items-center justify-between py-3 border-b border-gray-800">
                  <div>
                    <div className="text-white">{setting.name}</div>
                  </div>
                  <div>
                    {setting.type === 'toggle' && (
                      <button
                        onClick={() => toggleSetting(activeSection, setting.id)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          setting.value ? 'bg-green-600' : 'bg-gray-700'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          setting.value ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    )}
                    {setting.type === 'select' && (
                      <select
                        value={setting.value}
                        onChange={(e) => changeSetting(activeSection, setting.id, e.target.value)}
                        className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700"
                      >
                        {setting.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Settings for {activeSection} coming soon</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-500/20 flex items-center justify-between">
          <button className="text-blue-400 text-sm hover:text-blue-300">
            Open Settings JSON
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300">
              Reset
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
