import { useState, useCallback, useEffect } from 'react';
import useStore from '../store/useStore';

// File System Hook - manages in-memory file system
const useFileSystem = () => {
  const { 
    currentFolder, 
    setCurrentFolder, 
    files, 
    setFiles,
    expandedFolders, 
    toggleFolder,
    addTab,
    openTabs,
    activeTabId,
    updateTabContent,
    markTabClean
  } = useStore();
  
  // Initialize with some default files
  const [fileTree, setFileTree] = useState([
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'index.js', type: 'file', content: '// Welcome to Krynox!\nconsole.log("Hello World");' },
        { name: 'app.js', type: 'file', content: '// Main application file\nconst express = require("express");\nconst app = express();' },
        { name: 'utils.js', type: 'file', content: '// Utility functions\nexport const add = (a, b) => a + b;\nexport const subtract = (a, b) => a - b;' },
      ]
    },
    {
      name: 'components',
      type: 'folder',
      children: [
        { name: 'Header.jsx', type: 'file', content: 'import React from "react";\n\nexport default function Header() {\n  return <header>My App</header>;\n}' },
        { name: 'Footer.jsx', type: 'file', content: 'import React from "react";\n\nexport default function Footer() {\n  return <footer>© 2024</footer>;\n}' },
      ]
    },
    {
      name: 'data',
      type: 'folder',
      children: [
        { name: 'config.json', type: 'file', content: '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "debug": true\n}' },
      ]
    },
    { name: 'package.json', type: 'file', content: '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node index.js"\n  }\n}' },
    { name: 'README.md', type: 'file', content: '# My App\n\nThis is my awesome application!' },
  ]);

  // Get file icon based on extension
  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
      js: '📜',
      jsx: '⚛️',
      ts: '📘',
      tsx: '⚛️',
      json: '📋',
      md: '📝',
      html: '🌐',
      css: '🎨',
      py: '🐍',
      rs: '🦀',
      go: '🐹',
      java: '☕',
      cpp: '⚙️',
      c: '⚙️',
      default: '📄'
    };
    return icons[ext] || icons.default;
  };

  // Find file in tree
  const findFile = useCallback((name, tree = fileTree) => {
    for (const item of tree) {
      if (item.name === name && item.type === 'file') {
        return item;
      }
      if (item.children) {
        const found = findFile(name, item.children);
        if (found) return found;
      }
    }
    return null;
  }, [fileTree]);

  // Open file in editor
  const openFile = useCallback((filename) => {
    const file = findFile(filename);
    if (file) {
      // Check if already open
      const existingTab = openTabs.find(t => t.name === filename);
      if (existingTab) {
        useStore.getState().setActiveTab(existingTab.id);
      } else {
        // Create new tab
        const newTab = {
          id: `tab-${Date.now()}`,
          name: filename,
          content: file.content,
          path: filename
        };
        addTab(newTab);
      }
    }
  }, [findFile, openTabs, addTab]);

  // Create new file
  const createFile = useCallback((filename, content = '') => {
    const newFile = { name: filename, type: 'file', content };
    
    // Determine where to add (root level for now)
    setFileTree(prev => [...prev, newFile]);
    
    // Also add to files object
    setFiles(prev => ({ ...prev, [filename]: content }));
    
    return newFile;
  }, [setFiles]);

  // Create new folder
  const createFolder = useCallback((foldername) => {
    const newFolder = { name: foldername, type: 'folder', children: [] };
    setFileTree(prev => [...prev, newFolder]);
    return newFolder;
  }, []);

  // Delete file
  const deleteFile = useCallback((filename) => {
    setFileTree(prev => prev.filter(item => item.name !== filename));
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[filename];
      return newFiles;
    });
  }, [setFiles]);

  // Delete folder
  const deleteFolder = useCallback((foldername) => {
    const removeFolder = (tree) => {
      return tree
        .filter(item => item.name !== foldername)
        .map(item => {
          if (item.children) {
            return { ...item, children: removeFolder(item.children) };
          }
          return item;
        });
    };
    setFileTree(prev => removeFolder(prev));
  }, []);

  // Rename file/folder
  const renameItem = useCallback((oldName, newName) => {
    const rename = (tree) => {
      return tree.map(item => {
        if (item.name === oldName) {
          return { ...item, name: newName };
        }
        if (item.children) {
          return { ...item, children: rename(item.children) };
        }
        return item;
      });
    };
    setFileTree(prev => rename(prev));
  }, []);

  // Save file content
  const saveFile = useCallback((filename, content) => {
    // Update file tree
    const updateInTree = (tree) => {
      return tree.map(item => {
        if (item.name === filename) {
          return { ...item, content };
        }
        if (item.children) {
          return { ...item, children: updateInTree(item.children) };
        }
        return item;
      });
    };
    setFileTree(prev => updateInTree(prev));
    
    // Update files object
    setFiles(prev => ({ ...prev, [filename]: content }));
    
    // Update tab if open
    const tab = openTabs.find(t => t.name === filename);
    if (tab) {
      updateTabContent(tab.id, content);
      markTabClean(tab.id);
    }
  }, [setFiles, openTabs, updateTabContent, markTabClean]);

  // Handle folder open (for file picker)
  const handleOpenFolder = useCallback(async () => {
    // Try to use Tauri dialog first
    try {
      const { open } = await import('@tauri-apps/plugin-dialog');
      const selected = await open({
        directory: true,
        multiple: false,
        title: 'Open Folder'
      });
      
      if (selected) {
        setCurrentFolder(selected);
        return selected;
      }
    } catch (e) {
      // Fallback for browser - just set a mock folder
      console.log('Browser mode - using mock folder');
      setCurrentFolder('C:\\Users\\hp\\Desktop\\my-project');
      return 'C:\\Users\\hp\\Desktop\\my-project';
    }
    return null;
  }, [setCurrentFolder]);

  // Get file extension
  const getFileExtension = useCallback((filename) => {
    return filename.split('.').pop().toLowerCase();
  }, []);

  // Check if folder is expanded
  const isFolderExpanded = useCallback((folderPath) => {
    return expandedFolders.includes(folderPath);
  }, [expandedFolders]);

  return {
    // Data
    fileTree,
    currentFolder,
    files,
    
    // Actions
    openFile,
    createFile,
    createFolder,
    deleteFile,
    deleteFolder,
    renameItem,
    saveFile,
    handleOpenFolder,
    toggleFolder,
    
    // Helpers
    getFileIcon,
    getFileExtension,
    findFile,
    isFolderExpanded,
  };
};

export default useFileSystem;
