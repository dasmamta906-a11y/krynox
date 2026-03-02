import React from 'react';
import { ShieldCheck, Zap, Download, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const InvoiceModal = () => {
  const { state, dispatch } = useApp();
  
  const handleClose = () => {
    dispatch({ type: 'TOGGLE_INVOICE_MODAL', payload: {} });
  };
  
  if (!state.isInvoiceModalOpen) return null;

  // Group components by category
  const groupedComponents = state.addedComponents.reduce((acc, comp) => {
    if (!acc[comp.category]) {
      acc[comp.category] = [];
    }
    acc[comp.category].push(comp);
    return acc;
  }, {});
  
  // Flatten all components for the invoice list
  const selectedTools = Object.values(groupedComponents).flat();

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      >
        {/* Modal Container */}
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl border border-purple-500/30 bg-[#0a0a0a] p-8 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.2)]"
        >
          {/* Close Button */}
          <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter text-white uppercase italic">KRYNOX <span className="text-purple-500">Invoice</span></h2>
            <p className="text-gray-400 text-sm mt-2 font-mono">Infrastructure Verification: SUCCESSFUL</p>
          </div>

          {/* Tools Breakdown */}
          <div className="max-h-64 overflow-y-auto mb-6 pr-2 custom-scrollbar">
            <table className="w-full text-left">
              <thead className="border-b border-gray-800 text-purple-400 text-xs uppercase tracking-widest">
                <tr>
                  <th className="py-3">Module Name</th>
                  <th className="py-3 text-right">Hidden Asset Value</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 divide-y divide-gray-900 font-mono text-sm">
                {selectedTools.map((tool, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 flex items-center gap-2">
                      <Zap size={14} className="text-purple-500" /> {tool.name}
                    </td>
                    <td className="py-4 text-right text-white">${tool.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total & Action */}
          <div className="border-t border-purple-500/50 pt-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest">Grand Total Assets</p>
                <h3 className="text-5xl font-black text-white tracking-tighter">${state.billTotal.toLocaleString()}</h3>
              </div>
              <div className="text-right">
                <span className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded">
                  <ShieldCheck size={14} /> SECURITY VERIFIED
                </span>
              </div>
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/20 uppercase tracking-widest">
              <Download size={20} /> Pay & Download Source Code
            </button>
            
            <p className="text-center text-gray-600 text-[10px] mt-4 uppercase">
              Access to the KRYNOX source files is granted only after successful transaction.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InvoiceModal;
