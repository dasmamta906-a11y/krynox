import React, { useState } from 'react';
import { FlaskConical, X, Play, Square, RotateCcw, Check, XCircle, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';

const mockTests = [
  { 
    id: 1, 
    name: 'App Component', 
    status: 'pass', 
    duration: '123ms',
    children: [
      { id: 11, name: 'should render title', status: 'pass', duration: '45ms' },
      { id: 12, name: 'should handle click events', status: 'pass', duration: '34ms' },
      { id: 13, name: 'should update state correctly', status: 'pass', duration: '44ms' },
    ]
  },
  { 
    id: 2, 
    name: 'API Service', 
    status: 'fail', 
    duration: '89ms',
    children: [
      { id: 21, name: 'should fetch data', status: 'pass', duration: '56ms' },
      { id: 22, name: 'should handle errors', status: 'fail', duration: '33ms', error: 'Expected 200, got 404' },
    ]
  },
  { 
    id: 3, 
    name: 'Utils', 
    status: 'pass', 
    duration: '12ms',
    children: [
      { id: 31, name: 'formatDate works correctly', status: 'pass', duration: '8ms' },
      { id: 32, name: 'calculateTotal returns correct sum', status: 'pass', duration: '4ms' },
    ]
  },
];

export default function TestRunnerPanel({ onClose }) {
  const [tests, setTests] = useState(mockTests);
  const [expanded, setExpanded] = useState({});
  const [running, setRunning] = useState(false);

  const passedCount = tests.reduce((acc, t) => {
    const passed = t.children.filter(c => c.status === 'pass').length;
    return acc + passed;
  }, 0);

  const failedCount = tests.reduce((acc, t) => {
    const failed = t.children.filter(c => c.status === 'fail').length;
    return acc + failed;
  }, 0);

  const totalCount = tests.reduce((acc, t) => acc + t.children.length, 0);

  const runTests = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 3000);
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-teal-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-teal-500/20">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-teal-500" />
          <span className="text-white font-semibold">Test Runner</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={runTests}
            disabled={running}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <RotateCcw className={`w-4 h-4 text-gray-400 ${running ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 p-3 border-b border-teal-500/20">
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">{totalCount}</div>
          <div className="text-gray-400 text-xs">Total</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-400">{passedCount}</div>
          <div className="text-gray-400 text-xs">Passed</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-400">{failedCount}</div>
          <div className="text-gray-400 text-xs">Failed</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-400">0</div>
          <div className="text-gray-400 text-xs">Skipped</div>
        </div>
      </div>

      <div className="flex gap-2 p-3 border-b border-teal-500/20">
        <button 
          onClick={runTests}
          disabled={running}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm"
        >
          <Play className="w-4 h-4" /> Run All
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 text-sm"
        >
          <Play className="w-4 h-4" /> Run Failed
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 text-sm">
          <Square className="w-4 h-4" /> Stop
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {tests.map(test => (
          <div key={test.id}>
            <div 
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 cursor-pointer"
              onClick={() => toggleExpand(test.id)}
            >
              {expanded[test.id] ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              
              {test.status === 'pass' ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              
              <span className="flex-1 text-white font-medium">{test.name}</span>
              <span className="text-gray-400 text-sm">{test.duration}</span>
              <span className="text-gray-500 text-xs">
                {test.children.filter(c => c.status === 'pass').length}/{test.children.length} passed
              </span>
            </div>

            {expanded[test.id] && (
              <div className="ml-8 border-l border-gray-700">
                {test.children.map(child => (
                  <div key={child.id} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800/30">
                    {child.status === 'pass' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`flex-1 ${child.status === 'fail' ? 'text-red-300' : 'text-gray-300'}`}>
                      {child.name}
                    </span>
                    <span className="text-gray-500 text-sm">{child.duration}</span>
                    {child.error && (
                      <span className="text-red-400 text-xs">{child.error}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {tests.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FlaskConical className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tests found</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-teal-500/20">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Last run: Just now</span>
          <button className="text-teal-400 hover:text-teal-300">
            Open in Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
