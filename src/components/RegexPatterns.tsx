import React, { useState } from 'react';
import { Regex, X, Copy, Check, Search } from 'lucide-react';

const regexPatterns = {
  'Validation': [
    { name: 'Email', pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', desc: 'Validate email address' },
    { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', desc: 'Validate URL' },
    { name: 'Phone (US)', pattern: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$', desc: 'US phone number' },
    { name: 'Phone (IN)', pattern: '^\\+?([0-9]{10})$', desc: 'Indian mobile number' },
    { name: 'IP Address (IPv4)', pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', desc: 'IPv4 address' },
    { name: 'IP Address (IPv6)', pattern: '([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}', desc: 'IPv6 address' },
    { name: 'Credit Card', pattern: '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$', desc: 'Credit card numbers' },
    { name: 'Hex Color', pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$', desc: 'Hex color code' },
  ],
  'Extraction': [
    { name: 'HTML Tags', pattern: '<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)', desc: 'Match HTML tags' },
    { name: 'Image URLs', pattern: 'https?:\\/\\/[^\\s]+(jpg|jpeg|png|gif|webp)', desc: 'Extract image URLs' },
    { name: 'Dates', pattern: '\\d{1,2}[\\/\\-]\\d{1,2}[\\/\\-]\\d{2,4}', desc: 'Match date formats' },
    { name: 'Numbers', pattern: '-?\\d+\\.?\\d*', desc: 'Match numbers' },
    { name: 'Words', pattern: '\\b\\w+\\b', desc: 'Match words' },
    { name: 'Capitalized', pattern: '[A-Z][a-z]+', desc: 'Capitalized words' },
    { name: 'Hashtags', pattern: '#[\\w]+', desc: 'Extract hashtags' },
    { name: 'Mentions', pattern: '@[\\w]+', desc: 'Extract @mentions' },
  ],
  'Programming': [
    { name: 'Variable Name', pattern: '^[a-zA-Z_$][a-zA-Z0-9_$]*$', desc: 'Valid variable name' },
    { name: 'Function Name', pattern: '^[a-zA-Z_][a-zA-Z0-9_]*\\s*\\(', desc: 'Function declarations' },
    { name: 'Class Name', pattern: '^[A-Z][a-zA-Z0-9]*$', desc: 'Class names (PascalCase)' },
    { name: 'Import Statement', pattern: 'import\\s+.*\\s+from\\s+[\'"][^\'"]+[\'"]', desc: 'ES6 imports' },
    { name: 'Require Statement', pattern: 'require\\([\'"][^\'"]+[\'"]\\)', desc: 'Node require' },
    { name: 'Comments (//)', pattern: '\\/\\/.*$', desc: 'Single line comments' },
    { name: 'Comments (/* */)', pattern: '\\/\\*[\\s\\S]*?\\*\\/', desc: 'Multi-line comments' },
    { name: 'UUID', pattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', desc: 'UUID format' },
  ],
  'Text Processing': [
    { name: 'Whitespace', pattern: '\\s+', desc: 'Match whitespace' },
    { name: 'Non-Whitespace', pattern: '\\S+', desc: 'Match non-whitespace' },
    { name: 'Alphanumeric', pattern: '[a-zA-Z0-9]+', desc: 'Alphanumeric only' },
    { name: 'Letters Only', pattern: '[a-zA-Z]+', desc: 'Letters only' },
    { name: 'Numbers Only', pattern: '[0-9]+', desc: 'Numbers only' },
    { name: 'Special Characters', pattern: '[^a-zA-Z0-9]', desc: 'Special characters' },
    { name: 'Multiple Spaces', pattern: ' {2,}', desc: 'Multiple spaces' },
    { name: 'Empty Lines', pattern: '^\\s*$', desc: 'Empty lines' },
  ],
  'Security': [
    { name: 'Strong Password', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', desc: 'Strong password (8+ chars, upper, lower, number, special)' },
    { name: 'Weak Password', pattern: '^[a-zA-Z0-9]{4,}$', desc: 'Simple alphanumeric' },
    { name: 'JWT Token', pattern: 'eyJ[a-zA-Z0-9_-]+\\.eyJ[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+', desc: 'JWT token' },
    { name: 'Base64', pattern: '^[A-Za-z0-9+/]+={0,2}$', desc: 'Base64 string' },
    { name: 'SSH Key', pattern: 'ssh-rsa\\s+[A-Za-z0-9+/=]+', desc: 'SSH public key' },
  ],
  'File Paths': [
    { name: 'Windows Path', pattern: '[a-zA-Z]:\\\\(?:[^\\\\\\/:*?"<>|\\r\\n]+\\\\)*[^\\\\\\/:*?"<>|\\r\\n]*', desc: 'Windows file path' },
    { name: 'Unix Path', pattern: '\\/(?:[^\\/\\0]+\\/)*[^\\/\\0]*', desc: 'Unix/Linux path' },
    { name: 'File Extension', pattern: '\\.[a-zA-Z0-9]+$', desc: 'File extension' },
    { name: 'Filename', pattern: '[^\\/\\\\]+$', desc: 'Just filename' },
    { name: 'Directory', pattern: '.+(?=\\/[^\\/]+$)', desc: 'Parent directory' },
  ],
  'Network': [
    { name: 'Domain', pattern: '([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}', desc: 'Domain name' },
    { name: 'Subdomain', pattern: '([a-zA-Z0-9|-]+\\.)+[a-zA-Z]{2,}', desc: 'With subdomain' },
    { name: 'Port', pattern: ':\\d{1,5}$', desc: 'Port number' },
    { name: 'MAC Address', pattern: '([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})', desc: 'MAC address' },
    { name: 'Email (Simple)', pattern: '\\S+@\\S+\\.\\S+', desc: 'Simple email match' },
  ],
  'JavaScript/TypeScript': [
    { name: 'Arrow Function', pattern: '\\(.*\\)\\s*=>', desc: 'Arrow functions' },
    { name: 'Template Literal', pattern: '`[^`]*`', desc: 'Template strings' },
    { name: 'Console Log', pattern: 'console\\.(log|warn|error|info)', desc: 'Console methods' },
    { name: 'React Component', pattern: '(?:function|const)\\s+[A-Z][a-zA-Z0-9]*\\s*=', desc: 'React components' },
    { name: 'useState Hook', pattern: 'useState\\s*<[^>]+>', desc: 'TypeScript useState' },
    { name: 'useEffect Hook', pattern: 'useEffect\\s*\\(\\(\\)\\s*=>', desc: 'useEffect' },
    { name: 'Async Function', pattern: 'async\\s+(?:function|const|class)', desc: 'Async declarations' },
    { name: 'Export', pattern: 'export\\s+(?:default|const|function|class)', desc: 'ES6 exports' },
  ],
};

export default function RegexPatterns({ onClose }) {
  const [category, setCategory] = useState('Validation');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState('');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);

  const categories = Object.keys(regexPatterns);
  const patterns = search
    ? Object.entries(regexPatterns).flatMap(([cat, pats]) =>
        pats.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.pattern.includes(search))
          .map(p => ({ ...p, category: cat }))
      )
    : regexPatterns[category].map(p => ({ ...p, category }));

  const testPattern = (pattern: string, test: string) => {
    try {
      const regex = new RegExp(pattern, 'g');
      const found = test.match(regex);
      setMatches(found || []);
    } catch {
      setMatches([]);
    }
  };

  const copyCode = (name: string, pattern: string) => {
    navigator.clipboard.writeText(pattern);
    setCopied(name);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-teal-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-teal-500/20">
        <div className="flex items-center gap-2">
          <Regex className="w-5 h-5 text-teal-500" />
          <span className="text-white font-semibold">Regex Patterns</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      
      {/* Test String */}
      <div className="p-3 border-b border-gray-800">
        <input
          type="text"
          value={testString}
          onChange={(e) => {
            setTestString(e.target.value);
            const activePattern = patterns[0]?.pattern;
            if (activePattern) testPattern(activePattern, e.target.value);
          }}
          placeholder="Test string..."
          className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 text-sm"
        />
        {matches.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {matches.map((m, i) => (
              <span key={i} className="px-2 py-0.5 bg-teal-900/50 text-teal-300 text-xs rounded">{m}</span>
            ))}
          </div>
        )}
      </div>
      
      {/* Search */}
      <div className="p-3 border-b border-gray-800">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patterns..."
          className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 text-sm"
        />
      </div>
      
      {/* Categories */}
      {!search && (
        <div className="flex border-b border-gray-800 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 text-xs whitespace-nowrap ${
                category === cat 
                  ? 'bg-gray-800 text-white border-b-2 border-teal-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      
      {/* Patterns List */}
      <div className="flex-1 overflow-auto p-3 space-y-2">
        {patterns.map((pat, idx) => (
          <div 
            key={idx} 
            className="bg-gray-800/50 p-3 rounded hover:bg-gray-800 group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-sm font-medium">{pat.name}</span>
              <button 
                onClick={() => copyCode(pat.name, pat.pattern)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                {copied === pat.name ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <code 
              className="text-xs text-teal-300 block bg-gray-900 p-2 rounded cursor-pointer"
              onClick={() => {
                setTestString('test@example.com');
                testPattern(pat.pattern, 'test@example.com');
              }}
            >
              {pat.pattern}
            </code>
            <div className="text-gray-500 text-xs mt-1">{pat.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
