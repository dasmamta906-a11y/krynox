import React, { useState } from 'react';
import { Clock, X, Copy, Check, Play, RefreshCw } from 'lucide-react';

export default function CronBuilder({ onClose }) {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [copied, setCopied] = useState(false);

  const cron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const copyCron = () => {
    navigator.clipboard.writeText(cron);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { name: 'Every minute', cron: '* * * * *' },
    { name: 'Every hour', cron: '0 * * * *' },
    { name: 'Every day at midnight', cron: '0 0 * * *' },
    { name: 'Every day at noon', cron: '0 12 * * *' },
    { name: 'Every Monday', cron: '0 0 * * 1' },
    { name: 'Every month', cron: '0 0 1 * *' },
  ];

  const nextRuns = [
    '2024-02-28 12:00:00',
    '2024-02-29 12:00:00',
    '2024-03-01 12:00:00',
    '2024-03-02 12:00:00',
    '2024-03-03 12:00:00',
  ];

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-amber-500/20 w-[500px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          <span className="text-white font-semibold">Cron Expression Builder</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-4 border-b border-amber-500/20">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={cron}
            readOnly
            className="flex-1 bg-gray-800 text-amber-300 px-4 py-3 rounded border border-gray-700 text-center font-mono text-lg"
          />
          <button onClick={copyCron} className="p-3 bg-gray-800 hover:bg-gray-700 rounded">
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400" />}
          </button>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>min</span><span>hour</span><span>day</span><span>month</span><span>weekday</span>
        </div>
        <div className="flex gap-2">
          <input type="text" value={minute} onChange={(e) => setMinute(e.target.value)} className="w-16 bg-gray-800 text-white px-2 py-2 rounded border border-gray-700 text-center font-mono" placeholder="*" />
          <input type="text" value={hour} onChange={(e) => setHour(e.target.value)} className="w-16 bg-gray-800 text-white px-2 py-2 rounded border border-gray-700 text-center font-mono" placeholder="*" />
          <input type="text" value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} className="w-16 bg-gray-800 text-white px-2 py-2 rounded border border-gray-700 text-center font-mono" placeholder="*" />
          <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} className="w-16 bg-gray-800 text-white px-2 py-2 rounded border border-gray-700 text-center font-mono" placeholder="*" />
          <input type="text" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} className="w-16 bg-gray-800 text-white px-2 py-2 rounded border border-gray-700 text-center font-mono" placeholder="*" />
        </div>
      </div>

      <div className="p-3 border-b border-amber-500/20">
        <div className="text-gray-400 text-xs mb-2">Presets</div>
        <div className="flex flex-wrap gap-2">
          {presets.map(p => (
            <button
              key={p.name}
              onClick={() => {
                const parts = p.cron.split(' ');
                setMinute(parts[0]); setHour(parts[1]); setDayOfMonth(parts[2]); setMonth(parts[3]); setDayOfWeek(parts[4]);
              }}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3">
        <div className="text-gray-400 text-xs mb-2">Next 5 Runs</div>
        <div className="space-y-2">
          {nextRuns.map((run, i) => (
            <div key={i} className="bg-gray-800/50 px-3 py-2 rounded text-gray-300 text-sm font-mono">
              {run}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
