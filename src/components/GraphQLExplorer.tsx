import React, { useState } from 'react';
import { Globe, X, Play, Plus, Trash2, Copy, Check, BookOpen } from 'lucide-react';

const mockSchema = `
type Query {
  users: [User]
  user(id: ID!): User
  posts: [Post]
}

type User {
  id: ID!
  name: String!
  email: String!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}
`;

const mockHistory = [
  { id: 1, query: '{ users { name email } }', time: '2 min ago' },
  { id: 2, query: '{ user(id: "1") { name } }', time: '5 min ago' },
];

export default function GraphQLExplorer({ onClose }) {
  const [endpoint, setEndpoint] = useState('https://api.example.com/graphql');
  const [query, setQuery] = useState('{ users { name email } }');
  const [variables, setVariables] = useState('{}');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('query');
  const [showSchema, setShowSchema] = useState(false);

  const executeQuery = () => {
    setLoading(true);
    setTimeout(() => {
      setResponse({
        data: {
          users: [
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Jane Smith', email: 'jane@example.com' },
          ]
        }
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-cyan-500/20 w-[700px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-cyan-500" />
          <span className="text-white font-semibold">GraphQL Explorer</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setShowSchema(!showSchema)}
            className={`p-1 hover:bg-gray-700 rounded ${showSchema ? 'bg-gray-700' : ''}`}
          >
            <BookOpen className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-3 border-b border-cyan-500/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="GraphQL Endpoint"
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm font-mono"
          />
          <button
            onClick={executeQuery}
            disabled={loading}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-800 rounded text-white text-sm flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {loading ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      <div className="flex border-b border-cyan-500/20">
        <button
          onClick={() => setActiveTab('query')}
          className={`px-4 py-2 text-sm ${
            activeTab === 'query' ? 'text-white border-b-2 border-cyan-500' : 'text-gray-400'
          }`}
        >
          Query
        </button>
        <button
          onClick={() => setActiveTab('variables')}
          className={`px-4 py-2 text-sm ${
            activeTab === 'variables' ? 'text-white border-b-2 border-cyan-500' : 'text-gray-400'
          }`}
        >
          Variables
        </button>
        <button
          onClick={() => setActiveTab('headers')}
          className={`px-4 py-2 text-sm ${
            activeTab === 'headers' ? 'text-white border-b-2 border-cyan-500' : 'text-gray-400'
          }`}
        >
          Headers
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          {activeTab === 'query' && (
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter GraphQL query..."
              className="flex-1 bg-[#0a0a0a] text-cyan-300 p-4 font-mono text-sm outline-none resize-none"
            />
          )}
          {activeTab === 'variables' && (
            <textarea
              value={variables}
              onChange={(e) => setVariables(e.target.value)}
              placeholder='{ "id": "1" }'
              className="flex-1 bg-[#0a0a0a] text-yellow-300 p-4 font-mono text-sm outline-none resize-none"
            />
          )}
          {activeTab === 'headers' && (
            <div className="flex-1 bg-[#0a0a0a] p-4">
              <div className="text-gray-500 text-sm mb-2">Authorization: Bearer token</div>
              <input
                type="text"
                placeholder="Bearer your-token-here"
                className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm font-mono"
              />
            </div>
          )}
        </div>

        {showSchema && (
          <div className="w-64 border-l border-gray-700 p-3 overflow-auto">
            <div className="text-gray-400 text-xs mb-2">Schema</div>
            <pre className="text-xs text-gray-500 font-mono whitespace-pre-wrap">{mockSchema}</pre>
          </div>
        )}
      </div>

      {response && (
        <div className="h-48 border-t border-cyan-500/20 overflow-auto">
          <pre className="p-4 text-sm text-green-400 font-mono">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      <div className="p-3 border-t border-cyan-500/20">
        <div className="text-gray-500 text-xs">Recent Queries</div>
        <div className="mt-2 space-y-1">
          {mockHistory.map(h => (
            <div key={h.id} className="text-xs text-gray-400 p-2 hover:bg-gray-800 rounded cursor-pointer font-mono truncate">
              {h.query}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
