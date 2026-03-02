import React, { useState } from 'react';
import { Zap, X, Copy, Check, Search, Play } from 'lucide-react';

const emmetSnippets = [
  { abbr: 'html:5', description: 'HTML5 skeleton' },
  { abbr: 'div', description: '<div></div>' },
  { abbr: 'div.container', description: '<div class="container"></div>' },
  { abbr: 'div#header', description: '<div id="header"></div>' },
  { abbr: 'div.container#header', description: '<div class="container" id="header"></div>' },
  { abbr: 'ul>li*5', description: 'Unordered list with 5 items' },
  { abbr: 'div>(header>nav)+(main+footer)', description: 'Multiple siblings with children' },
  { abbr: 'a[href="https://"]{Link}', description: 'Anchor with text' },
  { abbr: 'lorem', description: 'Lorem ipsum placeholder' },
  { abbr: 'lorem10', description: '10 words of lorem ipsum' },
  { abbr: 'p{Click here}', description: 'Paragraph with text' },
  { abbr: '.btn{Button}', description: 'Div with class and text' },
  { abbr: 'input:text', description: 'Text input' },
  { abbr: 'input:email', description: 'Email input' },
  { abbr: 'input:password', description: 'Password input' },
  { abbr: 'img', description: 'Image tag' },
  { abbr: 'img:src', description: 'Image with src' },
  { abbr: 'link:css', description: 'CSS link tag' },
  { abbr: 'script:src', description: 'Script tag with src' },
  { abbr: 'form:get', description: 'Form with GET method' },
  { abbr: 'table>tr*3>td*2', description: '3x2 table' },
  { abbr: 'nav>ul>li*3>a', description: 'Navigation with links' },
  { abbr: 'bq', description: 'Blockquote' },
  { abbr: 'btn', description: 'Button element' },
];

export default function EmmetPanel({ onClose }) {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(null);
  const [preview, setPreview] = useState('');

  const filtered = emmetSnippets.filter(s => 
    s.abbr.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  const copySnippet = (abbr) => {
    navigator.clipboard.writeText(abbr);
    setCopied(abbr);
    setTimeout(() => setCopied(null), 2000);
  };

  const expandSnippet = (abbr) => {
    setPreview(abbr);
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-yellow-500/20 w-[500px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-yellow-500/20">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="text-white font-semibold">Emmet Snippets</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-3 border-b border-yellow-500/20">
        <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search snippets..."
            className="bg-transparent text-white text-sm outline-none flex-1"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {filtered.map(snippet => (
          <div 
            key={snippet.abbr}
            className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg mb-1 group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <code className="text-yellow-400 font-mono text-sm bg-gray-800 px-2 py-0.5 rounded">
                  {snippet.abbr}
                </code>
                <button 
                  onClick={() => expandSnippet(snippet.abbr)}
                  className="p-1 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100"
                >
                  <Play className="w-3 h-3 text-gray-400" />
                </button>
              </div>
              <div className="text-gray-400 text-xs mt-1">{snippet.description}</div>
            </div>
            <button 
              onClick={() => copySnippet(snippet.abbr)}
              className="p-1 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100"
            >
              {copied === snippet.abbr ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Zap className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No snippets found</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-yellow-500/20">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="text-gray-400 text-xs mb-2">Quick Reference</div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div><code className="text-yellow-400">&gt;</code> Child</div>
            <div><code className="text-yellow-400">+</code> Sibling</div>
            <div><code className="text-yellow-400">^</code> Climb up</div>
            <div><code className="text-yellow-400">*</code> Multiply</div>
            <div><code className="text-yellow-400">()</code> Group</div>
            <div><code className="text-yellow-400">[]</code> Attributes</div>
            <div><code className="text-yellow-400">{}</code> Text</div>
            <div><code className="text-yellow-400">.</code> Class</div>
            <div><code className="text-yellow-400">#</code> ID</div>
            <div><code className="text-yellow-400">$</code> Number</div>
          </div>
        </div>
      </div>
    </div>
  );
}
