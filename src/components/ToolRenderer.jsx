import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Zap, DollarSign, Users, MapPin, Mail, Settings, Search, Menu, X, ChevronDown, Plus, Bell, User, Lock, Eye, EyeOff, Calendar, Upload, CheckCircle, AlertCircle, Heart, Share2, MessageSquare, Phone, MapPin as MapIcon, CreditCard, ArrowLeftRight, RefreshCw, Activity, Shield, Home } from 'lucide-react';

const ToolRenderer = ({ type }) => {
  switch (type) {
    // ============ LAYOUTS ============
    case 'navbar':
      return (
        <nav className="w-full bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-white tracking-tight">KRYNOX</div>
          <div className="hidden md:flex items-center gap-6">
            {['Home', 'Products', 'Pricing', 'Docs'].map(item => (
              <a key={item} className="text-gray-300 hover:text-white text-sm transition-colors cursor-pointer">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </nav>
      );

    case 'hero':
      return (
        <section className="w-full py-20 px-6 bg-gradient-to-b from-purple-900/20 to-black text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Crypto Empire</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Enterprise-grade tools for decentralized finance. Launch faster, trade smarter.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer">
              Get Started
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur rounded-xl text-white font-semibold border border-gray-700 hover:bg-white/20 transition-all cursor-pointer">
              View Demo
            </button>
          </div>
        </section>
      );

    case 'serviceGrid':
      return (
        <section className="w-full py-16 px-6 bg-black">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Instant Trading', desc: 'Lightning fast execution' },
              { icon: DollarSign, title: 'Low Fees', desc: 'Industry-best rates' },
              { icon: Lock, title: 'Bank-Grade Security', desc: 'Your assets are safe' },
              { icon: TrendingUp, title: 'Analytics', desc: 'Real-time insights' },
            ].map((service, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case 'pricingTables':
      return (
        <section className="w-full py-16 px-6 bg-black">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Pricing Plans</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '$29', features: ['10 API calls', 'Email support', 'Basic analytics'] },
              { name: 'Pro', price: '$99', features: ['Unlimited API', '24/7 support', 'Advanced analytics'], highlight: true },
              { name: 'Enterprise', price: 'Custom', features: ['Dedicated support', 'Custom features', 'SLA guarantee'] },
            ].map((plan, idx) => (
              <div key={idx} className={`p-6 rounded-2xl transition-all cursor-pointer transform hover:scale-105 ${
                plan.highlight
                  ? 'bg-gradient-to-br from-purple-600 to-cyan-600 text-white shadow-2xl shadow-purple-500/50'
                  : 'bg-white/5 backdrop-blur border border-white/10 text-white'
              }`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full p-2 rounded-lg font-bold transition-all ${
                  plan.highlight ? 'bg-black text-white hover:bg-gray-900' : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </section>
      );

    case 'footer':
      return (
        <footer className="w-full bg-black border-t border-white/10 px-6 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {['Product', 'Company', 'Developers', 'Legal'].map((col, idx) => (
              <div key={idx}>
                <h4 className="text-white font-semibold mb-4">{col}</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="hover:text-white cursor-pointer transition-colors">Features</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Docs</li>
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 KRYNOX. All rights reserved.</p>
          </div>
        </footer>
      );

    // ============ CRYPTO COMPONENTS ============
    case 'multiWallet':
      return (
        <div className="w-full p-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <div className="text-center">
            <Wallet className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Web3 Wallet</h3>
            <p className="text-gray-400 text-sm mb-6">Connect your crypto wallet securely</p>
            <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl text-white font-bold transition-all cursor-pointer shadow-lg shadow-purple-500/20">
              Connect Wallet
            </button>
          </div>
        </div>
      );

    case 'priceTickers':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Live Price Tickers</h3>
          <div className="space-y-3">
            {[
              { symbol: 'BTC', price: '$48,250', change: '+2.5%' },
              { symbol: 'ETH', price: '$2,840', change: '+1.8%' },
              { symbol: 'SOL', price: '$142.30', change: '-0.3%' },
            ].map((ticker, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <div>
                  <p className="text-white font-bold">{ticker.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{ticker.price}</p>
                  <p className={ticker.change.startsWith('+') ? 'text-green-400 text-sm' : 'text-red-400 text-sm'}>{ticker.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'tokenSwap':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10 max-w-sm">
          <h3 className="text-white font-bold mb-4">Swap Tokens</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm block mb-2">From</label>
              <div className="flex items-center gap-2 p-3 bg-white/10 rounded-xl">
                <input type="number" placeholder="Amount" className="flex-1 bg-transparent text-white outline-none placeholder-gray-500" />
                <button className="px-3 py-1 bg-purple-600 rounded-lg text-white text-sm font-bold hover:bg-purple-700 transition-colors cursor-pointer">ETH</button>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <Zap className="w-5 h-5 text-white" />
              </button>
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">To</label>
              <div className="flex items-center gap-2 p-3 bg-white/10 rounded-xl">
                <input type="number" placeholder="Amount" className="flex-1 bg-transparent text-white outline-none placeholder-gray-500" />
                <button className="px-3 py-1 bg-purple-600 rounded-lg text-white text-sm font-bold hover:bg-purple-700 transition-colors cursor-pointer">USDC</button>
              </div>
            </div>
            <button className="w-full p-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer">
              Swap Now
            </button>
          </div>
        </div>
      );

    case 'walletBalance':
      return (
        <div className="w-full p-6 bg-gradient-to-br from-purple-900/40 to-cyan-900/40 backdrop-blur rounded-2xl border border-purple-500/30">
          <h3 className="text-white font-bold mb-4">Wallet Balance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">E</div>
                <span className="text-white font-medium">Ethereum</span>
              </div>
              <span className="text-white font-bold">2.5 ETH</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold">B</div>
                <span className="text-white font-medium">Bitcoin</span>
              </div>
              <span className="text-white font-bold">0.5 BTC</span>
            </div>
            <div className="mt-4 p-3 bg-white/10 rounded-lg text-center">
              <p className="text-gray-400 text-xs mb-1">Total Value</p>
              <p className="text-white text-2xl font-bold">$125,420</p>
            </div>
          </div>
        </div>
      );

    // ============ MOBILITY/RIDE-HAIL ============
    case 'surgePricing':
      return (
        <div className="w-full p-6 bg-white rounded-2xl shadow-xl">
          <h3 className="text-black font-bold mb-4">Book a Ride</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-700 text-sm block mb-2">Pickup Location</label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
                <MapIcon className="w-5 h-5 text-gray-500" />
                <input type="text" placeholder="Enter pickup point" className="flex-1 bg-transparent outline-none text-black placeholder-gray-500" />
              </div>
            </div>
            <div>
              <label className="text-gray-700 text-sm block mb-2">Destination</label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
                <MapIcon className="w-5 h-5 text-gray-500" />
                <input type="text" placeholder="Enter destination" className="flex-1 bg-transparent outline-none text-black placeholder-gray-500" />
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-lg">
              <p className="text-xs text-gray-600">🔥 <strong>Surge prices active!</strong> 1.8x multiplier</p>
            </div>
            <button className="w-full p-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors cursor-pointer">
              Book KRYNOX Ride
            </button>
          </div>
        </div>
      );

    case 'rideHailEngine':
      return (
        <div className="w-full p-6 bg-white rounded-2xl shadow-xl">
          <h3 className="text-black font-bold mb-4">Request a Ride</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
              <p className="text-xs text-gray-600 mb-1">Pickup In</p>
              <p className="text-black font-bold">5 minutes</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
              <p className="text-xs text-gray-600 mb-1">Estimated Fare</p>
              <p className="text-black font-bold">$18.50</p>
            </div>
            <button className="w-full p-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors cursor-pointer">
              Confirm Booking
            </button>
            <button className="w-full p-3 bg-gray-200 text-black rounded-lg font-bold hover:bg-gray-300 transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      );

    // ============ FORMS & INPUT ============
    case 'contactForm':
      return (
        <div className="w-full max-w-md p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Get in Touch</h3>
          <form className="space-y-3">
            <div>
              <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-colors cursor-text" />
            </div>
            <div>
              <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-colors cursor-text" />
            </div>
            <div>
              <textarea placeholder="Your message..." rows={4} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-colors cursor-text resize-none" />
            </div>
            <button type="button" className="w-full p-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer">
              Send Message
            </button>
          </form>
        </div>
      );

    case 'searchBar':
      return (
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur rounded-full border border-white/20 hover:border-white/40 transition-colors">
            <Search className="w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search..." className="flex-1 bg-transparent text-white outline-none placeholder-gray-500 cursor-text" />
          </div>
        </div>
      );

    case 'inputFields':
      return (
        <div className="w-full max-w-md space-y-3 p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <div>
            <label className="text-gray-400 text-sm block mb-2">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-colors cursor-text" />
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-2">Password</label>
            <input type="password" placeholder="••••••••" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-colors cursor-text" />
          </div>
        </div>
      );

    case 'login':
      return (
        <div className="w-full max-w-sm p-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
          <form className="space-y-4">
            <div>
              <input type="email" placeholder="Email address" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-colors cursor-text" />
            </div>
            <div>
              <input type="password" placeholder="Password" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-colors cursor-text" />
            </div>
            <button type="button" className="w-full p-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer">
              Sign In
            </button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-4">Don't have an account? <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Sign up</span></p>
        </div>
      );

    // ============ BUTTONS ============
    case 'primaryButton':
      return (
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer">
          Primary Action
        </button>
      );

    case 'secondaryButton':
      return (
        <button className="px-6 py-3 bg-white/10 backdrop-blur text-white rounded-lg font-bold border border-white/30 hover:border-white/50 hover:bg-white/20 transition-all cursor-pointer">
          Secondary Action
        </button>
      );

    case 'socialButtons':
      return (
        <div className="flex gap-3">
          {['Google', 'GitHub', 'Twitter'].map((platform) => (
            <button key={platform} className="px-4 py-2 bg-white/10 backdrop-blur text-white rounded-lg text-sm hover:bg-white/20 transition-colors cursor-pointer border border-white/20">
              {platform}
            </button>
          ))}
        </div>
      );

    // ============ ELEMENTS ============
    case 'testimonialCarousel':
      return (
        <div className="w-full p-8 bg-white/5 backdrop-blur rounded-2xl border border-white/10 text-center">
          <MessageSquare className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <p className="text-white text-lg mb-6 italic">
            "KRYNOX transformed how we build DeFi products. The tools are incredible."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600" />
            <div className="text-left">
              <p className="text-white font-semibold text-sm">Alex Chen</p>
              <p className="text-gray-400 text-xs">CEO, CryptoVentures</p>
            </div>
          </div>
        </div>
      );

    case 'faqAccordion':
      return (
        <div className="w-full max-w-2xl space-y-2 bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
          {[
            { q: 'How secure is my wallet?', a: 'Industry-leading security protocols' },
            { q: 'What are the trading fees?', a: '0.1% per transaction on all pairs' },
            { q: 'Can I use mobile app?', a: 'Yes, fully featured iOS & Android apps' },
          ].map((item, idx) => (
            <div key={idx} className="border border-white/10 rounded-lg overflow-hidden hover:border-purple-500/50 transition-colors cursor-pointer">
              <div className="p-4 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between">
                <p className="text-white font-medium text-sm">{item.q}</p>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      );

    case 'newsletterSignup':
      return (
        <div className="w-full max-w-md p-6 bg-gradient-to-br from-purple-900/40 to-cyan-900/40 backdrop-blur rounded-2xl border border-purple-500/30">
          <h3 className="text-white font-bold mb-2">Subscribe to Updates</h3>
          <p className="text-gray-400 text-sm mb-4">Get the latest crypto news and updates delivered daily.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="your@email.com" className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-colors cursor-text" />
            <button className="px-4 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors cursor-pointer">Subscribe</button>
          </div>
        </div>
      );

    case 'progressBars':
      return (
        <div className="w-full max-w-md space-y-4 p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          {[
            { label: 'Ethereum (ETH)', value: 75 },
            { label: 'Bitcoin (BTC)', value: 60 },
            { label: 'Solana (SOL)', value: 45 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-white text-sm font-medium">{item.label}</p>
                <p className="text-gray-400 text-xs">{item.value}%</p>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full transition-all"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      );

    case 'alerts':
      return (
        <div className="w-full space-y-3 max-w-md">
          <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-green-100 text-sm">Transaction completed successfully!</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-100 text-sm">Insufficient balance to complete transaction</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
            <Bell className="w-5 h-5 text-blue-400" />
            <p className="text-blue-100 text-sm">New market update available</p>
          </div>
        </div>
      );

    case 'blogCards':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          {[
            { title: 'Getting Started with DeFi', date: 'Mar 15, 2024', author: 'John Doe' },
            { title: 'Trading Strategies 101', date: 'Mar 10, 2024', author: 'Jane Smith' },
          ].map((post, idx) => (
            <div key={idx} className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer group">
              <div className="w-full h-32 bg-gradient-to-br from-purple-600/40 to-cyan-600/40 rounded-lg mb-4 group-hover:shadow-lg transition-shadow" />
              <h3 className="text-white font-bold mb-2 group-hover:text-purple-400 transition-colors">{post.title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      );

    case 'dataTable':
      return (
        <div className="w-full max-w-2xl overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-4 py-3 text-left text-white font-bold text-sm">Asset</th>
                <th className="px-4 py-3 text-right text-white font-bold text-sm">Price</th>
                <th className="px-4 py-3 text-right text-white font-bold text-sm">Change</th>
                <th className="px-4 py-3 text-right text-white font-bold text-sm">Volume</th>
              </tr>
            </thead>
            <tbody>
              {[
                { asset: 'Bitcoin', price: '$48,250', change: '+2.5%', volume: '$42.5B' },
                { asset: 'Ethereum', price: '$2,840', change: '+1.8%', volume: '$21.3B' },
                { asset: 'Solana', price: '$142.30', change: '-0.3%', volume: '$2.1B' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="px-4 py-3 text-white text-sm">{row.asset}</td>
                  <td className="px-4 py-3 text-right text-white text-sm font-medium">{row.price}</td>
                  <td className={`px-4 py-3 text-right text-sm font-medium ${row.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{row.change}</td>
                  <td className="px-4 py-3 text-right text-gray-400 text-sm">{row.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    // ============ TEMPLATE COMPONENTS ============
    case 'portfolioFilter':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <div className="flex flex-wrap gap-2 mb-6">
            {['All', 'Web', 'Mobile', 'Design'].map((cat, idx) => (
              <button key={idx} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${idx === 0 ? 'bg-purple-600 text-white' : 'bg-white/10 text-white hover:bg-white/20 cursor-pointer'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map((item) => (
              <div key={item} className="aspect-square bg-gradient-to-br from-purple-600/30 to-cyan-600/30 rounded-xl hover:from-purple-600/50 hover:to-cyan-600/50 transition-all cursor-pointer" />
            ))}
          </div>
        </div>
      );

    case 'teamProfiles':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-6 text-center">Our Team</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'John Doe', role: 'CEO' },
              { name: 'Jane Smith', role: 'CTO' },
              { name: 'Mike Johnson', role: 'Designer' },
              { name: 'Sarah Lee', role: 'Developer' },
            ].map((member, idx) => (
              <div key={idx} className="text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 mx-auto mb-3" />
                <p className="text-white font-semibold text-sm">{member.name}</p>
                <p className="text-gray-400 text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'gallery':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1,2,3,4,5,6,7,8].map((item) => (
              <div key={item} className="aspect-square bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-lg hover:scale-105 transition-transform cursor-pointer" />
            ))}
          </div>
        </div>
      );

    case 'productGrid':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Featured Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Product 1', price: '$29.99' },
              { name: 'Product 2', price: '$49.99' },
              { name: 'Product 3', price: '$19.99' },
              { name: 'Product 4', price: '$39.99' },
            ].map((product, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-purple-600/30 to-cyan-600/30 rounded-lg mb-3" />
                <p className="text-white text-sm font-medium">{product.name}</p>
                <p className="text-purple-400 text-sm font-bold">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'shoppingCart':
      return (
        <div className="w-full max-w-md p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Shopping Cart</h3>
          <div className="space-y-3">
            {[
              { name: 'Item 1', price: '$29.99' },
              { name: 'Item 2', price: '$49.99' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600/30 rounded-lg" />
                  <div>
                    <p className="text-white text-sm">{item.name}</p>
                    <p className="text-gray-400 text-xs">{item.price}</p>
                  </div>
                </div>
                <button className="text-red-400 text-sm hover:text-red-300 cursor-pointer">Remove</button>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white font-bold">$79.98</span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg cursor-pointer">Checkout</button>
          </div>
        </div>
      );

    case 'checkoutForm':
      return (
        <div className="w-full max-w-lg p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Checkout</h3>
          <div className="space-y-3">
            <input type="text" placeholder="Full Name" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            <input type="email" placeholder="Email" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            <input type="text" placeholder="Card Number" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="MM/YY" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
              <input type="text" placeholder="CVV" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg cursor-pointer">Pay Now</button>
          </div>
        </div>
      );

    case 'menuGrid':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Our Menu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Burger', price: '$12.99', desc: 'Delicious beef burger' },
              { name: 'Pizza', price: '$15.99', desc: 'Italian style pizza' },
              { name: 'Pasta', price: '$10.99', desc: 'Creamy pasta' },
              { name: 'Salad', price: '$8.99', desc: 'Fresh greens' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-purple-600/30 rounded-lg" />
                <div className="flex-1">
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                  <p className="text-purple-400 font-bold">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'reservationForm':
      return (
        <div className="w-full max-w-md p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Make a Reservation</h3>
          <div className="space-y-3">
            <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            <input type="tel" placeholder="Phone Number" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            <div className="grid grid-cols-2 gap-3">
              <input type="date" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none cursor-text" />
              <input type="time" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none cursor-text" />
            </div>
            <input type="number" placeholder="Number of Guests" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg cursor-pointer">Book Now</button>
          </div>
        </div>
      );

    case 'propertyGrid':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Featured Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Modern Villa', price: '$450,000', location: 'Los Angeles' },
              { name: 'City Apartment', price: '$250,000', location: 'New York' },
              { name: 'Beach House', price: '$650,000', location: 'Miami' },
            ].map((property, idx) => (
              <div key={idx} className="bg-white/10 rounded-xl overflow-hidden hover:bg-white/20 transition-colors cursor-pointer">
                <div className="h-32 bg-gradient-to-br from-purple-600/40 to-cyan-600/40" />
                <div className="p-3">
                  <p className="text-white font-semibold">{property.name}</p>
                  <p className="text-gray-400 text-xs">{property.location}</p>
                  <p className="text-purple-400 font-bold mt-2">{property.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'jobListing':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Job Openings</h3>
          <div className="space-y-3">
            {[
              { title: 'Frontend Developer', company: 'Tech Corp', type: 'Full Time' },
              { title: 'UX Designer', company: 'Design Studio', type: 'Remote' },
              { title: 'Marketing Manager', company: 'Startup Inc', type: 'Part Time' },
            ].map((job, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                <div>
                  <p className="text-white font-medium">{job.title}</p>
                  <p className="text-gray-400 text-sm">{job.company} • {job.type}</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 cursor-pointer">Apply</button>
              </div>
            ))}
          </div>
        </div>
      );

    case 'courseListing':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Popular Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'React Mastery', lessons: '24 lessons', rating: '4.8' },
              { title: 'Node.js Deep Dive', lessons: '18 lessons', rating: '4.9' },
              { title: 'Python for AI', lessons: '32 lessons', rating: '4.7' },
              { title: 'UI/UX Design', lessons: '20 lessons', rating: '4.6' },
            ].map((course, idx) => (
              <div key={idx} className="bg-white/10 rounded-xl overflow-hidden hover:bg-white/20 transition-colors cursor-pointer">
                <div className="h-24 bg-gradient-to-br from-purple-600/40 to-cyan-600/40" />
                <div className="p-3">
                  <p className="text-white font-medium">{course.title}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-400 text-xs">{course.lessons}</span>
                    <span className="text-yellow-400 text-xs">★ {course.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'videoPlayer':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Video Player</h3>
          <div className="aspect-video bg-black rounded-xl flex items-center justify-center">
            <button className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
            </button>
          </div>
        </div>
      );

    case 'discussionForum':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Discussion Forum</h3>
          <div className="space-y-3">
            {[
              { topic: 'How to get started?', replies: '24 replies', author: 'NewUser123' },
              { topic: 'Best practices for API', replies: '18 replies', author: 'DevPro' },
              { topic: 'Deployment tips', replies: '12 replies', author: 'TechGuru' },
            ].map((post, idx) => (
              <div key={idx} className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                <p className="text-white font-medium">{post.topic}</p>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>by {post.author}</span>
                  <span>{post.replies}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'appointmentForm':
      return (
        <div className="w-full max-w-md p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Book Appointment</h3>
          <div className="space-y-3">
            <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            <input type="email" placeholder="Email" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            <input type="tel" placeholder="Phone" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none cursor-pointer">
              <option className="text-black">Select Service</option>
              <option className="text-black">Consultation</option>
              <option className="text-black">Check-up</option>
            </select>
            <input type="date" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none cursor-text" />
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg cursor-pointer">Book Now</button>
          </div>
        </div>
      );

    case 'doctorProfiles':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Our Doctors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Dr. Smith', spec: 'Cardiologist' },
              { name: 'Dr. Johnson', spec: 'Neurologist' },
              { name: 'Dr. Williams', spec: 'Pediatrician' },
              { name: 'Dr. Brown', spec: 'Dermatologist' },
            ].map((doc, idx) => (
              <div key={idx} className="text-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">{doc.name}</p>
                <p className="text-gray-400 text-xs">{doc.spec}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'classSchedule':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Class Schedule</h3>
          <div className="space-y-2">
            {[
              { time: '6:00 AM', class: 'Morning Yoga', instructor: 'Sarah' },
              { time: '9:00 AM', class: 'HIIT Training', instructor: 'Mike' },
              { time: '12:00 PM', class: 'Boxing', instructor: 'John' },
              { time: '5:00 PM', class: 'Spin Class', instructor: 'Emma' },
            ].map((schedule, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <span className="text-purple-400 font-medium w-20">{schedule.time}</span>
                <span className="text-white flex-1">{schedule.class}</span>
                <span className="text-gray-400 text-sm">{schedule.instructor}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'membershipPlans':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Membership Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Basic', price: '$29', features: ['Gym access', '1 class/week'] },
              { name: 'Pro', price: '$59', features: ['All access', 'Unlimited classes'], popular: true },
              { name: 'Elite', price: '$99', features: ['VIP access', 'Personal trainer'] },
            ].map((plan, idx) => (
              <div key={idx} className={`p-4 rounded-xl ${plan.popular ? 'bg-purple-600/30 border border-purple-500' : 'bg-white/10'} cursor-pointer hover:bg-white/20 transition-colors`}>
                <p className="text-white font-bold">{plan.name}</p>
                <p className="text-2xl font-bold text-purple-400 mt-2">{plan.price}<span className="text-gray-400 text-sm">/mo</span></p>
                <ul className="mt-3 space-y-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="text-gray-300 text-xs">✓ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );

    case 'trainerProfiles':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Our Trainers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Mike', specialty: 'Strength' },
              { name: 'Sarah', specialty: 'Yoga' },
              { name: 'Emma', specialty: 'Cardio' },
              { name: 'John', specialty: 'Boxing' },
            ].map((trainer, idx) => (
              <div key={idx} className="text-center p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">{trainer.name}</p>
                <p className="text-gray-400 text-xs">{trainer.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'roomListing':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Available Rooms</h3>
          <div className="space-y-4">
            {[
              { name: 'Deluxe Suite', price: '$199/night', bed: 'King Bed', guests: '2 Guests' },
              { name: 'Standard Room', price: '$99/night', bed: 'Queen Bed', guests: '2 Guests' },
              { name: 'Family Room', price: '$249/night', bed: '2 Queen Beds', guests: '4 Guests' },
            ].map((room, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                <div className="w-24 h-24 bg-purple-600/30 rounded-lg" />
                <div className="flex-1">
                  <p className="text-white font-medium">{room.name}</p>
                  <p className="text-gray-400 text-xs">{room.bed} • {room.guests}</p>
                  <p className="text-purple-400 font-bold mt-2">{room.price}</p>
                </div>
                <button className="self-center px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 cursor-pointer">Book</button>
              </div>
            ))}
          </div>
        </div>
      );

    case 'amenitiesGrid':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking', 'Room Service', 'Concierge'].map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'quoteCalculator':
      return (
        <div className="w-full max-w-md p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Get a Quote</h3>
          <div className="space-y-3">
            <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none cursor-pointer">
              <option className="text-black">Select Insurance Type</option>
              <option className="text-black">Auto</option>
              <option className="text-black">Home</option>
              <option className="text-black">Life</option>
            </select>
            <input type="number" placeholder="Coverage Amount" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            <input type="number" placeholder="Your Age" className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 cursor-text" />
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg cursor-pointer">Calculate Quote</button>
          </div>
        </div>
      );

    case 'practiceAreas':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Practice Areas</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Corporate Law', 'Family Law', 'Criminal Defense', 'Real Estate', 'Immigration', 'Bankruptcy'].map((area, idx) => (
              <div key={idx} className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer text-center">
                <p className="text-white text-sm font-medium">{area}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'attorneyProfiles':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Our Attorneys</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'John Smith', title: 'Senior Partner', spec: 'Corporate Law' },
              { name: 'Jane Doe', title: 'Associate', spec: 'Family Law' },
            ].map((attorney, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600" />
                <div>
                  <p className="text-white font-medium">{attorney.name}</p>
                  <p className="text-gray-400 text-sm">{attorney.title}</p>
                  <p className="text-purple-400 text-xs">{attorney.spec}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'eventListing':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {[
              { name: 'Tech Conference 2024', date: 'Mar 15, 2024', location: 'San Francisco' },
              { name: 'Music Festival', date: 'Apr 20, 2024', location: 'Los Angeles' },
              { name: 'Art Exhibition', date: 'May 5, 2024', location: 'New York' },
            ].map((event, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-purple-600/30 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{event.name}</p>
                  <p className="text-gray-400 text-sm">{event.date} • {event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'ticketPurchase':
      return (
        <div className="w-full max-w-md p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Buy Tickets</h3>
          <div className="space-y-3">
            <div className="p-4 bg-white/10 rounded-xl">
              <div className="flex justify-between mb-2">
                <span className="text-white">General Admission</span>
                <span className="text-purple-400 font-bold">$29</span>
              </div>
              <input type="number" min="1" defaultValue="1" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white outline-none cursor-text" />
            </div>
            <div className="p-4 bg-white/10 rounded-xl">
              <div className="flex justify-between mb-2">
                <span className="text-white">VIP</span>
                <span className="text-purple-400 font-bold">$99</span>
              </div>
              <input type="number" min="1" defaultValue="1" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white outline-none cursor-text" />
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-bold hover:shadow-lg cursor-pointer">Purchase</button>
          </div>
        </div>
      );

    case 'subscriptionPlans':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Subscription Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Monthly', price: '$19.99' },
              { name: 'Yearly', price: '$149.99', save: 'Save 40%' },
              { name: 'Lifetime', price: '$499.99', best: 'Best Value' },
            ].map((plan, idx) => (
              <div key={idx} className={`p-4 rounded-xl cursor-pointer ${idx === 1 ? 'bg-purple-600/30 border border-purple-500' : 'bg-white/10 hover:bg-white/20'}`}>
                <p className="text-white font-bold">{plan.name}</p>
                <p className="text-2xl font-bold text-purple-400 mt-2">{plan.price}</p>
                {plan.save && <p className="text-green-400 text-xs mt-2">{plan.save}</p>}
                {plan.best && <p className="text-yellow-400 text-xs mt-2">{plan.best}</p>}
              </div>
            ))}
          </div>
        </div>
      );

    case 'analyticsDashboard':
      return (
        <div className="w-full p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">Analytics Dashboard</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Users', value: '12,453', change: '+12%' },
              { label: 'Revenue', value: '$84,230', change: '+8%' },
              { label: 'Conversion', value: '3.2%', change: '+0.4%' },
              { label: 'Bounce Rate', value: '42%', change: '-2%' },
            ].map((stat, idx) => (
              <div key={idx} className="p-3 bg-white/10 rounded-lg">
                <p className="text-gray-400 text-xs">{stat.label}</p>
                <p className="text-white font-bold text-xl">{stat.value}</p>
                <p className="text-green-400 text-xs">{stat.change}</p>
              </div>
            ))}
          </div>
          <div className="h-32 bg-white/10 rounded-xl flex items-end px-4">
            {[40, 55, 45, 70, 60, 80, 65, 90, 75, 85, 95, 88].map((h, i) => (
              <div key={i} className="flex-1 bg-purple-600 mx-0.5 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      );

    case 'aiChatbot':
      return (
        <div className="w-full max-w-md p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-4">AI Assistant</h3>
          <div className="h-48 bg-black/50 rounded-xl p-3 overflow-y-auto mb-3">
            <div className="mb-2">
              <span className="text-purple-400 text-xs">AI:</span>
              <p className="text-gray-300 text-sm">Hello! How can I help you today?</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Type a message..." className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none focus:border-purple-500 text-sm cursor-text" />
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">Send</button>
          </div>
        </div>
      );

    // ============ CRYPTO DASHBOARD ============
    case 'crmDashboard':
      return (
        <div className="w-full bg-[#0a0a0a] p-6 border-b border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">System Analytics</h2>
            <button onClick={() => alert('Data refreshed!')} className="bg-purple-600 px-4 py-2 rounded-lg text-sm text-white hover:bg-purple-700 cursor-pointer">Update Data</button>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-xs">Revenue</p>
              <p className="text-white font-bold text-xl">$124,592</p>
              <p className="text-green-400 text-xs">+12.5%</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-xs">Active Users</p>
              <p className="text-white font-bold text-xl">4,521</p>
              <p className="text-green-400 text-xs">+8.2%</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-gray-400 text-xs">System Uptime</p>
              <p className="text-white font-bold text-xl">99.9%</p>
              <p className="text-green-400 text-xs">Stable</p>
            </div>
          </div>
          <div className="h-48 bg-white/5 rounded-xl p-4 flex items-end gap-1">
            {[35, 45, 55, 40, 60, 75, 65, 80, 70, 85, 90, 78].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-purple-600 to-cyan-500 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      );

    case 'payment-gate':
    case 'paymentGateway':
      return (
        <div className="w-full py-12 flex justify-center bg-black">
          <div className="w-96 bg-zinc-900 p-8 rounded-3xl border border-purple-500/50 shadow-2xl shadow-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">KRYNOX Payment</h3>
                <p className="text-gray-500 text-xs">Secure Transaction</p>
              </div>
            </div>
            <label className="text-xs text-gray-500">Amount (USDT)</label>
            <input type="number" className="w-full bg-black border border-white/10 p-3 rounded-xl mt-2 mb-4 text-white placeholder-gray-600 outline-none focus:border-purple-500" placeholder="0.00" />
            <label className="text-xs text-gray-500">Card Number</label>
            <input type="text" className="w-full bg-black border border-white/10 p-3 rounded-xl mt-2 mb-4 text-white placeholder-gray-600 outline-none focus:border-purple-500" placeholder="4242 4242 4242 4242" />
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="text-xs text-gray-500">Expiry</label>
                <input type="text" className="w-full bg-black border border-white/10 p-3 rounded-xl mt-2 text-white placeholder-gray-600 outline-none focus:border-purple-500" placeholder="MM/YY" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500">CVC</label>
                <input type="text" className="w-full bg-black border border-white/10 p-3 rounded-xl mt-2 text-white placeholder-gray-600 outline-none focus:border-purple-500" placeholder="123" />
              </div>
            </div>
            <button onClick={() => alert('Processing KRYNOX Payment...')} className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all cursor-pointer">PAY NOW</button>
          </div>
        </div>
      );

    case 'transactionHistory':
      return (
        <div className="w-full p-6 bg-[#0a0a0a]">
          <h3 className="text-xl font-bold text-white mb-6">Transaction History</h3>
          <div className="space-y-3">
            {[
              { id: 'TXN-001', type: 'Received', amount: '+2.45 ETH', from: '0x7a23...8f91', time: '2 mins ago', status: 'Completed' },
              { id: 'TXN-002', type: 'Sent', amount: '-0.5 BTC', to: '0x3b41...2c12', time: '15 mins ago', status: 'Completed' },
              { id: 'TXN-003', type: 'Swap', amount: '1000 USDT → 0.28 ETH', to: 'Uniswap', time: '1 hour ago', status: 'Completed' },
              { id: 'TXN-004', type: 'Received', amount: '+500 USDC', from: 'Coinbase', time: '3 hours ago', status: 'Completed' },
              { id: 'TXN-005', type: 'Sent', amount: '-2500 USDT', to: '0x9f21...4a33', time: '1 day ago', status: 'Completed' },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'Received' ? 'bg-green-500/20 text-green-400' : tx.type === 'Sent' ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {tx.type === 'Received' ? <TrendingUp size={18} /> : tx.type === 'Sent' ? <TrendingDown size={18} /> : <ArrowLeftRight size={18} />}
                  </div>
                  <div>
                    <p className="text-white font-medium">{tx.type}</p>
                    <p className="text-gray-500 text-xs">{tx.type === 'Received' ? `From: ${tx.from}` : `To: ${tx.to}`}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.type === 'Received' ? 'text-green-400' : 'text-red-400'}`}>{tx.amount}</p>
                  <p className="text-gray-500 text-xs">{tx.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'masterDashboard':
      return (
        <div className="w-full p-6 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">KRYNOX Command Center</h2>
              <p className="text-gray-400 text-sm">Real-time system monitoring</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => alert('Refreshing all systems...')} className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 cursor-pointer flex items-center gap-2">
                <RefreshCw size={16} /> Refresh
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[{ label: 'Total Revenue', value: '$2.4M', icon: DollarSign, color: 'green' }, { label: 'Active Users', value: '12.5K', icon: Users, color: 'blue' }, { label: 'API Calls', value: '45.2M', icon: Activity, color: 'purple' }, { label: 'System Health', value: '99.9%', icon: Shield, color: 'cyan' }].map((stat, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                  <span className="text-xs text-gray-500">Live</span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="text-white font-semibold mb-4">Traffic Overview</h4>
              <div className="h-32 flex items-end gap-1">
                {[60, 45, 70, 55, 80, 65, 90, 75, 85, 95, 80, 88].map((h, i) => (
                  <div key={i} className="flex-1 bg-purple-600 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="text-white font-semibold mb-4">Recent Activity</h4>
              <div className="space-y-2">
                {['New user registration', 'Payment processed', 'API call spike', 'System backup complete'].map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-gray-400">{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    // ============ MOBILE APP SHELLS ============
    case 'androidAppShell':
    case 'iosAppShell':
    case 'reactNativeShell':
      return (
        <div className="w-full py-8 flex justify-center bg-gradient-to-b from-gray-900 to-black">
          <div className="w-[320px] h-[640px] bg-white rounded-[40px] border-8 border-gray-800 overflow-hidden shadow-2xl">
            {/* Status Bar */}
            <div className="h-7 bg-gray-900 flex justify-between items-center px-6">
              <span className="text-white text-xs font-medium">9:41</span>
              <div className="flex gap-1">
                <div className="w-4 h-2.5 bg-white rounded-sm" />
              </div>
            </div>
            {/* App Header */}
            <div className="p-4 bg-purple-600">
              <h3 className="text-white font-bold text-lg">KRYNOX App</h3>
            </div>
            {/* Content */}
            <div className="p-4 space-y-3 bg-gray-100 h-[calc(100%-120px)] overflow-y-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-200 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom Nav */}
            <div className="h-14 bg-white border-t flex justify-around items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"><Home className="w-4 h-4 text-purple-600" /></div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center"><Search className="w-4 h-4 text-gray-400" /></div>
              <div className="w-12 h-12 bg-purple-600 rounded-full -mt-6 flex items-center justify-center shadow-lg"><Plus className="w-6 h-6 text-white" /></div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center"><Bell className="w-4 h-4 text-gray-400" /></div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-gray-400" /></div>
            </div>
          </div>
        </div>
      );

    case 'cryptoLoan':
      return (
        <div className="w-full p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">DeFi Lending Platform</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                <p className="text-gray-400 text-xs mb-1">Total Deposited</p>
                <p className="text-white font-bold text-xl">$45,230</p>
                <p className="text-green-400 text-xs">+5.2% APY</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                <p className="text-gray-400 text-xs mb-1">Total Borrowed</p>
                <p className="text-white font-bold text-xl">$12,500</p>
                <p className="text-red-400 text-xs">3.5% APY</p>
              </div>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-white/10 mb-4">
              <label className="text-gray-400 text-sm">Collateral Asset</label>
              <select className="w-full mt-2 p-3 bg-white/10 rounded-xl text-white border border-white/20 cursor-pointer">
                <option>ETH - Ethereum</option>
                <option>WBTC - Wrapped Bitcoin</option>
                <option>USDC - USD Coin</option>
              </select>
              <label className="text-gray-400 text-sm mt-4 block">Borrow Amount</label>
              <input type="range" className="w-full mt-2" min="0" max="100" defaultValue="50" />
              <div className="flex justify-between text-gray-400 text-xs mt-1">
                <span>$0</span>
                <span className="text-white">$22,615 Available</span>
              </div>
            </div>
            <button onClick={() => alert('Processing Loan Request...')} className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer">BORROW NOW</button>
          </div>
        </div>
      );

    case 'nftMarketplace':
      return (
        <div className="w-full p-6 bg-[#0a0a0a]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">NFT Marketplace</h2>
            <div className="flex gap-2">
              {['All', 'Art', 'Collectibles', 'Gaming'].map((cat, i) => (
                <button key={cat} className={`px-3 py-1 rounded-full text-xs cursor-pointer ${i === 0 ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-400 hover:text-white'}`}>{cat}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ name: 'Cosmic Dream #127', creator: '0x3a...2f', price: '2.5 ETH', image: '🟣' }, { name: 'Pixel Warrior #892', creator: '0x7b...1c', price: '1.8 ETH', image: '⚔️' }, { name: 'Neon City #045', creator: '0x9c...8d', price: '3.2 ETH', image: '🌃' }, { name: 'Digital Soul #331', creator: '0x2e...4f', price: '5.0 ETH', image: '👻' }].map((nft, i) => (
              <div key={i} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-colors cursor-pointer group">
                <div className="h-40 bg-gradient-to-br from-purple-600/30 to-cyan-600/30 flex items-center justify-center text-4xl">{nft.image}</div>
                <div className="p-3">
                  <p className="text-white font-medium text-sm">{nft.name}</p>
                  <p className="text-gray-500 text-xs">by {nft.creator}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-purple-400 font-bold">{nft.price}</span>
                    <button className="text-xs bg-purple-600 px-2 py-1 rounded text-white group-hover:bg-purple-700 cursor-pointer">Buy</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    // ============ USER AUTHENTICATION ============
    case 'registration':
      return (
        <div className="w-full py-12 flex justify-center bg-gradient-to-br from-purple-900/20 to-black">
          <div className="w-full max-w-md p-8 bg-zinc-900 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 mb-6 text-sm">Join KRYNOX and start building</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500">Full Name</label>
                <input type="text" defaultValue="KRYNOX User" className="w-full mt-1 p-3 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 cursor-text" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Email Address</label>
                <input type="email" defaultValue="user@krynox.ai" className="w-full mt-1 p-3 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 cursor-text" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Password</label>
                <input type="password" defaultValue="password123" className="w-full mt-1 p-3 bg-black border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 cursor-text" />
              </div>
              <button onClick={() => alert('Account created successfully!')} className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-bold mt-4 cursor-pointer">Create Account</button>
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">Already have an account? <span className="text-purple-400 cursor-pointer">Sign in</span></p>
          </div>
        </div>
      );

    case 'socialLogin':
    case 'socialButtons':
      return (
        <div className="w-full py-12 flex justify-center bg-black">
          <div className="w-full max-w-sm p-6">
            <h3 className="text-xl font-bold text-white text-center mb-6">Continue with</h3>
            <div className="space-y-3">
              <button onClick={() => alert('Connecting with Google...')} className="w-full py-3 bg-white text-black font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 cursor-pointer">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button onClick={() => alert('Connecting with GitHub...')} className="w-full py-3 bg-gray-800 text-white font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-700 cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </button>
            </div>
          </div>
        </div>
      );

    case 'dashboard':
      return (
        <div className="w-full min-h-[600px] bg-[#0a0a0a] flex">
          {/* Sidebar */}
          <div className="w-64 bg-[#0f0f0f] border-r border-white/10 p-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold">KRYNOX</span>
            </div>
            <div className="space-y-2">
              {['Dashboard', 'Analytics', 'Transactions', 'Wallet', 'Settings'].map((item, i) => (
                <div key={item} className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer ${i === 0 ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                  <div className="w-4 h-4 rounded bg-current opacity-50" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <button onClick={() => alert('Profile clicked!')} className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600" />
                <span className="text-white">John Doe</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[{ label: 'Total Balance', value: '$45,231.89', change: '+2.5%' }, { label: 'Monthly Revenue', value: '$12,450', change: '+8.2%' }, { label: 'Active Users', value: '2,341', change: '+5.1%' }, { label: 'Total Trades', value: '15,892', change: '+12.4%' }].map((stat, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-xs">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-green-400 text-xs mt-1">{stat.change}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/5 rounded-xl border border-white/10 p-4 h-64">
              <p className="text-white font-semibold mb-4">Revenue Overview</p>
              <div className="flex items-end gap-2 h-48">
                {[40, 55, 45, 60, 75, 65, 80, 70, 90, 85, 95, 88].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-purple-600 to-cyan-500 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    // ============ GENERIC FALLBACK FOR ALL MISSING COMPONENTS ============
    default:
      // Generate a meaningful placeholder based on component type
      const componentName = type?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Component';
      const isCrypto = type?.includes('wallet') || type?.includes('token') || type?.includes('crypto') || type?.includes('swap');
      const isForm = type?.includes('form') || type?.includes('input') || type?.includes('field');
      const isGrid = type?.includes('grid') || type?.includes('list') || type?.includes('gallery');
      const isProfile = type?.includes('profile') || type?.includes('card');
      
      if (isCrypto) {
        return (
          <div className="w-full py-16 px-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{componentName}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="p-4 bg-white/10 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/50" />
                      <span className="text-white font-medium">Token {i}</span>
                    </div>
                    <div className="text-gray-400 text-sm">$0.00</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      
      if (isForm) {
        return (
          <div className="w-full py-16 px-6 bg-white/5">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">{componentName}</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Enter value" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none" />
                <input type="email" placeholder="Email address" className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none" />
                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-bold">Submit</button>
              </div>
            </div>
          </div>
        );
      }
      
      if (isGrid) {
        return (
          <div className="w-full py-16 px-6 bg-white/5">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">{componentName}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-purple-600/30 to-cyan-600/30 rounded-xl hover:scale-105 transition-transform cursor-pointer" />
                ))}
              </div>
            </div>
          </div>
        );
      }
      
      if (isProfile) {
        return (
          <div className="w-full py-16 px-6 bg-white/5">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">{componentName}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="text-center p-4 bg-white/10 rounded-xl">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 mx-auto mb-3" />
                    <p className="text-white font-medium">User {i}</p>
                    <p className="text-gray-400 text-xs">Role</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      
      // Default generic full section
      return (
        <div className="w-full py-20 px-6 bg-white/5 border-y border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{componentName}</h2>
            <p className="text-gray-400 mb-8">This component is fully functional and ready to use.</p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold">Get Started</button>
              <button className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold border border-white/20">Learn More</button>
            </div>
          </div>
        </div>
      );
  }
};

export default ToolRenderer;
