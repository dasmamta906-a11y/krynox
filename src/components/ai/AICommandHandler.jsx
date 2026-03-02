import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, Loader2, Wand2, Layout, ShoppingCart, Wallet, Building2, Car, Zap, MessageSquare, Search, ChevronRight, Mic, MicOff, Globe, Calendar, Heart, Users, Smartphone, Settings, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { componentLibrary } from '../../data/components';

// Multi-language support
const languages = {
  en: { name: 'English', flag: '🇺🇸', native: 'English' },
  hi: { name: 'Hindi', flag: '🇮🇳', native: 'हिंदी' },
  es: { name: 'Spanish', flag: '🇪🇸', native: 'Español' },
  fr: { name: 'French', flag: '🇫🇷', native: 'Français' },
  de: { name: 'German', flag: '🇩🇪', native: 'Deutsch' },
  it: { name: 'Italian', flag: '🇮🇹', native: 'Italiano' },
  pt: { name: 'Portuguese', flag: '🇵🇹', native: 'Português' },
  zh: { name: 'Chinese', flag: '🇨🇳', native: '中文' },
  ja: { name: 'Japanese', flag: '🇯🇵', native: '日本語' },
  ko: { name: 'Korean', flag: '🇰🇷', native: '한국어' },
  ar: { name: 'Arabic', flag: '🇸🇦', native: 'العربية' },
  ru: { name: 'Russian', flag: '🇷🇺', native: 'Русский' },
  ur: { name: 'Urdu', flag: '🇵🇰', native: 'اردو' },
  bn: { name: 'Bengali', flag: '🇧🇩', native: 'বাংলা' },
  ta: { name: 'Tamil', flag: '🇮🇳', native: 'தமிழ்' },
  te: { name: 'Telugu', flag: '🇮🇳', native: 'తెలుగు' },
  ml: { name: 'Malayalam', flag: '🇮🇳', native: 'മലയാളം' },
  th: { name: 'Thai', flag: '🇹🇭', native: 'ไทย' },
  vi: { name: 'Vietnamese', flag: '🇻🇳', native: 'Tiếng Việt' },
  tr: { name: 'Turkish', flag: '🇹🇷', native: 'Türkçe' },
};

// Website template mappings
const websiteTemplates = {
  // Website Templates
  'ecommerce': { name: 'E-Commerce Store', components: ['hero', 'navbar', 'productGrid', 'shoppingCart', 'checkoutForm', 'footer'] },
  'restaurant': { name: 'Restaurant Website', components: ['hero', 'navbar', 'menuGrid', 'reservationForm', 'footer'] },
  'hotel': { name: 'Hotel Booking', components: ['hero', 'navbar', 'roomListing', 'bookingForm', 'footer'] },
  'business': { name: 'Business Website', components: ['hero', 'navbar', 'serviceGrid', 'contactForm', 'footer'] },
  'crypto': { name: 'Crypto Dashboard', components: ['hero', 'navbar', 'priceTickers', 'walletBalance', 'footer'] },
  'delivery': { name: 'Food Delivery', components: ['hero', 'navbar', 'menuGrid', 'cartSystem', 'footer'] },
  'startup': { name: 'SaaS Startup', components: ['hero', 'navbar', 'features', 'pricing', 'footer'] },
  
  // Mobile App Templates (Android & iOS)
  'androidApp': { name: 'Android App (Material 3)', components: ['androidAppShell', 'androidNavigation', 'androidDashboard', 'androidProfile', 'androidLogin', 'androidSplash'] },
  'iosApp': { name: 'iOS App (SwiftUI)', components: ['iosAppShell', 'iosNavigation', 'iosDashboard', 'iosProfile', 'iosLogin', 'iosSplash'] },
  'mobileApp': { name: 'Cross-Platform App', components: ['reactNativeShell', 'pwaTemplate', 'androidNavigation', 'iosNavigation', 'pushNotification', 'darkModeMobile'] },
  'flutterApp': { name: 'Flutter App', components: ['flutterApp', 'androidNavigation', 'iosNavigation', 'androidCards', 'iosCards', 'pushNotification'] },
  'pwaApp': { name: 'PWA Mobile App', components: ['pwaTemplate', 'pushNotification', 'darkModeMobile', 'offlineSupport', 'installPrompt'] },
  
  // Ecommerce Mobile
  'shoppingApp': { name: 'Shopping App', components: ['reactNativeShell', 'androidNavigation', 'productGrid', 'shoppingCart', 'checkoutForm', 'pushNotification'] },
  'groceryApp': { name: 'Grocery Delivery App', components: ['flutterApp', 'androidNavigation', 'productGrid', 'cartSystem', 'orderTracking', 'pushNotification'] },
  
  // Food Delivery Mobile
  'foodDeliveryApp': { name: 'Food Delivery App', components: ['reactNativeShell', 'androidNavigation', 'menuGrid', 'cartSystem', 'orderTracking', 'driverTracking'] },
  'restaurantApp': { name: 'Restaurant App', components: ['iosAppShell', 'iosNavigation', 'menuGrid', 'reservationForm', 'reviewSystem', 'pushNotification'] },
  
  // Ride Sharing Mobile
  'rideSharingApp': { name: 'Ride Sharing App', components: ['reactNativeShell', 'driverTracking', 'fareEstimator', 'otpSystem', 'driverRating', 'emergencyAlert'] },
  'cabBookingApp': { name: 'Cab Booking App', components: ['flutterApp', 'liveTracking', 'scheduleRide', 'surgePricing', 'tripHistory', 'couponSystem'] },
  
  // Social & Communication
  'chatApp': { name: 'Chat Application', components: ['reactNativeShell', 'chatInterface', 'videoCall', 'voiceCall', 'statusView', 'pushNotification'] },
  'socialApp': { name: 'Social Media App', components: ['flutterApp', 'feedView', 'storyView', 'profileScreen', 'notifications', 'darkModeMobile'] },
  
  // Finance & Crypto Mobile
  'cryptoWalletApp': { name: 'Crypto Wallet App', components: ['reactNativeShell', 'multiWallet', 'walletBalance', 'priceTickers', 'transactionHistory', 'tokenSwap'] },
  'bankingApp': { name: 'Banking App', components: ['iosAppShell', 'accountBalance', 'transactionHistory', 'transferFunds', 'billPayment', 'pushNotification'] },
  
  // Health & Fitness
  'fitnessApp': { name: 'Fitness App', components: ['flutterApp', 'workoutTracker', 'dietPlan', 'progressTracker', 'socialFeed', 'pushNotification'] },
  'healthApp': { name: 'Health Tracking App', components: ['reactNativeShell', 'healthMetrics', 'appointmentForm', 'doctorProfiles', 'medicationReminder', 'pushNotification'] },
  
  // Education
  'learningApp': { name: 'E-Learning App', components: ['flutterApp', 'courseListing', 'videoPlayer', 'quiz', 'progressTracker', 'certificateGenerator'] },
  'onlineClassApp': { name: 'Online Class App', components: ['iosAppShell', 'classSchedule', 'liveClass', 'assignmentSubmit', 'gradeView', 'pushNotification'] },
};

// Flatten all components for lookup
const allComponents = [
  ...componentLibrary.layouts,
  ...componentLibrary.forms,
  ...componentLibrary.buttons,
  ...componentLibrary.elements,
  ...componentLibrary.crypto,
  ...componentLibrary.mobility,
  ...componentLibrary.enterprise,
  ...componentLibrary.admin,
  ...componentLibrary.ai,
  ...componentLibrary.mobile,
  ...componentLibrary.elite,
];

// Get component info with description
const getComponentInfo = (compId) => {
  return allComponents.find(comp => comp.id === compId);
};

// Theme options - MUST be defined before use
const themes = [
  { id: 'dark', name: 'Dark Theme', emoji: '🌙', colors: '#000000, #1a1a2e, #16213e' },
  { id: 'light', name: 'Light Theme', emoji: '☀️', colors: '#ffffff, #f5f5f5, #e0e0e0' },
  { id: 'colorful', name: 'Colorful Theme', emoji: '🌈', colors: '#ff6b6b, #4ecdc4, #45b7d1' },
  { id: 'minimal', name: 'Minimal Theme', emoji: '⬜', colors: '#ffffff, #000000, #888888' },
  { id: 'purple', name: 'Purple Theme', emoji: '🟣', colors: '#6b21a8, #9333ea, #c084fc' },
  { id: 'blue', name: 'Blue Theme', emoji: '🔵', colors: '#1e3a8a, #3b82f6, #60a5fa' },
];

// Format component features for display
const formatComponentFeatures = (components) => {
  if (!components || components.length === 0) return '';
  
  const features = components.map(compId => {
    const comp = getComponentInfo(compId);
    if (comp) {
      return `• ${comp.name}: ${comp.description || 'A powerful component for your website'}`;
    }
    return null;
  }).filter(Boolean);
  
  return features.join('\n');
};

export default function AICommandHandler() {
  const { state, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(true);
  const [chatStep, setChatStep] = useState('welcome');
  const [websiteName, setWebsiteName] = useState('');
  const [websiteType, setWebsiteType] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || 'AIzaSyDhQ4MN9Bp4j-0jZe54yeYp-ub7GKMAJxA');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isGeminiReady, setIsGeminiReady] = useState(!!localStorage.getItem('gemini_api_key') || true);
  const [isArchitectMode, setIsArchitectMode] = useState(false);
  const [architectDescription, setArchitectDescription] = useState('');
  const messagesEndRef = useRef(null);
  
  // Save API key
  const saveApiKey = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem('gemini_api_key', apiKeyInput.trim());
      setApiKey(apiKeyInput.trim());
      setIsGeminiReady(true);
      setApiKeyInput('');
      setShowSettings(false);
    }
  };

  // Call Gemini API
  const callGeminiAPI = async (userMessage, conversationHistory) => {
    if (!apiKey) return null;
    
    try {
      const conversationContext = conversationHistory.map(msg => 
        `${msg.type === 'user' ? 'User' : 'AI'}: ${msg.text}`
      ).join('\n');
      
      const prompt = `You are a friendly AI website builder assistant. Your name is KRYNOX AI. 
      
Previous conversation:
${conversationContext}

User: ${userMessage}

Instructions:
- Be friendly, helpful and conversational like ChatGPT
- Help users build websites and mobile apps
- When user wants to create a website, ask what type (E-Commerce, Restaurant, Hotel, Crypto, Business, etc.) and what name they want
- When user asks about website types, suggest: E-Commerce, Restaurant, Hotel, Crypto, Business, Mobile Apps (Android/iOS), etc.
- Keep responses short and friendly with emojis
- If user says hello/greet, respond warmly in their language (prefer Hindi/English mix)
- Always end with a helpful question to keep conversation going

Respond as KRYNOX AI:`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 500,
          }
        })
      });
      
      const data = await response.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (error) {
      console.error('Gemini API error:', error);
    }
    return null;
  };
  const recognitionRef = useRef(null);

  // Initial greeting with user's previous websites from long-term memory
  useEffect(() => {
    if (!hasGreeted && state.websiteHistory.length > 0) {
      setHasGreeted(true);
      const previousWebsites = state.websiteHistory.slice(-3); // Last 3 websites
      let greetingText = 'Namaste! 🙏 Main aapka AI website builder assistant hoon!\n\n';
      
      if (previousWebsites.length === 1) {
        const site = previousWebsites[0];
        const date = new Date(site.createdAt).toLocaleDateString('en-IN');
        greetingText += `Mujhe yaad hai aapne pehle "${site.name}" (${site.type}) banayi thi ${date} ko! 🎯\n\n`;
        greetingText += `Kya aap usme changes karna chahte hain ya nayi website banaenge?`;
      } else if (previousWebsites.length > 1) {
        greetingText += `Mujhe yaad hai aapne pehle in websites banayi thi:\n`;
        previousWebsites.forEach((site, idx) => {
          const date = new Date(site.createdAt).toLocaleDateString('en-IN');
          greetingText += `${idx + 1}. ${site.name} (${site.type}) - ${date}\n`;
        });
        greetingText += `\nKya aap kisi me changes karna chahte hain ya nayi website banaenge?`;
      } else {
        greetingText += 'Aap mujhe boliye - aap kaisi website banana chahte hain?';
      }
      
      setMessages([{ 
        id: 1, 
        type: 'ai', 
        text: greetingText, 
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
      }]);
    } else if (!hasGreeted) {
      setHasGreeted(true);
      setMessages([
        { id: 1, type: 'ai', text: 'Namaste! 🙏 Main aapka AI website builder assistant hoon!\n\nAap mujhe boliye - aap kaisi website banana chahte hain?', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }
  }, [state.websiteHistory, hasGreeted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getComponentById = (id) => {
    return allComponents.find(comp => comp.id === id);
  };

  const detectWebsiteType = (input) => {
    const lowerInput = input.toLowerCase();
    // Website detection
    if (lowerInput.includes('ecommerce') || lowerInput.includes('shop') || lowerInput.includes('store')) return 'ecommerce';
    if (lowerInput.includes('restaurant') || lowerInput.includes('food') || lowerInput.includes('cafe')) return 'restaurant';
    if (lowerInput.includes('hotel') || lowerInput.includes('booking') || lowerInput.includes('resort')) return 'hotel';
    if (lowerInput.includes('crypto') || lowerInput.includes('defi') || lowerInput.includes('blockchain')) return 'crypto';
    if (lowerInput.includes('delivery') || lowerInput.includes('food')) return 'delivery';
    if (lowerInput.includes('startup') || lowerInput.includes('saas')) return 'startup';
    if (lowerInput.includes('business') || lowerInput.includes('company')) return 'business';
    
    // Mobile App detection (Android & iOS)
    if (lowerInput.includes('android app') || lowerInput.includes('android application')) return 'androidApp';
    if (lowerInput.includes('ios app') || lowerInput.includes('iphone app') || lowerInput.includes('swiftui')) return 'iosApp';
    if (lowerInput.includes('mobile app') || lowerInput.includes('mobile application')) return 'mobileApp';
    if (lowerInput.includes('flutter')) return 'flutterApp';
    if (lowerInput.includes('pwa') || lowerInput.includes('progressive web')) return 'pwaApp';
    if ((lowerInput.includes('shopping') || lowerInput.includes('estore')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'shoppingApp';
    if ((lowerInput.includes('grocery') || lowerInput.includes('kirana')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'groceryApp';
    if ((lowerInput.includes('food') || lowerInput.includes('zomato') || lowerInput.includes('swiggy')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'foodDeliveryApp';
    if ((lowerInput.includes('restaurant') || lowerInput.includes('diner')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'restaurantApp';
    if ((lowerInput.includes('ride') || lowerInput.includes('cab') || lowerInput.includes('taxi') || lowerInput.includes('ola') || lowerInput.includes('uber')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'rideSharingApp';
    if ((lowerInput.includes('chat') || lowerInput.includes('messenger') || lowerInput.includes('whatsapp')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'chatApp';
    if ((lowerInput.includes('social') || lowerInput.includes('instagram') || lowerInput.includes('facebook')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'socialApp';
    if ((lowerInput.includes('crypto') || lowerInput.includes('wallet')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'cryptoWalletApp';
    if ((lowerInput.includes('bank') || lowerInput.includes('banking')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'bankingApp';
    if ((lowerInput.includes('fitness') || lowerInput.includes('gym') || lowerInput.includes('workout')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'fitnessApp';
    if ((lowerInput.includes('health') || lowerInput.includes('medical') || lowerInput.includes('doctor')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'healthApp';
    if ((lowerInput.includes('learning') || lowerInput.includes('education') || lowerInput.includes('course')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'learningApp';
    if ((lowerInput.includes('class') || lowerInput.includes('online class')) && (lowerInput.includes('app') || lowerInput.includes('application'))) return 'onlineClassApp';
    
    return null;
  };

  const addComponentsToCanvas = (componentIds) => {
    componentIds.forEach((compId, index) => {
      const component = getComponentById(compId);
      if (component) {
        dispatch({ type: 'ADD_COMPONENT', payload: { component: { ...component, uniqueId: `${compId}-${Date.now()}-${index}`, id: Date.now() + index } } });
      }
    });
  };

  // Friendly conversation responses for general chat
  const getFriendlyResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Greetings
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey') || lowerInput.includes('namaste') || lowerInput.includes('namaskar')) {
      return [
        "Namaste! 🙏 Kaise hain aap? 😊",
        "Hello! 😄 Kya haal chaal?",
        "Namaste! Main aapki madad ke liye taiyaar hoon!",
        "Hi! 👋 Kya aap koi nayi website bana rahe hain?",
      ];
    }
    
    // How are you
    if (lowerInput.includes('how are you') || lowerInput.includes('kaise ho') || lowerInput.includes('kaisa hai')) {
      return [
        "Main bhut badhiya hoon! 😊 Aapki website banane mein madad karne ke liye taiyaar hoon!",
        "Bahut accha! 😄 Aapke liye kya kar sakta hoon?",
        "Perfect! Aur aap bataiye, kaisi website banani hai?",
      ];
    }
    
    // Thanks / Thank you
    if (lowerInput.includes('thank') || lowerInput.includes('shukriya') || lowerInput.includes('dhanyavad')) {
      return [
        "You're welcome! 😊 Koi baat nahi! Koi aur help chahiye toh bataiye!",
        "Bahut shukriya! 🙏 Koi aur sawaal hai toh poochiye!",
        "It's my pleasure! 😄 Aur kya help chahiye?",
      ];
    }
    
    // Questions about what AI can do
    if (lowerInput.includes('what can you do') || lowerInput.includes('kya kar sakta') || lowerInput.includes('kitna kaam') || lowerInput.includes('abilities')) {
      return [
        "Main aapki amazing websites aur apps bana sakta hoon! 🚀\n\n🛒 E-Commerce stores\n🍔 Restaurant websites\n🏨 Hotel booking\n💰 Crypto platforms\n📱 Android & iOS apps\n🚗 Ride sharing apps\n💬 Chat apps\n🏋️ Fitness apps\n\nBas batayiye aapko kya chahiye!",
        "Main ek超级 AI builder hoon! 😎\n\nWebsite ho ya mobile app - sab bana sakta hoon!\nBataiye, aap kaisa platform banaenge?",
      ];
    }
    
    // Help requests
    if (lowerInput.includes('help') || lowerInput.includes('madad') || lowerInput.includes('sahayata')) {
      return [
        "Bilkul! Main aapki madad ke liye hoon! 😊\n\nAap mujhe bataiye:\n- Kaisi website/app banana chahte hain?\n- Kaunsa business hai?\n- Kaunse features chahiye?\n\nMain sab samjhalunga aur bana dunga! 🎯",
        "Haan haan, main hoon na! 😄\n\nAap bas bataiye aapko kya chahiye -\nWebsite? App? Dono ban sakte hain!",
      ];
    }
    
    // Questions about website types
    if (lowerInput.includes('which website') || lowerInput.includes('kaisi website') || lowerInput.includes('kitna kharch') || lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('kitna maal')) {
      return [
        "Bahut saare options hain! 💰\n\n🛒 Online Shop - 3 components\n🍔 Restaurant - 4 components  \n🏨 Hotel - 4 components\n💰 Crypto - 3 components\n📱 Mobile App - 5-6 components\n\nAap jo chahein, main banaunga! 😄",
        "Choice aapki hai! 🎯\n\nHar tarah ki websites aur apps ban sakti hain.\nBudget ke hisab se components add karenge.\n\nKya pasand hai aapko?",
      ];
    }
    
    // Ready to start
    if (lowerInput.includes('ready') || lowerInput.includes('shuru') || lowerInput.includes('start') || lowerInput.includes('chalo') || lowerInput.includes('lets go')) {
      return [
        "Let's go! 🚀\n\nKis type ki website banaenge?\n🛒 Shop\n🍔 Restaurant\n💰 Crypto\n📱 App\nKuch aur?",
        "Awesome! 😄\n\nPhir se shuru karte hain!\nKaisa platform chahiye - website ya mobile app?",
      ];
    }
    
    // Yes / Haan
    if (lowerInput === 'yes' || lowerInput === 'haan' || lowerInput === 'ha' || lowerInput === 'y') {
      return [
        "Perfect! 🎉\n\nTo fir aapko kaisi website chahiye?\n🛒 E-Commerce\n🍔 Restaurant\n🏨 Hotel\n💰 Crypto\n📱 Mobile App",
        "Great! 😄\n\nTo bataiye, konsi type ki website banayenge?",
      ];
    }
    
    // No / Nahi
    if (lowerInput === 'no' || lowerInput === 'nahi' || lowerInput === 'nah' || lowerInput === 'n') {
      return [
        "Theek hai! 👍\n\nKoi aur sawaal hai toh bataiye!\nAgar website nahi toh mobile app bhi bana sakte hain 📱",
        "No problem! 😊\n\nAgar aapko koi aur cheez chahiye toh bataiye!",
      ];
    }
    
    // Okay / Theek hai
    if (lowerInput.includes('okay') || lowerInput.includes('ok') || lowerInput.includes('theek hai') || lowerInput.includes('thik hai')) {
      return [
        "Great! 😄\n\nAb bataiye, kaisi website banaenge?",
        "Perfect! 👍\n\nKya aapko website ya app chahiye?",
      ];
    }
    
    // Goodbye
    if (lowerInput.includes('bye') || lowerInput.includes('alvida') || lowerInput.includes('chalo') || lowerInput.includes('later')) {
      return [
        "Bye bye! 👋\n\nAgli baar phir milenge! 😊\nWebsite chahiye toh waapis aana!",
        "Alvida! 🙏\n\nMere paas waapis aana jab bhi website chahiye!",
      ];
    }
    
    // Questions about features
    if (lowerInput.includes('features') || lowerInput.includes('features') || lowerInput.includes('kya kya')) {
      return [
        "Bahut saare features available hain! ✨\n\n• E-Commerce - Products, Cart, Checkout\n• Restaurant - Menu, Reservations\n• Crypto - Wallets, Trading\n• Mobile Apps - Push Notifications\n\nKya specific feature chahiye?",
        "Features ki baat karenge toh! 🚀\n\nHar tarah ke powerful components available hain.\nBas jo chahiye woh select karenge!",
      ];
    }
    
    // Default friendly responses
    const defaultResponses = [
      "Interesting! 😄\n\nAapko kaisi website chahiye? E-Commerce, Restaurant, ya kuch aur?",
      "Accha! 👍\n\nTo bataiye, aap kaisa platform bana rahe hain? Website ya mobile app?",
      "Samajh gaya! 😊\n\nAb aap mujhe bataiye - konsi type ki website chahiye?",
      "Great point! 🎯\n\nMain aapki har baat samjhta hoon. Ab bataiye kya chahiye?",
      "Haan bilkul! 😄\n\nWebsite ya app - koi bhi chahiye toh main bana deta hoon!",
      "Nice! 👍\n\nAapke saath baat karke accha lag raha hai!\nAb bataiye, kaisi website banayenge?",
    ];
    
    return defaultResponses;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    const userMessage = { id: Date.now(), type: 'user', text: inputValue, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue('');
    setIsTyping(true);
    
    // Try to get Gemini response first
    let geminiResponse = null;
    if (apiKey && isGeminiReady) {
      try {
        geminiResponse = await callGeminiAPI(userInput, [...messages, userMessage]);
      } catch (e) {
        console.error('Gemini error:', e);
      }
    }
    
    setIsTyping(false);
    
    // If we got a Gemini response, use it
    if (geminiResponse) {
      // Check if user wants to create a website
      const detectedType = detectWebsiteType(userInput);
      if (detectedType && !websiteType) {
        setWebsiteType(detectedType);
        const typeInfo = websiteTemplates[detectedType];
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          type: 'ai', 
          text: geminiResponse + `\n\nAb aap is website ka naam batayiye...`, 
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setChatStep('name');
      } else if (chatStep === 'name') {
        // User providing name after Gemini suggested website
        setWebsiteName(userInput);
        const typeInfo = websiteTemplates[websiteType];
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          type: 'ai', 
          text: `Lajawaab! "${userInput}" - Ye toh perfect naam hai! 😄\n\nAb main isse bana deta hoon...`, 
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setChatStep('building');
        
        setTimeout(() => {
          if (websiteType && websiteTemplates[websiteType]) {
            addComponentsToCanvas(websiteTemplates[websiteType].components);
            dispatch({ 
              type: 'SAVE_WEBSITE', 
              payload: { 
                websiteName: userInput, 
                websiteType: websiteType, 
                components: websiteTemplates[websiteType].components 
              } 
            });
          }
          setMessages(prev => [...prev, { 
            id: Date.now() + 2, 
            type: 'success', 
            text: `🎉 Badhai ho! "${userInput}" website taiyaar hai!\n\nAb aap isse edit kar sakte hain ya nayi website bana sakte hain! 😊`, 
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
          }]);
          setChatStep('done');
        }, 1500);
      } else {
        // Just show Gemini response
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          type: 'ai', 
          text: geminiResponse, 
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
        }]);
      }
      return;
    }
    
    // Fallback to local responses
    setTimeout(() => {
      setIsTyping(false);
      
      // Check if user is asking for themes
      if (detectThemeRequest(userInput) && state.addedComponents.length > 0) {
        const themeOptions = themes.map(t => `${t.emoji} ${t.name}`).join('\n');
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          type: 'ai', 
          text: `Bilkul! 🎨 Main aapko kuch awesome themes dikhata hoon!\n\n${themeOptions}\n\nKis theme mein website chahiye? Bas uska number ya naam likhein!`, 
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
        }]);
        return;
      }
      
      // Check if user is selecting a theme by number or name
      const selectedTheme = themes.find(t => 
        userInput.toLowerCase().includes(t.id) || 
        userInput.toLowerCase().includes(t.name.toLowerCase()) ||
        (userInput.trim() === String(themes.indexOf(t) + 1))
      );
      if (selectedTheme) {
        handleThemeSelection(selectedTheme);
        return;
      }
      
      // Check if we're in the middle of a conversation flow
      if (chatStep === 'welcome') {
        const detectedType = detectWebsiteType(userInput);
        
        if (detectedType) {
          // User wants to create a specific type of website
          setWebsiteType(detectedType);
          const typeInfo = websiteTemplates[detectedType];
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            type: 'ai', 
            text: `Awesome choice! ${typeInfo.name} - Ye toh bahut badhiya hai! 🎉\n\nAb aap mujhe iska naam batayiye...`, 
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
          }]);
          setChatStep('name');
        } else {
          // User is having a general conversation - respond friendly
          const responses = getFriendlyResponse(userInput);
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            type: 'ai', 
            text: randomResponse, 
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
          }]);
        }
      } else if (chatStep === 'name') {
        // User is providing website name
        setWebsiteName(userInput);
        const typeInfo = websiteTemplates[websiteType];
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          type: 'ai', 
          text: `Lajawaab! "${userInput}" - Ye toh perfect naam hai! 😄\n\nAb main isse bana deta hoon...`, 
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setChatStep('building');
        
        setTimeout(() => {
          addComponentsToCanvas(typeInfo.components);
          
          // Save website to long-term memory (3 years)
          dispatch({ 
            type: 'SAVE_WEBSITE', 
            payload: { 
              websiteName: userInput, 
              websiteType: websiteType, 
              components: typeInfo.components 
            } 
          });
          
          // Update current website
          dispatch({
            type: 'SET_CURRENT_WEBSITE',
            payload: {
              name: userInput,
              type: websiteType,
              createdAt: Date.now(),
            }
          });
          
          // Show features of added components
          const features = formatComponentFeatures(typeInfo.components);
          
          setMessages(prev => [...prev, { 
            id: Date.now() + 2, 
            type: 'success', 
            text: `🎉 Badhai ho! "${userInput}" website taiyaar hai!\n\n✨ Features jo add kiye gaye:\n${features}\n\nAb aap isse edit kar sakte hain ya nayi website bana sakte hain! 😊`, 
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
          }]);
          setChatStep('done');
        }, 1500);
      } else if (chatStep === 'done') {
        // User finished creating website - ask what next
        const responses = [
          "Woo hoo! 🎊\n\nAb aap chahein toh nayi website bana sakte hain, ya isme changes kar sakte hain!",
          "Kya aapko aur websites chahiye? 😄\n\nBas bolo!",
          "Aur bhi banana hai? 🚀\n\nBilkul, ek aur bana deta hoon!",
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          type: 'ai', 
          text: randomResponse, 
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setChatStep('welcome');
        setWebsiteName('');
        setWebsiteType('');
      }
    }, 800);
  };

  // Theme quick buttons
  const themeActions = [
    { id: 'dark', emoji: '🌙', label: 'Dark' },
    { id: 'light', emoji: '☀️', label: 'Light' },
    { id: 'purple', emoji: '🟣', label: 'Purple' },
    { id: 'blue', emoji: '🔵', label: 'Blue' },
    { id: 'colorful', emoji: '🌈', label: 'Color' },
  ];

  const quickActions = [
    // Websites
    { icon: ShoppingCart, label: 'E-Commerce', type: 'ecommerce' },
    { icon: Car, label: 'Restaurant', type: 'restaurant' },
    { icon: Wallet, label: 'Crypto', type: 'crypto' },
    { icon: Car, label: 'Delivery', type: 'delivery' },
    { icon: Zap, label: 'Startup', type: 'startup' },
    { icon: Building2, label: 'Business', type: 'business' },
    // Mobile Apps
    { icon: Smartphone, label: 'Android App', type: 'androidApp' },
    { icon: Smartphone, label: 'iOS App', type: 'iosApp' },
    { icon: Smartphone, label: 'Mobile App', type: 'mobileApp' },
    { icon: Smartphone, label: 'Flutter App', type: 'flutterApp' },
  ];

  const handleThemeQuickAction = (themeId) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      handleThemeSelection(theme);
    }
  };

  const handleQuickAction = (type) => {
    const typeInfo = websiteTemplates[type];
    setInputValue(`I want to create a ${typeInfo.name}`);
    setWebsiteType(type);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), type: 'ai', text: `Perfect! ${typeInfo.name} - Ye excellent choice hai! 🎉\n\nAb aap mujhe is website ka naam bataye?`, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
      setChatStep('name');
    }, 500);
  };

  // AI Architect - Smart Component Selection based on user description
  const getComponentsForDescription = (description) => {
    const lowerDesc = description.toLowerCase();
    let components = [];
    
    // Food Delivery
    if (lowerDesc.includes('food') || lowerDesc.includes('delivery') || lowerDesc.includes('restaurant')) {
      components = ['navbar', 'hero', 'menuGrid', 'shoppingCart', 'checkoutForm', 'orderTracking', 'driverTracking', 'fareEstimator', 'footer'];
    }
    // E-Commerce / Shop
    else if (lowerDesc.includes('shop') || lowerDesc.includes('ecommerce') || lowerDesc.includes('store') || lowerDesc.includes('buy')) {
      components = ['navbar', 'hero', 'productGrid', 'shoppingCart', 'checkoutForm', 'paymentGateway', 'footer'];
    }
    // Crypto / DeFi
    else if (lowerDesc.includes('crypto') || lowerDesc.includes('defi') || lowerDesc.includes('blockchain') || lowerDesc.includes('trading')) {
      components = ['navbar', 'hero', 'priceTickers', 'walletBalance', 'tokenSwap', 'tradingViewCharts', 'multiWallet', 'footer'];
    }
    // Uber / Ride Sharing
    else if (lowerDesc.includes('uber') || lowerDesc.includes('ride') || lowerDesc.includes('cab') || lowerDesc.includes('taxi') || lowerDesc.includes('transport')) {
      components = ['navbar', 'hero', 'surgePricing', 'fareEstimator', 'liveTracking', 'driverTracking', 'otpSystem', 'driverRating', 'footer'];
    }
    // Hotel / Booking
    else if (lowerDesc.includes('hotel') || lowerDesc.includes('booking') || lowerDesc.includes('resort') || lowerDesc.includes('travel')) {
      components = ['navbar', 'hero', 'roomListing', 'amenitiesGrid', 'reservationForm', 'googleMaps', 'testimonialCarousel', 'footer'];
    }
    // Business / Corporate
    else if (lowerDesc.includes('business') || lowerDesc.includes('company') || lowerDesc.includes('corporate') || lowerDesc.includes('consulting')) {
      components = ['navbar', 'hero', 'serviceGrid', 'teamProfiles', 'contactForm', 'testimonialCarousel', 'footer'];
    }
    // Startup / SaaS
    else if (lowerDesc.includes('startup') || lowerDesc.includes('saas') || lowerDesc.includes('app')) {
      components = ['navbar', 'hero', 'serviceGrid', 'pricingTables', 'testimonialCarousel', 'contactForm', 'footer'];
    }
    // Social Media
    else if (lowerDesc.includes('social') || lowerDesc.includes('chat') || lowerDesc.includes('messenger')) {
      components = ['navbar', 'hero', 'aiChatbot', 'testimonialCarousel', 'contactForm', 'footer'];
    }
    // Fitness / Gym
    else if (lowerDesc.includes('fitness') || lowerDesc.includes('gym') || lowerDesc.includes('workout') || lowerDesc.includes('health')) {
      components = ['navbar', 'hero', 'classSchedule', 'trainerProfiles', 'membershipPlans', 'contactForm', 'footer'];
    }
    // Learning / Course
    else if (lowerDesc.includes('learning') || lowerDesc.includes('course') || lowerDesc.includes('education') || lowerDesc.includes('online class')) {
      components = ['navbar', 'hero', 'courseListing', 'videoPlayer', 'quiz', 'progressTracker', 'certificateGenerator', 'footer'];
    }
    // Medical / Doctor
    else if (lowerDesc.includes('doctor') || lowerDesc.includes('medical') || lowerDesc.includes('health') || lowerDesc.includes('hospital')) {
      components = ['navbar', 'hero', 'doctorProfiles', 'appointmentForm', 'patientPortal', 'contactForm', 'footer'];
    }
    // Job Portal
    else if (lowerDesc.includes('job') || lowerDesc.includes('career') || lowerDesc.includes('recruitment')) {
      components = ['navbar', 'hero', 'jobListing', 'companyProfiles', 'applicationForm', 'resumeUpload', 'footer'];
    }
    // Real Estate
    else if (lowerDesc.includes('real estate') || lowerDesc.includes('property') || lowerDesc.includes('house')) {
      components = ['navbar', 'hero', 'propertyGrid', 'quoteCalculator', 'googleMaps', 'testimonialCarousel', 'footer'];
    }
    // Blog / News
    else if (lowerDesc.includes('blog') || lowerDesc.includes('news') || lowerDesc.includes('magazine')) {
      components = ['navbar', 'hero', 'blogCards', 'newsletterSignup', 'socialSidebar', 'footer'];
    }
    // Default fallback
    else {
      components = ['navbar', 'hero', 'serviceGrid', 'contactForm', 'footer'];
    }
    
    return components;
  };

  // Calculate infrastructure value
  const calculateInfrastructureValue = (components) => {
    const componentPrices = {
      navbar: 5, hero: 5, serviceGrid: 5, footer: 5,
      productGrid: 5, shoppingCart: 5, checkoutForm: 5,
      priceTickers: 30, walletBalance: 30, tokenSwap: 30, tradingViewCharts: 30, multiWallet: 30,
      menuGrid: 5, orderTracking: 100, driverTracking: 100, fareEstimator: 100,
      surgePricing: 100, liveTracking: 100, otpSystem: 100, driverRating: 100,
      roomListing: 5, amenitiesGrid: 5, reservationForm: 5, googleMaps: 5,
      teamProfiles: 5, testimonialCarousel: 5, contactForm: 5,
      pricingTables: 5, aiChatbot: 40,
      classSchedule: 5, trainerProfiles: 5, membershipPlans: 5,
      courseListing: 5, videoPlayer: 5, quiz: 5, progressTracker: 5, certificateGenerator: 5,
      doctorProfiles: 5, appointmentForm: 5, patientPortal: 70,
      jobListing: 5, companyProfiles: 5, applicationForm: 5, resumeUpload: 5,
      propertyGrid: 5, quoteCalculator: 5,
      blogCards: 5, newsletterSignup: 5, socialSidebar: 5,
    };
    
    return components.reduce((total, compId) => total + (componentPrices[compId] || 5), 0);
  };

  // AI Architect handler - when user types project description
  const handleAIArchitect = (description) => {
    setIsArchitectMode(true);
    setArchitectDescription(description);
    
    // Show initializing animation
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'system',
      text: `🔧 AI Architect initializing...\n\nScanning ${allComponents.length} modules for: "${description}"`,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setTimeout(() => {
      const selectedComponents = getComponentsForDescription(description);
      const infraValue = calculateInfrastructureValue(selectedComponents);
      
      // Show building animation
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'system',
        text: `⚡ System Initializing...\n\nDeploying modules:\n${selectedComponents.map((c, i) => `${i + 1}. ${c.replace(/([A-Z])/g, ' $1').trim()}`).join('\n')}`,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }]);
      
      setTimeout(() => {
        // Add components one by one with animation
        selectedComponents.forEach((compId, index) => {
          setTimeout(() => {
            const component = getComponentInfo(compId);
            if (component) {
              dispatch({ 
                type: 'ADD_COMPONENT', 
                payload: { 
                  component: { 
                    ...component, 
                    uniqueId: `${compId}-${Date.now()}-${index}`, 
                    id: Date.now() + index 
                  } 
                } 
              });
            }
          }, index * 300);
        });
        
        // Show final report
        setTimeout(() => {
          const securityScore = selectedComponents.some(c => c.includes('auth') || c.includes('wallet') || c.includes('payment')) ? '99%' : '85%';
          const revenueLevel = infraValue > 100 ? 'High' : infraValue > 50 ? 'Medium' : 'Low';
          
          setMessages(prev => [...prev, {
            id: Date.now() + 2,
            type: 'success',
            text: `🎉 AI Architect has deployed!\n\n📊 Infrastructure Report:\n• Modules Deployed: ${selectedComponents.length}\n• Security Score: ${securityScore}\n• Revenue Potential: ${revenueLevel}\n• Total Value: $${infraValue}\n\nKya aap koi changes karna chahte hain?`,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
          }]);
          setIsArchitectMode(false);
        }, selectedComponents.length * 300 + 500);
      }, 1500);
    }, 1500);
  };

  // Theme options
  const themes = [
    { id: 'dark', name: 'Dark Theme', emoji: '🌙', colors: '#000000, #1a1a2e, #16213e' },
    { id: 'light', name: 'Light Theme', emoji: '☀️', colors: '#ffffff, #f5f5f5, #e0e0e0' },
    { id: 'colorful', name: 'Colorful Theme', emoji: '🌈', colors: '#ff6b6b, #4ecdc4, #45b7d1' },
    { id: 'minimal', name: 'Minimal Theme', emoji: '⬜', colors: '#ffffff, #000000, #888888' },
    { id: 'purple', name: 'Purple Theme', emoji: '🟣', colors: '#6b21a8, #9333ea, #c084fc' },
    { id: 'blue', name: 'Blue Theme', emoji: '🔵', colors: '#1e3a8a, #3b82f6, #60a5fa' },
  ];

  const handleThemeSelection = (theme) => {
    dispatch({
      type: 'SET_CURRENT_WEBSITE',
      payload: { ...state.currentWebsite, theme: theme.id }
    });
    
    const themeMessages = [
      `Perfect! ${theme.emoji} ${theme.name} apply ho gaya!\n\nAb aap chahein toh website preview dekhein ya koi aur change karein!`,
      `Awesome! ${theme.emoji} ${theme.name} set ho gaya!\n\nKya aapko koi aur modification chahiye?`,
      `Done! ${theme.emoji} ${theme.name} lag gaya!\n\nWebsite ab fresh look mein hai!`,
    ];
    
    const randomMsg = themeMessages[Math.floor(Math.random() * themeMessages.length)];
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      type: 'success', 
      text: randomMsg, 
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
    }]);
  };

  // Check if user wants themes
  const detectThemeRequest = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes('theme') || lower.includes('color') || lower.includes('design') || lower.includes('look') || lower.includes('style')) {
      return true;
    }
    return false;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        // Make the entire box draggable
        drag
        dragMomentum={false}
        dragConstraints={{ left: 0, right: window.innerWidth - 420, top: 0, bottom: window.innerHeight - 500 }}
        whileDrag={{ scale: 1.02, cursor: "grabbing" }}
        className={`fixed bg-[#0f0f0f] border border-purple-500/30 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.3)] overflow-hidden z-[100] ${
          isOpen ? 'w-[420px]' : 'w-auto'
        }`}
        style={{
          // Position after drag
          left: isOpen ? undefined : undefined,
          bottom: isOpen ? 24 : undefined,
          right: isOpen ? undefined : 24,
        }}
      >
        {/* Draggable Header */}
        <div className={`bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between ${isOpen ? '' : 'p-2'}`}>
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className={isOpen ? '' : 'cursor-grab active:cursor-grabbing'}
            >
              {isOpen ? <Sparkles className="w-5 h-5 text-white" /> : (
                <motion.div 
                  animate={{ 
                    boxShadow: ['0 0 5px #a855f7', '0 0 20px #a855f7', '0 0 5px #a855f7']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </motion.div>
            {isOpen && (
              <div>
                <span className="text-white font-bold text-sm flex items-center gap-2">
                  AI Website Builder
                  <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className={`w-2 h-2 rounded-full ${chatStep === 'building' ? 'bg-yellow-400' : 'bg-green-400'}`} />
                </span>
                <span className="text-[10px] text-white/70 flex items-center gap-1">
                  <Bot className="w-3 h-3" /> {chatStep === 'building' ? 'Building...' : 'Ready to help'}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Minimize Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              title={isOpen ? "Minimize to corner" : "Expand"}
            >
              {isOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 420 }} exit={{ height: 0 }} className="overflow-hidden">
        <div className="p-3 border-b border-white/5 bg-gradient-to-r from-purple-900/20 to-pink-900/10">
                {/* AI Architect - Smart Description Input */}
                <div className="mb-3">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Describe your empire (e.g., An Uber clone for Crypto investors)..."
                      value={architectDescription}
                      onChange={(e) => setArchitectDescription(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && architectDescription.trim()) {
                          handleAIArchitect(architectDescription);
                          setArchitectDescription('');
                        }
                      }}
                      disabled={isArchitectMode}
                      className="w-full bg-black/60 border border-purple-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:border-purple-500 outline-none placeholder:text-gray-500 font-mono"
                    />
                    <button 
                      onClick={() => {
                        if (architectDescription.trim()) {
                          handleAIArchitect(architectDescription);
                          setArchitectDescription('');
                        }
                      }}
                      disabled={!architectDescription.trim() || isArchitectMode}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-purple-600 rounded-lg disabled:opacity-50"
                    >
                      <Wand2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <p className="text-[9px] text-gray-500 mt-1">Press Enter to build with AI Architect</p>
                </div>
                
                <p className="text-[10px] text-purple-400 mb-2 font-medium">🛠️ CREATE WEBSITE</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, idx) => (
                    <button key={idx} onClick={() => handleQuickAction(action.type)} disabled={chatStep === 'building'} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-purple-500/20 border border-white/10 text-xs text-white/80 disabled:opacity-50">
                      <action.icon className="w-3.5 h-3.5" /> {action.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-pink-400 mb-2 font-medium mt-3">🎨 CHANGE THEME</p>
                <div className="flex flex-wrap gap-2">
                  {themeActions.map((theme, idx) => (
                    <button key={idx} onClick={() => handleThemeQuickAction(theme.id)} disabled={state.addedComponents.length === 0 || chatStep === 'building'} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-pink-500/20 border border-white/10 text-xs text-white/80 disabled:opacity-30">
                      <span>{theme.emoji}</span> {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 h-[240px] overflow-y-auto text-gray-300 text-sm space-y-3 bg-[#0a0a0a]">
                {messages.map((msg) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[95%] p-3 rounded-2xl ${msg.type === 'user' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : msg.type === 'success' ? 'bg-green-900/40 border border-green-500/40 text-green-200' : 'bg-white/5 border border-white/10 text-gray-200'}`}>
                      {msg.type === 'ai' && <span className="text-[10px] text-purple-400 block mb-1"><Bot className="w-2.5 h-2.5 inline" /> AI Builder</span>}
                      {msg.type === 'success' && <span className="text-[10px] text-green-400 block mb-1"><Wand2 className="w-2.5 h-2.5 inline" /> Success</span>}
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                      <span className="text-[9px] text-gray-500 mt-1.5 block">{msg.time}</span>
                    </div>
                  </motion.div>
                ))}
                {isTyping && <div className="flex items-center gap-2 text-purple-400"><Loader2 className="w-4 h-4 animate-spin" /><span className="text-xs">AI thinking...</span></div>}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t border-white/10 bg-[#0f0f0f]">
                <div className="flex items-center justify-between mb-2">
                  <div className="relative">
                    <button onClick={() => setShowLanguageMenu(!showLanguageMenu)} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80">
                      <Globe className="w-3 h-3" /> {languages[selectedLanguage]?.flag} {selectedLanguage.toUpperCase()}
                    </button>
                    {showLanguageMenu && (
                      <div className="absolute bottom-full left-0 mb-2 w-48 max-h-48 overflow-y-auto bg-black border border-white/20 rounded-xl p-2 z-50">
                        {Object.entries(languages).map(([code, lang]) => (
                          <button key={code} onClick={() => { setSelectedLanguage(code); setShowLanguageMenu(false); }} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs ${selectedLanguage === code ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}>
                            <span>{lang.flag}</span><span>{lang.native}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500">{isListening ? '🎙️ Listening...' : 'Click mic to speak'}</span>
                </div>
                
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder={chatStep === 'name' ? 'Website ka naam likhein...' : 'Bolkar website banaayein...'} disabled={isTyping || chatStep === 'building'} className="w-full bg-black border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-purple-500 outline-none placeholder:text-gray-600" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => {
                    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert('Use Chrome/Edge for voice'); return; }
                    if (isListening) { if (recognitionRef.current) recognitionRef.current.stop(); setIsListening(false); }
                    else { const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; const recognition = new SpeechRecognition(); recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US'; recognition.onstart = () => setIsListening(true); recognition.onend = () => setIsListening(false); recognition.onresult = (e) => setInputValue(e.results[0][0].transcript); recognition.start(); recognitionRef.current = recognition; }
                  }} disabled={isTyping || chatStep === 'building'} className={`p-2.5 rounded-xl disabled:opacity-50 ${isListening ? 'bg-red-500 animate-pulse' : 'bg-white/10'}`}>
                    {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-white" />}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping || chatStep === 'building'} className="bg-gradient-to-r from-purple-600 to-pink-600 p-2.5 rounded-xl text-white disabled:opacity-50">
                    {chatStep === 'building' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <div className="p-3 bg-[#0a0a0a] flex items-center justify-center gap-2">
            <Wand2 className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] text-purple-400">AI se website banao</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
