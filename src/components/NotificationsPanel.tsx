import React, { useState } from 'react';
import { Bell, X, Check, AlertCircle, Info, AlertTriangle, Trash2, CheckCheck } from 'lucide-react';

const mockNotifications = [
  { id: 1, type: 'success', title: 'Build Successful', message: 'Project built in 2.3s', time: '2 min ago' },
  { id: 2, type: 'error', title: 'Build Failed', message: 'Error in src/App.tsx:42', time: '5 min ago' },
  { id: 3, type: 'info', title: 'Update Available', message: 'Version 2.0.0 is available', time: '1 hour ago' },
  { id: 4, type: 'warning', title: 'Disk Space Low', message: 'Only 2GB remaining', time: '2 hours ago' },
  { id: 5, type: 'success', title: 'File Saved', message: 'src/index.ts saved', time: '3 hours ago' },
  { id: 6, type: 'info', title: 'AI Assistant Ready', message: 'Model loaded successfully', time: 'Yesterday' },
];

const typeConfig = {
  success: { icon: Check, color: 'text-green-500', bg: 'bg-green-500/10' },
  error: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
  warning: { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10' },
};

export default function NotificationsPanel({ onClose }) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const clearAll = () => setNotifications([]);
  const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-yellow-500/20 w-80">
      <div className="flex items-center justify-between px-4 py-3 border-b border-yellow-500/20">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-yellow-500" />
          <span className="text-white font-semibold">Notifications</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={clearAll} className="p-1 hover:bg-gray-700 rounded" title="Clear all">
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex gap-1 p-2 border-b border-yellow-500/20">
        {['all', 'success', 'error', 'warning', 'info'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded text-xs capitalize ${
              filter === type ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filtered.map(notification => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;
          return (
            <div 
              key={notification.id} 
              className={`p-3 rounded-lg mb-2 ${config.bg} border border-gray-800`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium">{notification.title}</div>
                  <div className="text-gray-400 text-xs mt-1">{notification.message}</div>
                  <div className="text-gray-500 text-xs mt-2">{notification.time}</div>
                </div>
                <button 
                  onClick={() => dismiss(notification.id)}
                  className="p-1 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-yellow-500/20">
        <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 text-sm flex items-center justify-center gap-2">
          <CheckCheck className="w-4 h-4" /> Mark all as read
        </button>
      </div>
    </div>
  );
}
