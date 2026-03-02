import React, { useState } from 'react';

interface LicensePanelProps {
  onLicenseValid: () => void;
  currentLicense?: string;
}

export default function LicensePanel({ onLicenseValid, currentLicense }: LicensePanelProps) {
  const [licenseKey, setLicenseKey] = useState(currentLicense || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate a valid demo key for testing
  const validDemoKeys = [
    'KRYNOX-2024-PRO',
    'KRYNOX-2024-ENTERPRISE',
    'KRYNOX-FREE-TRIAL',
    'DEMO-KEY-12345'
  ];

  const validateLicense = async () => {
    setError('');
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const normalizedKey = licenseKey.trim().toUpperCase();

    // Check if key matches valid demo keys
    if (validDemoKeys.includes(normalizedKey)) {
      localStorage.setItem('krynox_license_key', normalizedKey);
      localStorage.setItem('krynox_license_valid', 'true');
      onLicenseValid();
    } else if (normalizedKey.length === 0) {
      setError('Please enter a license key');
    } else if (normalizedKey.length < 10) {
      setError('License key is too short');
    } else {
      setError('Invalid license key. Use demo key: KRYNOX-2024-PRO');
    }

    setLoading(false);
  };

  const clearLicense = () => {
    localStorage.removeItem('krynox_license_key');
    localStorage.removeItem('krynox_license_valid');
    setLicenseKey('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#1e1e1e] p-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Krynox IDE</h1>
          <p className="text-[#858585]">Professional Code Editor</p>
        </div>

        {/* License Panel */}
        <div className="bg-[#252526] rounded-lg p-6 border border-[#3c3c3c]">
          <h2 className="text-lg font-semibold text-white mb-4">License Activation</h2>
          
          {currentLicense ? (
            // Already licensed
            <div>
              <div className="bg-[#1e3a2f] border border-[#10b981] rounded p-4 mb-4">
                <div className="flex items-center gap-2 text-[#10b981] mb-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="font-semibold">License Active</span>
                </div>
                <p className="text-[#858585] text-sm">Key: {currentLicense}</p>
              </div>
              <button
                onClick={clearLicense}
                className="w-full py-2 px-4 bg-[#3c3c3c] hover:bg-[#4a4a4a] text-white rounded transition-colors"
              >
                Deactivate License
              </button>
            </div>
          ) : (
            // Not licensed - enter key
            <div>
              <div className="mb-4">
                <label className="block text-[#cccccc] text-sm mb-2">License Key</label>
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="Enter your license key"
                  className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#3c3c3c] rounded text-white placeholder-[#6e7681] focus:outline-none focus:border-[#007acc] font-mono"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-[#3a1a1a] border border-[#ef4444] rounded text-[#ef4444] text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={validateLicense}
                disabled={loading}
                className="w-full py-3 px-4 bg-[#007acc] hover:bg-[#005a9e] text-white rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Validating...
                  </span>
                ) : (
                  'Activate License'
                )}
              </button>

              {/* Demo Keys */}
              <div className="mt-6 pt-6 border-t border-[#3c3c3c]">
                <p className="text-[#858585] text-xs mb-3">Demo Keys (for testing):</p>
                <div className="flex flex-col gap-2">
                  {validDemoKeys.map((key) => (
                    <button
                      key={key}
                      onClick={() => setLicenseKey(key)}
                      className="text-left px-3 py-2 bg-[#1e1e1e] hover:bg-[#2d2d2d] rounded text-[#007acc] text-sm font-mono transition-colors"
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Info */}
        <div className="mt-6 text-center">
          <p className="text-[#858585] text-sm">
            Don't have a license?{' '}
            <a href="#" className="text-[#007acc] hover:underline">View Pricing</a>
          </p>
        </div>
      </div>
    </div>
  );
}
