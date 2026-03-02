// Extension Host - Mock VSCode API for Krynox
// This provides a VSCode-like API for extensions to work in Krynox

import { callAI, AISettings } from './ai-multi-provider';

// Global AI client for extensions
let globalAISettings: AISettings | null = null;
let selectedModel: string = 'gpt-4';

// Set AI settings from the app
export function setAISettings(settings: AISettings) {
  globalAISettings = settings;
  selectedModel = settings.model;
}

// Get selected model
export function getSelectedModel(): string {
  return selectedModel;
}

// Mock VSCode API
export const vscode = {
  // Language features
  languages: {
    registerHoverProvider: (selector: string, provider: any) => {
      console.log(`[Krynox] Hover provider registered for: ${selector}`);
      return { dispose: () => console.log(`[Krynox] Hover provider disposed for: ${selector}`) };
    },
    registerCompletionItemProvider: (selector: string, provider: any) => {
      console.log(`[Krynox] Completion provider registered for: ${selector}`);
      return { dispose: () => console.log(`[Krynox] Completion provider disposed for: ${selector}`) };
    },
    registerDefinitionProvider: (selector: string, provider: any) => {
      console.log(`[Krynox] Definition provider registered for: ${selector}`);
      return { dispose: () => {} };
    },
    registerDocumentFormattingEditProvider: (selector: string, provider: any) => {
      console.log(`[Krynox] Formatting provider registered for: ${selector}`);
      return { dispose: () => {} };
    },
  },

  // Window features
  window: {
    showInformationMessage: (message: string, ...items: string[]) => {
      console.log(`[Krynox Info] ${message}`);
      return Promise.resolve(undefined);
    },
    showWarningMessage: (message: string, ...items: string[]) => {
      console.log(`[Krynox Warning] ${message}`);
      return Promise.resolve(undefined);
    },
    showErrorMessage: (message: string, ...items: string[]) => {
      console.log(`[Krynox Error] ${message}`);
      return Promise.resolve(undefined);
    },
    showQuickPick: async (items: string[] | Promise<string[]>, options?: any) => {
      console.log('[Krynox] Quick pick called');
      return undefined;
    },
    createWebviewPanel: (id: string, title: string, options: any) => {
      console.log(`[Krynox] Webview panel created: ${title}`);
      return {
        webview: {
          postMessage: (msg: any) => console.log('[Krynox] Webview message:', msg),
          html: '',
          onDidReceiveMessage: () => ({ dispose: () => {} }),
        },
        onDidChangeViewState: () => ({ dispose: () => {} }),
        onDidDispose: () => ({ dispose: () => {} }),
        dispose: () => {},
      };
    },
  },

  // Workspace features  
  workspace: {
    getConfiguration: (section?: string) => {
      return {
        get: (key: string, defaultValue?: any) => {
          // Return stored configuration or default
          const stored = localStorage.getItem(`krynox.config.${section}.${key}`);
          return stored !== null ? JSON.parse(stored) : defaultValue;
        },
        update: async (key: string, value: any) => {
          localStorage.setItem(`krynox.config.${section}.${key}`, JSON.stringify(value));
        },
      };
    },
    openTextDocument: async (uri: string) => {
      console.log(`[Krynox] Opening document: ${uri}`);
      return null;
    },
    onDidOpenTextDocument: {
      subscribe: (callback: any) => {
        console.log('[Krynox] Subscribed to document open');
        return { dispose: () => {} };
      },
    },
  },

  // Commands
  commands: {
    registerCommand: (command: string, callback: (...args: any[]) => any) => {
      console.log(`[Krynox] Command registered: ${command}`);
      return { dispose: () => console.log(`[Krynox] Command disposed: ${command}`) };
    },
    executeCommand: async (command: string, ...args: any[]) => {
      console.log(`[Krynox] Command executed: ${command}`);
      return undefined;
    },
  },

  // Krynox-specific AI API
  krynoxAI: {
    // Ask AI with current selected model
    ask: async (prompt: string): Promise<string> => {
      if (!globalAISettings) {
        console.warn('[Krynox AI] No AI settings configured');
        return 'Please configure AI settings first.';
      }
      
      try {
        const response = await callAI(prompt, globalAISettings);
        return response.text;
      } catch (error: any) {
        console.error('[Krynox AI] Error:', error.message);
        return `Error: ${error.message}`;
      }
    },
    
    // Ask AI with specific model
    askWithModel: async (prompt: string, model: string): Promise<string> => {
      if (!globalAISettings) {
        return 'Please configure AI settings first.';
      }
      
      const originalModel = globalAISettings.model;
      globalAISettings.model = model;
      
      try {
        const response = await callAI(prompt, globalAISettings);
        return response.text;
      } finally {
        globalAISettings.model = originalModel;
      }
    },
    
    // Get available models
    getModels: () => [
      { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
      { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic' },
      { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
      { id: 'gemini-ultra', name: 'Gemini Ultra', provider: 'Google' },
    ],
    
    // Get current model
    getCurrentModel: () => selectedModel,
    
    // Set model
    setModel: (model: string) => {
      selectedModel = model;
      if (globalAISettings) {
        globalAISettings.model = model;
      }
    },
  },
};

// Extension Host Context
export interface ExtensionContext {
  subscriptions: (() => void)[];
  workspaceState: {
    get: (key: string, defaultValue?: any) => any;
    update: (key: string, value: any) => Promise<void>;
  };
  globalState: {
    get: (key: string, defaultValue?: any) => any;
    update: (key: string, value: any) => Promise<void>;
  };
  extensionPath: string;
}

// Create extension context
export function createExtensionContext(extensionPath: string): ExtensionContext {
  const storageKey = `krynox.ext.${extensionPath}`;
  
  return {
    subscriptions: [],
    workspaceState: {
      get: (key: string, defaultValue?: any) => {
        const data = localStorage.getItem(`${storageKey}.workspace`);
        const state = data ? JSON.parse(data) : {};
        return state[key] ?? defaultValue;
      },
      update: async (key: string, value: any) => {
        const data = localStorage.getItem(`${storageKey}.workspace`);
        const state = data ? JSON.parse(data) : {};
        state[key] = value;
        localStorage.setItem(`${storageKey}.workspace`, JSON.stringify(state));
      },
    },
    globalState: {
      get: (key: string, defaultValue?: any) => {
        const data = localStorage.getItem(`${storageKey}.global`);
        const state = data ? JSON.parse(data) : {};
        return state[key] ?? defaultValue;
      },
      update: async (key: string, value: any) => {
        const data = localStorage.getItem(`${storageKey}.global`);
        const state = data ? JSON.parse(data) : {};
        state[key] = value;
        localStorage.setItem(`${storageKey}.global`, JSON.stringify(state));
      },
    },
    extensionPath,
  };
}

// Extension activation function type
export type ActivateFunction = (context: ExtensionContext) => Promise<void>;
export type DeactivateFunction = () => void | Promise<void>;

// Extension info
export interface ExtensionInfo {
  id: string;
  name: string;
  version: string;
  main: string;
  description?: string;
  author?: string;
  dependencies?: Record<string, string>;
}

// Load and activate an extension
export async function activateExtension(
  extensionInfo: ExtensionInfo,
  extensionPath: string
): Promise<boolean> {
  console.log(`[Krynox] Activating extension: ${extensionInfo.name} v${extensionInfo.version}`);
  
  try {
    const context = createExtensionContext(extensionPath);
    
    // Try to dynamically import the extension's main file
    // In a real implementation, this would load from the extension's bundled JS
    console.log(`[Krynox] Extension main: ${extensionInfo.main}`);
    
    // For now, we'll just log that the extension is activated
    console.log(`[Krynox] Extension activated: ${extensionInfo.name}`);
    
    return true;
  } catch (error: any) {
    console.error(`[Krynox] Failed to activate extension ${extensionInfo.name}:`, error);
    return false;
  }
}

// Deactivate an extension
export async function deactivateExtension(
  extensionInfo: ExtensionInfo
): Promise<void> {
  console.log(`[Krynox] Deactivating extension: ${extensionInfo.name}`);
}

export default vscode;
