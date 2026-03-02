import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, X, Zap, Shield, Check, Info } from 'lucide-react';

export default function PricingView({ onClose }) {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const plans = [
    {
      id: 'standard',
      name: 'Standard Intelligence',
      price: 500,
      period: '/week',
      description: 'Perfect for getting started with AI trading',
      features: [
        'AI Trading Bot Basic',
        'Portfolio Tracking',
        'Market Analysis',
        'Email Support',
        '5 Trading Strategies'
      ],
      highlighted: false
    },
    {
      id: 'pro',
      name: 'Loyalty Protocol',
      price: 300,
      period: '/15 days',
      description: 'Best value for serious traders',
      features: [
        'Everything in Standard',
        'Advanced Trading Strategies',
        'Priority Support',
        'Unlimited Strategies',
        'API Access',
        'Custom Indicators'
      ],
      highlighted: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl glass"
      >
        {/* Header */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Subscription Plans</h2>
              <p className="text-sm text-[#a1a1aa]">Unlock the AI Crypto Commander</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[rgba(255,255,255,0.1)]">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Annual Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-[#71717a]'}`}>Weekly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? 'bg-[#a855f7]' : 'bg-[#27272a]'
              }`}
            >
              <motion.div
                className="absolute top-1 w-5 h-5 rounded-full bg-white"
                animate={{ left: isAnnual ? '30px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-[#71717a]'}`}>
              1-Year Loyalty
              <span className="ml-1 text-[#10b981] text-xs">(Save 60%)</span>
            </span>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl ${
                  plan.highlighted 
                    ? 'bg-gradient-to-br from-[#a855f7]/20 to-[#7c3aed]/20 border-2 border-[#a855f7]' 
                    : 'glass'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#a855f7] rounded-full text-xs font-bold text-white">
                    BEST VALUE
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black text-white">${isAnnual && plan.id === 'pro' ? plan.price : plan.price}</span>
                    <span className="text-[#71717a]">{plan.period}</span>
                  </div>
                  {isAnnual && plan.id === 'pro' && (
                    <p className="text-sm text-[#10b981] mt-2">Equivalent to $60/week (billed monthly)</p>
                  )}
                  <p className="text-sm text-[#71717a] mt-2">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                      <Check className="w-5 h-5 text-[#a855f7] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-xl font-bold transition-colors ${
                  plan.highlighted 
                    ? 'bg-[#a855f7] hover:bg-[#9333ea] text-white' 
                    : 'glass hover:bg-[rgba(255,255,255,0.1)] text-white'
                }`}>
                  Subscribe Now
                </button>
              </motion.div>
            ))}
          </div>
          
          {/* Note */}
          <div className="mt-8 p-4 rounded-xl glass border border-[#71717a]/20 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#71717a] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-[#71717a]">
              <p className="font-medium text-white mb-1">Note</p>
              <p>Project-specific infrastructure costs are calculated at launch. The tools and components you add to your canvas will be included in your final invoice. The AI Crypto Commander subscription is billed separately.</p>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl glass text-center">
              <Zap className="w-8 h-8 text-[#a855f7] mx-auto mb-2" />
              <h4 className="text-white font-semibold">Lightning Fast</h4>
              <p className="text-xs text-[#71717a] mt-1">Real-time execution</p>
            </div>
            <div className="p-4 rounded-xl glass text-center">
              <Shield className="w-8 h-8 text-[#a855f7] mx-auto mb-2" />
              <h4 className="text-white font-semibold">Secure</h4>
              <p className="text-xs text-[#71717a] mt-1">Bank-grade encryption</p>
            </div>
            <div className="p-4 rounded-xl glass text-center">
              <Crown className="w-8 h-8 text-[#a855f7] mx-auto mb-2" />
              <h4 className="text-white font-semibold">Elite Support</h4>
              <p className="text-xs text-[#71717a] mt-1">24/7 priority access</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
