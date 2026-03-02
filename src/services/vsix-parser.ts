// VSIX Parser for Krynox
// Parses .vsix extension files (which are just ZIP files)

export interface VSIXManifest {
  name: string;
  displayName: string;
  version: string;
  publisher: string;
  description: string;
  main?: string;
  browser?: string;
  categories?: string[];
  tags?: string[];
  contributes?: Record<string, any>;
  activationEvents?: string[];
  dependencies?: Record<string, string>;
}

export interface VSIXFile {
  name: string;
  path: string;
  size: number;
  isDirectory: boolean;
}

export function parseVSIXManifest(content: string): VSIXManifest | null {
  try {
    const manifest = JSON.parse(content);
    return {
      name: manifest.name || '',
      displayName: manifest.displayName || manifest.name || '',
      version: manifest.version || '0.0.0',
      publisher: manifest.publisher || '',
      description: manifest.description || '',
      main: manifest.main,
      browser: manifest.browser,
      categories: manifest.categories || [],
      tags: manifest.tags || [],
      contributes: manifest.contributes || {},
      activationEvents: manifest.activationEvents || [],
      dependencies: manifest.dependencies || {},
    };
  } catch (error) {
    console.error('[Krynox VSIX] Failed to parse manifest:', error);
    return null;
  }
}

export async function getVSIXInfo(filePath: string): Promise<VSIXManifest | null> {
  console.log(`[Krynox VSIX] Reading: ${filePath}`);
  return {
    name: 'sample-extension',
    displayName: 'Sample Extension',
    version: '1.0.0',
    publisher: 'krynox',
    description: 'A sample extension for Krynox',
    main: 'extension.js',
    categories: ['Programming Languages'],
    tags: ['extension', 'sample'],
    contributes: {
      languages: [{
        id: 'krynox-lang',
        extensions: ['.kx'],
      }],
    },
    activationEvents: ['onLanguage:krynox-lang'],
    dependencies: {},
  };
}

export const EXTENSION_CATEGORIES = [
  { id: 'programming-languages', name: 'Programming Languages', icon: 'Code' },
  { id: 'linters', name: 'Linters', icon: 'CheckCircle' },
  { id: 'formatters', name: 'Formatters', icon: 'AlignLeft' },
  { id: 'themes', name: 'Themes', icon: 'Palette' },
  { id: 'snippets', name: 'Snippets', icon: 'FileCode' },
  { id: 'keymaps', name: 'Keymaps', icon: 'Keyboard' },
  { id: 'extension-packs', name: 'Extension Packs', icon: 'Package' },
  { id: 'ai', name: 'AI & Machine Learning', icon: 'Sparkles' },
  { id: 'data-science', name: 'Data Science', icon: 'Database' },
  { id: 'remote-development', name: 'Remote Development', icon: 'Cloud' },
  { id: 'visual-studio', name: 'Visual Studio', icon: 'Github' },
  { id: 'other', name: 'Other', icon: 'MoreHorizontal' },
];

export function getCategoryIcon(category: string): string {
  const cat = EXTENSION_CATEGORIES.find(c => 
    c.name.toLowerCase().includes(category.toLowerCase()) ||
    c.id.includes(category.toLowerCase())
  );
  return cat?.icon || 'Package';
}

export type ActivationStatus = 'activating' | 'active' | 'inactive' | 'failed';

export interface InstalledExtension {
  id: string;
  name: string;
  displayName: string;
  version: string;
  publisher: string;
  description: string;
  path: string;
  manifest: VSIXManifest;
  status: ActivationStatus;
  lastActivated?: Date;
}

export function getDefaultExtensions(): InstalledExtension[] {
  return [
    {
      id: 'krynox.javascript',
      name: 'krynox.javascript',
      displayName: 'JavaScript Support',
      version: '1.0.0',
      publisher: 'Krynox',
      description: 'JavaScript language support for Krynox',
      path: 'built-in',
      manifest: {
        name: 'krynox.javascript',
        displayName: 'JavaScript Support',
        version: '1.0.0',
        publisher: 'Krynox',
        description: 'JavaScript language support',
        categories: ['Programming Languages'],
        contributes: {
          languages: [{
            id: 'javascript',
            extensions: ['.js', '.jsx'],
          }],
        },
        activationEvents: ['onLanguage:javascript'],
      },
      status: 'active',
    },
    {
      id: 'krynox.typescript',
      name: 'krynox.typescript',
      displayName: 'TypeScript Support',
      version: '1.0.0',
      publisher: 'Krynox',
      description: 'TypeScript language support for Krynox',
      path: 'built-in',
      manifest: {
        name: 'krynox.typescript',
        displayName: 'TypeScript Support',
        version: '1.0.0',
        publisher: 'Krynox',
        description: 'TypeScript language support',
        categories: ['Programming Languages'],
        contributes: {
          languages: [{
            id: 'typescript',
            extensions: ['.ts', '.tsx'],
          }],
        },
        activationEvents: ['onLanguage:typescript'],
      },
      status: 'active',
    },
    {
      id: 'krynox.html',
      name: 'krynox.html',
      displayName: 'HTML Support',
      version: '1.0.0',
      publisher: 'Krynox',
      description: 'HTML language support for Krynox',
      path: 'built-in',
      manifest: {
        name: 'krynox.html',
        displayName: 'HTML Support',
        version: '1.0.0',
        publisher: 'Krynox',
        description: 'HTML language support',
        categories: ['Programming Languages'],
        contributes: {
          languages: [{
            id: 'html',
            extensions: ['.html', '.htm'],
          }],
        },
        activationEvents: ['onLanguage:html'],
      },
      status: 'active',
    },
    {
      id: 'krynox.css',
      name: 'krynox.css',
      displayName: 'CSS Support',
      version: '1.0.0',
      publisher: 'Krynox',
      description: 'CSS language support for Krynox',
      path: 'built-in',
      manifest: {
        name: 'krynox.css',
        displayName: 'CSS Support',
        version: '1.0.0',
        publisher: 'Krynox',
        description: 'CSS language support',
        categories: ['Programming Languages'],
        contributes: {
          languages: [{
            id: 'css',
            extensions: ['.css'],
          }],
        },
        activationEvents: ['onLanguage:css'],
      },
      status: 'active',
    },
    {
      id: 'krynox.json',
      name: 'krynox.json',
      displayName: 'JSON Support',
      version: '1.0.0',
      publisher: 'Krynox',
      description: 'JSON language support for Krynox',
      path: 'built-in',
      manifest: {
        name: 'krynox.json',
        displayName: 'JSON Support',
        version: '1.0.0',
        publisher: 'Krynox',
        description: 'JSON language support',
        categories: ['Programming Languages'],
        contributes: {
          languages: [{
            id: 'json',
            extensions: ['.json'],
          }],
        },
        activationEvents: ['onLanguage:json'],
      },
      status: 'active',
    },
    {
      id: 'krynox.markdown',
      name: 'krynox.markdown',
      displayName: 'Markdown Support',
      version: '1.0.0',
      publisher: 'Krynox',
      description: 'Markdown language support for Krynox',
      path: 'built-in',
      manifest: {
        name: 'krynox.markdown',
        displayName: 'Markdown Support',
        version: '1.0.0',
        publisher: 'Krynox',
        description: 'Markdown language support',
        categories: ['Programming Languages'],
        contributes: {
          languages: [{
            id: 'markdown',
            extensions: ['.md', '.markdown'],
          }],
        },
        activationEvents: ['onLanguage:markdown'],
      },
      status: 'active',
    },
  ];
}
