import React, { useState } from 'react';
import { Database, X, Play, Plus, Trash2, Save, Download, Table, Rows } from 'lucide-react';

const mockTables = [
  { name: 'users', rows: 1250 },
  { name: 'products', rows: 3400 },
  { name: 'orders', rows: 8900 },
  { name: 'reviews', rows: 15000 },
];

const mockResults = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'inactive' },
];

export default function SQLRunner({ onClose }) {
  const [query, setQuery] = useState('SELECT * FROM users LIMIT 10;');
  const [results, setResults] = useState(mockResults);
  const [activeTab, setActiveTab] = useState('query');
  const [savedQueries, setSavedQueries] = useState([
    { id: 1, name: 'Active Users', query: 'SELECT * FROM users WHERE status = "active"' },
    { id: 2, name: 'Recent Orders', query: 'SELECT * FROM orders ORDER BY created_at DESC LIMIT 100' },
  ]);

  const executeQuery = () => {
    console.log('Executing:', query);
  };

  const saveQuery = () => {
    const name = prompt('Query name:');
    if (name) {
      setSavedQueries([...savedQueries, { id: Date.now(), name, query }]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-indigo-500/20 w-[700px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-500/20">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-500" />
          <span className="text-white font-semibold">SQL Runner</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={saveQuery} className="p-1 hover:bg-gray-700 rounded" title="Save query">
            <Save className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex border-b border-indigo-500/20">
        <button
          onClick={() => setActiveTab('query')}
          className={`px-4 py-2 text-sm ${
            activeTab === 'query' ? 'text-white border-b-2 border-indigo-500' : 'text-gray-400'
          }`}
        >
          Query
        </button>
        <button
          onClick={() => setActiveTab('tables')}
          className={`px-4 py-2 text-sm flex items-center gap-1 ${
            activeTab === 'tables' ? 'text-white border-b-2 border-indigo-500' : 'text-gray-400'
          }`}
        >
          <Table className="w-3 h-3" /> Tables
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 text-sm ${
            activeTab === 'saved' ? 'text-white border-b-2 border-indigo-500' : 'text-gray-400'
          }`}
        >
          Saved
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          {activeTab === 'query' && (
            <>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-32 bg-[#0a0a0a] text-indigo-300 p-4 font-mono text-sm outline-none resize-none"
              />
              <div className="p-2 border-t border-gray-700">
                <button
                  onClick={executeQuery}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white text-sm flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Execute (Ctrl+Enter)
                </button>
              </div>
            </>
          )}

          {activeTab === 'tables' && (
            <div className="flex-1 p-3 overflow-auto">
              {mockTables.map(table => (
                <div key={table.name} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg mb-2 cursor-pointer">
                  <Table className="w-4 h-4 text-indigo-400" />
                  <span className="flex-1 text-white">{table.name}</span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Rows className="w-3 h-3" /> {table.rows.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="flex-1 p-3 overflow-auto">
              {savedQueries.map(q => (
                <div 
                  key={q.id} 
                  onClick={() => { setQuery(q.query); setActiveTab('query'); }}
                  className="p-3 hover:bg-gray-800 rounded-lg mb-2 cursor-pointer"
                >
                  <div className="text-white font-medium">{q.name}</div>
                  <div className="text-gray-500 text-xs font-mono mt-1 truncate">{q.query}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {activeTab === 'query' && results && (
          <div className="flex-1 border-l border-gray-700 overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-gray-400 sticky top-0">
                <tr>
                  {Object.keys(results[0] || {}).map(key => (
                    <th key={key} className="px-3 py-2 text-left">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <tr key={i} className="border-t border-gray-800">
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="px-3 py-2 text-gray-300">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
