import { motion } from 'framer-motion';
import { 
  Menu, Search, User, ShoppingCart, Bell, Home, Settings, ChevronDown, 
  Star, Quote, MapPin, Clock, DollarSign, TrendingUp, Activity, Wallet,
  Bitcoin, LineChart, BarChart3, Send, CreditCard, Shield, Zap, Car,
  Building, Users, FileText, Mail, Phone, Globe, ArrowRight, Play,
  Calendar, MessageSquare, Image, Video, Music, Folder, Cloud, Database,
  Server, Lock, Eye, Download, Upload, PlayCircle, Pause, SkipForward,
  SkipBack, Volume2, VolumeX, Maximize2, Minimize2, RotateCw, RefreshCw
} from 'lucide-react';

// Preview components for each category

// Layout Components
export function GlassNavbar({ variant = 'default' }) {
  return (
    <div className="w-full">
      <nav className="glass bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.1)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="text-white font-semibold">KRYNOX</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {['Products', 'Solutions', 'Pricing', 'Docs'].map(item => (
            <button key={item} className="text-gray-300 hover:text-white transition-colors text-sm">{item}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <Bell className="w-5 h-5 text-gray-400" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600" />
        </div>
      </nav>
    </div>
  );
}

export function HeroSection({ variant = 'default' }) {
  return (
    <div className="w-full py-20 px-6 bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e] flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <span className="inline-block px-4 py-1 rounded-full bg-[rgba(168,85,247,0.2)] text-purple-400 text-sm mb-6 border border-purple-500/30">
          Next Generation Platform
        </span>
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Crypto Empire</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Enterprise-grade tools for decentralized finance. Launch faster, trade smarter.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-semibold">
            Get Started
          </button>
          <button className="px-8 py-3 glass rounded-xl text-white font-semibold border border-gray-700">
            View Demo
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function ServiceGrid({ variant = 'default' }) {
  const services = [
    { icon: Zap, title: 'Instant Trading', desc: 'Lightning fast execution' },
    { icon: Shield, title: 'Bank-Grade Security', desc: 'Your assets are safe' },
    { icon: TrendingUp, title: 'Analytics', desc: 'Real-time insights' },
    { icon: Wallet, title: 'Multi-Wallet', desc: 'Connect multiple wallets' },
  ];
  
  return (
    <div className="w-full py-16 px-6 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl glass border border-[rgba(255,255,255,0.1)] hover:border-purple-500/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center mb-4">
              <service.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialCarousel({ variant = 'default' }) {
  return (
    <div className="w-full py-16 px-6 bg-[#0f0f1a]">
      <div className="max-w-4xl mx-auto text-center">
        <Quote className="w-12 h-12 text-purple-500 mx-auto mb-6" />
        <motion.p 
          key={0}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl text-white mb-8"
        >
          "KRYNOX transformed how we build DeFi products. The tools are incredible."
        </motion.p>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600" />
          <div className="text-left">
            <p className="text-white font-semibold">Alex Chen</p>
            <p className="text-gray-400 text-sm">CEO, CryptoVentures</p>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map(i => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-purple-500' : 'bg-gray-700'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactForm({ variant = 'default' }) {
  return (
    <div className="w-full py-16 px-6 bg-[#0a0a0f]">
      <div className="max-w-xl mx-auto p-8 rounded-2xl glass border border-[rgba(255,255,255,0.1)]">
        <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-black border border-gray-800 text-white focus:border-purple-500 outline-none" />
          <input type="email" placeholder="Email Address" className="w-full p-4 rounded-xl bg-black border border-gray-800 text-white focus:border-purple-500 outline-none" />
          <textarea placeholder="Message" rows={4} className="w-full p-4 rounded-xl bg-black border border-gray-800 text-white focus:border-purple-500 outline-none" />
          <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-semibold">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export function FAQAccordion({ variant = 'default' }) {
  const faqs = [
    { q: 'What is KRYNOX?', a: 'Enterprise DeFi platform' },
    { q: 'How secure is it?', a: 'Bank-grade security' },
    { q: 'What tokens are supported?', a: 'All major tokens' },
  ];
  
  return (
    <div className="w-full py-16 px-6 bg-[#0f0f1a]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl glass border border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{faq.q}</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PremiumFooter({ variant = 'default' }) {
  return (
    <div className="w-full py-16 px-6 bg-[#0a0a0f] border-t border-[rgba(255,255,255,0.1)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <span className="text-white font-semibold">KRYNOX</span>
          </div>
          <p className="text-gray-400 text-sm">Building the future of decentralized finance.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>Features</p>
            <p>Pricing</p>
            <p>API</p>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>About</p>
            <p>Blog</p>
            <p>Careers</p>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>Privacy</p>
            <p>Terms</p>
            <p>Security</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PricingTable({ variant = 'default' }) {
  return (
    <div className="w-full py-16 px-6 bg-[#0f0f1a]">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Starter', 'Pro', 'Enterprise'].map((plan, idx) => (
          <div key={idx} className={`p-6 rounded-2xl border ${idx === 1 ? 'border-purple-500 bg-purple-900/10' : 'border-gray-800 glass'}`}>
            <h3 className="text-white font-semibold mb-2">{plan}</h3>
            <div className="text-3xl font-bold text-white mb-4">
              ${idx === 0 ? '0' : idx === 1 ? '99' : '299'}<span className="text-gray-400 text-sm font-normal">/mo</span>
            </div>
            <button className={`w-full py-3 rounded-xl font-semibold ${idx === 1 ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white' : 'border border-gray-700 text-white'}`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CountdownTimer({ variant = 'default' }) {
  return (
    <div className="w-full py-16 px-6 bg-[#0a0a0f] flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mb-8">ICO Launches In</h2>
      <div className="flex gap-4">
        {['05', '12', '34', '56'].map((num, idx) => (
          <div key={idx} className="p-4 rounded-xl glass border border-purple-500/30 min-w-[80px] text-center">
            <span className="text-3xl font-bold text-white">{num}</span>
            <p className="text-gray-400 text-xs">{['Days', 'Hours', 'Minutes', 'Seconds'][idx]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewsletterSignup({ variant = 'default' }) {
  return (
    <div className="w-full py-16 px-6 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-gray-400 mb-6">Get the latest news and updates delivered to your inbox.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Enter your email" className="flex-1 p-4 rounded-xl bg-black border border-gray-800 text-white focus:border-purple-500 outline-none" />
          <button className="px-6 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

// Crypto Components
export function PriceTicker({ variant = 'default' }) {
  const tokens = [
    { name: 'BTC', price: '67,432', change: '+2.4%', up: true },
    { name: 'ETH', price: '3,521', change: '+1.8%', up: true },
    { name: 'SOL', price: '142.50', change: '-0.5%', up: false },
    { name: 'KRYNOX', price: '2.45', change: '+12.3%', up: true },
  ];
  
  return (
    <div className="w-full py-4 px-6 bg-[#0a0a0f] overflow-x-auto">
      <div className="flex gap-6">
        {tokens.map((token, idx) => (
          <div key={idx} className="flex items-center gap-3 whitespace-nowrap">
            <Bitcoin className="w-5 h-5 text-orange-500" />
            <span className="text-white font-medium">{token.name}</span>
            <span className="text-gray-400">${token.price}</span>
            <span className={token.up ? 'text-green-400' : 'text-red-400'}>{token.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TradingChart({ variant = 'default' }) {
  return (
    <div className="w-full p-6 bg-[#0a0a0f]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold">BTC/USD</h3>
          <p className="text-2xl font-bold text-white">$67,432.50</p>
        </div>
        <div className="flex gap-2">
          {['1H', '1D', '1W', '1M', '1Y'].map((tf, idx) => (
            <button key={tf} className={`px-3 py-1 rounded text-sm ${idx === 1 ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div className="h-48 bg-gradient-to-t from-purple-900/20 to-transparent rounded-xl flex items-end px-4">
        {[40, 55, 45, 70, 60, 80, 65, 90, 75, 85, 95, 88].map((h, i) => (
          <div key={i} className="flex-1 bg-gradient-to-t from-purple-600 to-cyan-500 mx-0.5 rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function WalletBalance({ variant = 'default' }) {
  return (
    <div className="w-full p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-2xl border border-purple-500/30">
      <div className="flex items-center justify-between mb-6">
        <span className="text-gray-400 text-sm">Total Balance</span>
        <Wallet className="w-5 h-5 text-purple-400" />
      </div>
      <p className="text-3xl font-bold text-white mb-2">$124,532.45</p>
      <p className="text-green-400 text-sm mb-6">+$12,453.23 (11.2%)</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">BTC</span>
          <span className="text-white">1.85 BTC</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">ETH</span>
          <span className="text-white">12.4 ETH</span>
        </div>
      </div>
    </div>
  );
}

export function NFTCard({ variant = 'default' }) {
  return (
    <div className="w-full p-4 rounded-xl glass border border-[rgba(255,255,255,0.1)]">
      <div className="aspect-square rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 mb-4 flex items-center justify-center">
        <span className="text-4xl">🎨</span>
      </div>
      <h4 className="text-white font-semibold mb-1">Cosmic Dreams #42</h4>
      <p className="text-gray-400 text-sm mb-3">0.5 ETH</p>
      <button className="w-full py-2 rounded-lg bg-purple-600 text-white text-sm font-medium">
        Buy Now
      </button>
    </div>
  );
}

export function TokenSwap({ variant = 'default' }) {
  return (
    <div className="w-full p-6 bg-[#0a0a0f] rounded-2xl border border-gray-800">
      <h3 className="text-white font-semibold mb-4">Swap Tokens</h3>
      <div className="space-y-3">
        <div className="p-3 rounded-xl bg-black border border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bitcoin className="w-5 h-5 text-orange-500" />
            <span className="text-white">BTC</span>
          </div>
          <input type="text" placeholder="0.00" className="bg-transparent text-white text-right outline-none w-24" />
        </div>
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="p-3 rounded-xl bg-black border border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600" />
            <span className="text-white">ETH</span>
          </div>
          <input type="text" placeholder="0.00" className="bg-transparent text-white text-right outline-none w-24" />
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-semibold">
          Swap
        </button>
      </div>
    </div>
  );
}

export function GasFeeEstimator({ variant = 'default' }) {
  return (
    <div className="w-full p-4 rounded-xl glass border border-[rgba(255,255,255,0.1)]">
      <h4 className="text-white font-semibold mb-3">Gas Fees</h4>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Slow</span>
          <span className="text-white">5 Gwei</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Normal</span>
          <span className="text-white">12 Gwei</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Fast</span>
          <span className="text-purple-400 font-medium">25 Gwei</span>
        </div>
      </div>
    </div>
  );
}

export function PortfolioHeatmap({ variant = 'default' }) {
  const assets = [
    { name: 'BTC', value: 45, color: '#f7931a' },
    { name: 'ETH', value: 30, color: '#627eea' },
    { name: 'SOL', value: 15, color: '#00ffa3' },
    { name: 'USDT', value: 10, color: '#26a17b' },
  ];
  
  return (
    <div className="w-full p-6 bg-[#0a0a0f] rounded-2xl">
      <h4 className="text-white font-semibold mb-4">Portfolio Heatmap</h4>
      <div className="grid grid-cols-4 gap-2 h-32">
        {assets.map((asset, idx) => (
          <div 
            key={idx} 
            className="rounded-lg flex items-end justify-center pb-2"
            style={{ backgroundColor: `${asset.color}40`, gridColumn: `${Math.ceil(asset.value / 20)}span` }}
          >
            <span className="text-white text-xs font-medium">{asset.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mobility Components
export function FleetTrackingMap({ variant = 'default' }) {
  return (
    <div className="w-full h-64 bg-[#0a0a0f] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwIDBoMTB2MTBIMTB6TTAgMTBoMTB2MTBIMHoiIGZpbGw9IiMyMjIyMjEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-8">
          {['🚗', '🚕', '🚙'].map((icon, idx) => (
            <motion.div
              key={idx}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
              className="text-3xl"
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs">
        <span className="text-gray-400">12 Active Drivers</span>
        <span className="text-green-400">● Live</span>
      </div>
    </div>
  );
}

export function FareEstimator({ variant = 'default' }) {
  return (
    <div className="w-full p-6 bg-[#0a0a0f] rounded-2xl">
      <h4 className="text-white font-semibold mb-4">Estimate Your Fare</h4>
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-black border border-gray-800">
          <MapPin className="w-5 h-5 text-purple-500" />
          <input type="text" placeholder="Pickup Location" className="bg-transparent text-white outline-none flex-1" />
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-black border border-gray-800">
          <MapPin className="w-5 h-5 text-cyan-500" />
          <input type="text" placeholder="Drop-off Location" className="bg-transparent text-white outline-none flex-1" />
        </div>
        <div className="flex gap-2">
          {['Economy', 'Comfort', 'Premium'].map((type, idx) => (
            <button key={type} className={`flex-1 py-2 rounded-lg text-sm ${idx === 1 ? 'bg-purple-600 text-white' : 'border border-gray-700 text-gray-400'}`}>
              {type}
            </button>
          ))}
        </div>
        <div className="p-4 rounded-xl glass border border-purple-500/30">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Estimated Fare</span>
            <span className="text-2xl font-bold text-white">$24.50</span>
          </div>
          <p className="text-gray-400 text-xs">~12 min ride</p>
        </div>
      </div>
    </div>
  );
}

// Admin Components
export function MasterDashboard({ variant = 'default' }) {
  const stats = [
    { label: 'Total Users', value: '12,453', change: '+12%' },
    { label: 'Revenue', value: '$84,230', change: '+8%' },
    { label: 'Active Sessions', value: '1,234', change: '+5%' },
    { label: 'Conversion', value: '3.2%', change: '+0.4%' },
  ];
  
  return (
    <div className="w-full p-6 bg-[#0a0a0f]">
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-4 rounded-xl glass border border-[rgba(255,255,255,0.1)]">
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <span className="text-green-400 text-sm">{stat.change}</span>
          </div>
        ))}
      </div>
      <div className="h-48 rounded-xl bg-purple-900/20 flex items-center justify-center">
        <LineChart className="w-12 h-12 text-purple-500" />
      </div>
    </div>
  );
}

export function NotificationCenter({ variant = 'default' }) {
  const notifications = [
    { icon: Wallet, text: 'New wallet connected', time: '2 min ago', type: 'success' },
    { icon: Activity, text: 'High gas fees detected', time: '15 min ago', type: 'warning' },
    { icon: Shield, text: 'Security check passed', time: '1 hour ago', type: 'success' },
  ];
  
  return (
    <div className="w-full p-6 bg-[#0a0a0f] rounded-2xl">
      <h3 className="text-white font-semibold mb-4">Notifications</h3>
      <div className="space-y-3">
        {notifications.map((notif, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-black border border-gray-800">
            <notif.icon className={`w-5 h-5 ${notif.type === 'success' ? 'text-green-400' : 'text-yellow-400'}`} />
            <div className="flex-1">
              <p className="text-white text-sm">{notif.text}</p>
              <p className="text-gray-500 text-xs">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DatabaseVisualizer({ variant = 'default' }) {
  return (
    <div className="w-full p-6 bg-[#0a0a0f] rounded-2xl">
      <h3 className="text-white font-semibold mb-4">Database Schema</h3>
      <div className="space-y-2">
        {['users', 'transactions', 'wallets', 'contracts'].map((table, idx) => (
          <div key={idx} className="flex items-center gap-2 p-2 rounded bg-black border border-gray-800">
            <Database className="w-4 h-4 text-purple-500" />
            <span className="text-white text-sm font-mono">{table}</span>
            <span className="text-gray-500 text-xs ml-auto">{['1.2K', '45K', '890', '12'][idx]} rows</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// AI Components
export function AIChatbot({ variant = 'default' }) {
  return (
    <div className="w-full p-4 rounded-xl glass border border-purple-500/30">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
          <span className="text-white text-xs">AI</span>
        </div>
        <span className="text-white font-medium">KRYNOX Assistant</span>
      </div>
      <div className="h-32 bg-black rounded-lg p-3 mb-3 overflow-y-auto">
        <p className="text-gray-300 text-sm">Hello! How can I help you build today?</p>
      </div>
      <input type="text" placeholder="Ask me anything..." className="w-full p-2 rounded-lg bg-black border border-gray-800 text-white text-sm" />
    </div>
  );
}

export function PredictiveAnalytics({ variant = 'default' }) {
  return (
    <div className="w-full p-6 bg-[#0a0a0f] rounded-2xl">
      <h3 className="text-white font-semibold mb-4">AI Predictions</h3>
      <div className="h-32 flex items-end gap-1 mb-4">
        {[30, 45, 35, 60, 50, 75, 65, 80, 70, 90].map((h, i) => (
          <div key={i} className="flex-1 bg-gradient-to-t from-purple-600 to-cyan-500 rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/30">
        <p className="text-purple-300 text-sm">AI Confidence: <span className="text-white font-bold">87%</span></p>
      </div>
    </div>
  );
}

// Elite Components
export function AICryptoCommander({ variant = 'default' }) {
  return (
    <div className="w-full p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-2xl border border-purple-500/50">
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Zap className="w-8 h-8 text-yellow-400" />
        </motion.div>
        <div>
          <h3 className="text-white font-bold">AI Commander</h3>
          <p className="text-purple-300 text-sm">Auto-Trading Active</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-black/50 text-center">
          <p className="text-green-400 font-bold">+24.5%</p>
          <p className="text-gray-500 text-xs">Today</p>
        </div>
        <div className="p-3 rounded-lg bg-black/50 text-center">
          <p className="text-white font-bold">$124K</p>
          <p className="text-gray-500 text-xs">Volume</p>
        </div>
        <div className="p-3 rounded-lg bg-black/50 text-center">
          <p className="text-purple-400 font-bold">0.02</p>
          <p className="text-gray-500 text-xs">Gas Saved</p>
        </div>
      </div>
      <button className="w-full py-2 bg-gradient-to-r from-yellow-500 to-purple-600 rounded-lg text-white font-semibold">
        Configure Strategy
      </button>
    </div>
  );
}

// Component mapper
export const componentMap = {
  // Basic UI
  navbar: GlassNavbar,
  hero: HeroSection,
  serviceGrid: ServiceGrid,
  testimonialCarousel: TestimonialCarousel,
  contactForm: ContactForm,
  faqAccordion: FAQAccordion,
  footer: PremiumFooter,
  pricingTables: PricingTable,
  countdownTimer: CountdownTimer,
  newsletterSignup: NewsletterSignup,
  
  // Crypto
  priceTickers: PriceTicker,
  tradingViewCharts: TradingChart,
  walletBalance: WalletBalance,
  nftMinting: NFTCard,
  tokenSwap: TokenSwap,
  gasFeeEstimator: GasFeeEstimator,
  portfolioHeatmap: PortfolioHeatmap,
  
  // Mobility
  fleetTracking: FleetTrackingMap,
  fareEstimator: FareEstimator,
  
  // Admin
  masterDashboard: MasterDashboard,
  notificationCenter: NotificationCenter,
  databaseVisualizer: DatabaseVisualizer,
  
  // AI
  aiChatbot: AIChatbot,
  predictiveAnalytics: PredictiveAnalytics,
  
  // Elite
  aiCryptoCommander: AICryptoCommander,
  strategyBuilder: TradingChart,
  riskManagement: Shield,
};
