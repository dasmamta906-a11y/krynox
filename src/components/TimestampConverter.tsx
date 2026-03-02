import React, { useState, useEffect } from 'react';
import { Clock, X, Copy, Check, RefreshCw, Globe } from 'lucide-react';

export default function TimestampConverter({ onClose }) {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [converted, setConverted] = useState<any>({});
  const [copied, setCopied] = useState('');

  const convertTimestamp = (ts: number) => {
    const date = new Date(ts * 1000);
    setConverted({
      'Unix': ts,
      'ISO 8601': date.toISOString(),
      'UTC': date.toUTCString(),
      'Local': date.toLocaleString(),
      'Date': date.toLocaleDateString(),
      'Time': date.toLocaleTimeString(),
      'Year': date.getFullYear(),
      'Month': date.getMonth() + 1,
      'Day': date.getDate(),
      'Hours': date.getHours(),
      'Minutes': date.getMinutes(),
      'Seconds': date.getSeconds(),
    });
  };

  useEffect(() => {
    convertTimestamp(timestamp);
    const interval = setInterval(() => {
      convertTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyValue = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const timezones = [
    { name: 'Local', zone: '' },
    { name: 'UTC', zone: 'UTC' },
    { name: 'New York', zone: 'America/New_York' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Sydney', zone: 'Australia/Sydney' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-amber-500/20 w-[500px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          <span className="text-white font-semibold">Timestamp Converter</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-3 border-b border-amber-500/20">
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            value={timestamp}
            onChange={(e) => convertTimestamp(Number(e.target.value))}
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm font-mono"
          />
          <button
            onClick={() => { setTimestamp(Math.floor(Date.now() / 1000)); convertTimestamp(Math.floor(Date.now() / 1000)); }}
            className="px-3 py-2 bg-amber-600 hover:bg-amber-700 rounded text-white text-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-gray-500">
          Current Unix timestamp: {Math.floor(Date.now() / 1000)}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-2">
          {Object.entries(converted).slice(0, 7).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg group">
              <span className="text-amber-400 text-sm">{key}</span>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-mono">{value as string}</span>
                <button 
                  onClick={() => copyValue(value as string, key)}
                  className="p-1 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100"
                >
                  {copied === key ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-gray-400" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="text-gray-400 text-xs mb-2 flex items-center gap-1">
            <Globe className="w-3 h-3" /> World Clock
          </div>
          <div className="grid grid-cols-2 gap-2">
            {timezones.map(tz => (
              <div key={tz.name} className="bg-gray-800 p-2 rounded text-center">
                <div className="text-gray-400 text-xs">{tz.name}</div>
                <div className="text-white text-sm">
                  {tz.zone ? new Date(timestamp * 1000).toLocaleString('en-US', { timeZone: tz.zone }) : new Date(timestamp * 1000).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
