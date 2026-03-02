import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

// Component pricing data
const COMPONENT_PRICES = {
  // Basic UI Components - $5 each
  navbar: 5,
  hero: 5,
  serviceGrid: 5,
  testimonialCarousel: 5,
  contactForm: 5,
  faqAccordion: 5,
  footer: 5,
  portfolioFilter: 5,
  teamProfiles: 5,
  pricingTables: 5,
  googleMaps: 5,
  newsletterSignup: 5,
  progressBars: 5,
  countdownTimer: 5,
  imageHotspots: 5,
  socialSidebar: 5,
  logoSlider: 5,
  blogCards: 5,
  tabs: 5,
  verticalMenu: 5,
  searchBar: 5,
  buttons: 5,
  alerts: 5,
  cards: 5,
  
  // Crypto & Fintech - $30 each
  multiWallet: 30,
  priceTickers: 30,
  tradingViewCharts: 30,
  tokenSwap: 30,
  walletBalance: 30,
  liquidityPool: 30,
  yieldFarming: 30,
  smartContract: 30,
  nftMinting: 30,
  icoLaunchpad: 30,
  gasFeeEstimator: 30,
  transactionHistory: 30,
  whaleAlert: 30,
  fearGreedIndex: 30,
  fiatConverter: 30,
  portfolioHeatmap: 30,
  dexAggregator: 30,
  crossChainBridge: 30,
  tokenMinting: 30,
  airdropDistributor: 30,
  
  // Mobility & Logistics - $100-$150
  fleetTracking: 100,
  surgePricing: 100,
  driverOnboarding: 100,
  autoDispatch: 100,
  routeOptimization: 100,
  passengerView: 100,
  otpSystem: 100,
  demandHeatmap: 100,
  vehicleDocuments: 100,
  fareEstimator: 100,
  
  // Enterprise Modules - $70-$120
  saasSubscription: 70,
  aiSalesAvatar: 120,
  inventorySync: 70,
  lmsPortal: 70,
  virtualTour: 100,
  storeImporter: 80,
  contentAutomator: 70,
  cartRecovery: 70,
  vendorManagement: 80,
  seoEngine: 90,
  
  // Admin & Command Center - $70-$120
  masterDashboard: 100,
  userManagement: 80,
  revenueCenter: 90,
  securityMonitor: 100,
  cmsEditor: 70,
  serverLogs: 80,
  supportTicketing: 70,
  notificationCenter: 70,
  databaseVisualizer: 90,
  affiliateTracker: 80,
  
  // AI Tools - $30-$50
  aiChatbot: 40,
  sentimentAnalysis: 35,
  predictiveAnalytics: 45,
  voiceCommand: 40,
  imageToNft: 50,
  
  // Elite Tier - $500/week
  aiCryptoCommander: 500,
  strategyBuilder: 500,
  riskManagement: 500,
};

// Generate unique user ID for long-term tracking
const generateUserId = () => {
  let userId = localStorage.getItem('krynox_user_id');
  if (!userId) {
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('krynox_user_id', userId);
  }
  return userId;
};

// Website history storage key
const WEBSITE_HISTORY_KEY = 'krynox_website_history';
const WEBSITE_HISTORY_EXPIRY = 3 * 365 * 24 * 60 * 60 * 1000; // 3 years in milliseconds

// Load website history from localStorage
const loadWebsiteHistory = () => {
  try {
    const saved = localStorage.getItem(WEBSITE_HISTORY_KEY);
    if (saved) {
      const history = JSON.parse(saved);
      // Filter out expired entries
      const now = Date.now();
      const validHistory = history.filter(entry => {
        const age = now - entry.createdAt;
        return age < WEBSITE_HISTORY_EXPIRY;
      });
      // Save cleaned history back
      if (validHistory.length !== history.length) {
        localStorage.setItem(WEBSITE_HISTORY_KEY, JSON.stringify(validHistory));
      }
      return validHistory;
    }
  } catch (e) {
    console.error('Failed to load website history:', e);
  }
  return [];
};

// Save website to history
const saveWebsiteToHistory = (websiteData) => {
  try {
    const history = loadWebsiteHistory();
    // Check if website with same name exists
    const existingIndex = history.findIndex(w => w.name === websiteData.name);
    if (existingIndex >= 0) {
      // Update existing entry
      history[existingIndex] = {
        ...history[existingIndex],
        ...websiteData,
        updatedAt: Date.now(),
      };
    } else {
      // Add new entry
      history.push({
        ...websiteData,
        id: 'site_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
    localStorage.setItem(WEBSITE_HISTORY_KEY, JSON.stringify(history));
    return history;
  } catch (e) {
    console.error('Failed to save website history:', e);
    return [];
  }
};

// Initial state
const initialState = {
  // Components added to canvas
  addedComponents: [],

  // Hidden bill total
  billTotal: 0,

  // Undo/Redo history
  history: [],
  historyIndex: -1,

  // Selected component
  selectedComponent: null,

  // AI Chat
  chatMessages: [],
  aiMemory: {
    userPreferences: {},
    conversationHistory: [],
    projectHistory: [],
    lastActive: null,
  },

  // UI State
  isInvoiceModalOpen: false,
  isCommanderPopupOpen: false,
  isCommanderUnlocked: false,
  isEvolutionComplete: false,
  hasSeenPrices: false,

  // Active tab in component library
  activeLibraryTab: 'layouts',

  // Search query
  searchQuery: '',

  // View Mode (editor or live)
  viewMode: 'editor',

  // User identification for long-term tracking
  userId: generateUserId(),

  // Website history for long-term memory (2-3 years)
  websiteHistory: loadWebsiteHistory(),

  // Current website being built
  currentWebsite: {
    name: '',
    type: '',
    theme: 'dark', // dark, light, colorful, minimal
    createdAt: null,
  },
};

// Action types
const ACTIONS = {
  ADD_COMPONENT: 'ADD_COMPONENT',
  REMOVE_COMPONENT: 'REMOVE_COMPONENT',
  SELECT_COMPONENT: 'SELECT_COMPONENT',
  ADD_CHAT_MESSAGE: 'ADD_CHAT_MESSAGE',
  UPDATE_AI_MEMORY: 'UPDATE_AI_MEMORY',
  TOGGLE_INVOICE_MODAL: 'TOGGLE_INVOICE_MODAL',
  TOGGLE_COMMANDER_POPUP: 'TOGGLE_COMMANDER_POPUP',
  SET_LIBRARY_TAB: 'SET_LIBRARY_TAB',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  RESET_BILL: 'RESET_BILL',
  UNDO: 'UNDO',
  REDO: 'REDO',
  UNLOCK_COMMANDER: 'UNLOCK_COMMANDER',
  COMPLETE_EVOLUTION: 'COMPLETE_EVOLUTION',
  TOGGLE_VIEW_MODE: 'TOGGLE_VIEW_MODE',
  SAVE_WEBSITE: 'SAVE_WEBSITE',
  LOAD_WEBSITE: 'LOAD_WEBSITE',
  SET_CURRENT_WEBSITE: 'SET_CURRENT_WEBSITE',
  UPDATE_WEBSITE_HISTORY: 'UPDATE_WEBSITE_HISTORY',
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_COMPONENT: {
      const { component } = action.payload;
      const newComponents = [...state.addedComponents, component];
      const newTotal = calculateTotal(newComponents);
      
      // Save to history
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({
        addedComponents: newComponents,
        billTotal: newTotal,
      });
      
      // Check if should trigger Commander popup
      const shouldTriggerCommander = newTotal >= 3000 && !state.isCommanderPopupOpen;
      
      return {
        ...state,
        addedComponents: newComponents,
        billTotal: newTotal,
        isCommanderPopupOpen: shouldTriggerCommander ? true : state.isCommanderPopupOpen,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }
    
    case ACTIONS.REMOVE_COMPONENT: {
      const { componentId } = action.payload;
      // Filter by uniqueId first, fallback to id
      const newComponents = state.addedComponents.filter(c => c.uniqueId !== componentId && c.id !== componentId);
      const newTotal = calculateTotal(newComponents);
      
      // Save to history
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({
        addedComponents: newComponents,
        billTotal: newTotal,
      });
      
      return {
        ...state,
        addedComponents: newComponents,
        billTotal: newTotal,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }
    
    case ACTIONS.SELECT_COMPONENT:
      return {
        ...state,
        selectedComponent: action.payload.component,
      };
    
    case ACTIONS.ADD_CHAT_MESSAGE: {
      const { message } = action.payload;
      return {
        ...state,
        chatMessages: [...state.chatMessages, message],
        aiMemory: {
          ...state.aiMemory,
          conversationHistory: [...state.aiMemory.conversationHistory, message],
        },
      };
    }
    
    case ACTIONS.UPDATE_AI_MEMORY:
      return {
        ...state,
        aiMemory: { ...state.aiMemory, ...action.payload },
      };
    
    case ACTIONS.TOGGLE_INVOICE_MODAL:
      return {
        ...state,
        isInvoiceModalOpen: !state.isInvoiceModalOpen,
        hasSeenPrices: true,
      };
    
    case ACTIONS.TOGGLE_COMMANDER_POPUP:
      return {
        ...state,
        isCommanderPopupOpen: !state.isCommanderPopupOpen,
      };
    
    case ACTIONS.SET_LIBRARY_TAB:
      return {
        ...state,
        activeLibraryTab: action.payload,
      };
    
    case ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    
    case ACTIONS.RESET_BILL:
      return {
        ...state,
        addedComponents: [],
        billTotal: 0,
      };
    
    case ACTIONS.UNDO: {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      const previousState = state.history[newIndex];
      return {
        ...state,
        ...previousState,
        historyIndex: newIndex,
      };
    }
    
    case ACTIONS.REDO: {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      const nextState = state.history[newIndex];
      return {
        ...state,
        ...nextState,
        historyIndex: newIndex,
      };
    }
    
    case ACTIONS.UNLOCK_COMMANDER:
      return {
        ...state,
        isCommanderUnlocked: true,
      };
    
    case ACTIONS.COMPLETE_EVOLUTION:
      return {
        ...state,
        isEvolutionComplete: true,
        isCommanderPopupOpen: false,
      };

    case ACTIONS.TOGGLE_VIEW_MODE:
      return {
        ...state,
        viewMode: state.viewMode === 'editor' ? 'live' : 'editor',
      };

    case ACTIONS.SAVE_WEBSITE: {
      const { websiteName, websiteType, components } = action.payload;
      const websiteData = {
        name: websiteName,
        type: websiteType,
        components: components.map(c => c.id),
        componentCount: components.length,
        userId: state.userId,
      };
      const newHistory = saveWebsiteToHistory(websiteData);
      return {
        ...state,
        websiteHistory: newHistory,
      };
    }

    case ACTIONS.SET_CURRENT_WEBSITE:
      return {
        ...state,
        currentWebsite: action.payload,
      };

    case ACTIONS.UPDATE_WEBSITE_HISTORY:
      return {
        ...state,
        websiteHistory: action.payload,
      };

    default:
      return state;
  }
}

// Calculate total bill
function calculateTotal(components) {
  return components.reduce((total, comp) => {
    const price = COMPONENT_PRICES[comp.type] || 5;
    return total + price;
  }, 0);
}

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('krynox_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Only restore certain fields
        if (parsed.addedComponents) {
          parsed.addedComponents.forEach(comp => {
            dispatch({ type: ACTIONS.ADD_COMPONENT, payload: { component: comp } });
          });
        }
        if (parsed.aiMemory) {
          dispatch({ type: ACTIONS.UPDATE_AI_MEMORY, payload: parsed.aiMemory });
        }
        if (parsed.viewMode) {
          // Set viewMode after initial load
          setTimeout(() => {
            dispatch({ type: ACTIONS.TOGGLE_VIEW_MODE });
          }, 0);
        }
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);
  
  // Save to localStorage on changes
  useEffect(() => {
    const stateToSave = {
      addedComponents: state.addedComponents,
      aiMemory: state.aiMemory,
      viewMode: state.viewMode,
    };
    localStorage.setItem('krynox_state', JSON.stringify(stateToSave));
  }, [state.addedComponents, state.aiMemory, state.viewMode]);
  
  return (
    <AppContext.Provider value={{ state, dispatch, COMPONENT_PRICES }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
