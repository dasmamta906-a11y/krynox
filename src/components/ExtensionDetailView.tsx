import React from 'react';
import { Download, Globe, ShieldCheck, Star, X } from 'lucide-react';

interface ExtensionDetailViewProps {
  extension: {
    id?: string;
    name?: string;
    publisher?: string;
    description?: string;
    icon?: string;
    version?: string;
    downloads?: number;
    rating?: number;
    publishedDate?: string;
    identifier?: string;
    license?: string;
    repository?: string;
    issues?: string;
    categories?: string[];
  } | null;
  onClose?: () => void;
}

const ExtensionDetailView: React.FC<ExtensionDetailViewProps> = ({ extension, onClose }) => {
  // Agar koi extension select nahi hai toh placeholder dikhayein
  if (!extension) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#858585] bg-[#1e1e1e]">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-30">📦</div>
          <p className="text-sm">Select an extension to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#1e1e1e] text-[#cccccc] overflow-y-auto custom-scrollbar">
      {/* --- HEADER SECTION (Hero Area) --- */}
      <div className="p-6 flex gap-5 items-start border-b border-[#2b2b2b] bg-[#252526]">
        <img 
          src={extension.icon || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23333" width="100" height="100" rx="10"/><text x="50" y="60" text-anchor="middle" fill="%23666" font-size="40">📦</text></svg>'} 
          className="w-24 h-24 rounded-lg shadow-2xl bg-[#333] object-contain" 
          alt="icon"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23333" width="100" height="100" rx="10"/><text x="50" y="60" text-anchor="middle" fill="%23666" font-size="40">📦</text></svg>';
          }}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-white">{extension.name || 'Extension Name'}</h1>
                {onClose && (
                  <button 
                    onClick={onClose}
                    className="ml-auto p-1 hover:bg-[#3c3c3c] rounded text-[#858585] hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <p className="text-[#3794ff] text-sm font-medium hover:underline cursor-pointer mb-2">
                {extension.publisher || 'publisher'}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="bg-[#007acc] hover:bg-[#0062a3] text-white px-6 py-1.5 text-sm font-semibold rounded-sm transition-all">
                Install
              </button>
              <div className="flex items-center gap-1 text-[#e2c08d] text-xs">
                <Star size={12} fill="#e2c08d" /> 
                <Star size={12} fill="#e2c08d" /> 
                <Star size={12} fill="#e2c08d" />
                <Star size={12} fill="#e2c08d" />
                <Star size={12} fill="#e2c08d" />
                <span className="ml-1 text-gray-400">({extension.rating || 0})</span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm max-w-2xl mb-3">
            {extension.description || 'No description available for this extension.'}
          </p>
          <div className="flex gap-4 text-[11px] text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <Download size={11}/> {extension.downloads?.toLocaleString() || '0'}
            </span>
            <span className="flex items-center gap-1">
              <Globe size={11}/> v{extension.version || '1.0.0'}
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={11}/> Verified
            </span>
          </div>
        </div>
      </div>

      {/* --- BODY SECTION (Two-Column Layout) --- */}
      <div className="flex p-6 gap-8 max-w-6xl mx-auto">
        
        {/* LEFT COLUMN: README / Description */}
        <div className="flex-[3]">
          <div className="flex gap-6 border-b border-[#333] mb-4 pb-2 text-xs font-bold uppercase tracking-wider">
            <span className="text-white border-b-2 border-[#007acc] pb-2 cursor-pointer">Details</span>
            <span className="text-gray-500 hover:text-gray-300 cursor-pointer">Feature Contributions</span>
            <span className="text-gray-500 hover:text-gray-300 cursor-pointer">Changelog</span>
          </div>
          
          <h2 className="text-lg text-white mt-0 mb-3">{extension.name}</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {extension.description || 'This extension provides additional functionality.'}
          </p>
          
          <h3 className="text-base text-white mb-2">Installation</h3>
          <pre className="bg-[#121212] p-3 rounded border border-[#333] text-[#d4d4d4] text-xs font-mono overflow-x-auto">
            ext install {extension.publisher}.{extension.name?.toLowerCase().replace(/\s+/g, '-')}
          </pre>
        </div>

        {/* RIGHT COLUMN: Metadata Sidebar */}
        <div className="flex-1 border-l border-[#2b2b2b] pl-6 space-y-5 text-xs">
          <div>
            <h4 className="text-white font-bold mb-2 text-xs uppercase opacity-70">Marketplace Info</h4>
            <div className="space-y-2">
              <p>
                <span className="text-gray-500 font-bold">Identifier:</span>{' '}
                <span className="ml-1 break-all">{extension.identifier || extension.id || 'unknown'}</span>
              </p>
              <p>
                <span className="text-gray-500 font-bold">Version:</span>{' '}
                <span className="ml-1">{extension.version || '1.0.0'}</span>
              </p>
              <p>
                <span className="text-gray-500 font-bold">Published:</span>{' '}
                <span className="ml-1">{extension.publishedDate || 'N/A'}</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2 text-xs uppercase opacity-70">Categories</h4>
            <div className="flex flex-wrap gap-1.5">
              {extension.categories?.length ? (
                extension.categories.map((cat, idx) => (
                  <span key={idx} className="bg-[#313132] px-2 py-0.5 rounded-full text-[10px]">
                    {cat}
                  </span>
                ))
              ) : (
                <span className="bg-[#313132] px-2 py-0.5 rounded-full text-[10px]">Other</span>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2 text-xs uppercase opacity-70">Resources</h4>
            <ul className="text-[#3794ff] space-y-1 text-xs">
              {extension.issues && (
                <li className="hover:underline cursor-pointer">Issues</li>
              )}
              {extension.repository && (
                <li className="hover:underline cursor-pointer">Repository</li>
              )}
              <li className="hover:underline cursor-pointer">License</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionDetailView;
