import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Extension types
export type ExtensionType = 'ai' | 'formatter' | 'linter' | 'language' | 'tool' | 'debugger' | 'runner';

// Default extensions as fallback
export const EXTENSION_REGISTRY: Extension[] = [
  {
    id: 'python',
    name: 'Python',
    description: 'Rich support for the Python language',
    author: 'Microsoft',
    version: '2024.1.0',
    icon: '🐍',
    type: 'language' as ExtensionType,
    color: '#3776AB',
    downloads: 89340000,
    rating: 4.9,
    tags: ['python', 'debugging']
  },
  {
    id: 'prettier',
    name: 'Prettier - Code Formatter',
    description: 'Opinionated code formatter',
    author: 'Prettier',
    version: '10.1.0',
    icon: '✨',
    type: 'formatter' as ExtensionType,
    color: '#FB73E4',
    downloads: 78230000,
    rating: 4.8,
    tags: ['formatter', 'code-style']
  },
  {
    id: 'eslint',
    name: 'ESLint',
    description: 'Integrates ESLint into VS Code',
    author: 'Microsoft',
    version: '2.4.4',
    icon: '🔍',
    type: 'linter' as ExtensionType,
    color: '#4B32C3',
    downloads: 65430000,
    rating: 4.6,
    tags: ['linter', 'javascript']
  },
  {
    id: 'gitlens',
    name: 'GitLens',
    description: 'Supercharge Git within VS Code',
    author: 'GitKraken',
    version: '14.9.0',
    icon: '🐙',
    type: 'tool' as ExtensionType,
    color: '#F95108',
    downloads: 52100000,
    rating: 4.9,
    tags: ['git', 'version-control']
  },
  {
    id: 'docker',
    name: 'Docker',
    description: 'Docker for VS Code',
    author: 'Microsoft',
    version: '1.29.0',
    icon: '🐳',
    type: 'tool' as ExtensionType,
    color: '#0DB7ED',
    downloads: 38900000,
    rating: 4.7,
    tags: ['docker', 'containers']
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer',
    author: 'GitHub',
    version: '1.143.0',
    icon: '🤖',
    type: 'ai' as ExtensionType,
    color: '#6CCB5F',
    downloads: 72340000,
    rating: 4.5,
    tags: ['ai', 'copilot']
  },
  {
    id: 'kilo-code',
    name: 'Kilo Code',
    description: 'AI coding assistant for Krynox',
    author: 'Krynox Team',
    version: '1.0.0',
    icon: '⚡',
    type: 'ai' as ExtensionType,
    color: '#8B5CF6',
    downloads: 1000000,
    rating: 4.7,
    isRequired: true,
    tags: ['ai', 'assistant', 'krynox']
  }
];

export interface Extension {
  id: string;
  name: string;
  description: string;
  author: string;
  version: string;
  icon: string;
  type: ExtensionType;
  color: string;
  downloads?: number;
  rating?: number;
  reviews?: number;
  lastUpdated?: string;
  tags?: string[];
  isRequired?: boolean;
  addsPanel?: string;
  addsCommand?: string;
  addsFeature?: string[];
}

const STORAGE_KEY = 'krynox-installed-extensions';

export const EXTENSION_FEATURES: Record<string, { name: string; description: string; panel?: string }> = {
  'ai-suggestions': { name: 'AI Suggestions', description: 'Get AI-powered code suggestions' },
  'autocomplete': { name: 'Autocomplete', description: 'Intelligent code completion' },
  'ai-chat': { name: 'AI Chat', description: 'Chat with AI assistant', panel: 'ai' },
  'code-completion': { name: 'Code Completion', description: 'Complete code snippets' },
  'inline-suggestions': { name: 'Inline Suggestions', description: 'See AI suggestions inline' },
  'code-explanation': { name: 'Code Explanation', description: 'Get explanations for code' },
  'code-generation': { name: 'Code Generation', description: 'Generate code from prompts' },
  'refactoring-help': { name: 'Refactoring Help', description: 'AI-powered refactoring suggestions' },
  'bug-detection': { name: 'Bug Detection', description: 'Detect bugs in code' },
  'python-intellisense': { name: 'Python IntelliSense', description: 'Python language support' },
  'python-debug': { name: 'Python Debugger', description: 'Debug Python code' },
  'jupyter': { name: 'Jupyter Support', description: 'Jupyter notebook integration' },
  'run-python': { name: 'Run Python', description: 'Execute Python code' },
  'pylint': { name: 'Pylint', description: 'Python linting' },
  'run-js': { name: 'Run JavaScript', description: 'Execute JavaScript code' },
  'run-java': { name: 'Run Java', description: 'Execute Java code' },
  'run-cpp': { name: 'Run C++', description: 'Execute C++ code' },
  'run-code': { name: 'Run Code', description: 'Run code in multiple languages' },
  'format-on-save': { name: 'Format on Save', description: 'Auto-format on file save' },
  'format-selection': { name: 'Format Selection', description: 'Format selected code' },
  'format-document': { name: 'Format Document', description: 'Format entire document' },
  'lint-js': { name: 'JS Linting', description: 'JavaScript linting' },
  'lint-ts': { name: 'TS Linting', description: 'TypeScript linting' },
  'lint-react': { name: 'React Linting', description: 'React-specific linting' },
  'auto-fix': { name: 'Auto Fix', description: 'Automatically fix issues' },
  'eslint-diagnostics': { name: 'ESLint Diagnostics', description: 'Show ESLint errors' },
  'git-blame': { name: 'Git Blame', description: 'View author information' },
  'git-history': { name: 'Git History', description: 'View commit history', panel: 'git' },
  'git-file-annotations': { name: 'File Annotations', description: 'Inline git blame' },
  'git-search': { name: 'Git Search', description: 'Search in git' },
  'commit-graph': { name: 'Commit Graph', description: 'Visualize commits' },
  'docker-containers': { name: 'Docker Containers', description: 'Manage containers', panel: 'docker' },
  'docker-images': { name: 'Docker Images', description: 'Manage images' },
  'docker-compose': { name: 'Docker Compose', description: 'Docker Compose support' },
  'dockerfiles': { name: 'Dockerfiles', description: 'Dockerfile support' },
  'sql-queries': { name: 'SQL Queries', description: 'Run SQL queries', panel: 'database' },
  'database-connection': { name: 'Database Connection', description: 'Connect to databases' },
  'sql-completion': { name: 'SQL Completion', description: 'SQL IntelliSense' },
  'mongodb-connection': { name: 'MongoDB Connection', description: 'Connect to MongoDB' },
  'mongodb-queries': { name: 'MongoDB Queries', description: 'Run MongoDB queries', panel: 'mongodb' },
  'database-explorer': { name: 'Database Explorer', description: 'Browse databases' },
  'redis-connection': { name: 'Redis Connection', description: 'Connect to Redis' },
  'redis-commands': { name: 'Redis Commands', description: 'Run Redis commands' },
  'key-browser': { name: 'Key Browser', description: 'Browse cache keys' },
  'http-requests': { name: 'HTTP Requests', description: 'Make HTTP requests', panel: 'api' },
  'api-testing': { name: 'API Testing', description: 'Test APIs' },
  'rest-client': { name: 'REST Client', description: 'REST API client' },
  'graphql-syntax': { name: 'GraphQL Syntax', description: 'GraphQL highlighting' },
  'graphql-validation': { name: 'GraphQL Validation', description: 'Validate GraphQL' },
  'graphql-autocomplete': { name: 'GraphQL Autocomplete', description: 'GraphQL completion' },
  'custom-icons': { name: 'Custom Icons', description: 'File type icons' },
  'file-icons': { name: 'File Icons', description: 'Custom file icons' },
  'workspace-colors': { name: 'Workspace Colors', description: 'Custom workspace colors' },
  'theme-customization': { name: 'Theme Customization', description: 'Customize themes' },
  'color-accent': { name: 'Color Accent', description: 'Accent colors' },
  'dark-theme': { name: 'Dark Theme', description: 'Dark color scheme' },
  'syntax-highlighting': { name: 'Syntax Highlighting', description: 'Enhanced highlighting' },
  'auto-rename': { name: 'Auto Rename Tag', description: 'Rename paired tags' },
  'html-editing': { name: 'HTML Editing', description: 'Enhanced HTML editing' },
  'xml-editing': { name: 'XML Editing', description: 'Enhanced XML editing' },
  'bracket-coloring': { name: 'Bracket Coloring', description: 'Colorize brackets' },
  'bracket-matching': { name: 'Bracket Matching', description: 'Match brackets' },
  'highlight-pairs': { name: 'Highlight Pairs', description: 'Highlight bracket pairs' },
  'indent-colors': { name: 'Indent Colors', description: 'Colorize indentation' },
  'readable-indentation': { name: 'Readable Indentation', description: 'Visual indentation' },
  'path-autocomplete': { name: 'Path Autocomplete', description: 'Autocomplete file paths' },
  'file-imports': { name: 'File Imports', description: 'Import suggestions' },
  'intellisense': { name: 'IntelliSense', description: 'Smart completions' },
  'npm-autocomplete': { name: 'npm Autocomplete', description: 'npm module suggestions' },
  'import-suggestions': { name: 'Import Suggestions', description: 'Import statement suggestions' },
  'package-intellisense': { name: 'Package IntelliSense', description: 'Package suggestions' },
  'markdown-preview': { name: 'Markdown Preview', description: 'Preview Markdown files', panel: 'markdown' },
  'markdown-toc': { name: 'Table of Contents', description: 'Generate TOC' },
  'markdown-shortcuts': { name: 'Markdown Shortcuts', description: 'Keyboard shortcuts' },
  'remote-development': { name: 'Remote Development', description: 'Remote workspace support' },
  'ssh-connection': { name: 'SSH Connection', description: 'Connect via SSH' },
  'remote-files': { name: 'Remote Files', description: 'Edit remote files' },
  'container-development': { name: 'Container Development', description: 'Dev containers' },
  'docker-integration': { name: 'Docker Integration', description: 'Docker integration' },
  'dev-container': { name: 'Dev Container', description: 'Development container' },
  'settings-sync': { name: 'Settings Sync', description: 'Sync settings' },
  'extension-sync': { name: 'Extension Sync', description: 'Sync extensions' },
  'color-picker': { name: 'Color Picker', description: 'Pick colors', panel: 'color-picker' },
  'color-conversion': { name: 'Color Conversion', description: 'Convert color formats' },
  'inline-errors': { name: 'Inline Errors', description: 'Show errors inline' },
  'error-highlighting': { name: 'Error Highlighting', description: 'Highlight errors' },
  'diagnostics': { name: 'Diagnostics', description: 'Code diagnostics' },
  'bookmarks': { name: 'Bookmarks', description: 'Mark important lines', panel: 'bookmarks' },
  'jump-to-bookmark': { name: 'Jump to Bookmark', description: 'Navigate to bookmarks' },
  'jest-tests': { name: 'Jest Tests', description: 'Run Jest tests' },
  'jest-debugging': { name: 'Jest Debugging', description: 'Debug Jest tests' },
  'test-coverage': { name: 'Test Coverage', description: 'View coverage reports' },
  'typescript-support': { name: 'TypeScript Support', description: 'TypeScript features' },
  'type-checking': { name: 'Type Checking', description: 'Static type checking' },
  'tailwind-autocomplete': { name: 'Tailwind Autocomplete', description: 'Tailwind CSS completion' },
  'tailwind-preview': { name: 'Tailwind Preview', description: 'Preview Tailwind classes' },
  'css-intellisense': { name: 'CSS IntelliSense', description: 'CSS autocomplete' },
  'react-inspector': { name: 'React Inspector', description: 'Inspect React components' },
  'react-profiler': { name: 'React Profiler', description: 'Profile React performance' },
  'component-tree': { name: 'Component Tree', description: 'View component tree' },
  'vue-syntax': { name: 'Vue Syntax', description: 'Vue template syntax' },
  'vue-intellisense': { name: 'Vue IntelliSense', description: 'Vue code completion' },
  'vue-formatting': { name: 'Vue Formatting', description: 'Format Vue files' },
  'vue-debugging': { name: 'Vue Debugging', description: 'Debug Vue apps' },
  'angular-intellisense': { name: 'Angular IntelliSense', description: 'Angular completion' },
  'angular-templates': { name: 'Angular Templates', description: 'Template support' },
  'styled-intellisense': { name: 'Styled IntelliSense', description: 'Styled completion' },
  'css-in-js': { name: 'CSS in JS', description: 'CSS-in-JS support' },
  'yaml-validation': { name: 'YAML Validation', description: 'Validate YAML' },
  'yaml-completion': { name: 'YAML Completion', description: 'YAML autocomplete' },
  'json-validation': { name: 'JSON Validation', description: 'Validate JSON' },
  'json-completion': { name: 'JSON Completion', description: 'JSON autocomplete' },
  'shell-format': { name: 'Shell Format', description: 'Format shell scripts' },
  'powershell-intellisense': { name: 'PowerShell IntelliSense', description: 'PowerShell completion' },
  'rust-intellisense': { name: 'Rust IntelliSense', description: 'Rust completion' },
  'rust-debug': { name: 'Rust Debug', description: 'Debug Rust' },
  'go-intellisense': { name: 'Go IntelliSense', description: 'Go completion' },
  'go-debug': { name: 'Go Debug', description: 'Debug Go' },
  'go-tests': { name: 'Go Tests', description: 'Run Go tests' },
  'java-debug': { name: 'Java Debug', description: 'Debug Java' },
  'breakpoints': { name: 'Breakpoints', description: 'Set breakpoints' },
  'cpp-intellisense': { name: 'C++ IntelliSense', description: 'C++ completion' },
  'cpp-debug': { name: 'C++ Debug', description: 'Debug C++' },
  'base64-encoding': { name: 'Base64 Encoding', description: 'Encode/decode Base64', panel: 'base64' },
  'hash-generation': { name: 'Hash Generation', description: 'Generate hashes', panel: 'hash' },
  'jwt-decoder': { name: 'JWT Decoder', description: 'Decode JWTs', panel: 'jwt' },
  'qr-code': { name: 'QR Code', description: 'Generate QR codes', panel: 'qr' },
  'api-generator': { name: 'API Generator', description: 'Generate API code', panel: 'api-generator' },
  'sql-runner': { name: 'SQL Runner', description: 'Run SQL queries', panel: 'sql' },
  'query-builder': { name: 'Query Builder', description: 'Build queries visually', panel: 'query-builder' },
  'db-connections': { name: 'DB Connections', description: 'Manage database connections', panel: 'database' },
  'graphql-explorer': { name: 'GraphQL Explorer', description: 'Explore GraphQL APIs', panel: 'graphql' },
  'live-reload': { name: 'Live Reload', description: 'Auto-reload on changes', panel: 'live-server' },
  'local-server': { name: 'Local Server', description: 'Start local server' },
};

export const EXTENSION_CATEGORIES = [
  { id: 'all', name: 'All', icon: '🔌' },
  { id: 'language', name: 'Languages', icon: '💻' },
  { id: 'ai', name: 'AI & ML', icon: '🤖' },
  { id: 'tool', name: 'Tools', icon: '🛠️' },
  { id: 'formatter', name: 'Formatters', icon: '✨' },
  { id: 'linter', name: 'Linters', icon: '🔍' },
  { id: 'debugger', name: 'Debuggers', icon: '🐛' },
  { id: 'runner', name: 'Runners', icon: '▶️' },
];

const loadFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load extensions from localStorage:', e);
  }
  return ['kilo-code', 'krynox-utilities', 'krynox-api', 'krynox-db'];
};

const saveToStorage = (extensions: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extensions));
  } catch (e) {
    console.error('Failed to save extensions to localStorage:', e);
  }
};

export function useExtensionManager(initialInstalled: string[] = ['kilo-code', 'krynox-utilities', 'krynox-api', 'krynox-db']) {
  const [installedExtensions, setInstalledExtensions] = useState<string[]>([]);
  const [extensionRegistry, setExtensionRegistry] = useState<Extension[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [installingProgress, setInstallingProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    // Add timestamp to prevent caching issues
    const cacheBuster = Date.now();
    fetch(`/extensions.json?_=${cacheBuster}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Extensions loaded from JSON:', data.length);
        setExtensionRegistry(data);
        setIsLoading(false);
      })
      .catch(e => {
        console.warn('Failed to load extensions from JSON, using defaults:', e);
        setExtensionRegistry(EXTENSION_REGISTRY);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const stored = loadFromStorage();
    setInstalledExtensions(stored);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveToStorage(installedExtensions);
    }
  }, [installedExtensions, isLoading]);

  const isInstalled = useCallback((extId: string) => {
    return installedExtensions.includes(extId);
  }, [installedExtensions]);

  const installExtension = useCallback(async (extId: string) => {
    if (installedExtensions.includes(extId)) {
      return;
    }

    const extension = extensionRegistry.find(e => e.id === extId);
    if (!extension) {
      console.error('Extension not found:', extId);
      return;
    }

    const baseDuration = 1000;
    const downloadScale = Math.min((extension.downloads || 1000000) / 10000000, 2);
    const duration = baseDuration + (baseDuration * downloadScale);
    
    setInstallingProgress(prev => ({ ...prev, [extId]: 0 }));
    
    const steps = 20;
    const interval = duration / steps;
    
    for (let i = 1; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, interval));
      setInstallingProgress(prev => ({ ...prev, [extId]: (i / steps) * 100 }));
    }

    setInstalledExtensions(prev => [...prev, extId]);
    setInstallingProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[extId];
      return newProgress;
    });
  }, [installedExtensions, extensionRegistry]);

  const uninstallExtension = useCallback((extId: string) => {
    const extension = extensionRegistry.find(e => e.id === extId);
    if (extension?.isRequired) {
      console.warn('Cannot uninstall required extension');
      return;
    }
    setInstalledExtensions(prev => prev.filter(id => id !== extId));
  }, [extensionRegistry]);

  const getInstalledExtensions = useCallback(() => {
    return extensionRegistry.filter(ext => installedExtensions.includes(ext.id));
  }, [installedExtensions, extensionRegistry]);

  const getExtensionsByType = useCallback((type: ExtensionType) => {
    return extensionRegistry.filter(ext => ext.type === type);
  }, [extensionRegistry]);

  const getExtension = useCallback((extId: string) => {
    return extensionRegistry.find(ext => ext.id === extId);
  }, [extensionRegistry]);

  const getAllFeatures = useCallback(() => {
    const features: string[] = [];
    getInstalledExtensions().forEach(ext => {
      if (ext.addsFeature) {
        features.push(...ext.addsFeature);
      }
    });
    return features;
  }, [getInstalledExtensions]);

  const hasFeature = useCallback((feature: string) => {
    return getAllFeatures().includes(feature);
  }, [getAllFeatures]);

  const getExtensionPanels = useCallback(() => {
    const panels: { id: string; name: string }[] = [];
    getInstalledExtensions().forEach(ext => {
      if (ext.addsPanel) {
        panels.push({ id: ext.addsPanel, name: ext.name });
      }
    });
    return panels;
  }, [getInstalledExtensions]);

  const getExtensionCommands = useCallback(() => {
    const commands: { id: string; name: string }[] = [];
    getInstalledExtensions().forEach(ext => {
      if (ext.addsCommand) {
        commands.push({ id: ext.addsCommand, name: ext.name });
      }
    });
    return commands;
  }, [getInstalledExtensions]);

  const getExtensionsByCategory = useCallback((category: string) => {
    if (category === 'all') {
      return extensionRegistry;
    }
    return extensionRegistry.filter(ext => ext.type === category);
  }, [extensionRegistry]);

  const searchExtensions = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return extensionRegistry.filter(ext => 
      ext.name.toLowerCase().includes(lowerQuery) ||
      ext.description.toLowerCase().includes(lowerQuery) ||
      ext.author.toLowerCase().includes(lowerQuery) ||
      ext.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [extensionRegistry]);

  const formatDownloads = useCallback((count?: number) => {
    if (!count) return '0';
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }, []);

  const getFeaturedExtensions = useMemo(() => {
    return [...extensionRegistry]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  }, [extensionRegistry]);

  const getRecentExtensions = useMemo(() => {
    return [...extensionRegistry]
      .sort((a, b) => {
        const dateA = new Date(a.lastUpdated || '2024-01-01');
        const dateB = new Date(b.lastUpdated || '2024-01-01');
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 6);
  }, [extensionRegistry]);

  return {
    installedExtensions,
    extensionRegistry,
    isLoading,
    installingProgress,
    installExtension,
    uninstallExtension,
    isInstalled,
    getInstalledExtensions,
    getExtensionsByType,
    getExtension,
    getAllFeatures,
    hasFeature,
    getExtensionPanels,
    getExtensionCommands,
    getExtensionsByCategory,
    searchExtensions,
    formatDownloads,
    getFeaturedExtensions,
    getRecentExtensions,
    EXTENSION_FEATURES,
    EXTENSION_CATEGORIES,
  };
}
