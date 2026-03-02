import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import EditorPanel from './components/EditorPanel';
import { useApp } from './context/AppContext';
import { componentLibrary } from './data/components';
import ToolRenderer from './components/ToolRenderer';
import AICommandHandler from './components/ai/AICommandHandler';
import TerminalPanel from './components/TerminalPanel';
import FileExplorer from './components/FileExplorer';
import GitPanel from './components/GitPanel';
import ApiTesterPanel from './components/ApiTesterPanel';
import SnippetsPanel from './components/SnippetsPanel';
import DebugConsole from './components/DebugConsole';
import DatabasePanel from './components/DatabasePanel';
import CollaborationPanel from './components/CollaborationPanel';
import DockerPanel from './components/DockerPanel';
import PerformancePanel from './components/PerformancePanel';
import SearchReplacePanel from './components/SearchReplacePanel';
import KeyboardShortcutsPanel from './components/KeyboardShortcutsPanel';
import ThemeCustomizerPanel from './components/ThemeCustomizerPanel';
import BookmarksPanel from './components/BookmarksPanel';
import DiffViewerPanel from './components/DiffViewerPanel';
import MarkdownPreview from './components/MarkdownPreview';
import CommandPalette from './components/CommandPalette';
import SettingsPanel from './components/SettingsPanel';
import NotificationsPanel from './components/NotificationsPanel';
import TaskManagerPanel from './components/TaskManagerPanel';
import SecretsManager from './components/SecretsManager';
import EnvVarsEditor from './components/EnvVarsEditor';
import PackageManager from './components/PackageManager';
import TestRunnerPanel from './components/TestRunnerPanel';
import ColorPickerPanel from './components/ColorPickerPanel';
import EmmetPanel from './components/EmmetPanel';
import RemoteSSHPanel from './components/RemoteSSHPanel';
import GraphQLExplorer from './components/GraphQLExplorer';
import WebSocketTester from './components/WebSocketTester';
import SQLRunner from './components/SQLRunner';
import JWTDecoder from './components/JWTDecoder';
import Base64Tool from './components/Base64Tool';
import JSONFormatter from './components/JSONFormatter';
import RegexTester from './components/RegexTester';
import UUIDGenerator from './components/UUIDGenerator';
import HashGenerator from './components/HashGenerator';
import TimestampConverter from './components/TimestampConverter';
import QuickNotes from './components/QuickNotes';
import AICodingAssistant from './components/AICodingAssistant';
import CronBuilder from './components/CronBuilder';
import ASCIITable from './components/ASCIITable';
import LoremIpsum from './components/LoremIpsum';
import URLEncoder from './components/URLEncoder';
import CSSGenerator from './components/CSSGenerator';
import BinaryConverter from './components/BinaryConverter';
import WorldClock from './components/WorldClock';
import Calculator from './components/Calculator';
import DiffMergeTool from './components/DiffMergeTool';
import HTMLPreview from './components/HTMLPreview';
import CodeSnippets from './components/CodeSnippets';
import APICodeGenerator from './components/APICodeGenerator';
import GitCommands from './components/GitCommands';
import RegexPatterns from './components/RegexPatterns';
import Algorithms from './components/Algorithms';
import { Sparkles, Globe, X, Send, Code2, Terminal, FolderTree, GitBranch, SendHorizontal, Code, Bug, Database, Users, Box, Activity, Search, Keyboard, Palette, Server, Bookmark, GitCompare, FileText, Settings, Bell, FlaskConical, Package, Zap, Shield, Variable, Command, Wifi, Key, Binary, Braces, Regex, Hash, Clock, StickyNote, Bot, Timer, Table, FileType, Link, Palette as Palette2, Calculator as CalcIcon, Timer as Timer2, Cpu, FileCode, GitBranch as GitCmd } from 'lucide-react';
import { callAI } from './services/ai';

// Flatten all components from library
const flattenComponents = () => {
  const all = [];
  Object.values(componentLibrary).forEach(category => {
    category.forEach(item => all.push(item));
  });
  return all;
};

// Simple Sidebar
function Sidebar() {
  const { state, dispatch } = useApp();
  const allComps = useMemo(() => flattenComponents(), []);
  const [search, setSearch] = useState('');
  
  const filtered = search.trim() 
    ? allComps.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : allComps;
  
  const addComponent = (comp) => {
    console.log('Adding component:', comp.id);
    dispatch({ 
      type: 'ADD_COMPONENT', 
      payload: { 
        component: { 
          ...comp, 
          uniqueId: `${comp.id}-${Date.now()}`, 
          originalId: comp.id,
          id: comp.id 
        } 
      } 
    });
  };

  return (
    <aside className="w-[260px] bg-[#0f0f0f] border-r border-purple-500/20 flex flex-col">
      <div className="p-3 border-b border-purple-500/20">
        <h2 className="text-white font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          Add Components
        </h2>
      </div>
      
      <div className="p-2">
        <input
          type="text"
          placeholder="Search components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.map(comp => (
          <button
            key={comp.id}
            onClick={() => addComponent(comp)}
            className="w-full p-2 rounded-lg text-left text-xs bg-black border border-gray-800 hover:border-purple-500 text-white transition-all"
          >
            {comp.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

// FULL WEBSITE CANVAS - Shows real website sections
function Canvas() {
  const { state, dispatch } = useApp();
  
  // Debug: Log when components change
  console.log('Canvas rendering, components:', state.addedComponents.length);
  
  const removeComponent = (uniqueId) => {
    dispatch({ type: 'REMOVE_COMPONENT', payload: { componentId: uniqueId } });
  };

  // Empty State
  if (state.addedComponents.length === 0) {
    return (
      <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center p-8">
          <Globe className="w-24 h-24 text-purple-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">AI Website Builder</h1>
          <p className="text-gray-400 mb-2">AI ko prompt dekar website banaein!</p>
          <p className="text-purple-400 mb-6">Example: "Build E-Commerce Website"</p>
          <p className="text-gray-500 text-sm">Ya left sidebar se components add karein</p>
        </div>
      </div>
    );
  }

  // Full Website Preview - Components stacked like real website
  return (
    <div className="flex-1 bg-black overflow-y-auto">
      <div className="w-full">
        {state.addedComponents.map((comp, index) => (
          <motion.div
            key={comp.uniqueId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative group"
          >
            {/* Full Width Component */}
            <ToolRenderer type={comp.originalId} />
            
            {/* Delete Button */}
            <button
              onClick={() => removeComponent(comp.uniqueId)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600 z-50"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const { state } = useApp();
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('// Start coding here...');
  const [showEditor, setShowEditor] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [showGitPanel, setShowGitPanel] = useState(false);
  const [showApiTester, setShowApiTester] = useState(false);
  const [showSnippets, setShowSnippets] = useState(false);
  const [showDebugConsole, setShowDebugConsole] = useState(false);
  const [showDatabase, setShowDatabase] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showDocker, setShowDocker] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [showSearchReplace, setShowSearchReplace] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showDiffViewer, setShowDiffViewer] = useState(false);
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTaskManager, setShowTaskManager] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const [showEnvVars, setShowEnvVars] = useState(false);
  const [showPackageManager, setShowPackageManager] = useState(false);
  const [showTestRunner, setShowTestRunner] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showEmmet, setShowEmmet] = useState(false);
  const [showSSH, setShowSSH] = useState(false);
  const [showGraphQL, setShowGraphQL] = useState(false);
  const [showWebSocket, setShowWebSocket] = useState(false);
  const [showSQL, setShowSQL] = useState(false);
  const [showJWT, setShowJWT] = useState(false);
  const [showBase64, setShowBase64] = useState(false);
  const [showJSON, setShowJSON] = useState(false);
  const [showRegex, setShowRegex] = useState(false);
  const [showUUID, setShowUUID] = useState(false);
  const [showHash, setShowHash] = useState(false);
  const [showTimestamp, setShowTimestamp] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showAICoding, setShowAICoding] = useState(false);
  const [showCronBuilder, setShowCronBuilder] = useState(false);
  const [showASCIITable, setShowASCIITable] = useState(false);
  const [showLoremIpsum, setShowLoremIpsum] = useState(false);
  const [showURLEncoder, setShowURLEncoder] = useState(false);
  const [showCSSGenerator, setShowCSSGenerator] = useState(false);
  const [showBinaryConverter, setShowBinaryConverter] = useState(false);
  const [showWorldClock, setShowWorldClock] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [showDiffMerge, setShowDiffMerge] = useState(false);
  const [showHTMLPreview, setShowHTMLPreview] = useState(false);
  const [showCodeSnippets, setShowCodeSnippets] = useState(false);
  const [showAPIGenerator, setShowAPIGenerator] = useState(false);
  const [showGitCmds, setShowGitCmds] = useState(false);
  const [showRegexPat, setShowRegexPat] = useState(false);
  const [showAlgorithms, setShowAlgorithms] = useState(false);

  const handleAICall = async () => {
    setLoading(true);
    try {
      const response = await callAI(code);
      setAiResponse(response);
    } catch (error) {
      console.error('Error calling AI:', error);
      setAiResponse({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-[#0a0a0a] overflow-hidden flex flex-col">
      {/* Header */}
      <header className="h-14 bg-[#0f0f0f] border-b border-purple-500/20 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold">KRYNOX AI Builder</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSnippets(!showSnippets)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showSnippets ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            Snippets
          </button>
          <button
            onClick={() => setShowDebugConsole(!showDebugConsole)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showDebugConsole ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Bug className="w-4 h-4" />
            Debug
          </button>
          <button
            onClick={() => setShowGitPanel(!showGitPanel)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showGitPanel ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            Git
          </button>
          <button
            onClick={() => setShowApiTester(!showApiTester)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showApiTester ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <SendHorizontal className="w-4 h-4" />
            API
          </button>
          <button
            onClick={() => setShowDatabase(!showDatabase)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showDatabase ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            DB
          </button>
          <button
            onClick={() => setShowCollaboration(!showCollaboration)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showCollaboration ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Collab
          </button>
          <button
            onClick={() => setShowDocker(!showDocker)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showDocker ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Box className="w-4 h-4" />
            Docker
          </button>
          <button
            onClick={() => setShowPerformance(!showPerformance)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showPerformance ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            Perf
          </button>
          <button
            onClick={() => setShowSearchReplace(!showSearchReplace)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showSearchReplace ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            Find
          </button>
          <button
            onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showKeyboardShortcuts ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Keyboard className="w-4 h-4" />
            Keys
          </button>
          <button
            onClick={() => setShowBookmarks(!showBookmarks)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showBookmarks ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Marks
          </button>
          <button
            onClick={() => setShowDiffViewer(!showDiffViewer)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showDiffViewer ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            Diff
          </button>
          <button
            onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showMarkdownPreview ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            MD
          </button>
          <button
            onClick={() => setShowCommandPalette(!showCommandPalette)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showCommandPalette ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Command className="w-4 h-4" />
            Cmd
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showSettings ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showNotifications ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Bell className="w-4 h-4" />
            Alerts
          </button>
          <button
            onClick={() => setShowTaskManager(!showTaskManager)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showTaskManager ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            Tasks
          </button>
          <button
            onClick={() => setShowSecrets(!showSecrets)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showSecrets ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            Secrets
          </button>
          <button
            onClick={() => setShowEnvVars(!showEnvVars)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showEnvVars ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Variable className="w-4 h-4" />
            Env
          </button>
          <button
            onClick={() => setShowPackageManager(!showPackageManager)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showPackageManager ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            NPM
          </button>
          <button
            onClick={() => setShowTestRunner(!showTestRunner)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showTestRunner ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            Tests
          </button>
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showColorPicker ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            Color
          </button>
          <button
            onClick={() => setShowEmmet(!showEmmet)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showEmmet ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            Emmet
          </button>
          <button
            onClick={() => setShowSSH(!showSSH)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showSSH ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Server className="w-4 h-4" />
            SSH
          </button>
          <button
            onClick={() => setShowGraphQL(!showGraphQL)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showGraphQL ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            GraphQL
          </button>
          <button
            onClick={() => setShowWebSocket(!showWebSocket)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showWebSocket ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Wifi className="w-4 h-4" />
            WS
          </button>
          <button
            onClick={() => setShowSQL(!showSQL)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showSQL ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            SQL
          </button>
          <button
            onClick={() => setShowJWT(!showJWT)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showJWT ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            JWT
          </button>
          <button
            onClick={() => setShowBase64(!showBase64)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showBase64 ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Binary className="w-4 h-4" />
            B64
          </button>
          <button
            onClick={() => setShowJSON(!showJSON)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showJSON ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Braces className="w-4 h-4" />
            JSON
          </button>
          <button
            onClick={() => setShowRegex(!showRegex)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showRegex ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Regex className="w-4 h-4" />
            Regex
          </button>
          <button
            onClick={() => setShowUUID(!showUUID)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showUUID ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Hash className="w-4 h-4" />
            UUID
          </button>
          <button
            onClick={() => setShowHash(!showHash)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showHash ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            Hash
          </button>
          <button
            onClick={() => setShowTimestamp(!showTimestamp)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showTimestamp ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            Time
          </button>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showNotes ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <StickyNote className="w-4 h-4" />
            Notes
          </button>
          <button
            onClick={() => setShowAICoding(!showAICoding)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showAICoding ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Bot className="w-4 h-4" />
            AI Help
          </button>
          <button
            onClick={() => setShowCronBuilder(!showCronBuilder)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showCronBuilder ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Timer className="w-4 h-4" />
            Cron
          </button>
          <button
            onClick={() => setShowASCIITable(!showASCIITable)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showASCIITable ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Table className="w-4 h-4" />
            ASCII
          </button>
          <button
            onClick={() => setShowLoremIpsum(!showLoremIpsum)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showLoremIpsum ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <FileType className="w-4 h-4" />
            Lorem
          </button>
          <button
            onClick={() => setShowURLEncoder(!showURLEncoder)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showURLEncoder ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Link className="w-4 h-4" />
            URL
          </button>
          <button
            onClick={() => setShowCSSGenerator(!showCSSGenerator)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showCSSGenerator ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Palette2 className="w-4 h-4" />
            CSS
          </button>
          <button
            onClick={() => setShowBinaryConverter(!showBinaryConverter)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showBinaryConverter ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Binary className="w-4 h-4" />
            Bin
          </button>
          <button
            onClick={() => setShowWorldClock(!showWorldClock)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showWorldClock ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            Clock
          </button>
          <button
            onClick={() => setShowCalc(!showCalc)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showCalc ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <CalcIcon className="w-4 h-4" />
            Calc
          </button>
          <button
            onClick={() => setShowDiffMerge(!showDiffMerge)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showDiffMerge ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            Merge
          </button>
          <button
            onClick={() => setShowHTMLPreview(!showHTMLPreview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showHTMLPreview ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            HTML
          </button>
          <button
            onClick={() => setShowCodeSnippets(!showCodeSnippets)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showCodeSnippets ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Snips
          </button>
          <button
            onClick={() => setShowAPIGenerator(!showAPIGenerator)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showAPIGenerator ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <FileCode className="w-4 h-4" />
            API
          </button>
          <button
            onClick={() => setShowGitCmds(!showGitCmds)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showGitCmds ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <GitCmd className="w-4 h-4" />
            Git
          </button>
          <button
            onClick={() => setShowRegexPat(!showRegexPat)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showRegexPat ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Regex className="w-4 h-4" />
            Regex
          </button>
          <button
            onClick={() => setShowAlgorithms(!showAlgorithms)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showAlgorithms ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Algo
          </button>
          <button
            onClick={() => setShowFileExplorer(!showFileExplorer)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showFileExplorer ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            {showFileExplorer ? 'Hide Files' : 'Files'}
          </button>
          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showTerminal ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            {showTerminal ? 'Hide Terminal' : 'Terminal'}
          </button>
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Code2 className="w-4 h-4" />
            {showEditor ? 'Hide Editor' : 'Code Editor'}
          </button>
          <button
            onClick={handleAICall}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Loading...' : 'Test API'}
          </button>
          <div className="text-gray-400 text-sm">
            {state.addedComponents.length} sections
          </div>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {showFileExplorer && <FileExplorer />}
        {showGitPanel && <GitPanel />}
        {showApiTester && <ApiTesterPanel onClose={() => setShowApiTester(false)} />}
        {showDatabase && (
          <div className="w-80 border-l border-purple-500/20">
            <DatabasePanel onClose={() => setShowDatabase(false)} />
          </div>
        )}
        {showCollaboration && (
          <div className="w-80 border-l border-purple-500/20">
            <CollaborationPanel onClose={() => setShowCollaboration(false)} />
          </div>
        )}
        {showDocker && (
          <div className="w-80 border-l border-purple-500/20">
            <DockerPanel onClose={() => setShowDocker(false)} />
          </div>
        )}
        {showPerformance && (
          <div className="w-80 border-l border-purple-500/20">
            <PerformancePanel onClose={() => setShowPerformance(false)} />
          </div>
        )}
        {showSearchReplace && (
          <div className="w-96 border-l border-purple-500/20">
            <SearchReplacePanel onClose={() => setShowSearchReplace(false)} />
          </div>
        )}
        {showKeyboardShortcuts && (
          <div className="w-96 border-l border-purple-500/20">
            <KeyboardShortcutsPanel onClose={() => setShowKeyboardShortcuts(false)} />
          </div>
        )}
        {showThemeCustomizer && (
          <ThemeCustomizerPanel onClose={() => setShowThemeCustomizer(false)} />
        )}
        {showBookmarks && (
          <div className="w-80 border-l border-purple-500/20">
            <BookmarksPanel onClose={() => setShowBookmarks(false)} />
          </div>
        )}
        {showDiffViewer && (
          <DiffViewerPanel onClose={() => setShowDiffViewer(false)} />
        )}
        {showMarkdownPreview && (
          <MarkdownPreview onClose={() => setShowMarkdownPreview(false)} />
        )}
        {showCommandPalette && (
          <CommandPalette onClose={() => setShowCommandPalette(false)} isOpen={showCommandPalette} />
        )}
        {showSettings && (
          <SettingsPanel onClose={() => setShowSettings(false)} />
        )}
        {showNotifications && (
          <div className="w-80 border-l border-purple-500/20">
            <NotificationsPanel onClose={() => setShowNotifications(false)} />
          </div>
        )}
        {showTaskManager && (
          <TaskManagerPanel onClose={() => setShowTaskManager(false)} />
        )}
        {showSecrets && (
          <div className="w-[600px] border-l border-purple-500/20">
            <SecretsManager onClose={() => setShowSecrets(false)} />
          </div>
        )}
        {showEnvVars && (
          <div className="w-[600px] border-l border-purple-500/20">
            <EnvVarsEditor onClose={() => setShowEnvVars(false)} />
          </div>
        )}
        {showPackageManager && (
          <PackageManager onClose={() => setShowPackageManager(false)} />
        )}
        {showTestRunner && (
          <TestRunnerPanel onClose={() => setShowTestRunner(false)} />
        )}
        {showColorPicker && (
          <div className="w-80 border-l border-purple-500/20">
            <ColorPickerPanel onClose={() => setShowColorPicker(false)} />
          </div>
        )}
        {showEmmet && (
          <div className="w-[500px] border-l border-purple-500/20">
            <EmmetPanel onClose={() => setShowEmmet(false)} />
          </div>
        )}
        {showSSH && (
          <div className="w-[500px] border-l border-purple-500/20">
            <RemoteSSHPanel onClose={() => setShowSSH(false)} />
          </div>
        )}
        {showGraphQL && (
          <GraphQLExplorer onClose={() => setShowGraphQL(false)} />
        )}
        {showWebSocket && (
          <WebSocketTester onClose={() => setShowWebSocket(false)} />
        )}
        {showSQL && (
          <SQLRunner onClose={() => setShowSQL(false)} />
        )}
        {showJWT && (
          <JWTDecoder onClose={() => setShowJWT(false)} />
        )}
        {showBase64 && (
          <Base64Tool onClose={() => setShowBase64(false)} />
        )}
        {showJSON && (
          <JSONFormatter onClose={() => setShowJSON(false)} />
        )}
        {showRegex && (
          <RegexTester onClose={() => setShowRegex(false)} />
        )}
        {showUUID && (
          <UUIDGenerator onClose={() => setShowUUID(false)} />
        )}
        {showHash && (
          <HashGenerator onClose={() => setShowHash(false)} />
        )}
        {showTimestamp && (
          <TimestampConverter onClose={() => setShowTimestamp(false)} />
        )}
        {showNotes && (
          <QuickNotes onClose={() => setShowNotes(false)} />
        )}
        {showAICoding && (
          <AICodingAssistant onClose={() => setShowAICoding(false)} />
        )}
        {showCronBuilder && (
          <CronBuilder onClose={() => setShowCronBuilder(false)} />
        )}
        {showASCIITable && (
          <ASCIITable onClose={() => setShowASCIITable(false)} />
        )}
        {showLoremIpsum && (
          <LoremIpsum onClose={() => setShowLoremIpsum(false)} />
        )}
        {showURLEncoder && (
          <URLEncoder onClose={() => setShowURLEncoder(false)} />
        )}
        {showCSSGenerator && (
          <CSSGenerator onClose={() => setShowCSSGenerator(false)} />
        )}
        {showBinaryConverter && (
          <BinaryConverter onClose={() => setShowBinaryConverter(false)} />
        )}
        {showWorldClock && (
          <WorldClock onClose={() => setShowWorldClock(false)} />
        )}
        {showCalc && (
          <Calculator onClose={() => setShowCalc(false)} />
        )}
        {showDiffMerge && (
          <DiffMergeTool onClose={() => setShowDiffMerge(false)} />
        )}
        {showHTMLPreview && (
          <HTMLPreview onClose={() => setShowHTMLPreview(false)} />
        )}
        {showCodeSnippets && (
          <CodeSnippets onClose={() => setShowCodeSnippets(false)} />
        )}
        {showAPIGenerator && (
          <APICodeGenerator onClose={() => setShowAPIGenerator(false)} />
        )}
        {showGitCmds && (
          <GitCommands onClose={() => setShowGitCmds(false)} />
        )}
        {showRegexPat && (
          <RegexPatterns onClose={() => setShowRegexPat(false)} />
        )}
        {showAlgorithms && (
          <Algorithms onClose={() => setShowAlgorithms(false)} />
        )}
        {showSnippets && (
          <div className="w-96 border-l border-purple-500/20">
            <SnippetsPanel onClose={() => setShowSnippets(false)} />
          </div>
        )}
        <Sidebar />
        {showEditor ? (
          <div className="flex-1 flex flex-col">
            <EditorPanel
              initialCode={code}
              initialLanguage="javascript"
              onSave={(newCode) => setCode(newCode)}
              onRun={(newCode) => {
                console.log('Running code:', newCode);
              }}
            />
          </div>
        ) : (
          <Canvas />
        )}
        <AICommandHandler />
      </div>

      {/* Terminal Panel */}
      {showTerminal && (
        <TerminalPanel onClose={() => setShowTerminal(false)} />
      )}

      {/* Debug Console */}
      {showDebugConsole && (
        <DebugConsole onClose={() => setShowDebugConsole(false)} />
      )}

      {/* AI Response Modal */}
      {aiResponse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setAiResponse(null)}>
          <div className="bg-[#1a1a1a] border border-purple-500/30 rounded-xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold text-lg mb-4">API Response</h3>
            <pre className="bg-black p-4 rounded-lg text-green-400 text-sm overflow-auto">
              {JSON.stringify(aiResponse, null, 2)}
            </pre>
            <button
              onClick={() => setAiResponse(null)}
              className="mt-4 w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
