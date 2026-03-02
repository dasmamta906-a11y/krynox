// Open VSX API Service for Krynox Extension Marketplace
// Uses Open VSX Registry API to fetch real extension data

const OPEN_VSX_API_BASE = 'https://open-vsx.org/api';

export interface OpenVSXExtension {
  id: string;
  name: string;
  namespace: string;
  version: string;
  description: string;
  displayName?: string;
  publisher: string;
  icon?: string;
  downloadCount: number;
  rating?: number;
  tags: string[];
  license?: string;
  homepage?: string;
  repository?: string;
  created: string;
  updated: string;
}

export interface OpenVSXSearchResult {
  extensions: OpenVSXExtension[];
  count: number;
}

export interface OpenVSXExtensionDetail extends OpenVSXExtension {
  readme?: string;
  metadata?: {
    engineVersion?: string;
    runtime?: string;
  };
  files?: {
    download: string;
    readme?: string;
    icon?: string;
  };
}

// Search extensions from Open VSX
export async function searchExtensions(query: string, page = 0, size = 20): Promise<OpenVSXSearchResult> {
  try {
    const response = await fetch(
      `${OPEN_VSX_API_BASE}/-/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}&sortField=downloadCount&sortOrder=desc`
    );
    
    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching extensions:', error);
    return { extensions: [], count: 0 };
  }
}

// Get detailed information about an extension
export async function getExtensionDetail(namespace: string, name: string): Promise<OpenVSXExtensionDetail | null> {
  try {
    const response = await fetch(`${OPEN_VSX_API_BASE}/${namespace}/${name}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get extension: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting extension detail:', error);
    return null;
  }
}

// Get all versions of an extension
export async function getExtensionVersions(namespace: string, name: string): Promise<string[]> {
  try {
    const response = await fetch(`${OPEN_VSX_API_BASE}/${namespace}/${name}/versions`);
    
    if (!response.ok) {
      throw new Error(`Failed to get versions: ${response.status}`);
    }
    
    const data = await response.json();
    return data.map((v: any) => v.version);
  } catch (error) {
    console.error('Error getting extension versions:', error);
    return [];
  }
}

// Get extension's README content
export async function getExtensionReadme(namespace: string, name: string, version: string): Promise<string | null> {
  try {
    const response = await fetch(`${OPEN_VSX_API_BASE}/${namespace}/${name}/${version}/file/README.md`);
    
    if (!response.ok) {
      return null;
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error getting README:', error);
    return null;
  }
}

// Get popular/trending extensions
export async function getPopularExtensions(limit = 10): Promise<OpenVSXExtension[]> {
  const result = await searchExtensions('', 0, limit);
  return result.extensions;
}

// Get extensions by publisher
export async function getExtensionsByPublisher(publisher: string): Promise<OpenVSXExtension[]> {
  const result = await searchExtensions(`publisher:${publisher}`, 0, 20);
  return result.extensions;
}

// Download extension (returns the download URL)
export function getExtensionDownloadUrl(namespace: string, name: string, version: string): string {
  return `${OPEN_VSX_API_BASE}/${namespace}/${name}/${version}/file/${name}-${version}.vsix`;
}

// Format download count for display
export function formatDownloadCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

// Category/Tag-based search
export const POPULAR_TAGS = [
  'Programming Languages',
  'Linting',
  'Debugging',
  'IntelliSense',
  'Snippets',
  'Formatter',
  'Theme',
  'Language Support',
  'Web Development',
  'Containers',
  'Machine Learning',
  'Data Science',
  'Git',
  'Security',
  'Testing'
];
