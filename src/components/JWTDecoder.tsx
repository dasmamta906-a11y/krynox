import React, { useState } from 'react';
import { Key, X, Copy, Check, AlertCircle, CheckCircle } from 'lucide-react';

const sampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export default function JWTDecoder({ onClose }) {
  const [token, setToken] = useState(sampleJWT);
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState({ header: false, payload: false });

  const decodeJWT = () => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        setError('Invalid JWT format');
        setDecoded(null);
        return;
      }
      
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      
      setDecoded({ header, payload });
      setError('');
    } catch (e) {
      setError('Failed to decode JWT');
      setDecoded(null);
    }
  };

  const copySection = (section: 'header' | 'payload') => {
    if (decoded) {
      navigator.clipboard.writeText(JSON.stringify(decoded[section], null, 2));
      setCopied({ ...copied, [section]: true });
      setTimeout(() => setCopied({ ...copied, [section]: false }), 2000);
    }
  };

  const isExpired = decoded?.payload?.exp && decoded.payload.exp * 1000 < Date.now();
  const expDate = decoded?.payload?.exp ? new Date(decoded.payload.exp * 1000).toLocaleString() : null;

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f] border-l border-rose-500/20 w-[600px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-rose-500/20">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-rose-500" />
          <span className="text-white font-semibold">JWT Decoder</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="p-3 border-b border-rose-500/20">
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          onBlur={decodeJWT}
          placeholder="Paste JWT token here..."
          className="w-full h-20 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 text-sm font-mono resize-none"
        />
        {error && (
          <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
      </div>

      {decoded && (
        <>
          <div className="flex-1 overflow-auto p-3">
            {/* Expiry Status */}
            {expDate && (
              <div className={`flex items-center gap-2 p-3 rounded-lg mb-3 ${
                isExpired ? 'bg-red-900/20 border border-red-500/30' : 'bg-green-900/20 border border-green-500/30'
              }`}>
                {isExpired ? (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                <div>
                  <div className={`text-sm ${isExpired ? 'text-red-400' : 'text-green-400'}`}>
                    {isExpired ? 'Token Expired' : 'Token Valid'}
                  </div>
                  <div className="text-gray-400 text-xs">Expires: {expDate}</div>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-rose-400 text-sm font-medium">Header</span>
                <button 
                  onClick={() => copySection('header')}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  {copied.header ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
              <pre className="bg-gray-800 p-3 rounded-lg text-xs font-mono text-rose-300 overflow-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-400 text-sm font-medium">Payload</span>
                <button 
                  onClick={() => copySection('payload')}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  {copied.payload ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
              <pre className="bg-gray-800 p-3 rounded-lg text-xs font-mono text-amber-300 overflow-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>
        </>
      )}

      <div className="p-3 border-t border-rose-500/20">
        <button
          onClick={decodeJWT}
          className="w-full px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded text-white text-sm"
        >
          Decode Token
        </button>
      </div>
    </div>
  );
}
