import React, { useState } from 'react';
import { 
  Database, 
  Table, 
  Plus, 
  Trash2, 
  Play, 
  Save, 
  Search, 
  ChevronRight, 
  ChevronDown,
  Server,
  RefreshCw,
  Copy,
  Download,
  X,
  Key,
  Lock,
  Globe,
  Loader2,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Mock database connections
const mockConnections = [
  { id: 1, name: 'Production DB', type: 'postgresql', host: 'db.example.com', port: 5432, status: 'connected' },
  { id: 2, name: 'Dev Database', type: 'mysql', host: 'localhost', port: 3306, status: 'connected' },
  { id: 3, name: 'MongoDB Atlas', type: 'mongodb', host: 'cluster.mongodb.net', port: 27017, status: 'disconnected' },
];

// Mock tables for PostgreSQL
const mockTables = [
  { name: 'users', rows: 1250, size: '256 KB' },
  { name: 'orders', rows: 5420, size: '1.2 MB' },
  { name: 'products', rows: 890, size: '512 KB' },
  { name: 'categories', rows: 24, size: '8 KB' },
  { name: 'reviews', rows: 3200, size: '768 KB' },
];

// Mock query results
const mockQueryResults = [
  { id: 1, name: 'John Doe', email: 'john@example.com', created_at: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: '2024-01-16' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', created_at: '2024-01-17' },
];

const DB_TYPES = [
  { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', color: 'text-blue-400' },
  { id: 'mysql', name: 'MySQL', icon: '🐬', color: 'text-orange-400' },
  { id: 'mongodb', name: 'MongoDB', icon: '🍃', color: 'text-green-400' },
  { id: 'sqlite', name: 'SQLite', icon: '📁', color: 'text-gray-400' },
];

export default function DatabasePanel({ onClose }) {
  const [connections, setConnections] = useState(mockConnections);
  const [selectedConnection, setSelectedConnection] = useState(mockConnections[0]);
  const [tables, setTables] = useState(mockTables);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [query, setQuery] = useState('SELECT * FROM users LIMIT 10;');
  const [queryResults, setQueryResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewConnection, setShowNewConnection] = useState(false);
  const [activeTab, setActiveTab] = useState<'tables' | 'query' | 'structure'>('tables');

  const executeQuery = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setQueryResults(null);

    // Simulate query execution
    setTimeout(() => {
      setQueryResults(mockQueryResults);
      setIsLoading(false);
    }, 1000);
  };

  const getDbIcon = (type: string) => {
    return DB_TYPES.find(t => t.id === type);
  };

  return (
    <div className="flex h-full bg-[#0f0f0f]">
      {/* Left Sidebar - Connections & Tables */}
      <div className="w-64 border-r border-purple-500/20 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-500" />
            <span className="text-white font-semibold">Database</span>
          </div>
          <button 
            onClick={() => setShowNewConnection(true)}
            className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            title="New Connection"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Connections */}
        <div className="p-2 border-b border-purple-500/20">
          <div className="text-xs text-gray-500 px-2 py-1 mb-1">CONNECTIONS</div>
          {connections.map(conn => (
            <div 
              key={conn.id}
              onClick={() => setSelectedConnection(conn)}
              className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer mb-1 ${
                selectedConnection?.id === conn.id 
                  ? 'bg-purple-500/20 text-purple-300' 
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
            >
              <Server className="w-4 h-4" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{conn.name}</div>
                <div className="text-xs text-gray-500">{conn.host}:{conn.port}</div>
              </div>
              <div className={`w-2 h-2 rounded-full ${conn.status === 'connected' ? 'bg-green-400' : 'bg-gray-500'}`} />
            </div>
          ))}
        </div>

        {/* Tables */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="text-xs text-gray-500 px-2 py-1 mb-1">TABLES</div>
          {tables.map(table => (
            <div 
              key={table.name}
              onClick={() => { setSelectedTable(table.name); setActiveTab('structure'); }}
              className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer ${
                selectedTable === table.name 
                  ? 'bg-purple-500/20 text-purple-300' 
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
            >
              <Table className="w-4 h-4" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{table.name}</div>
                <div className="text-xs text-gray-500">{table.rows} rows</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Connection Info Bar */}
        {selectedConnection && (
          <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getDbIcon(selectedConnection.type)?.icon}</span>
              <div>
                <div className="text-white font-medium">{selectedConnection.name}</div>
                <div className="text-xs text-gray-500">{selectedConnection.type} • {selectedConnection.host}:{selectedConnection.port}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-green-400">
                <CheckCircle className="w-3 h-3" /> Connected
              </span>
              <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-purple-500/20">
          <button
            onClick={() => setActiveTab('tables')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'tables' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            Table Data
          </button>
          <button
            onClick={() => setActiveTab('query')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'query' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            Query Editor
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'structure' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            Structure
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {/* Query Editor Tab */}
          {activeTab === 'query' && (
            <div className="flex flex-col h-full">
              <div className="p-3 border-b border-purple-500/20">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-32 bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white text-sm font-mono placeholder-gray-500 outline-none focus:border-purple-500 resize-none"
                  placeholder="Write your SQL query here..."
                />
                <div className="flex justify-between mt-2">
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">
                      Explain
                    </button>
                    <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm">
                      Format
                    </button>
                  </div>
                  <button
                    onClick={executeQuery}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded text-sm font-medium"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    Execute
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="flex-1 overflow-auto p-3">
                {queryResults ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Results: {queryResults.length} rows</span>
                      <div className="flex gap-1">
                        <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          {Object.keys(queryResults[0] || {}).map(key => (
                            <th key={key} className="text-left px-3 py-2 text-purple-400 font-medium">{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResults.map((row, i) => (
                          <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50">
                            {Object.values(row).map((val: any, j) => (
                              <td key={j} className="px-3 py-2 text-gray-300">{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Execute a query to see results
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Structure Tab */}
          {activeTab === 'structure' && selectedTable && (
            <div className="p-4">
              <h3 className="text-white font-semibold mb-3">{selectedTable} Structure</h3>
              <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700 bg-gray-800/50">
                      <th className="text-left px-4 py-2 text-purple-400">Column</th>
                      <th className="text-left px-4 py-2 text-purple-400">Type</th>
                      <th className="text-left px-4 py-2 text-purple-400">Nullable</th>
                      <th className="text-left px-4 py-2 text-purple-400">Key</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="px-4 py-2 text-gray-300">id</td>
                      <td className="px-4 py-2 text-blue-400">INTEGER</td>
                      <td className="px-4 py-2 text-gray-500">NO</td>
                      <td className="px-4 py-2 text-yellow-400">PK</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="px-4 py-2 text-gray-300">name</td>
                      <td className="px-4 py-2 text-green-400">VARCHAR(255)</td>
                      <td className="px-4 py-2 text-gray-500">YES</td>
                      <td className="px-4 py-2 text-gray-500">-</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="px-4 py-2 text-gray-300">email</td>
                      <td className="px-4 py-2 text-green-400">VARCHAR(255)</td>
                      <td className="px-4 py-2 text-gray-500">YES</td>
                      <td className="px-4 py-2 text-gray-500">-</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="px-4 py-2 text-gray-300">created_at</td>
                      <td className="px-4 py-2 text-yellow-400">TIMESTAMP</td>
                      <td className="px-4 py-2 text-gray-500">NO</td>
                      <td className="px-4 py-2 text-gray-500">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tables Tab */}
          {activeTab === 'tables' && (
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {tables.map(table => (
                  <div 
                    key={table.name}
                    className="bg-[#1a1a1a] p-4 rounded-lg hover:bg-gray-800 cursor-pointer border border-gray-800 hover:border-purple-500/50 transition-colors"
                    onClick={() => { setSelectedTable(table.name); setQuery(`SELECT * FROM ${table.name} LIMIT 100;`); setActiveTab('query'); }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Table className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-medium">{table.name}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {table.rows} rows • {table.size}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
