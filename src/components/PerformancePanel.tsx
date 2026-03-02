import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  MemoryStick, 
  Clock, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  X,
  Play,
  Pause,
  BarChart2,
  FileText,
  AlertTriangle,
  CheckCircle,
  Loader2,
  ChevronDown
} from 'lucide-react';

// Mock performance data
const mockMetrics = {
  cpu: { current: 23.5, avg: 18.2, peak: 45.0, history: [15, 22, 18, 25, 20, 28, 23] },
  memory: { current: 256, total: 1024, percentage: 25, history: [220, 240, 235, 250, 245, 260, 256] },
  fps: { current: 60, avg: 58, min: 45, history: [60, 59, 60, 58, 57, 59, 60] },
  network: { sent: '1.2 MB', received: '4.5 MB', latency: 45 },
};

// Mock function profiles
const mockProfiles = [
  { name: 'renderApp', calls: 1250, time: '45ms', percentage: 35 },
  { name: 'fetchUserData', calls: 45, time: '120ms', percentage: 25 },
  { name: 'updateState', calls: 3200, time: '15ms', percentage: 18 },
  { name: 'parseJSON', calls: 890, time: '8ms', percentage: 12 },
  { name: 'renderComponent', calls: 5600, time: '5ms', percentage: 10 },
];

// Mock memory leak warnings
const mockWarnings = [
  { id: 1, type: 'memory', message: 'Potential memory leak detected in useEffect', severity: 'warning', file: 'App.jsx:45' },
  { id: 2, type: 'performance', message: 'Slow render detected (>16ms)', severity: 'info', file: 'EditorPanel.tsx:123' },
];

export default function PerformancePanel({ onClose }) {
  const [isRecording, setIsRecording] = useState(true);
  const [metrics, setMetrics] = useState(mockMetrics);
  const [activeTab, setActiveTab] = useState<'overview' | 'functions' | 'memory' | 'network'>('overview');

  // Simulate real-time updates
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setMetrics({
        cpu: { 
          ...metrics.cpu, 
          current: Math.random() * 30 + 10,
          history: [...metrics.cpu.history.slice(1), Math.random() * 30 + 10]
        },
        memory: { 
          ...metrics.memory, 
          current: Math.floor(Math.random() * 100 + 200),
          percentage: Math.floor(Math.random() * 20 + 20),
          history: [...metrics.memory.history.slice(1), Math.floor(Math.random() * 100 + 200)]
        },
        fps: { 
          ...metrics.fps, 
          current: Math.floor(Math.random() * 15 + 55),
          history: [...metrics.fps.history.slice(1), Math.floor(Math.random() * 15 + 55)]
        },
        network: metrics.network,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  const getHealthColor = (value: number, thresholds: { good: number; warn: number }) => {
    if (value <= thresholds.good) return 'text-green-400';
    if (value <= thresholds.warn) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-500" />
          <span className="text-white font-semibold">Performance</span>
          <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 ${isRecording ? 'bg-green-400/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isRecording ? 'bg-green-400' : 'bg-gray-400'} ${isRecording ? 'animate-pulse' : ''}`} />
            {isRecording ? 'Recording' : 'Paused'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`p-1.5 rounded transition-colors ${isRecording ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'}`}
            title={isRecording ? 'Pause' : 'Resume'}
          >
            {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2 p-3 border-b border-purple-500/20 bg-[#1a1a1a]">
        <MetricCard 
          icon={<Cpu className="w-5 h-5" />}
          label="CPU"
          value={`${metrics.cpu.current.toFixed(1)}%`}
          subValue={`Peak: ${metrics.cpu.peak}%`}
          color="text-blue-400"
          trend={metrics.cpu.current > metrics.cpu.avg ? 'up' : 'down'}
        />
        <MetricCard 
          icon={<MemoryStick className="w-5 h-5" />}
          label="Memory"
          value={`${metrics.memory.current}MB`}
          subValue={`${metrics.memory.percentage}% of ${metrics.memory.total}MB`}
          color="text-purple-400"
          trend={metrics.memory.percentage > 50 ? 'up' : 'down'}
        />
        <MetricCard 
          icon={<Zap className="w-5 h-5" />}
          label="FPS"
          value={metrics.fps.current}
          subValue={`Min: ${metrics.fps.min}`}
          color={getHealthColor(metrics.fps.current, { good: 55, warn: 30 })}
          trend={metrics.fps.current >= 55 ? 'up' : 'down'}
        />
        <MetricCard 
          icon={<Clock className="w-5 h-5" />}
          label="Latency"
          value={`${metrics.network.latency}ms`}
          subValue="Network"
          color="text-green-400"
          trend="down"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-purple-500/20">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'overview' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('functions')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'functions' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          Functions
        </button>
        <button
          onClick={() => setActiveTab('memory')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'memory' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          Memory
        </button>
        <button
          onClick={() => setActiveTab('network')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'network' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          Network
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* CPU Chart */}
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">CPU Usage</span>
                </div>
                <span className="text-blue-400 font-mono">{metrics.cpu.current.toFixed(1)}%</span>
              </div>
              <div className="flex items-end gap-1 h-20">
                {metrics.cpu.history.map((val, i) => (
                  <div 
                    key={i}
                    className="flex-1 bg-blue-500/50 rounded-t"
                    style={{ height: `${(val / 50) * 100}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Memory Chart */}
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MemoryStick className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-medium">Memory Usage</span>
                </div>
                <span className="text-purple-400 font-mono">{metrics.memory.current}MB</span>
              </div>
              <div className="flex items-end gap-1 h-20">
                {metrics.memory.history.map((val, i) => (
                  <div 
                    key={i}
                    className="flex-1 bg-purple-500/50 rounded-t"
                    style={{ height: `${(val / 512) * 100}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Warnings */}
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">Issues</span>
                <span className="text-xs text-gray-500">({mockWarnings.length})</span>
              </div>
              {mockWarnings.map(warning => (
                <div key={warning.id} className="flex items-start gap-2 p-2 bg-yellow-400/5 rounded mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-300">{warning.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{warning.file}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Functions Tab */}
        {activeTab === 'functions' && (
          <div className="space-y-2">
            <div className="text-xs text-gray-500 mb-2">SLOWEST FUNCTIONS (Last 60s)</div>
            {mockProfiles.map((profile, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-medium">{profile.name}</span>
                  </div>
                  <span className="text-gray-400 font-mono text-sm">{profile.time}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{profile.calls.toLocaleString()} calls</span>
                  <span>•</span>
                  <span>{profile.percentage}% of total</span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${profile.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Memory Tab */}
        {activeTab === 'memory' && (
          <div className="space-y-4">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-3">HEAP USAGE</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Used</span>
                    <span className="text-white">{metrics.memory.current} MB</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500"
                      style={{ width: `${metrics.memory.percentage}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white">{metrics.memory.total} MB</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-3">MEMORY LEAK DETECTION</div>
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>No memory leaks detected</span>
              </div>
            </div>
          </div>
        )}

        {/* Network Tab */}
        {activeTab === 'network' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Data Sent</div>
                <div className="text-2xl font-bold text-green-400">{metrics.network.sent}</div>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Data Received</div>
                <div className="text-2xl font-bold text-blue-400">{metrics.network.received}</div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-3">NETWORK ACTIVITY</div>
              <div className="space-y-2">
                {['API Requests', 'WebSocket Messages', 'Asset Downloads'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-[#0a0a0a] rounded">
                    <span className="text-sm text-gray-300">{item}</span>
                    <span className="text-purple-400 font-mono">{Math.floor(Math.random() * 100) + 10}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, subValue, color, trend }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number; 
  subValue: string;
  color: string;
  trend: 'up' | 'down';
}) {
  return (
    <div className="bg-[#0a0a0a] p-3 rounded-lg">
      <div className="flex items-center justify-between mb-1">
        <span className={color}>{icon}</span>
        {trend === 'up' ? (
          <TrendingUp className="w-3 h-3 text-red-400" />
        ) : (
          <TrendingDown className="w-3 h-3 text-green-400" />
        )}
      </div>
      <div className={`text-lg font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500">{label} • {subValue}</div>
    </div>
  );
}
