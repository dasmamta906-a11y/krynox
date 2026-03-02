import { create } from 'zustand';

// Simple Zustand store for VS Code clone state management
const useStore = create((set, get) => ({
  // Editor State
  activeTabId: null,
  openTabs: [],
  activeEditorContent: '',
  cursorPosition: { line: 1, column: 1 },
  
  // File Explorer State
  currentFolder: null,
  files: {},
  expandedFolders: [],
  
  // UI State
  sidebarView: 'explorer', // explorer, search, extensions
  terminalVisible: false,
  commandPaletteVisible: false,
  
  // Extension State
  installedExtensions: [],
  installingExtensions: [],
  
  // Activity Bar
  activityBarView: 'explorer',
  
  // Dirty state for tabs
  dirtyTabs: new Set(),
  
  // Actions
  setActiveTab: (tabId) => set({ activeTabId: tabId }),
  
  addTab: (tab) => set((state) => {
    const exists = state.openTabs.find(t => t.id === tab.id);
    if (exists) {
      return { activeTabId: tab.id };
    }
    return {
      openTabs: [...state.openTabs, tab],
      activeTabId: tab.id,
      activeEditorContent: tab.content || ''
    };
  }),
  
  removeTab: (tabId) => set((state) => {
    const newTabs = state.openTabs.filter(t => t.id !== tabId);
    const newDirty = new Set(state.dirtyTabs);
    newDirty.delete(tabId);
    
    let newActiveId = state.activeTabId;
    if (state.activeTabId === tabId) {
      const idx = state.openTabs.findIndex(t => t.id === tabId);
      newActiveId = newTabs[idx]?.id || newTabs[idx - 1]?.id || null;
    }
    
    return {
      openTabs: newTabs,
      activeTabId: newActiveId,
      dirtyTabs: newDirty
    };
  }),
  
  updateTabContent: (tabId, content) => set((state) => {
    const newTabs = state.openTabs.map(t => 
      t.id === tabId ? { ...t, content } : t
    );
    const newDirty = new Set(state.dirtyTabs);
    newDirty.add(tabId);
    
    return {
      openTabs: newTabs,
      activeEditorContent: state.activeTabId === tabId ? content : state.activeEditorContent,
      dirtyTabs: newDirty
    };
  }),
  
  markTabClean: (tabId) => set((state) => {
    const newDirty = new Set(state.dirtyTabs);
    newDirty.delete(tabId);
    return { dirtyTabs: newDirty };
  }),
  
  isTabDirty: (tabId) => get().dirtyTabs.has(tabId),
  
  setCursorPosition: (line, column) => set({ 
    cursorPosition: { line, column } 
  }),
  
  // File System Actions
  setCurrentFolder: (folder) => set({ currentFolder: folder }),
  
  setFiles: (files) => set({ files }),
  
  toggleFolder: (folderPath) => set((state) => {
    const expanded = state.expandedFolders.includes(folderPath)
      ? state.expandedFolders.filter(p => p !== folderPath)
      : [...state.expandedFolders, folderPath];
    return { expandedFolders: expanded };
  }),
  
  // UI Actions
  setSidebarView: (view) => set({ sidebarView: view }),
  setActivityBarView: (view) => set({ activityBarView: view, sidebarView: view === 'extensions' ? 'extensions' : view }),
  toggleTerminal: () => set((state) => ({ terminalVisible: !state.terminalVisible })),
  toggleCommandPalette: () => set((state) => ({ commandPaletteVisible: !state.commandPaletteVisible })),
  
  // Extension Actions
  setInstalledExtensions: (extensions) => set({ installedExtensions: extensions }),
  addInstalledExtension: (extId) => set((state) => ({
    installedExtensions: [...state.installedExtensions, extId]
  })),
  removeInstalledExtension: (extId) => set((state) => ({
    installedExtensions: state.installedExtensions.filter(id => id !== extId)
  })),
  
  // Check if extension is installed
  isExtensionInstalled: (extId) => get().installedExtensions.includes(extId),
  
  // Set installing state
  setInstallingExtension: (extId, progress) => set((state) => ({
    installingExtensions: { ...state.installingExtensions, [extId]: progress }
  })),
  
  clearInstallingExtension: (extId) => set((state) => {
    const newInstalling = { ...state.installingExtensions };
    delete newInstalling[extId];
    return { installingExtensions: newInstalling };
  }),
  
  getInstallingProgress: (extId) => get().installingExtensions[extId] || 0,
}));

export default useStore;
