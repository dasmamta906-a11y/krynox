import React, { useState } from 'react';
import { Wifi, X, Send, Plus, Trash2, Copy, Check, Play, Square } from 'lucide-react';

const mockMessages = [
  { id: 1, type: 'sent', data: '{"type": "subscribe", "channel": "updates"}', time: '10:30:45' },
  { id: 2, type: 'received', data: '{"type": "message", "content": "Connected!"}', time: '10:30:46' },
  { id: 3, type: 'received', data: '{"type": "update", "data": {"status": "active"}}', time: '10:31:00' },
];

export default function WebSocketTester({ onClose }) {
  const [url, setUrl] = useState('wss://echo.websocket.org');
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [history, setHistory] = useState([]);

  const connect = () => {
    setConnected(true);
    setMessages([...messages, { id: Date.now(), type: 'system', data: 'Connected to ' + url, time: new Date().toLocaleTimeString() }]);
  };

  const disconnect = () => {
    setConnected(false);
    setMessages([...messages, { id: Date.now(), type: 'system', data: 'Disconnected', time: new Date().toLocaleTimeString() }]);
  };

  const sendMessage = () => {
    if (message && connected) {
      setMessages([...messages, { id: Date.now(), type: 'sent', data: message, time: new Date().toLocaleTimeString() }]);
      setMessage('');
      // Mock response
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now(), type: 'received', data: `Echo: ${message}`, time: new Date().toLocaleTimeString() }]);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-amber-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5 text-amber-500" />
          <span className="text-white font-semibold">WebSocket Tester</span>
          <span className={`px-2 py-0.5 rounded text-xs ${connected ? 'bg-green-900/30 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-3 border-b border-amber-500/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="wss://example.com/socket"
            disabled={connected}
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm font-mono"
          />
          {connected ? (
            <button onClick={disconnect} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm flex items-center gap-2">
              <Square className="w-4 h-4" /> Disconnect
            </button>
          ) : (
            <button onClick={connect} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm flex items-center gap-2">
              <Play className="w-4 h-4" /> Connect
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 space-y-2">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.type === 'sent' ? 'justify-end' : msg.type === 'system' ? 'justify-center' : ''}`}>
            <div className={`max-w-[80%] p-2 rounded-lg ${
              msg.type === 'sent' ? 'bg-blue-900/30 text-blue-300' :
              msg.type === 'received' ? 'bg-green-900/30 text-green-300' :
              'bg-gray-800 text-gray-400 text-center'
            }`}>
              <pre className="text-xs font-mono whitespace-pre-wrap">{msg.data}</pre>
              <div className="text-[10px] text-gray-500 mt-1">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-amber-500/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Enter message..."
            disabled={!connected}
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm font-mono"
          />
          <button
            onClick={sendMessage}
            disabled={!connected || !message}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 rounded text-white text-sm flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
