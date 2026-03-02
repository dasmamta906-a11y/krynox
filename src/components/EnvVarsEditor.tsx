import React, { useState } from 'react';
import { Variable, X, Plus, Trash2, Eye, EyeOff, Copy, Check, Download, Upload } from 'lucide-react';

const mockEnvVars = [
  { id: 1, name: 'NODE_ENV', value: 'development', isSecret: false, scope: 'local' },
  { id: 2, name: 'DATABASE_URL', value: 'postgresql://localhost:5432/db', isSecret: true, scope: 'local' },
  { id: 3, name: 'API_KEY', value: 'sk-xxxxxxxxxxxxx', isSecret: true, scope: 'local' },
  { id: 4, name: 'PORT', value: '3000', isSecret: false, scope: 'local' },
  { id: 5, name: 'DEBUG', value: 'true', isSecret: false, scope: 'local' },
  { id: 6, name: 'JWT_SECRET', value: 'supersecretkey123', isSecret: true, scope: 'local' },
];

export default function EnvVarsEditor({ onClose }) {
  const [envVars, setEnvVars] = useState(mockEnvVars);
  const [showValues, setShowValues] = useState({});
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newVar, setNewVar] = useState({ name: '', value: '', isSecret: false });
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleShowValue = (id) => {
    setShowValues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addVar = () => {
    if (newVar.name && newVar.value) {
      setEnvVars([...envVars, { ...newVar, id: Date.now(), scope: 'local' }]);
      setNewVar({ name: '', value: '', isSecret: false });
      setShowAddForm(false);
    }
  };

  const deleteVar = (id) => {
    setEnvVars(envVars.filter(v => v.id !== id));
  };

  const filtered = envVars.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  const exportEnv = () => {
    const content = envVars.map(v => `${v.name}=${v.isSecret ? '***' : v.value}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.env';
    a.click();
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-emerald-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500/20">
        <div className="flex items-center gap-2">
          <Variable className="w-5 h-5 text-emerald-500" />
          <span className="text-white font-semibold">Environment Variables</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={exportEnv} className="p-1 hover:bg-gray-700 rounded" title="Export .env">
            <Download className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-700 rounded" title="Import .env">
            <Upload className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-3 border-b border-emerald-500/20">
        <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search variables..."
            className="bg-transparent text-white text-sm outline-none flex-1"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3">
        {showAddForm && (
          <div className="bg-gray-800 rounded-lg p-3 mb-3">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newVar.name}
                onChange={(e) => setNewVar({ ...newVar, name: e.target.value.toUpperCase().replace(/\s/g, '_') })}
                placeholder="VARIABLE_NAME"
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 font-mono text-sm"
              />
            </div>
            <div className="flex gap-2 mb-2">
              <input
                type={newVar.isSecret ? 'password' : 'text'}
                value={newVar.value}
                onChange={(e) => setNewVar({ ...newVar, value: e.target.value })}
                placeholder="value"
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 font-mono text-sm"
              />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={newVar.isSecret}
                  onChange={(e) => setNewVar({ ...newVar, isSecret: e.target.checked })}
                  className="rounded"
                />
                Secret value
              </label>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowAddForm(false)} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 text-sm">
                Cancel
              </button>
              <button onClick={addVar} className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-white text-sm">
                Add Variable
              </button>
            </div>
          </div>
        )}

        {filtered.map(variable => (
          <div key={variable.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg mb-2 hover:bg-gray-800">
            <div className="flex-1 min-w-0">
              <div className="text-emerald-400 font-mono text-sm">{variable.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 font-mono text-sm">
                  {variable.isSecret && !showValues[variable.id] ? '••••••••' : variable.value}
                </span>
                {variable.isSecret && (
                  <button onClick={() => toggleShowValue(variable.id)} className="p-1 hover:bg-gray-700 rounded">
                    {showValues[variable.id] ? <EyeOff className="w-3 h-3 text-gray-400" /> : <Eye className="w-3 h-3 text-gray-400" />}
                  </button>
                )}
              </div>
            </div>
            <button 
              onClick={() => deleteVar(variable.id)}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Variable className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No environment variables</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-emerald-500/20 flex items-center justify-between">
        <span className="text-gray-500 text-sm">{envVars.length} variables</span>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded text-white text-sm"
        >
          <Plus className="w-4 h-4" /> Add Variable
        </button>
      </div>
    </div>
  );
}
