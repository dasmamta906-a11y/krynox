import React, { useState } from 'react';
import { Server, X, Plus, Trash2, Terminal, Folder, Power, RefreshCw, Wifi, WifiOff, ChevronRight, ChevronDown } from 'lucide-react';

const mockConnections = [
  { 
    id: 1, 
    name: 'Production Server', 
    host: 'prod.server.com', 
    port: 22, 
    user: 'deploy',
    status: 'connected',
    lastConnected: '2 hours ago',
    files: [
      { path: '/var/www/app', type: 'folder' },
      { path: '/home/deploy/logs', type: 'folder' },
      { path: '/etc/nginx', type: 'folder' },
    ]
  },
  { 
    id: 2, 
    name: 'Staging Server', 
    host: 'staging.server.com', 
    port: 22, 
    user: 'admin',
    status: 'disconnected',
    lastConnected: '1 day ago',
    files: []
  },
  { 
    id: 3, 
    name: 'Dev VM', 
    host: '192.168.1.100', 
    port: 2222, 
    user: 'developer',
    status: 'disconnected',
    lastConnected: '3 days ago',
    files: []
  },
];

export default function RemoteSSHPanel({ onClose }) {
  const [connections, setConnections] = useState(mockConnections);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const connect = (id) => {
    setConnections(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'connected' } : c
    ));
  };

  const disconnect = (id) => {
    setConnections(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'disconnected' } : c
    ));
  };

  const deleteConnection = (id) => {
    setConnections(connections.filter(c => c.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-blue-500/20 w-[500px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-500" />
          <span className="text-white font-semibold">Remote SSH</span>
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

      <div className="p-3 border-b border-blue-500/20">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">
          <Plus className="w-4 h-4" /> New Connection
        </button>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {connections.map(conn => (
          <div key={conn.id} className="mb-2">
            <div 
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 cursor-pointer"
              onClick={() => toggleExpand(conn.id)}
            >
              {expanded[conn.id] ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              
              {conn.status === 'connected' ? (
                <Wifi className="w-4 h-4 text-green-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-gray-500" />
              )}
              
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium">{conn.name}</div>
                <div className="text-gray-400 text-xs">
                  {conn.user}@{conn.host}:{conn.port}
                </div>
              </div>

              <div className="flex items-center gap-1">
                {conn.status === 'connected' ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); disconnect(conn.id); }}
                    className="p-1.5 hover:bg-gray-700 rounded"
                    title="Disconnect"
                  >
                    <Power className="w-4 h-4 text-red-400" />
                  </button>
                ) : (
                  <button 
                    onClick={(e) => { e.stopPropagation(); connect(conn.id); }}
                    className="p-1.5 hover:bg-gray-700 rounded"
                    title="Connect"
                  >
                    <Power className="w-4 h-4 text-green-400" />
                  </button>
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteConnection(conn.id); }}
                  className="p-1.5 hover:bg-gray-700 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {expanded[conn.id] && conn.files.length > 0 && (
              <div className="ml-8 mt-1 space-y-1">
                {conn.files.map((file, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded text-gray-400 text-sm cursor-pointer"
                  >
                    <Folder className="w-4 h-4 text-yellow-400" />
                    <span>{file.path}</span>
                  </div>
                ))}
              </div>
            )}

            {expanded[conn.id] && conn.status === 'connected' && (
              <div className="ml-8 mt-2 flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 text-xs">
                  <Terminal className="w-3 h-3" /> Open Terminal
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 text-xs">
                  <Folder className="w-3 h-3" /> Browse Files
                </button>
              </div>
            )}
          </div>
        ))}

        {connections.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Server className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No SSH connections</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-blue-500/20">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{connections.filter(c => c.status === 'connected').length} connected</span>
          <span>{connections.length} total</span>
        </div>
      </div>
    </div>
  );
}
