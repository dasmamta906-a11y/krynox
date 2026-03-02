import React, { useState } from 'react';
import { 
  Send, 
  Plus, 
  Trash2, 
  Copy, 
  Download, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Key,
  FileJson,
  Settings,
  ChevronDown,
  X
} from 'lucide-react';

const HTTP_METHODS = [
  { id: 'GET', color: 'text-green-400 bg-green-400/10' },
  { id: 'POST', color: 'text-yellow-400 bg-yellow-400/10' },
  { id: 'PUT', color: 'text-blue-400 bg-blue-400/10' },
  { id: 'PATCH', color: 'text-purple-400 bg-purple-400/10' },
  { id: 'DELETE', color: 'text-red-400 bg-red-400/10' },
];

// Mock saved requests
const savedRequests = [
  { name: 'Get Users', method: 'GET', url: '/api/users' },
  { name: 'Create User', method: 'POST', url: '/api/users' },
  { name: 'Login', method: 'POST', url: '/api/auth/login' },
];

export default function ApiTesterPanel({ onClose }) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([{ key: 'Content-Type', value: 'application/json' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body' | 'auth'>('params');

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const sendRequest = async () => {
    if (!url) return;
    
    setLoading(true);
    setResponse(null);
    setResponseTime(null);
    setStatusCode(null);

    const startTime = Date.now();

    // Simulate API call
    setTimeout(() => {
      const endTime = Date.now();
      setResponseTime(endTime - startTime);
      setStatusCode(200);
      setResponse({
        success: true,
        data: {
          users: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          ],
          pagination: {
            page: 1,
            total: 100,
            limit: 10
          }
        },
        message: 'Users retrieved successfully'
      });
      setLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const getMethodColor = (m: string) => {
    return HTTP_METHODS.find(h => h.id === m)?.color || 'text-gray-400 bg-gray-400/10';
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <Send className="w-5 h-5 text-purple-500" />
          <span className="text-white font-semibold">API Tester</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* URL Bar */}
      <div className="p-3 border-b border-purple-500/20">
        <div className="flex gap-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className={`px-3 py-2 rounded-lg font-mono text-sm font-medium ${getMethodColor(method)}`}
          >
            {HTTP_METHODS.map(m => (
              <option key={m.id} value={m.id}>{m.id}</option>
            ))}
          </select>
          
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter request URL"
            className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 outline-none focus:border-purple-500"
          />
          
          <button
            onClick={sendRequest}
            disabled={loading || !url}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Send
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-purple-500/20">
        <button
          onClick={() => setActiveTab('params')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'params' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          Params
        </button>
        <button
          onClick={() => setActiveTab('headers')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'headers' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          Headers
          {headers.length > 0 && <span className="ml-1 text-xs">({headers.length})</span>}
        </button>
        <button
          onClick={() => setActiveTab('body')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'body' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          Body
        </button>
        <button
          onClick={() => setActiveTab('auth')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'auth' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          Auth
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Headers Tab */}
        {activeTab === 'headers' && (
          <div className="space-y-2">
            {headers.map((header, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={header.key}
                  onChange={(e) => updateHeader(i, 'key', e.target.value)}
                  placeholder="Header name"
                  className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded px-3 py-2 text-white text-sm placeholder-gray-500 outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={header.value}
                  onChange={(e) => updateHeader(i, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded px-3 py-2 text-white text-sm placeholder-gray-500 outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => removeHeader(i)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addHeader}
              className="flex items-center gap-1 text-purple-400 text-sm hover:text-purple-300"
            >
              <Plus className="w-4 h-4" /> Add Header
            </button>
          </div>
        )}

        {/* Body Tab */}
        {activeTab === 'body' && (
          <div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{\n  "key": "value"\n}'
              className="w-full h-48 bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white text-sm font-mono placeholder-gray-500 outline-none focus:border-purple-500 resize-none"
            />
          </div>
        )}

        {/* Auth Tab */}
        {activeTab === 'auth' && (
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Auth Type</label>
              <select className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-3 py-2 text-white text-sm outline-none focus:border-purple-500">
                <option>No Auth</option>
                <option>Bearer Token</option>
                <option>Basic Auth</option>
                <option>API Key</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Token</label>
              <input
                type="text"
                placeholder="Enter token"
                className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-3 py-2 text-white text-sm placeholder-gray-500 outline-none focus:border-purple-500"
              />
            </div>
          </div>
        )}

        {/* Params Tab */}
        {activeTab === 'params' && (
          <div className="text-gray-400 text-sm">Query parameters can be added to the URL</div>
        )}
      </div>

      {/* Response Section */}
      {response && (
        <div className="border-t border-purple-500/20">
          {/* Response Status */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a]">
            <div className="flex items-center gap-3">
              {statusCode === 200 ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span className={`font-mono text-sm ${statusCode === 200 ? 'text-green-400' : 'text-red-400'}`}>
                {statusCode} OK
              </span>
              {responseTime && (
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {responseTime}ms
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors">
                <Copy className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Response Body */}
          <div className="p-3 max-h-60 overflow-y-auto">
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
