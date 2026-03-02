import React, { useState } from 'react';
import { Activity, X, Cpu, MemoryStick, HardDrive, Wifi, Plus, Trash2, RefreshCw } from 'lucide-react';

const mockProcesses = [
  { id: 1, name: 'Code', pid: 1234, cpu: 12.5, memory: 245, status: 'Running' },
  { id: 2, name: 'Terminal', pid: 5678, cpu: 2.1, memory: 89, status: 'Running' },
  { id: 3, name: 'Node.js', pid: 9012, cpu: 5.8, memory: 156, status: 'Running' },
  { id: 4, name: 'Git', pid: 3456, cpu: 0.1, memory: 34, status: 'Idle' },
  { id: 5, name: 'Docker', pid: 7890, cpu: 0.5, memory: 124, status: 'Running' },
];

export default function TaskManagerPanel({ onClose }) {
  const [processes] = useState(mockProcesses);
  const [activeTab, setActiveTab] = useState('processes');

  const totalCpu = processes.reduce((acc, p) => acc + p.cpu, 0);
  const totalMemory = processes.reduce((acc, p) => acc + p.memory, 0);

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-cyan-500/20 w-[700px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-500" />
          <span className="text-white font-semibold">Task Manager</span>
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

      <div className="grid grid-cols-3 gap-2 p-3 border-b border-cyan-500/20">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <Cpu className="w-3 h-3" /> CPU
          </div>
          <div className="text-xl font-bold text-white">{totalCpu.toFixed(1)}%</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <MemoryStick className="w-3 h-3" /> Memory
          </div>
          <div className="text-xl font-bold text-white">{totalMemory} MB</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <HardDrive className="w-3 h-3" /> Disk
          </div>
          <div className="text-xl font-bold text-white">23%</div>
        </div>
      </div>

      <div className="flex border-b border-cyan-500/20">
        {['processes', 'performance', 'network'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-sm capitalize ${
              activeTab === tab 
                ? 'text-white border-b-2 border-cyan-500 bg-gray-800/50' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'processes' && (
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 text-gray-400 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-right">PID</th>
                <th className="px-4 py-2 text-right">CPU</th>
                <th className="px-4 py-2 text-right">Memory</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {processes.map(proc => (
                <tr key={proc.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                  <td className="px-4 py-2 text-white">{proc.name}</td>
                  <td className="px-4 py-2 text-gray-400 text-right">{proc.pid}</td>
                  <td className="px-4 py-2 text-gray-400 text-right">{proc.cpu}%</td>
                  <td className="px-4 py-2 text-gray-400 text-right">{proc.memory} MB</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      proc.status === 'Running' ? 'bg-green-900/30 text-green-400' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {proc.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="p-1 hover:bg-gray-700 rounded">
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="flex-1 p-4">
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>CPU Usage</span>
              <span>{totalCpu.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded overflow-hidden">
              <div className="h-full bg-cyan-500" style={{ width: `${totalCpu}%` }} />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Memory Usage</span>
              <span>{totalMemory} MB</span>
            </div>
            <div className="h-2 bg-gray-800 rounded overflow-hidden">
              <div className="h-full bg-purple-500" style={{ width: '45%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Disk I/O</span>
              <span>12.3 MB/s</span>
            </div>
            <div className="h-2 bg-gray-800 rounded overflow-hidden">
              <div className="h-full bg-yellow-500" style={{ width: '30%' }} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'network' && (
        <div className="flex-1 p-4">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <Wifi className="w-4 h-4" /> Connected
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Upload</span>
              <span className="text-white">1.2 MB/s</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Download</span>
              <span className="text-white">5.6 MB/s</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-800">
              <span className="text-gray-400">Latency</span>
              <span className="text-white">24 ms</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
