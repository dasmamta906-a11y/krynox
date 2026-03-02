import React, { useState } from 'react';
import { 
  Bot, X, Code, Sparkles, Bug, Zap, FileCode, Wand2, 
  Shield, Database, Terminal, GitBranch, FileJson, Regex,
  TestTube, BookOpen, RefreshCw, Copy, Check, ChevronRight,
  Cpu, Database as DbIcon, Server, Container, Settings, Search
} from 'lucide-react';

const aiCommands = [
  // Code Generation
  { 
    category: 'Code Generation', 
    icon: Code,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    commands: [
      { id: 'generate', name: 'Generate Code', desc: 'Write code from description', prompt: 'Write a' },
      { id: 'complete', name: 'Complete Code', desc: 'Auto-complete partial code', prompt: 'Complete this code:' },
      { id: 'scaffold', name: 'Scaffold Component', desc: 'Create component structure', prompt: 'Create a React component with' },
      { id: 'boilerplate', name: 'Add Boilerplate', desc: 'Add standard templates', prompt: 'Add boilerplate code for' },
    ]
  },
  // Code Analysis
  {
    category: 'Code Analysis',
    icon: Search,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    commands: [
      { id: 'explain', name: 'Explain Code', desc: 'Explain what code does', prompt: 'Explain this code:' },
      { id: 'analyze', name: 'Analyze Code', desc: 'Find issues in code', prompt: 'Analyze this code for issues:' },
      { id: 'review', name: 'Code Review', desc: 'Review code quality', prompt: 'Review this code:' },
      { id: 'complexity', name: 'Check Complexity', desc: 'Analyze code complexity', prompt: 'What is the time complexity of:' },
    ]
  },
  // Bug & Error Handling
  {
    category: 'Bug & Errors',
    icon: Bug,
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    commands: [
      { id: 'fix', name: 'Fix Bug', desc: 'Fix errors in code', prompt: 'Fix this bug in the code:' },
      { id: 'debug', name: 'Debug', desc: 'Help debug issues', prompt: 'Debug this code:' },
      { id: 'error', name: 'Explain Error', desc: 'Explain error message', prompt: 'Explain this error:' },
      { id: 'handle', name: 'Add Error Handling', desc: 'Add try-catch blocks', prompt: 'Add error handling to:' },
    ]
  },
  // Optimization
  {
    category: 'Optimization',
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    commands: [
      { id: 'optimize', name: 'Optimize Code', desc: 'Make code faster', prompt: 'Optimize this code for performance:' },
      { id: 'refactor', name: 'Refactor', desc: 'Improve code structure', prompt: 'Refactor this code:' },
      { id: 'simplify', name: 'Simplify', desc: 'Make code simpler', prompt: 'Simplify this code:' },
      { id: 'clean', name: 'Clean Code', desc: 'Remove redundancies', prompt: 'Clean up this code:' },
    ]
  },
  // Code Translation
  {
    category: 'Code Translation',
    icon: FileCode,
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    commands: [
      { id: 'convert', name: 'Convert Language', desc: 'Convert to another language', prompt: 'Convert this to TypeScript:' },
      { id: 'translate', name: 'Translate Code', desc: 'Convert between frameworks', prompt: 'Convert from jQuery to React:' },
      { id: 'adapt', name: 'Adapt Code', desc: 'Make work in different env', prompt: 'Adapt this for Node.js:' },
    ]
  },
  // Testing
  {
    category: 'Testing',
    icon: TestTube,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/20',
    commands: [
      { id: 'test', name: 'Write Tests', desc: 'Create unit tests', prompt: 'Write unit tests for:' },
      { id: 'mock', name: 'Create Mocks', desc: 'Create mock data', prompt: 'Create mock data for:' },
      { id: 'coverage', name: 'Improve Coverage', desc: 'Increase test coverage', prompt: 'Add tests to improve coverage for:' },
    ]
  },
  // Documentation
  {
    category: 'Documentation',
    icon: BookOpen,
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    commands: [
      { id: 'docs', name: 'Generate Docs', desc: 'Add JSDoc comments', prompt: 'Add documentation to:' },
      { id: 'readme', name: 'Create README', desc: 'Generate README file', prompt: 'Create a README for this project:' },
      { id: 'comment', name: 'Add Comments', desc: 'Explain with comments', prompt: 'Add comments to explain:' },
    ]
  },
  // Security
  {
    category: 'Security',
    icon: Shield,
    color: 'text-pink-400',
    bg: 'bg-pink-500/20',
    commands: [
      { id: 'secure', name: 'Secure Code', desc: 'Find security issues', prompt: 'Find security vulnerabilities in:' },
      { id: 'sanitize', name: 'Sanitize Input', desc: 'Add input validation', prompt: 'Add input sanitization to:' },
      { id: 'auth', name: 'Add Auth', desc: 'Add authentication', prompt: 'Add authentication to:' },
    ]
  },
  // Database
  {
    category: 'Database',
    icon: Database,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20',
    commands: [
      { id: 'schema', name: 'Design Schema', desc: 'Create database schema', prompt: 'Create a database schema for:' },
      { id: 'query', name: 'Write SQL', desc: 'Generate SQL queries', prompt: 'Write SQL query to:' },
      { id: 'model', name: 'Create Model', desc: 'Create data model', prompt: 'Create a data model for:' },
      { id: 'migrate', name: 'Migration', desc: 'Create migration', prompt: 'Create database migration for:' },
    ]
  },
  // DevOps
  {
    category: 'DevOps',
    icon: Server,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/20',
    commands: [
      { id: 'docker', name: 'Create Dockerfile', desc: 'Generate Docker config', prompt: 'Create a Dockerfile for:' },
      { id: 'ci', name: 'CI/CD Pipeline', desc: 'Create pipeline', prompt: 'Create GitHub Actions CI/CD for:' },
      { id: 'compose', name: 'Docker Compose', desc: 'Create compose file', prompt: 'Create docker-compose.yml for:' },
      { id: 'deploy', name: 'Deployment Config', desc: 'K8s, nginx configs', prompt: 'Create deployment config for:' },
    ]
  },
  // APIs
  {
    category: 'API Development',
    icon: Cpu,
    color: 'text-teal-400',
    bg: 'bg-teal-500/20',
    commands: [
      { id: 'api', name: 'Create API', desc: 'Build REST API', prompt: 'Create a REST API endpoint for:' },
      { id: 'graphql', name: 'GraphQL Schema', desc: 'Design GraphQL', prompt: 'Create GraphQL schema for:' },
      { id: 'openapi', name: 'OpenAPI Spec', desc: 'Generate OpenAPI', prompt: 'Create OpenAPI spec for:' },
      { id: 'mock', name: 'API Mock', desc: 'Create mock server', prompt: 'Create API mock for:' },
    ]
  },
  // Config
  {
    category: 'Configuration',
    icon: Settings,
    color: 'text-gray-400',
    bg: 'bg-gray-500/20',
    commands: [
      { id: 'eslint', name: 'ESLint Config', desc: 'Add linting rules', prompt: 'Create ESLint config for:' },
      { id: 'prettier', name: 'Prettier Config', desc: 'Add formatting rules', prompt: 'Create Prettier config for:' },
      { id: 'tsconfig', name: 'TS Config', desc: 'TypeScript settings', prompt: 'Create tsconfig.json for:' },
      { id: 'env', name: 'Env Template', desc: 'Create .env.example', prompt: 'Create .env.example for:' },
    ]
  },
  // Regex
  {
    category: 'Regex',
    icon: Regex,
    color: 'text-rose-400',
    bg: 'bg-rose-500/20',
    commands: [
      { id: 'regex', name: 'Write Regex', desc: 'Generate pattern', prompt: 'Write a regex to match:' },
      { id: 'regex-test', name: 'Test Regex', desc: 'Validate pattern', prompt: 'Test this regex pattern:' },
      { id: 'extract', name: 'Extract Pattern', desc: 'Create from examples', prompt: 'Create regex to extract from:' },
    ]
  },
  // Git
  {
    category: 'Git',
    icon: GitBranch,
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
    commands: [
      { id: 'gitignore', name: 'Create Gitignore', desc: 'Generate .gitignore', prompt: 'Create .gitignore for:' },
      { id: 'commit', name: 'Commit Message', desc: 'Suggest commit msg', prompt: 'Suggest a git commit message for:' },
      { id: 'workflow', name: 'Git Workflow', desc: 'Best practices', prompt: 'Suggest git workflow for:' },
    ]
  },
];

export default function AICodingAssistant({ onClose, onSelectCommand }) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setExpanded(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleCommandClick = (prompt: string) => {
    if (onSelectCommand) {
      onSelectCommand(prompt);
    }
    console.log('Selected prompt:', prompt);
  };

  const filteredCommands = search.trim()
    ? aiCommands.map(cat => ({
        ...cat,
        commands: cat.commands.filter(cmd => 
          cmd.name.toLowerCase().includes(search.toLowerCase()) ||
          cmd.desc.toLowerCase().includes(search.toLowerCase())
        )
      })).filter(cat => cat.commands.length > 0)
    : aiCommands;

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-purple-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-500" />
          <span className="text-white font-semibold">AI Coding Assistant</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-3 border-b border-purple-500/20">
        <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg px-3 py-2">
          <Sparkles className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search AI commands..."
            className="bg-transparent text-white text-sm outline-none flex-1"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filteredCommands.map(category => (
          <div key={category.category} className="mb-2">
            <button
              onClick={() => toggleCategory(category.category)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${category.bg}`}
            >
              <category.icon className={`w-5 h-5 ${category.color}`} />
              <span className="flex-1 text-left text-white font-medium">{category.category}</span>
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expanded[category.category] ? 'rotate-90' : ''}`} />
            </button>
            
            {expanded[category.category] && (
              <div className="ml-4 mt-1 space-y-1">
                {category.commands.map(cmd => (
                  <button
                    key={cmd.id}
                    onClick={() => handleCommandClick(cmd.prompt)}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded-lg text-left group"
                  >
                    <div className="flex-1">
                      <div className="text-white text-sm">{cmd.name}</div>
                      <div className="text-gray-500 text-xs">{cmd.desc}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {!search && (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg text-center">
            <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Click a category to expand, then select a command</p>
            <p className="text-gray-500 text-xs mt-2">The AI will help you with your coding tasks!</p>
          </div>
        )}
      </div>
    </div>
  );
}
