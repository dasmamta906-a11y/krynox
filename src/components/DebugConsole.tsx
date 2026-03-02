import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Trash2, 
  Filter, 
  Search, 
  ChevronDown, 
  ChevronRight,
  AlertCircle,
  AlertTriangle,
  Info,
  Bug,
  X,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  id: number;
  level: LogLevel;
  message: string;
  timestamp: string;
  expandable?: boolean;
  details?: string;
  stack?: string;
}

// Mock log entries
const mockLogs: LogEntry[] = [
  { id: 1, level: 'info', message: 'Application started successfully', timestamp: '10:30:15 AM' },
  { id: 2, level: 'log', message: 'User logged in: john@example.com', timestamp: '10:30:20 AM' },
  { id: 3, level: 'debug', message: 'API Request: GET /api/users', timestamp: '10:30:25 AM', details: 'Request ID: req_123\nDuration: 245ms' },
  { id: 4, level: 'info', message: 'Response received: 200 OK', timestamp: '10:30:25 AM' },
  { id: 5, level: 'warn', message: 'Deprecated API endpoint used: /api/v1/users', timestamp: '10:30:26 AM', details: 'This endpoint will be removed in v2.0. Please use /api/v2/users instead.' },
  { id: 6, level: 'error', message: 'Failed to load configuration', timestamp: '10:30:30 AM', expandable: true, details: 'Error: ENOENT: no such file or directory', stack: 'at loadConfig (config.ts:45)\nat init (app.ts:12)\nat main (index.js:5)' },
  { id: 7, level: 'debug', message: 'Memory usage: 128MB / 512MB', timestamp: '10:30:35 AM' },
  { id: 8, level: 'info', message: 'Rendering component: Dashboard', timestamp: '10:30:40 AM' },
];

const LEVEL_CONFIG: Record<LogLevel, { icon: React.ReactNode; color: string; bgColor: string; label: string }> = {
  log: { icon: <Terminal className="w-3 h-3" />, color: 'text-gray-300', bgColor: 'bg-gray-500', label: 'Log' },
  info: { icon: <Info className="w-3 h-3" />, color: 'text-blue-400', bgColor: 'bg-blue-500', label: 'Info' },
  warn: { icon: <AlertTriangle className="w-3 h-3" />, color: 'text-yellow-400', bgColor: 'bg-yellow-500', label: 'Warning' },
  error: { icon: <AlertCircle className="w-3 h-3" />, color: 'text-red-400', bgColor: 'bg-red-500', label: 'Error' },
  debug: { icon: <Bug className="w-3 h-3" />, color: 'text-purple-400', bgColor: 'bg-purple-500', label: 'Debug' },
};

export default function DebugConsole({ onClose }) {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [filter, setFilter] = useState<LogLevel | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedLogs, setExpandedLogs] = useState<Set<number>>(new Set());
  const [isPaused, setIsPaused] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const logIdRef = useRef(mockLogs.length + 1);

  // Auto scroll
  useEffect(() => {
    if (autoScroll && !isPaused) {
      logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll, isPaused]);

  // Simulate new logs coming in
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: logIdRef.current++,
        level: ['log', 'info', 'debug', 'warn', 'error'][Math.floor(Math.random() * 5)] as LogLevel,
        message: [
          'Processing request...',
          'Cache hit for: /api/users',
          'Database query executed',
          'Component re-rendered',
          'State updated',
          'API response received',
        ][Math.floor(Math.random() * 6)],
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setLogs(prev => [...prev.slice(-99), newLog]); // Keep last 100 logs
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const toggleExpand = (id: number) => {
    setExpandedLogs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter;
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLevelCounts = () => {
    return {
      all: logs.length,
      log: logs.filter(l => l.level === 'log').length,
      info: logs.filter(l => l.level === 'info').length,
      warn: logs.filter(l => l.level === 'warn').length,
      error: logs.filter(l => l.level === 'error').length,
      debug: logs.filter(l => l.level === 'debug').length,
    };
  };

  const counts = getLevelCounts();

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border-t border-purple-500/30">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-purple-500" />
          <span className="text-white font-semibold text-sm">Debug Console</span>
          <span className="text-gray-500 text-xs">({logs.length} entries)</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Pause/Resume */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`p-1.5 rounded transition-colors ${
              isPaused ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>

          {/* Auto Scroll */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`p-1.5 rounded transition-colors ${
              autoScroll ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
            title="Auto Scroll"
          >
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Clear */}
          <button
            onClick={clearLogs}
            className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            title="Clear Console"
          >
            <Trash2 className="w-3 h-3" />
          </button>

          {/* Close */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-purple-500/10">
        {/* Level Filters */}
        <div className="flex items-center gap-1">
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
            count={counts.all}
            color="text-white"
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'error'} 
            onClick={() => setFilter('error')}
            count={counts.error}
            color="text-red-400"
          >
            Error
          </FilterButton>
          <FilterButton 
            active={filter === 'warn'} 
            onClick={() => setFilter('warn')}
            count={counts.warn}
            color="text-yellow-400"
          >
            Warn
          </FilterButton>
          <FilterButton 
            active={filter === 'info'} 
            onClick={() => setFilter('info')}
            count={counts.info}
            color="text-blue-400"
          >
            Info
          </FilterButton>
          <FilterButton 
            active={filter === 'debug'} 
            onClick={() => setFilter('debug')}
            count={counts.debug}
            color="text-purple-400"
          >
            Debug
          </FilterButton>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#1a1a1a] rounded px-2 py-1">
          <Search className="w-3 h-3 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter logs..."
            className="bg-transparent text-white text-xs placeholder-gray-500 outline-none w-32"
          />
        </div>
      </div>

      {/* Logs List */}
      <div className="flex-1 overflow-y-auto font-mono text-xs">
        {filteredLogs.map((log) => {
          const config = LEVEL_CONFIG[log.level];
          const isExpanded = expandedLogs.has(log.id);

          return (
            <div 
              key={log.id} 
              className={`px-3 py-1.5 border-b border-gray-800 hover:bg-gray-800/50 ${config.color}`}
            >
              <div className="flex items-start gap-2">
                {/* Expand Button */}
                {log.expandable || log.details ? (
                  <button
                    onClick={() => toggleExpand(log.id)}
                    className="mt-0.5"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-gray-500" />
                    )}
                  </button>
                ) : (
                  <span className="w-3" />
                )}

                {/* Level Icon */}
                <span className={`${config.color} mt-0.5`}>
                  {config.icon}
                </span>

                {/* Timestamp */}
                <span className="text-gray-500 shrink-0">{log.timestamp}</span>

                {/* Message */}
                <span className="flex-1 break-all">{log.message}</span>
              </div>

              {/* Expanded Details */}
              {isExpanded && log.details && (
                <div className="mt-2 pl-7 pr-3 py-2 bg-black/30 rounded">
                  <pre className="text-gray-400 whitespace-pre-wrap">{log.details}</pre>
                  {log.stack && (
                    <pre className="mt-2 text-red-400 whitespace-pre-wrap">{log.stack}</pre>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div ref={logsEndRef} />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#1a1a1a] border-t border-purple-500/20 text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <span>Filtered: {filteredLogs.length}</span>
          {isPaused && <span className="text-yellow-400">● Paused</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Connected
          </span>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, count, color, children }: { 
  active: boolean; 
  onClick: () => void; 
  count: number;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
        active 
          ? 'bg-purple-600 text-white' 
          : `bg-gray-800 ${color} hover:bg-gray-700`
      }`}
    >
      {children}
      <span className={active ? 'text-white/70' : ''}>({count})</span>
    </button>
  );
}
