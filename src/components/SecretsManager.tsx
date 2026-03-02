import React, { useState } from 'react';
import { Shield, X, Plus, Trash2, Eye, EyeOff, Copy, Check, Key, Lock, Unlock, RefreshCw } from 'lucide-react';

const mockSecrets = [
  { id: 1, name: 'AWS_ACCESS_KEY', type: 'credential', createdAt: '2024-01-15', lastUsed: '2 hours ago' },
  { id: 2, name: 'DATABASE_PASSWORD', type: 'secret', createdAt: '2024-01-10', lastUsed: '1 day ago' },
  { id: 3, name: 'JWT_SECRET', type: 'secret', createdAt: '2024-01-08', lastUsed: '3 hours ago' },
  { id: 4, name: 'STRIPE_API_KEY', type: 'credential', createdAt: '2024-01-05', lastUsed: 'Never' },
  { id: 5, name: 'SMTP_PASSWORD', type: 'secret', createdAt: '2024-01-02', lastUsed: '5 days ago' },
];

export default function SecretsManager({ onClose }) {
  const [secrets, setSecrets] = useState(mockSecrets);
  const [showValues, setShowValues] = useState({});
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(null);

  const toggleShowValue = (id) => {
    setShowValues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyValue = (id) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const deleteSecret = (id) => {
    setSecrets(secrets.filter(s => s.id !== id));
  };

  const filtered = secrets.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const getSecretValue = (id, name) => {
    return showValues[id] ? `secret_value_${name}` : '••••••••••••••••';
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-red-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-red-500/20">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-500" />
          <span className="text-white font-semibold">Secrets Manager</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-700 rounded">
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-3 border-b border-red-500/20">
        <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search secrets..."
            className="bg-transparent text-white text-sm outline-none flex-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 p-3 border-b border-red-500/20 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <Lock className="w-4 h-4" />
          <span>{secrets.length} secrets</span>
        </div>
        <div className="flex items-center gap-2 text-green-400">
          <Unlock className="w-4 h-4" />
          <span>Vault unlocked</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3">
        {filtered.map(secret => (
          <div key={secret.id} className="bg-gray-800/50 rounded-lg p-4 mb-3 hover:bg-gray-800">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-red-400" />
                <span className="text-white font-mono text-sm">{secret.name}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  secret.type === 'credential' ? 'bg-blue-900/30 text-blue-400' : 'bg-purple-900/30 text-purple-400'
                }`}>
                  {secret.type}
                </span>
              </div>
              <button 
                onClick={() => deleteSecret(secret.id)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <code className="flex-1 bg-gray-900 px-3 py-2 rounded text-gray-400 font-mono text-sm">
                {getSecretValue(secret.id, secret.name)}
              </code>
              <button 
                onClick={() => toggleShowValue(secret.id)}
                className="p-2 hover:bg-gray-700 rounded"
              >
                {showValues[secret.id] ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <button 
                onClick={() => copyValue(secret.id)}
                className="p-2 hover:bg-gray-700 rounded"
              >
                {copied === secret.id ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Created: {secret.createdAt}</span>
              <span>Last used: {secret.lastUsed}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Shield className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No secrets found</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-red-500/20">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm">
          <Plus className="w-4 h-4" /> Add Secret
        </button>
      </div>
    </div>
  );
}
