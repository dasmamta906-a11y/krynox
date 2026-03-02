// Open VSX API Service
// Fetches extension details from open-vsx.org

export interface VSXExtension {
  extensionId: string;
  name: string;
  namespace: string;
  version: string;
  description: string;
  author: string;
  downloadCount: number;
  averageRating: number | null;
  tags: string[];
  categories: string[];
  iconUrl: string | null;
  repositoryUrl: string | null;
  homepageUrl: string | null;
  licenseUrl: string | null;
  publishedDate: string;
  lastUpdated: string;
}

export interface VSXSearchResult {
  extensions: VSXExtension[];
  count: number;
}

// Fetch extension details by ID
export async function getExtensionDetails(extensionId: string): Promise<VSXExtension | null> {
  try {
    // Extension ID format: namespace.name
    const [namespace, name] = extensionId.split('.');
    
    if (!namespace || !name) {
      console.error('Invalid extension ID format:', extensionId);
      return null;
    }

    const response = await fetch(
      `https://open-vsx.org/api/${namespace}/${name}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch extension:', response.statusText);
      return null;
    }

    const data = await response.json();

    return {
      extensionId: `${data.namespace}.${data.name}`,
      name: data.displayName || data.name,
      namespace: data.namespace,
      version: data.version,
      description: data.description,
      author: data.author?.name || 'Unknown',
      downloadCount: data.downloadCount || 0,
      averageRating: data.averageRating || null,
      tags: data.tags || [],
      categories: data.categories || [],
      iconUrl: data.iconUrl || null,
      repositoryUrl: data.repositoryUrl || null,
      homepageUrl: data.homepageUrl || null,
      licenseUrl: data.licenseUrl || null,
      publishedDate: data.publishedDate,
      lastUpdated: data.lastUpdated,
    };
  } catch (error) {
    console.error('Error fetching extension details:', error);
    return null;
  }
}

// Search extensions in VSX
export async function searchExtensions(
  query: string,
  searchCategory?: string,
  page: number = 0,
  size: number = 20
): Promise<VSXSearchResult> {
  try {
    const params = new URLSearchParams({
      query: query,
      page: page.toString(),
      size: size.toString(),
    });

    if (searchCategory) {
      params.append('category', searchCategory);
    }

    const response = await fetch(
      `https://open-vsx.org/search?${params.toString()}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Search failed:', response.statusText);
      return { extensions: [], count: 0 };
    }

    const data = await response.json();

    const extensions: VSXExtension[] = (data.extensions || []).map((ext: any) => ({
      extensionId: `${ext.namespace}.${ext.name}`,
      name: ext.displayName || ext.name,
      namespace: ext.namespace,
      version: ext.version,
      description: ext.description,
      author: ext.author?.name || 'Unknown',
      downloadCount: ext.downloadCount || 0,
      averageRating: ext.averageRating || null,
      tags: ext.tags || [],
      categories: ext.categories || [],
      iconUrl: ext.iconUrl || null,
      repositoryUrl: ext.repositoryUrl || null,
      homepageUrl: ext.homepageUrl || null,
      licenseUrl: ext.licenseUrl || null,
      publishedDate: ext.publishedDate,
      lastUpdated: ext.lastUpdated,
    }));

    return {
      extensions,
      count: data.count || extensions.length,
    };
  } catch (error) {
    console.error('Error searching extensions:', error);
    return { extensions: [], count: 0 };
  }
}

// Get popular/trending extensions
export async function getPopularExtensions(page: number = 0, size: number = 20): Promise<VSXSearchResult> {
  return searchExtensions('', '', page, size);
}

// Format download count
export function formatDownloadCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
