import React, { useState, useEffect } from 'react';
import { StickyNote, X, Plus, Trash2, Save, Download, Search } from 'lucide-react';

const defaultNotes = [
  { id: 1, title: 'Project Ideas', content: '- Add dark mode\n- Implement AI features\n- Add mobile support', updatedAt: '2 hours ago' },
  { id: 2, title: 'Meeting Notes', content: 'Discussed feature roadmap for Q1', updatedAt: 'Yesterday' },
  { id: 3, title: 'Todo', content: '- Fix bug #123\n- Update docs\n- Review PR', updatedAt: '3 days ago' },
];

export default function QuickNotes({ onClose }) {
  const [notes, setNotes] = useState(defaultNotes);
  const [selectedNote, setSelectedNote] = useState(defaultNotes[0]);
  const [search, setSearch] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    setEditContent(selectedNote?.content || '');
  }, [selectedNote]);

  const saveNote = () => {
    setNotes(notes.map(n => 
      n.id === selectedNote.id 
        ? { ...n, content: editContent, updatedAt: 'Just now' } 
        : n
    ));
  };

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      updatedAt: 'Just now'
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(notes[0]);
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  const exportNotes = () => {
    const content = notes.map(n => `# ${n.title}\n${n.content}`).join('\n\n---\n\n');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.md';
    a.click();
  };

  return (
    <div className="flex h-full bg-[#0f0f0f] border-l border-yellow-500/20 w-[600px]">
      <div className="w-48 border-r border-gray-700 flex flex-col">
        <div className="p-2 border-b border-gray-700">
          <div className="flex items-center gap-1 bg-gray-800 rounded px-2 py-1">
            <Search className="w-3 h-3 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-transparent text-white text-xs outline-none flex-1"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto p-2">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-2 rounded cursor-pointer mb-1 ${
                selectedNote?.id === note.id ? 'bg-yellow-900/30 border-l-2 border-yellow-500' : 'hover:bg-gray-800'
              }`}
            >
              <div className="text-white text-sm font-medium truncate">{note.title}</div>
              <div className="text-gray-500 text-xs">{note.updatedAt}</div>
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-gray-700">
          <button
            onClick={addNote}
            className="w-full flex items-center justify-center gap-1 py-1.5 bg-yellow-600 hover:bg-yellow-700 rounded text-white text-sm"
          >
            <Plus className="w-4 h-4" /> New Note
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-yellow-500/20">
          <input
            type="text"
            value={selectedNote?.title || ''}
            onChange={(e) => setNotes(notes.map(n => n.id === selectedNote?.id ? { ...n, title: e.target.value } : n))}
            className="bg-transparent text-white font-semibold text-lg outline-none"
          />
          <div className="flex items-center gap-1">
            <button onClick={exportNotes} className="p-1 hover:bg-gray-700 rounded" title="Export">
              <Download className="w-4 h-4 text-gray-400" />
            </button>
            <button onClick={() => deleteNote(selectedNote?.id)} className="p-1 hover:bg-gray-700 rounded" title="Delete">
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
            <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={saveNote}
            placeholder="Write your note..."
            className="w-full h-full bg-transparent text-gray-300 text-sm outline-none resize-none font-mono"
          />
        </div>

        <div className="px-4 py-2 border-t border-gray-700 text-xs text-gray-500">
          Last saved: {selectedNote?.updatedAt}
        </div>
      </div>
    </div>
  );
}
