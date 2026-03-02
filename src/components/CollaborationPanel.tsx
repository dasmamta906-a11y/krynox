import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Share2, 
  UserPlus,
  Send,
  Copy,
  Check,
  X,
  Crown,
  Circle,
  PhoneOff,
  Monitor,
  FileText,
  Globe,
  Lock
} from 'lucide-react';

// Mock collaborators
const mockCollaborators = [
  { id: 1, name: 'You', avatar: 'Y', status: 'online', isHost: true, cursor: { line: 15, col: 8 } },
  { id: 2, name: 'Alice', avatar: 'A', status: 'online', isHost: false, cursor: { line: 23, col: 12 } },
  { id: 3, name: 'Bob', avatar: 'B', status: 'away', isHost: false },
  { id: 4, name: 'Charlie', avatar: 'C', status: 'offline', isHost: false },
];

// Mock chat messages
const mockMessages = [
  { id: 1, user: 'Alice', message: 'Hey, can you check the API integration?', time: '2:30 PM' },
  { id: 2, user: 'You', message: 'Sure, looking at it now', time: '2:31 PM' },
  { id: 3, user: 'Bob', message: 'I pushed the latest changes', time: '2:32 PM' },
  { id: 4, user: 'Alice', message: 'Great! Let me pull them', time: '2:33 PM' },
];

// Mock sessions
const mockSessions = [
  { id: 1, name: 'Sprint Planning', participants: 4, isActive: true },
  { id: 2, name: 'Code Review', participants: 2, isActive: false },
  { id: 3, name: 'Bug Fixing', participants: 3, isActive: false },
];

export default function CollaborationPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState<'session' | 'chat' | 'activity'>('session');
  const [collaborators] = useState(mockCollaborators);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [copied, setCopied] = useState(false);
  const [sessionLink] = useState('https://krynox.dev/collab/abc123');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    setMessages([...messages, {
      id: messages.length + 1,
      user: 'You',
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(sessionLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-500" />
          <span className="text-white font-semibold">Collaboration</span>
        </div>
        <div className="flex items-center gap-2">
          {isInCall ? (
            <>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg transition-colors ${isMuted ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:text-white'}`}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-2 rounded-lg transition-colors ${!isVideoOn ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:text-white'}`}
              >
                {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setIsInCall(false)}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white"
              >
                <PhoneOff className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsInCall(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
            >
              <Video className="w-4 h-4" />
              Start Call
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Session Info */}
      <div className="p-3 border-b border-purple-500/20 bg-[#1a1a1a]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-400" />
            <span className="text-white font-medium">Private Session</span>
          </div>
          <span className="text-xs text-gray-500">{collaborators.filter(c => c.status === 'online').length} online</span>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={sessionLink} 
            readOnly
            className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded px-3 py-1.5 text-white text-sm"
          />
          <button 
            onClick={copyLink}
            className="p-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-purple-500/20">
        <button
          onClick={() => setActiveTab('session')}
          className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'session' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          Participants
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'chat' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === 'activity' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          Activity
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Session Tab */}
        {activeTab === 'session' && (
          <div className="p-3">
            <div className="text-xs text-gray-500 mb-2">PARTICIPANTS ({collaborators.length})</div>
            {collaborators.map(user => (
              <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-lg mb-1">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                    {user.avatar}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0f0f0f] ${getStatusColor(user.status)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-white text-sm font-medium">{user.name}</span>
                    {user.isHost && <Crown className="w-3 h-3 text-yellow-400" />}
                  </div>
                  {user.cursor && (
                    <span className="text-xs text-gray-500">Line {user.cursor.line}, Col {user.cursor.col}</span>
                  )}
                </div>
                {user.id !== 1 && (
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            <button className="w-full mt-3 flex items-center justify-center gap-2 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300">
              <UserPlus className="w-4 h-4" />
              Invite Collaborator
            </button>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">{msg.user}</span>
                    <span className="text-xs text-gray-600">{msg.time}</span>
                  </div>
                  <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.user === 'You' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-800 text-gray-300'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-purple-500/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 outline-none focus:border-purple-500"
                />
                <button 
                  onClick={sendMessage}
                  className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="p-3">
            <div className="text-xs text-gray-500 mb-2">RECENT ACTIVITY</div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-white">Alice edited <span className="text-purple-400">App.jsx</span></div>
                  <div className="text-xs text-gray-500">2 minutes ago</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-white">Bob joined the session</div>
                  <div className="text-xs text-gray-500">5 minutes ago</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-white">Screen share started by Alice</div>
                  <div className="text-xs text-gray-500">10 minutes ago</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
