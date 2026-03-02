import React from 'react';
import { Shield, Zap, Car, Wallet, Layout } from 'lucide-react';

const Renderer = ({ type }) => {
  // Har ID ke liye ek alag design
  const components = {
    'nav-glass': (
      <nav className="w-full p-5 bg-black/40 backdrop-blur-xl border-b border-purple-500/20 flex justify-between items-center text-white">
        <div className="text-xl font-black italic tracking-tighter">KRYNOX</div>
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest opacity-60">
          <span>Infra</span><span>Assets</span><span>Security</span>
        </div>
      </nav>
    ),
    'ride-hail-engine': (
      <div className="p-8 bg-zinc-900 border border-white/5 rounded-3xl my-4 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-600 rounded-xl"><Car size={24} /></div>
          <h3 className="text-xl font-bold">Mobility Engine</h3>
        </div>
        <div className="space-y-3">
          <div className="h-12 bg-white/5 rounded-xl border border-white/10 flex items-center px-4 text-gray-400">Pickup Location...</div>
          <div className="h-12 bg-white/5 rounded-xl border border-white/10 flex items-center px-4 text-gray-400">Drop-off Point...</div>
          <button className="w-full h-12 bg-white text-black font-black rounded-xl uppercase tracking-tighter">Request KRYNOX Drive</button>
        </div>
      </div>
    ),
    'crypto-wallet': (
      <div className="p-10 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 rounded-[2rem] text-center my-4">
        <Wallet className="mx-auto mb-4 text-purple-500" size={40} />
        <h2 className="text-2xl font-bold mb-2 text-white">Secure Gateway</h2>
        <p className="text-gray-500 text-sm mb-6">Connect your vault to begin extraction.</p>
        <button className="px-8 py-3 bg-purple-600 rounded-full font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]">Initialize Web3</button>
      </div>
    )
  };

  return components[type] || (
    <div className="p-6 border border-dashed border-zinc-800 rounded-xl text-zinc-600 text-center">
      Undefined Module: {type}
    </div>
  );
};

export default Renderer;
