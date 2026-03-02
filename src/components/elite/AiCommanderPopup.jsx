import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Zap, Shield, TrendingUp, Brain, ChevronRight, Check, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AiCommanderPopup() {
  const { state, dispatch } = useApp();
  const [isAnnual, setIsAnnual] = useState(false);
  
  const handleClose = () => {
    dispatch({ type: 'TOGGLE_COMMANDER_POPUP', payload: {} });
  };
  
  const standardPrice = 500;
  const annualPrice = 300; // Per 15 days - $300/15 days instead of $500/week
  
  const features = [
    { icon: Brain, title: 'AI-Powered Trading', desc: 'Auto-trading bot with predictive algorithms' },
    { icon: TrendingUp, title: 'High-Frequency Strategy', desc: 'Build and backtest custom trading strategies' },
    { icon: Shield, title: 'Risk Management', desc: 'Automated risk controls and portfolio protection' },
    { icon: Zap, title: 'Priority Support', desc: '24/7 elite support with dedicated account manager' },
    { icon: Sparkles, title: 'Early Access', desc: 'Access to new features before public release' },
  ];
  
  return (
    <AnimatePresence>
      {state.isCommanderPopupOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#12121a] to-[#0a0a0f] border border-[#7c3aed]/30"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#7c3aed]/20 blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#00d4aa]/10 blur-3xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="relative p-8 lg:p-12">
              {/* Header */}
              <div className="text-center mb-10">
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed]/30 mb-6"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Crown className="w-4 h-4 text-[#7c3aed]" />
                  <span className="text-sm text-[#7c3aed] font-medium">Elite Tier</span>
                </motion.div>
                
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold text-white mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  AI Crypto Commander
                </motion.h1>
                
                <motion.p 
                  className="text-lg text-[#a1a1aa] max-w-2xl mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  SYSTEM ALERT: CRITICAL MASS REACHED.
                  <br />
                  ARCANE has detected an enterprise-grade infrastructure. You have moved beyond a simple builder. The KRYNOX AI COMMANDER is now online. Welcome to the elite tier of automated intelligence.
                </motion.p>
              </div>
              
              {/* Features Grid */}
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-2xl glass border border-[rgba(255,255,255,0.1)] hover:border-[#7c3aed]/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 flex items-center justify-center mb-3">
                      <feature.icon className="w-5 h-5 text-[#7c3aed]" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-[#71717a]">{feature.desc}</p>
                  </div>
                ))}
              </motion.div>
              
              {/* Pricing */}
              <motion.div 
                className="max-w-md mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Toggle */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-[#71717a]'}`}>Weekly</span>
                  <button
                    onClick={() => setIsAnnual(!isAnnual)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      isAnnual ? 'bg-[#7c3aed]' : 'bg-[#27272a]'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 w-5 h-5 rounded-full bg-white"
                      animate={{ left: isAnnual ? '30px' : '4px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                  <span className={`text-sm ${isAnnual ? 'text-white' : 'text-[#71717a]'}`}>
                    Annual Loyalty
                    <span className="ml-1 text-[#00d4aa] text-xs">(Save 60%)</span>
                  </span>
                </div>
                
                {/* Price Display */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-white">${isAnnual ? annualPrice : standardPrice}</span>
                    <span className="text-[#71717a]">/{isAnnual ? '15 days' : 'week'}</span>
                  </div>
                  {isAnnual && (
                    <p className="text-sm text-[#00d4aa] mt-2">
                      Equivalent to $60/week (billed monthly)
                    </p>
                  )}
                </div>
                
                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#00d4aa] text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Upgrade to Elite
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
                
                {/* Money-back guarantee */}
                <p className="text-center text-xs text-[#71717a] mt-4">
                  30-day money-back guarantee • Cancel anytime
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
