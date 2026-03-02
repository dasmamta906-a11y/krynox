import React, { useState, useEffect } from 'react';
import { Globe, X, Plus, Trash2 } from 'lucide-react';

interface TimeZone {
  id: string;
  city: string;
  timezone: string;
  offset: number;
}

export default function WorldClock({ onClose }) {
  const [times, setTimes] = useState<TimeZone[]>([
    { id: '1', city: 'New York', timezone: 'America/New_York', offset: -5 },
    { id: '2', city: 'London', timezone: 'Europe/London', offset: 0 },
    { id: '3', city: 'Tokyo', timezone: 'Asia/Tokyo', offset: 9 },
    { id: '4', city: 'Sydney', timezone: 'Australia/Sydney', offset: 11 },
    { id: '5', city: 'Dubai', timezone: 'Asia/Dubai', offset: 4 },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addTimeZone = () => {
    if (!newCity.trim()) return;
    const cities: Record<string, TimeZone> = {
      'paris': { id: Date.now().toString(), city: 'Paris', timezone: 'Europe/Paris', offset: 1 },
      'berlin': { id: Date.now().toString(), city: 'Berlin', timezone: 'Europe/Berlin', offset: 1 },
      'singapore': { id: Date.now().toString(), city: 'Singapore', timezone: 'Asia/Singapore', offset: 8 },
      'hong kong': { id: Date.now().toString(), city: 'Hong Kong', timezone: 'Asia/Hong_Kong', offset: 8 },
      'mumbai': { id: Date.now().toString(), city: 'Mumbai', timezone: 'Asia/Kolkata', offset: 5.5 },
      'shanghai': { id: Date.now().toString(), city: 'Shanghai', timezone: 'Asia/Shanghai', offset: 8 },
      'seoul': { id: Date.now().toString(), city: 'Seoul', timezone: 'Asia/Seoul', offset: 9 },
      'los angeles': { id: Date.now().toString(), city: 'Los Angeles', timezone: 'America/Los_Angeles', offset: -8 },
      'chicago': { id: Date.now().toString(), city: 'Chicago', timezone: 'America/Chicago', offset: -6 },
      'toronto': { id: Date.now().toString(), city: 'Toronto', timezone: 'America/Toronto', offset: -5 },
      'são paulo': { id: Date.now().toString(), city: 'São Paulo', timezone: 'America/Sao_Paulo', offset: -3 },
      'moscow': { id: Date.now().toString(), city: 'Moscow', timezone: 'Europe/Moscow', offset: 3 },
      'cairo': { id: Date.now().toString(), city: 'Cairo', timezone: 'Africa/Cairo', offset: 2 },
      'johannesburg': { id: Date.now().toString(), city: 'Johannesburg', timezone: 'Africa/Johannesburg', offset: 2 },
      'lagos': { id: Date.now().toString(), city: 'Lagos', timezone: 'Africa/Lagos', offset: 1 },
    };
    const key = newCity.toLowerCase();
    if (cities[key]) {
      setTimes([...times, cities[key]]);
      setNewCity('');
    }
  };

  const removeTimeZone = (id: string) => {
    setTimes(times.filter(t => t.id !== id));
  };

  const getTime = (offset: number) => {
    const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * offset);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const localTime = () => {
    return formatTime(currentTime);
  };

  const localDate = () => {
    return formatDate(currentTime);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-blue-500/20 w-[500px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          <span className="text-white font-semibold">World Clock</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="flex-1 p-3 space-y-3 overflow-auto">
        {/* Local Time */}
        <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/30">
          <div className="text-blue-400 text-sm mb-1">Local Time</div>
          <div className="text-3xl font-mono text-white">{localTime()}</div>
          <div className="text-gray-400 text-sm">{localDate()}</div>
        </div>
        {/* Add Timezone */}
        <div className="flex gap-2">
          <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} placeholder="Add city (Paris, Tokyo, Mumbai...)" className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700" onKeyDown={(e) => e.key === 'Enter' && addTimeZone()} />
          <button onClick={addTimeZone} className="p-2 bg-blue-600 hover:bg-blue-700 rounded"><Plus className="w-5 h-5 text-white" /></button>
        </div>
        {/* Time Zones */}
        {times.map(tz => (
          <div key={tz.id} className="bg-gray-800 p-3 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-white font-medium">{tz.city}</div>
              <div className="text-gray-400 text-xs">{tz.timezone}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-mono text-blue-300">{formatTime(getTime(tz.offset))}</div>
              <div className="text-xs text-gray-500">UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}</div>
            </div>
            <button onClick={() => removeTimeZone(tz.id)} className="p-1 hover:bg-gray-700 rounded ml-2">
              <Trash2 className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
