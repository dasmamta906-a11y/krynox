import React, { useState } from 'react';
import { Regex, X, Copy, Check, AlertCircle, RefreshCw } from 'lucide-react';

const testStrings = [
  'hello@world.com',
  'invalid-email',
  'test.user@example.co.uk',
  'another@test.org',
];

export default function RegexTester({ onClose }) {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [testInput, setTestInput] = useState(testStrings.join('\n'));
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const lines = testInput.split('\n');
      const found: string[] = [];
      
      lines.forEach(line => {
        const match = line.match(regex);
        if (match) found.push(...match);
      });
      
      setMatches(found);
      setError('');
    } catch (e) {
      setError('Invalid regex: ' + (e as Error).message);
      setMatches([]);
    }
  };

  const quickPatterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { name: 'URL', pattern: 'https?:\\/\\/[\\w\\-._~:/?#[\\]@!$&\'()*+,;=%]+' },
    { name: 'Phone', pattern: '\\+?[0-9]{1,4}?[-.\\s]?\\(?[0-9]{1,3}?\\)?[-.\\s]?[0-9]{1,4}[-.\\s]?[0-9]{1,9}' },
    { name: 'IP Address', pattern: '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)' },
    { name: 'Date', pattern: '\\d{4}-\\d{2}-\\d{2}' },
    { name: 'Hex Color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-orange-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-orange-500/20">
        <div className="flex items-center gap-2">
          <Regex className="w-5 h-5 text-orange-500" />
          <span className="text-white font-semibold">Regex Tester</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-3 border-b border-orange-500/20">
        <div className="flex gap-2 mb-2">
          <span className="text-gray-400 text-sm py-2">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            onBlur={testRegex}
            placeholder="Regular expression..."
            className="flex-1 bg-gray-800 text-orange-300 px-3 py-2 rounded border border-gray-700 text-sm font-mono"
          />
          <span className="text-gray-400 text-sm py-2">/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            onBlur={testRegex}
            placeholder="flags"
            className="w-16 bg-gray-800 text-purple-300 px-3 py-2 rounded border border-gray-700 text-sm font-mono"
          />
        </div>
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
      </div>

      <div className="p-2 border-b border-orange-500/20">
        <div className="text-gray-400 text-xs mb-2">Quick Patterns</div>
        <div className="flex flex-wrap gap-1">
          {quickPatterns.map(p => (
            <button
              key={p.name}
              onClick={() => { setPattern(p.pattern); testRegex(); }}
              className="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-3">
        <label className="text-gray-400 text-sm mb-2">Test String</label>
        <textarea
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
          onBlur={testRegex}
          placeholder="Enter text to test..."
          className="h-32 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm font-mono resize-none"
        />

        <div className="mt-3">
          <button
            onClick={testRegex}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded text-white text-sm flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Test
          </button>
        </div>

        <div className="mt-3 flex-1 overflow-auto">
          <label className="text-gray-400 text-sm mb-2">Matches ({matches.length})</label>
          <div className="space-y-1">
            {matches.map((match, i) => (
              <div key={i} className="bg-green-900/20 border border-green-500/30 px-3 py-2 rounded text-green-300 font-mono text-sm">
                {match}
              </div>
            ))}
            {matches.length === 0 && !error && (
              <div className="text-gray-500 text-sm">No matches found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
