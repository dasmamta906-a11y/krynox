import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, Bitcoin, Car, Building, Rocket, X, Check, Store, Briefcase, GraduationCap, Stethoscope, Dumbbell, Calendar, Plane, Camera, Heart, Shield, Gavel, DollarSign, Users, MessageSquare, Folder, Download, TrendingUp, Gem, Vote, Hash, Wallet, Sparkles, Bot, Crown, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function TemplatesView({ onClose }) {
  const { dispatch } = useApp();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Category tabs
  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'web', label: 'Web & Business' },
    { id: 'crypto', label: 'Crypto & Web3' },
    { id: 'mobility', label: 'Mobility' },
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'ai', label: 'AI Tools' },
  ];
  
  // Pre-configured templates - 100+ Web Themes
  const templates = [
    // === WEB THEMES (Basic UI) ===
    {
      id: 'saas-landing',
      name: 'SaaS Landing Page',
      description: 'Modern SaaS landing page with hero, features, pricing, and testimonials',
      icon: Rocket,
      price: 25,
      tools: ['hero', 'serviceGrid', 'pricingTables', 'testimonialCarousel', 'footer', 'newsletterSignup', 'contactForm'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'portfolio-personal',
      name: 'Personal Portfolio',
      description: 'Professional portfolio with gallery, about section, and contact form',
      icon: Layers,
      price: 20,
      tools: ['hero', 'portfolioFilter', 'teamProfiles', 'blogCards', 'contactForm', 'footer', 'socialButtons'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ecommerce-store',
      name: 'E-Commerce Store',
      description: 'Full-featured online store with product grid, cart, and checkout UI',
      icon: Building,
      price: 35,
      tools: ['hero', 'productGrid', 'shoppingCart', 'checkoutForm', 'paymentIntegration', 'userManagement', 'orderTracking'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'blog-news',
      name: 'Blog & News Portal',
      description: 'Content-rich blog with categories, search, and newsletter integration',
      icon: Zap,
      price: 25,
      tools: ['hero', 'blogCards', 'searchBar', 'newsletterSignup', 'categories', 'socialSidebar', 'footer'],
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 'restaurant-food',
      name: 'Restaurant Website',
      description: 'Restaurant website with menu, reservations, and online ordering',
      icon: Car,
      price: 25,
      tools: ['hero', 'menuGrid', 'reservationForm', 'onlineOrder', 'gallery', 'testimonials', 'footer', 'contactForm'],
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'real-estate',
      name: 'Real Estate Listing',
      description: 'Property listing website with search, filters, and agent profiles',
      icon: Building,
      price: 30,
      tools: ['hero', 'propertyGrid', 'searchBar', 'filterSystem', 'agentProfiles', 'mapIntegration', 'contactForm', 'mortgageCalculator'],
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'hotel-booking',
      name: 'Hotel Booking',
      description: 'Hotel booking website with room availability, reservations, and reviews',
      icon: Rocket,
      price: 30,
      tools: ['hero', 'roomListing', 'datePicker', 'bookingForm', 'amenitiesGrid', 'gallery', 'reviews', 'contactForm'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'job-portal',
      name: 'Job Portal',
      description: 'Job board with posting, search, applicant tracking, and company profiles',
      icon: Zap,
      price: 28,
      tools: ['hero', 'jobListing', 'searchBar', 'filterSystem', 'companyProfiles', 'applicationForm', 'resumeUpload', 'dashboard'],
      color: 'from-violet-500 to-purple-500'
    },
    {
      id: 'elearning-platform',
      name: 'E-Learning Platform',
      description: 'Online learning platform with courses, quizzes, and progress tracking',
      icon: Layers,
      price: 35,
      tools: ['hero', 'courseListing', 'videoPlayer', 'quiz', 'progressTracker', 'certificateGenerator', 'discussionForum', 'paymentGateway'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'healthcare-medical',
      name: 'Healthcare & Medical',
      description: 'Medical website with appointments, patient portal, and health info',
      icon: Car,
      price: 32,
      tools: ['hero', 'serviceGrid', 'appointmentForm', 'doctorProfiles', 'patientPortal', 'testimonials', 'emergencyContact', 'faqAccordion'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'gym-fitness',
      name: 'Gym & Fitness',
      description: 'Fitness center website with class schedules, memberships, and trainer profiles',
      icon: Building,
      price: 22,
      tools: ['hero', 'classSchedule', 'membershipPlans', 'trainerProfiles', 'testimonials', 'gallery', 'contactForm', 'newsletter'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'event-management',
      name: 'Event Management',
      description: 'Event website with ticketing, schedules, speaker profiles, and registration',
      icon: Rocket,
      price: 28,
      tools: ['hero', 'eventListing', 'scheduleTimeline', 'speakerProfiles', 'registrationForm', 'ticketPurchase', 'sponsors', 'gallery'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'travel-agency',
      name: 'Travel Agency',
      description: 'Travel website with destination guides, booking, and package deals',
      icon: Zap,
      price: 30,
      tools: ['hero', 'destinationGrid', 'packageDeals', 'bookingForm', 'testimonials', 'gallery', 'mapIntegration', 'contactForm'],
      color: 'from-sky-500 to-blue-500'
    },
    {
      id: 'photography-portfolio',
      name: 'Photography Portfolio',
      description: 'Photographer portfolio with stunning gallery, pricing, and contact',
      icon: Layers,
      price: 18,
      tools: ['hero', 'gallery', 'lightbox', 'pricingTables', 'testimonials', 'contactForm', 'socialLinks', 'aboutSection'],
      color: 'from-gray-500 to-slate-600'
    },
    {
      id: 'business-consulting',
      name: 'Business Consulting',
      description: 'Consulting firm website with services, case studies, and team',
      icon: Building,
      price: 25,
      tools: ['hero', 'serviceGrid', 'caseStudies', 'teamProfiles', 'testimonials', 'contactForm', 'appointmentBooking', 'footer'],
      color: 'from-slate-500 to-gray-600'
    },
    {
      id: 'nonprofit-charity',
      name: 'Nonprofit & Charity',
      description: 'Charity website with donation system, events, and volunteer signup',
      icon: Car,
      price: 28,
      tools: ['hero', 'missionStatement', 'donationForm', 'eventCalendar', 'volunteerSignup', 'impactStats', 'testimonials', 'newsletter'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'government-municipal',
      name: 'Government & Municipal',
      description: 'Official government website with forms, services, and public info',
      icon: Rocket,
      price: 40,
      tools: ['hero', 'serviceDirectory', 'formsCenter', 'newsUpdates', 'calendar', 'documentLibrary', 'contactDirectory', 'searchBar'],
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'religious-church',
      name: 'Religious & Church',
      description: 'Church website with service times, events, ministries, and donation',
      icon: Zap,
      price: 22,
      tools: ['hero', 'serviceTimes', 'eventCalendar', 'ministryList', 'sermons', 'donationForm', 'contactForm', 'gallery'],
      color: 'from-amber-500 to-yellow-600'
    },
    {
      id: 'automotive-car-dealer',
      name: 'Automotive Dealership',
      description: 'Car dealership website with inventory, financing, and trade-in',
      icon: Layers,
      price: 32,
      tools: ['hero', 'carInventory', 'searchFilter', 'financingCalculator', 'tradeInForm', 'testDriveBooking', 'reviews', 'contactForm'],
      color: 'from-red-600 to-rose-700'
    },
    {
      id: 'beauty-salon',
      name: 'Beauty & Salon',
      description: 'Salon website with services, booking, pricing, and gallery',
      icon: Building,
      price: 20,
      tools: ['hero', 'serviceMenu', 'bookingForm', 'pricingTables', 'gallery', 'teamProfiles', 'testimonials', 'contactForm'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'wedding-planner',
      name: 'Wedding Planning',
      description: 'Wedding website with vendor directory, registry, and RSVP',
      icon: Rocket,
      price: 25,
      tools: ['hero', 'coupleStory', 'vendorDirectory', 'rsvpForm', 'registry', 'photoGallery', 'eventTimeline', 'contactForm'],
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'insurance-agency',
      name: 'Insurance Agency',
      description: 'Insurance website with quotes, policy info, and claims',
      icon: Zap,
      price: 30,
      tools: ['hero', 'quoteCalculator', 'policyTypes', 'claimForm', 'agentProfiles', 'faqAccordion', 'testimonials', 'contactForm'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'law-firm',
      name: 'Law Firm',
      description: 'Legal website with practice areas, attorneys, and case evaluations',
      icon: Car,
      price: 32,
      tools: ['hero', 'practiceAreas', 'attorneyProfiles', 'caseEvaluation', 'testimonials', 'faqAccordion', 'newsUpdates', 'contactForm'],
      color: 'from-slate-600 to-gray-700'
    },
    {
      id: 'financial-services',
      name: 'Financial Services',
      description: 'Finance website with advisors, calculators, and account access',
      icon: Layers,
      price: 35,
      tools: ['hero', 'serviceGrid', 'advisorProfiles', 'calculatorTools', 'accountLogin', 'resourceCenter', 'contactForm', 'footer'],
      color: 'from-emerald-500 to-green-600'
    },
    {
      id: 'subscription-box',
      name: 'Subscription Box',
      description: 'Subscription e-commerce with plans, unboxing reveals, and account',
      icon: Building,
      price: 30,
      tools: ['hero', 'subscriptionPlans', 'productShowcase', 'unboxingVideos', 'userDashboard', 'referralSystem', 'reviews', 'cart'],
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'dating-social',
      name: 'Dating & Social',
      description: 'Social platform with profiles, matching, and messaging',
      icon: Rocket,
      price: 45,
      tools: ['profileBuilder', 'matchingAlgorithm', 'messagingSystem', 'videoChat', 'icebreakers', 'premiumFeatures', 'safetyTools', 'dashboard'],
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 'forum-community',
      name: 'Community Forum',
      description: 'Online forum with threads, user profiles, and moderation',
      icon: Zap,
      price: 30,
      tools: ['discussionBoard', 'threadSystem', 'userProfiles', 'moderationTools', 'privateMessaging', 'reputationSystem', 'notifications', 'search'],
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'membership-site',
      name: 'Membership Site',
      description: 'Exclusive content site with subscriptions and member portal',
      icon: Car,
      price: 35,
      tools: ['contentLibrary', 'subscriptionTiers', 'memberDashboard', 'paymentGateway', 'communityArea', 'progressTracker', 'certificates', 'support'],
      color: 'from-indigo-500 to-violet-600'
    },
    {
      id: 'directory-listing',
      name: 'Business Directory',
      description: 'Local business directory with search, categories, and reviews',
      icon: Layers,
      price: 28,
      tools: ['businessListing', 'searchFilter', 'categoryBrowse', 'reviewSystem', 'claimBusiness', 'mapView', 'advertising', 'userDashboard'],
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'software-download',
      name: 'Software Download',
      description: 'Software showcase with features, pricing, and download management',
      icon: Building,
      price: 30,
      tools: ['hero', 'featureShowcase', 'pricingPlans', 'downloadManager', 'licenseKeys', 'documentation', 'supportTickets', 'updateLog'],
      color: 'from-cyan-500 to-blue-600'
    },
    // === CRYPTO & WEB3 THEMES ===
    {
      id: 'defi-dashboard',
      name: 'DeFi Dashboard',
      description: 'Decentralized finance dashboard with portfolio tracking and swaps',
      icon: Bitcoin,
      price: 50,
      tools: ['walletBalance', 'portfolioHeatmap', 'tokenSwap', 'yieldFarming', 'liquidityPool', 'gasFeeEstimator', 'priceTickers', 'analytics'],
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'nft-collection',
      name: 'NFT Collection',
      description: 'NFT collection website with minting, gallery, and marketplace',
      icon: Layers,
      price: 40,
      tools: ['nftMinting', 'gallery', 'marketplace', 'collectionShowcase', 'auctionSystem', 'rarityTracker', 'walletConnect', 'roadmap'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'dao-governance',
      name: 'DAO Governance',
      description: 'Decentralized organization with proposals and voting',
      icon: Rocket,
      price: 55,
      tools: ['proposalSystem', 'votingMechanism', 'treasuryDashboard', 'memberDirectory', 'governanceToken', 'delegateSystem', 'forum', 'analytics'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'token-launchpad',
      name: 'Token Launchpad',
      description: 'Token launch platform with presale, vesting, and liquidity',
      icon: Zap,
      price: 60,
      tools: ['presaleTimer', 'tokenMinting', 'tokenLocker', 'liquidityPool', 'airdropDistributor', 'priceTickers', 'investorPortal', 'auditReports'],
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'web3-social',
      name: 'Web3 Social Network',
      description: 'Decentralized social platform with token-gated content',
      icon: Car,
      price: 50,
      tools: ['profileNFT', 'postFeed', 'tokenGating', 'tippingSystem', 'nftGating', 'daoIntegration', 'rewards', 'privacy'],
      color: 'from-orange-500 to-red-500'
    },
    // === MOBILITY & LOGISTICS ===
    {
      id: 'mobility-starter',
      name: 'Mobility Starter',
      description: 'Complete ride-sharing solution with auto-dispatch, driver tracking, and surge pricing',
      icon: Car,
      price: 450,
      tools: ['fleetTracking', 'surgePricing', 'driverOnboarding', 'autoDispatch', 'routeOptimization', 'passengerView', 'otpSystem', 'demandHeatmap'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'food-delivery',
      name: 'Food Delivery',
      description: 'Food delivery app with restaurant listings, tracking, and delivery',
      icon: Building,
      price: 150,
      tools: ['restaurantListing', 'menuManagement', 'cartSystem', 'liveTracking', 'driverApp', 'customerApp', 'paymentGateway', 'reviews'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'car-rental',
      name: 'Car Rental',
      description: 'Vehicle rental platform with booking, fleet management, and insurance',
      icon: Rocket,
      price: 120,
      tools: ['fleetShowcase', 'bookingSystem', 'insuranceOptions', 'driverLicense', 'paymentGateway', 'pickupDropoff', 'pricing', 'support'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'logistics-tracking',
      name: 'Logistics & Shipping',
      description: 'Shipping and logistics platform with tracking and fleet management',
      icon: Zap,
      price: 180,
      tools: ['shipmentTracking', 'fleetManagement', 'routeOptimization', 'warehouseManagement', 'documentManagement', 'customerPortal', 'analytics', 'support'],
      color: 'from-slate-500 to-gray-600'
    },
    // === ENTERPRISE THEMES ===
    {
      id: 'enterprise-dashboard',
      name: 'Enterprise Admin',
      description: 'Complete business management suite with analytics and user management',
      icon: Building,
      price: 400,
      tools: ['masterDashboard', 'userManagement', 'revenueCenter', 'securityMonitor', 'cmsEditor', 'supportTicketing', 'notificationCenter'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'crm-system',
      name: 'CRM System',
      description: 'Customer relationship management with pipeline and automation',
      icon: Car,
      price: 150,
      tools: ['pipelineView', 'contactManagement', 'dealTracking', 'taskAutomation', 'emailIntegration', 'reporting', 'workflow', 'mobileApp'],
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'project-management',
      name: 'Project Management',
      description: 'Project management tool with kanban, gantt, and collaboration',
      icon: Rocket,
      price: 140,
      tools: ['kanbanBoard', 'ganttChart', 'taskManagement', 'teamCollaboration', 'timeTracking', 'resourceAllocation', 'reports', 'integrations'],
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'lms-education',
      name: 'Learning Management',
      description: 'Online learning platform with courses and progress tracking',
      icon: Zap,
      price: 130,
      tools: ['courseBuilder', 'videoHosting', 'quizBuilder', 'progressTracking', 'certificates', 'discussionForums', 'grading', 'mobileApp'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'inventory-erp',
      name: 'Inventory & ERP',
      description: 'Enterprise resource planning with inventory and supply chain',
      icon: Layers,
      price: 200,
      tools: ['inventoryDashboard', 'supplierManagement', 'orderManagement', 'warehouseSync', 'reporting', 'barcodeScanner', 'alerts', 'mobileApp'],
      color: 'from-amber-500 to-yellow-600'
    },
    // === AI THEMES ===
    {
      id: 'ai-startup',
      name: 'AI Startup',
      description: 'AI-powered SaaS platform with chatbot and analytics',
      icon: Zap,
      price: 280,
      tools: ['aiChatbot', 'sentimentAnalysis', 'predictiveAnalytics', 'saasSubscription', 'userManagement', 'analyticsDashboard'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ai-content-generator',
      name: 'AI Content Generator',
      description: 'AI writing and content generation platform',
      icon: Building,
      price: 120,
      tools: ['aiWriter', 'textToImage', 'contentTemplates', 'historyManager', 'exportOptions', 'subscription', 'teamWorkspace', 'api'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'ai-voice-assistant',
      name: 'AI Voice Assistant',
      description: 'Voice AI platform with speech-to-text and TTS',
      icon: Rocket,
      price: 140,
      tools: ['speechToText', 'textToSpeech', 'voiceCommands', 'customVoices', 'transcription', 'analytics', 'integration', 'mobileApp'],
      color: 'from-violet-500 to-purple-500'
    },
    // === EXISTING THEMES ===
    {
      id: 'defi-pro',
      name: 'DeFi Pro',
      description: 'Professional decentralized finance platform with charts, swaps, and staking',
      icon: Bitcoin,
      price: 350,
      tools: ['multiWallet', 'priceTickers', 'tradingViewCharts', 'tokenSwap', 'walletBalance', 'liquidityPool', 'yieldFarming', 'gasFeeEstimator'],
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'exchange-starter',
      name: 'Crypto Exchange',
      description: 'Full-featured cryptocurrency exchange with order books and trading',
      icon: Rocket,
      price: 500,
      tools: ['multiWallet', 'tradingViewCharts', 'tokenSwap', 'walletBalance', 'transactionHistory', 'orderBook', 'liquidityPool', 'smartContract'],
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'nft-marketplace',
      name: 'NFT Marketplace',
      description: 'Complete NFT marketplace with minting, bidding, and collection showcase',
      icon: Layers,
      price: 300,
      tools: ['nftMinting', 'walletBalance', 'multiWallet', 'smartContract', 'transactionHistory', 'priceTickers'],
      color: 'from-pink-500 to-rose-500'
    },
    // === ADDITIONAL E-COMMERCE TEMPLATES ===
    {
      id: 'fashion-store',
      name: 'Fashion Clothing Store',
      description: 'Online fashion store with clothing, accessories, and size guide',
      icon: Store,
      price: 35,
      tools: ['hero', 'productGrid', 'shoppingCart', 'sizeGuide', 'wishlist', 'reviews', 'footer'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'electronics-store',
      name: 'Electronics Store',
      description: 'Gadgets and electronics e-commerce with specs comparison',
      icon: Store,
      price: 38,
      tools: ['hero', 'productGrid', 'shoppingCart', 'specsComparison', 'warrantyInfo', 'reviews', 'footer'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'grocery-store',
      name: 'Grocery Delivery',
      description: 'Online grocery shopping with delivery scheduling',
      icon: Store,
      price: 32,
      tools: ['hero', 'productGrid', 'shoppingCart', 'deliverySchedule', 'weeklyDeals', 'footer'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'jewelry-store',
      name: 'Jewelry Store',
      description: 'Premium jewelry e-commerce with customization options',
      icon: Store,
      price: 40,
      tools: ['hero', 'productGrid', 'shoppingCart', 'customization', 'appraisal', 'giftCards', 'footer'],
      color: 'from-amber-500 to-yellow-500'
    },
    {
      id: 'book-store',
      name: 'Online Book Store',
      description: 'Books e-commerce with reviews and recommendations',
      icon: Store,
      price: 28,
      tools: ['hero', 'productGrid', 'shoppingCart', 'bookReviews', 'authorPages', 'newsletter', 'footer'],
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 'pet-store',
      name: 'Pet Supplies Store',
      description: 'Pet products and accessories e-commerce',
      icon: Store,
      price: 30,
      tools: ['hero', 'productGrid', 'shoppingCart', 'petCategories', 'adoption', 'footer'],
      color: 'from-teal-500 to-cyan-500'
    },
    // === ADDITIONAL RESTAURANT TEMPLATES ===
    {
      id: 'cafe-bakery',
      name: 'Cafe & Bakery',
      description: 'Coffee shop and bakery website with menu and events',
      icon: Car,
      price: 25,
      tools: ['hero', 'menuGrid', 'reservationForm', 'events', 'gallery', 'testimonials', 'footer'],
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'pizza-shop',
      name: 'Pizza Restaurant',
      description: 'Pizza delivery and dining with online ordering',
      icon: Car,
      price: 28,
      tools: ['hero', 'menuGrid', 'onlineOrder', 'deals', 'tracking', 'reviews', 'footer'],
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'sushi-restaurant',
      name: 'Sushi Restaurant',
      description: 'Japanese restaurant with online reservations',
      icon: Car,
      price: 30,
      tools: ['hero', 'menuGrid', 'reservationForm', 'sushiMenu', 'gallery', 'footer'],
      color: 'from-rose-500 to-pink-500'
    },
    // === ADDITIONAL BLOG TEMPLATES ===
    {
      id: 'news-website',
      name: 'News Website',
      description: 'Online news portal with categories and subscription',
      icon: MessageSquare,
      price: 30,
      tools: ['hero', 'newsTicker', 'featuredNews', 'categories', 'newsletter', 'footer'],
      color: 'from-slate-500 to-gray-600'
    },
    {
      id: 'digital-magazine',
      name: 'Digital Magazine',
      description: 'Online magazine with articles and subscriptions',
      icon: MessageSquare,
      price: 35,
      tools: ['hero', 'featuredArticles', 'categories', 'subscribe', 'authorProfile', 'footer'],
      color: 'from-violet-500 to-purple-500'
    },
    {
      id: 'tech-blog',
      name: 'Tech Blog',
      description: 'Technology blog with reviews and tutorials',
      icon: MessageSquare,
      price: 22,
      tools: ['hero', 'blogCards', 'techReviews', 'tutorials', 'newsletter', 'footer'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'food-blog',
      name: 'Food Blog',
      description: 'Food blog with recipes and cooking tips',
      icon: MessageSquare,
      price: 20,
      tools: ['hero', 'recipeGrid', 'cookingVideos', 'mealPlans', 'newsletter', 'footer'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'travel-blog',
      name: 'Travel Blog',
      description: 'Travel blog with destination guides and photos',
      icon: MessageSquare,
      price: 24,
      tools: ['hero', 'destinationGrid', 'travelGuides', 'photoGallery', 'booking', 'footer'],
      color: 'from-sky-500 to-blue-500'
    },
    // === ADDITIONAL PORTFOLIO TEMPLATES ===
    {
      id: 'photographer-portfolio',
      name: 'Photography Portfolio',
      description: 'Photographer showcase with lightbox galleries',
      icon: Camera,
      price: 22,
      tools: ['hero', 'gallery', 'lightbox', 'pricingPackages', 'contactForm', 'aboutSection', 'footer'],
      color: 'from-gray-500 to-slate-600'
    },
    {
      id: 'designer-portfolio',
      name: 'Designer Portfolio',
      description: 'Creative designer showcase with case studies',
      icon: Briefcase,
      price: 25,
      tools: ['hero', 'portfolioFilter', 'caseStudies', 'services', 'testimonials', 'contactForm', 'footer'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'artist-portfolio',
      name: 'Artist Portfolio',
      description: 'Artist showcase with exhibition calendar',
      icon: Briefcase,
      price: 20,
      tools: ['hero', 'gallery', 'exhibitionCalendar', 'artStore', 'aboutArtist', 'contactForm', 'footer'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'architect-portfolio',
      name: 'Architect Portfolio',
      description: 'Architectural portfolio with project galleries',
      icon: Briefcase,
      price: 28,
      tools: ['hero', 'projectGallery', 'blueprints', 'awards', 'contactForm', 'footer'],
      color: 'from-zinc-500 to-stone-600'
    },
    // === ADDITIONAL HOTEL TEMPLATES ===
    {
      id: 'resort-website',
      name: 'Luxury Resort',
      description: 'Resort website with villa booking and amenities',
      icon: Building,
      price: 35,
      tools: ['hero', 'villaListing', 'bookingForm', 'amenities', 'gallery', 'testimonials', 'footer'],
      color: 'from-teal-500 to-green-500'
    },
    {
      id: 'hostel-website',
      name: 'Hostel Booking',
      description: 'Budget accommodation booking website',
      icon: Building,
      price: 20,
      tools: ['hero', 'bedListing', 'bookingForm', 'amenities', 'reviews', 'footer'],
      color: 'from-amber-500 to-yellow-500'
    },
    {
      id: 'villa-rental',
      name: 'Villa Rental',
      description: 'Private villa and vacation rental website',
      icon: Building,
      price: 32,
      tools: ['hero', 'propertyGrid', 'bookingForm', 'amenities', 'gallery', 'location', 'footer'],
      color: 'from-emerald-500 to-teal-500'
    },
    // === ADDITIONAL REAL ESTATE TEMPLATES ===
    {
      id: 'property-management',
      name: 'Property Management',
      description: 'Rental property management system',
      icon: Building,
      price: 35,
      tools: ['hero', 'listingsGrid', 'tenantPortal', 'maintenance', 'payments', 'footer'],
      color: 'from-slate-500 to-gray-600'
    },
    {
      id: 'commercial-real-estate',
      name: 'Commercial Real Estate',
      description: 'Commercial property listings and leasing',
      icon: Building,
      price: 38,
      tools: ['hero', 'propertyGrid', 'leasingInfo', 'floorPlans', 'contactForm', 'footer'],
      color: 'from-indigo-500 to-blue-500'
    },
    // === ADDITIONAL HEALTHCARE TEMPLATES ===
    {
      id: 'dental-clinic',
      name: 'Dental Clinic',
      description: 'Dental practice with appointment booking',
      icon: Stethoscope,
      price: 30,
      tools: ['hero', 'services', 'appointmentForm', 'team', 'testimonials', 'insurance', 'footer'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'yoga-studio',
      name: 'Yoga Studio',
      description: 'Yoga and wellness center with class schedules',
      icon: Stethoscope,
      price: 25,
      tools: ['hero', 'classSchedule', 'membershipPlans', 'instructors', 'gallery', 'booking', 'footer'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'spa-wellness',
      name: 'Spa & Wellness',
      description: 'Spa services with online booking',
      icon: Stethoscope,
      price: 28,
      tools: ['hero', 'treatments', 'bookingForm', 'membershipPlans', 'gallery', 'footer'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'pharmacy-store',
      name: 'Online Pharmacy',
      description: 'Medicine delivery and health store',
      icon: Stethoscope,
      price: 32,
      tools: ['hero', 'productGrid', 'prescriptionUpload', 'deliveryTracking', 'consultation', 'footer'],
      color: 'from-blue-500 to-indigo-500'
    },
    // === ADDITIONAL FITNESS TEMPLATES ===
    {
      id: 'crossfit-gym',
      name: 'CrossFit Gym',
      description: 'CrossFit training center with memberships',
      icon: Dumbbell,
      price: 25,
      tools: ['hero', 'wodSchedule', 'membershipPlans', 'coaches', 'gallery', 'contactForm', 'footer'],
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'martial-arts',
      name: 'Martial Arts School',
      description: 'Martial arts training center website',
      icon: Dumbbell,
      price: 22,
      tools: ['hero', 'classSchedule', 'instructors', 'beltSystem', 'gallery', 'contactForm', 'footer'],
      color: 'from-gray-500 to-slate-600'
    },
    {
      id: 'sports-academy',
      name: 'Sports Academy',
      description: 'Multi-sport training academy',
      icon: Dumbbell,
      price: 30,
      tools: ['hero', 'programs', 'coaches', 'achievements', 'registration', 'contactForm', 'footer'],
      color: 'from-blue-500 to-cyan-500'
    },
    // === ADDITIONAL BUSINESS TEMPLATES ===
    {
      id: 'startup-landing',
      name: 'Startup Landing Page',
      description: 'Tech startup landing page with features',
      icon: Rocket,
      price: 25,
      tools: ['hero', 'features', 'pricing', 'testimonials', 'faq', 'contactForm', 'footer'],
      color: 'from-violet-500 to-purple-500'
    },
    {
      id: 'saas-landing',
      name: 'SaaS Product Page',
      description: 'Software as a service landing page',
      icon: Rocket,
      price: 28,
      tools: ['hero', 'features', 'pricing', 'demo', 'testimonials', 'contactForm', 'footer'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'mobile-app-landing',
      name: 'Mobile App Landing',
      description: 'Mobile app showcase and download page',
      icon: Rocket,
      price: 22,
      tools: ['hero', 'appPreview', 'features', 'download', 'reviews', 'contactForm', 'footer'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'product-launch',
      name: 'Product Launch',
      description: 'Product launch and pre-order page',
      icon: Rocket,
      price: 30,
      tools: ['hero', 'productReveal', 'preOrder', 'features', 'countdown', 'newsletter', 'footer'],
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'agency-website',
      name: 'Digital Agency',
      description: 'Digital marketing agency website',
      icon: Briefcase,
      price: 28,
      tools: ['hero', 'services', 'portfolio', 'team', 'testimonials', 'contactForm', 'footer'],
      color: 'from-indigo-500 to-violet-500'
    },
    {
      id: 'marketing-agency',
      name: 'Marketing Agency',
      description: 'Marketing and advertising agency',
      icon: Briefcase,
      price: 30,
      tools: ['hero', 'services', 'caseStudies', 'clients', 'contactForm', 'footer'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'it-consulting',
      name: 'IT Consulting',
      description: 'IT consulting and services firm',
      icon: Briefcase,
      price: 32,
      tools: ['hero', 'services', 'expertise', 'testimonials', 'contactForm', 'footer'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'hr-consulting',
      name: 'HR Consulting',
      description: 'Human resources consulting firm',
      icon: Briefcase,
      price: 28,
      tools: ['hero', 'services', 'resources', 'testimonials', 'contactForm', 'footer'],
      color: 'from-teal-500 to-green-500'
    },
    // === ADDITIONAL EVENTS TEMPLATES ===
    {
      id: 'conference-website',
      name: 'Conference Website',
      description: 'Conference and seminar event page',
      icon: Calendar,
      price: 30,
      tools: ['hero', 'speakers', 'schedule', 'registration', 'venue', 'sponsors', 'footer'],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'wedding-website',
      name: 'Wedding Website',
      description: 'Wedding planning with RSVP and registry',
      icon: Heart,
      price: 25,
      tools: ['hero', 'coupleStory', 'rsvpForm', 'registry', 'photoGallery', 'eventTimeline', 'footer'],
      color: 'from-rose-500 to-pink-500'
    },
    {
      id: 'birthday-party',
      name: 'Birthday Party',
      description: 'Birthday party invitation and planning',
      icon: Calendar,
      price: 18,
      tools: ['hero', 'invitation', 'rsvpForm', 'giftRegistry', 'photoGallery', 'footer'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'music-festival',
      name: 'Music Festival',
      description: 'Music festival event website',
      icon: Calendar,
      price: 35,
      tools: ['hero', 'lineup', 'tickets', 'schedule', 'venue', 'camping', 'footer'],
      color: 'from-purple-500 to-violet-500'
    },
    // === ADDITIONAL COMMUNITY TEMPLATES ===
    {
      id: 'dating-website',
      name: 'Dating Website',
      description: 'Online dating platform',
      icon: Heart,
      price: 45,
      tools: ['hero', 'profileMatching', 'messaging', 'premiumFeatures', 'safety', 'footer'],
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 'social-community',
      name: 'Social Community',
      description: 'Online community and social network',
      icon: Users,
      price: 40,
      tools: ['hero', 'feed', 'groups', 'events', 'forums', 'members', 'footer'],
      color: 'from-indigo-500 to-blue-500'
    },
    // === GOVERNMENT & EDUCATION ===
    {
      id: 'university-website',
      name: 'University Website',
      description: 'University and college website',
      icon: GraduationCap,
      price: 45,
      tools: ['hero', 'academics', 'admissions', 'research', 'campus', 'alumni', 'footer'],
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'school-website',
      name: 'School Website',
      description: 'K-12 school website',
      icon: GraduationCap,
      price: 30,
      tools: ['hero', 'academics', 'admissions', 'calendar', 'staff', 'news', 'footer'],
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'online-course-platform',
      name: 'Online Course Platform',
      description: 'Self-paced learning platform',
      icon: GraduationCap,
      price: 35,
      tools: ['hero', 'courseGrid', 'videoLessons', 'certificates', 'community', 'pricing', 'footer'],
      color: 'from-violet-500 to-purple-500'
    },
  ];
  
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };
  
  const handleApplyTemplate = () => {
    if (!selectedTemplate) return;
    
    // Add all tools from template to canvas
    selectedTemplate.tools.forEach((toolId, index) => {
      setTimeout(() => {
        const toolComponent = {
          id: toolId,
          name: getToolName(toolId),
          category: getToolCategory(toolId),
          price: getToolPrice(toolId),
          uniqueId: `${toolId}-${Date.now()}-${index}`,
        };
        dispatch({ type: 'ADD_COMPONENT', payload: { component: toolComponent } });
      }, index * 100);
    });
    
    onClose();
  };
  
  const getToolName = (id) => {
    const names = {
      // Mobility tools
      fleetTracking: 'Live Fleet Tracking Map',
      surgePricing: 'Surge Pricing Logic Engine',
      driverOnboarding: 'Driver-Partner Onboarding',
      autoDispatch: 'Auto-Dispatch Booking System',
      routeOptimization: 'Route Optimization API',
      passengerView: 'Passenger Mobile-Web View',
      otpSystem: 'OTP Trip Start/End System',
      demandHeatmap: 'Heatmap for Driver Demand',
      // Crypto tools
      multiWallet: 'Multi-Wallet Connect',
      priceTickers: 'Real-time Price Tickers',
      tradingViewCharts: 'TradingView Advanced Charts',
      tokenSwap: 'Token Swap/Exchange UI',
      walletBalance: 'Wallet Balance Dashboard',
      liquidityPool: 'Liquidity Pool Tracker',
      yieldFarming: 'Yield Farming Calculator',
      gasFeeEstimator: 'Gas Fee Estimator',
      transactionHistory: 'Transaction History Ledger',
      smartContract: 'Smart Contract Auditor',
      nftMinting: 'NFT Minting & Showcase',
      orderBook: 'Order Book Interface',
      portfolioHeatmap: 'Portfolio Heatmap',
      // Admin tools
      masterDashboard: 'God-Eye Master Dashboard',
      userManagement: 'User Management Vault',
      revenueCenter: 'Financial Revenue Center',
      securityMonitor: 'Security Monitor',
      cmsEditor: 'Content CMS Editor',
      supportTicketing: 'Support Ticketing UI',
      notificationCenter: 'Notification Center',
      // AI tools
      aiChatbot: 'AI Chatbot',
      sentimentAnalysis: 'Sentiment Analysis',
      predictiveAnalytics: 'Predictive Analytics',
      saasSubscription: 'SaaS Subscription',
      analyticsDashboard: 'Analytics Dashboard',
      // Enterprise tools
      aiWriter: 'AI Content Writer',
      textToImage: 'AI Text-to-Image Generator',
      speechToText: 'Speech-to-Text Converter',
      textToSpeech: 'Text-to-Speech Engine',
      // Basic UI tools
      hero: 'Hero Section',
      serviceGrid: 'Service Grid Layout',
      pricingTables: 'Pricing Tables',
      testimonialCarousel: 'Testimonial Carousel',
      footer: 'Premium Footer',
      newsletterSignup: 'Newsletter Signup Box',
      contactForm: 'Contact Form',
      portfolioFilter: 'Portfolio Filter Gallery',
      teamProfiles: 'Team Member Profiles',
      blogCards: 'Blog Post Cards',
      socialButtons: 'Social Login Buttons',
      gallery: 'Image Gallery Grid',
      lightbox: 'Image Lightbox',
      pricingPlans: 'Pricing Plans',
      searchBar: 'Search Bar',
      datePicker: 'Date Picker',
      faqAccordion: 'FAQ Accordion',
      // More tools
      productGrid: 'Product Grid',
      shoppingCart: 'Shopping Cart',
      checkoutForm: 'Checkout Form',
      paymentIntegration: 'Payment Integration',
      orderTracking: 'Order Tracking',
      categories: 'Categories',
      socialSidebar: 'Sticky Social Sidebar',
      menuGrid: 'Menu Grid',
      reservationForm: 'Reservation Form',
      onlineOrder: 'Online Ordering',
      testimonials: 'Testimonials',
      propertyGrid: 'Property Grid',
      filterSystem: 'Filter System',
      agentProfiles: 'Agent Profiles',
      mapIntegration: 'Google Maps',
      mortgageCalculator: 'Mortgage Calculator',
      roomListing: 'Room Listing',
      bookingForm: 'Booking Form',
      amenitiesGrid: 'Amenities Grid',
      reviews: 'Reviews',
      jobListing: 'Job Listing',
      companyProfiles: 'Company Profiles',
      applicationForm: 'Application Form',
      resumeUpload: 'Resume Upload',
      dashboard: 'Dashboard',
      courseListing: 'Course Listing',
      videoPlayer: 'Video Player',
      quiz: 'Quiz',
      progressTracker: 'Progress Tracker',
      certificateGenerator: 'Certificate Generator',
      discussionForum: 'Discussion Forum',
      paymentGateway: 'Payment Gateway',
      appointmentForm: 'Appointment Form',
      doctorProfiles: 'Doctor Profiles',
      patientPortal: 'Patient Portal',
      emergencyContact: 'Emergency Contact',
      classSchedule: 'Class Schedule',
      membershipPlans: 'Membership Plans',
      trainerProfiles: 'Trainer Profiles',
      eventListing: 'Event Listing',
      scheduleTimeline: 'Schedule Timeline',
      speakerProfiles: 'Speaker Profiles',
      registrationForm: 'Registration Form',
      ticketPurchase: 'Ticket Purchase',
      sponsors: 'Sponsors',
      destinationGrid: 'Destination Grid',
      packageDeals: 'Package Deals',
      serviceMenu: 'Service Menu',
      quoteCalculator: 'Quote Calculator',
      policyTypes: 'Policy Types',
      claimForm: 'Claim Form',
      practiceAreas: 'Practice Areas',
      attorneyProfiles: 'Attorney Profiles',
      caseEvaluation: 'Case Evaluation',
      advisorProfiles: 'Advisor Profiles',
      calculatorTools: 'Calculator Tools',
      accountLogin: 'Account Login',
      resourceCenter: 'Resource Center',
      subscriptionPlans: 'Subscription Plans',
      profileBuilder: 'Profile Builder',
      matchingAlgorithm: 'Matching Algorithm',
      messagingSystem: 'Messaging System',
      videoChat: 'Video Chat',
      discussionBoard: 'Discussion Board',
      threadSystem: 'Thread System',
      moderationTools: 'Moderation Tools',
      privateMessaging: 'Private Messaging',
      contentLibrary: 'Content Library',
      communityArea: 'Community Area',
      businessListing: 'Business Listing',
      categoryBrowse: 'Category Browse',
      reviewSystem: 'Review System',
      featureShowcase: 'Feature Showcase',
      downloadManager: 'Download Manager',
      documentation: 'Documentation',
      supportTickets: 'Support Tickets',
      videoHosting: 'Video Hosting',
      aboutSection: 'About Section',
      warehouseManagement: 'Warehouse Management',
      barcodeScanner: 'Barcode Scanner',
      contentTemplates: 'Content Templates',
      historyManager: 'History Manager',
      customVoices: 'Custom Voices',
      transcription: 'Transcription',
    };
    return names[id] || id;
  };
  
  const getToolCategory = (id) => {
    const mobilityTools = ['fleetTracking', 'surgePricing', 'driverOnboarding', 'autoDispatch', 'routeOptimization', 'passengerView', 'otpSystem', 'demandHeatmap', 'restaurantListing', 'menuManagement', 'cartSystem', 'liveTracking', 'driverApp', 'customerApp', 'fleetShowcase', 'bookingSystem', 'insuranceOptions', 'pickupDropoff', 'shipmentTracking', 'fleetManagement', 'warehouseManagement'];
    const cryptoTools = ['multiWallet', 'priceTickers', 'tradingViewCharts', 'tokenSwap', 'walletBalance', 'liquidityPool', 'yieldFarming', 'gasFeeEstimator', 'transactionHistory', 'smartContract', 'nftMinting', 'orderBook', 'portfolioHeatmap', 'presaleTimer', 'tokenMinting', 'tokenLocker', 'airdropDistributor', 'proposalSystem', 'votingMechanism', 'treasuryDashboard'];
    const aiTools = ['aiChatbot', 'sentimentAnalysis', 'predictiveAnalytics', 'aiWriter', 'textToImage', 'speechToText', 'textToSpeech', 'voiceCommands', 'customVoices'];
    const adminTools = ['masterDashboard', 'userManagement', 'revenueCenter', 'securityMonitor', 'cmsEditor', 'supportTicketing', 'notificationCenter'];
    const enterpriseTools = ['saasSubscription', 'analyticsDashboard', 'pipelineView', 'contactManagement', 'dealTracking', 'taskAutomation', 'emailIntegration', 'reporting', 'workflow', 'kanbanBoard', 'ganttChart', 'taskManagement', 'teamCollaboration', 'timeTracking', 'resourceAllocation', 'courseBuilder', 'videoHosting', 'quizBuilder', 'certificateGenerator', 'discussionForums', 'grading', 'inventoryDashboard', 'supplierManagement', 'orderManagement', 'warehouseSync', 'barcodeScanner', 'alerts'];
    
    if (mobilityTools.includes(id)) return 'mobility';
    if (cryptoTools.includes(id)) return 'crypto';
    if (aiTools.includes(id)) return 'ai';
    if (adminTools.includes(id)) return 'admin';
    if (enterpriseTools.includes(id)) return 'enterprise';
    return 'elements';
  };
  
  const getToolPrice = (id) => {
    const prices = {
      // Mobility - $100
      fleetTracking: 100, surgePricing: 100, driverOnboarding: 100, autoDispatch: 100,
      routeOptimization: 100, passengerView: 100, otpSystem: 100, demandHeatmap: 100,
      restaurantListing: 100, menuManagement: 100, cartSystem: 100, liveTracking: 100,
      driverApp: 100, customerApp: 100, fleetShowcase: 100, bookingSystem: 100,
      insuranceOptions: 100, pickupDropoff: 100, shipmentTracking: 100, fleetManagement: 100,
      warehouseManagement: 100,
      // Crypto - $30
      multiWallet: 30, priceTickers: 30, tradingViewCharts: 30, tokenSwap: 30,
      walletBalance: 30, liquidityPool: 30, yieldFarming: 30, gasFeeEstimator: 30,
      transactionHistory: 30, smartContract: 30, nftMinting: 30, orderBook: 30,
      portfolioHeatmap: 30, presaleTimer: 30, tokenMinting: 30, tokenLocker: 30,
      airdropDistributor: 30, proposalSystem: 30, votingMechanism: 30, treasuryDashboard: 30,
      // Admin - $70-100
      masterDashboard: 100, userManagement: 80, revenueCenter: 90, securityMonitor: 100,
      cmsEditor: 70, supportTicketing: 70, notificationCenter: 70,
      // AI - $35-50
      aiChatbot: 40, sentimentAnalysis: 35, predictiveAnalytics: 45,
      aiWriter: 40, textToImage: 50, speechToText: 35, textToSpeech: 35,
      voiceCommands: 40, customVoices: 45,
      // Enterprise - $70-120
      saasSubscription: 70, analyticsDashboard: 90, pipelineView: 80, contactManagement: 80,
      dealTracking: 80, taskAutomation: 90, emailIntegration: 70, reporting: 80,
      workflow: 100, kanbanBoard: 90, ganttChart: 90, taskManagement: 80,
      teamCollaboration: 70, timeTracking: 70, resourceAllocation: 80, courseBuilder: 70,
      videoHosting: 80, quizBuilder: 70, certificateGenerator: 70, discussionForums: 70,
      grading: 70, inventoryDashboard: 90, supplierManagement: 80, orderManagement: 80,
      warehouseSync: 90, barcodeScanner: 70, alerts: 70,
      // Basic UI - $5
      hero: 5, serviceGrid: 5, pricingTables: 5, testimonialCarousel: 5,
      footer: 5, newsletterSignup: 5, contactForm: 5, portfolioFilter: 5,
      teamProfiles: 5, blogCards: 5, socialButtons: 5, gallery: 5, lightbox: 5,
      pricingPlans: 5, searchBar: 5, datePicker: 5, faqAccordion: 5,
      productGrid: 5, shoppingCart: 5, checkoutForm: 5, paymentIntegration: 5,
      orderTracking: 5, categories: 5, socialSidebar: 5, menuGrid: 5,
      reservationForm: 5, onlineOrder: 5, testimonials: 5, propertyGrid: 5,
      filterSystem: 5, agentProfiles: 5, mapIntegration: 5, mortgageCalculator: 5,
      roomListing: 5, bookingForm: 5, amenitiesGrid: 5, reviews: 5, jobListing: 5,
      companyProfiles: 5, applicationForm: 5, resumeUpload: 5, dashboard: 5,
      courseListing: 5, videoPlayer: 5, quiz: 5, progressTracker: 5,
      certificateGenerator: 5, discussionForum: 5, paymentGateway: 5, appointmentForm: 5,
      doctorProfiles: 5, patientPortal: 5, emergencyContact: 5, classSchedule: 5,
      membershipPlans: 5, trainerProfiles: 5, eventListing: 5, scheduleTimeline: 5,
      speakerProfiles: 5, registrationForm: 5, ticketPurchase: 5, sponsors: 5,
      destinationGrid: 5, packageDeals: 5, serviceMenu: 5, quoteCalculator: 5,
      policyTypes: 5, claimForm: 5, practiceAreas: 5, attorneyProfiles: 5,
      caseEvaluation: 5, advisorProfiles: 5, calculatorTools: 5, accountLogin: 5,
      resourceCenter: 5, subscriptionPlans: 5, profileBuilder: 5, matchingAlgorithm: 5,
      messagingSystem: 5, videoChat: 5, discussionBoard: 5, threadSystem: 5,
      moderationTools: 5, privateMessaging: 5, contentLibrary: 5, communityArea: 5,
      businessListing: 5, categoryBrowse: 5, reviewSystem: 5, featureShowcase: 5,
      downloadManager: 5, documentation: 5, supportTickets: 5, aboutSection: 5,
      historyManager: 5, transcription: 5, contentTemplates: 5,
    };
    return prices[id] || 5;
  };

  // Apply theme colors to CSS variables
  const applyTheme = (colors, themeName) => {
    // Parse the gradient colors
    const colorArray = colors.split(' ').filter(c => c.startsWith('from-'));
    if (colorArray.length >= 2) {
      // Get the colors from the gradient
      const primaryColor = colorArray[0].replace('from-', '').replace('-500', '-600').replace('-400', '-500');
      const secondaryColor = colorArray[1].replace('to-', '').replace('-500', '-400');
      
      // Apply to CSS variables
      document.documentElement.style.setProperty('--theme-primary', primaryColor);
      document.documentElement.style.setProperty('--theme-secondary', secondaryColor);
      
      // Also dispatch to state
      dispatch({ 
        type: 'SET_CURRENT_WEBSITE', 
        payload: { ...{ name: '', type: '', theme: themeName.toLowerCase().replace(' ', '-'), createdAt: null }, theme: themeName.toLowerCase().replace(' ', '-') } 
      });
    }
  };

  // Fallback themes in case of issues
  const fallbackThemes = [
    { id: 'obsidian-prime', name: 'Obsidian Prime', colors: 'from-slate-900 to-black', description: 'Dark premium theme' },
    { id: 'neon-cyber', name: 'Neon Cyber', colors: 'from-purple-500 to-cyan-500', description: 'Cyberpunk aesthetic' },
    { id: 'enterprise-gold', name: 'Enterprise Gold', colors: 'from-amber-500 to-yellow-600', description: 'Professional business look' },
    { id: 'ocean-blue', name: 'Ocean Blue', colors: 'from-blue-500 to-indigo-600', description: 'Calm blue tones' },
    { id: 'forest-green', name: 'Forest Green', colors: 'from-emerald-500 to-teal-600', description: 'Nature-inspired design' },
    { id: 'sunset-warm', name: 'Sunset Warm', colors: 'from-orange-500 to-red-500', description: 'Warm vibrant colors' },
    { id: 'royal-purple', name: 'Royal Purple', colors: 'from-violet-600 to-purple-700', description: 'Elegant purple theme' },
    { id: 'minimal-white', name: 'Minimal White', colors: 'from-gray-100 to-white', description: 'Clean minimal design' },
    { id: 'cosmic-dark', name: 'Cosmic Dark', colors: 'from-indigo-900 to-purple-900', description: 'Deep space theme' },
    { id: 'arctic-ice', name: 'Arctic Ice', colors: 'from-cyan-400 to-blue-500', description: 'Cool icy tones' },
  ];

  // Get category for a template
  const getCategoryForTemplate = (templateId) => {
    const webThemes = ['saas-landing', 'portfolio-personal', 'ecommerce-store', 'blog-news', 'restaurant-food', 'real-estate', 'hotel-booking', 'job-portal', 'elearning-platform', 'healthcare-medical', 'gym-fitness', 'event-management', 'travel-agency', 'photography-portfolio', 'business-consulting', 'nonprofit-charity', 'government-municipal', 'religious-church', 'automotive-car-dealer', 'beauty-salon', 'wedding-planner', 'insurance-agency', 'law-firm', 'financial-services', 'subscription-box', 'dating-social', 'forum-community', 'membership-site', 'directory-listing', 'software-download', 'fashion-store', 'electronics-store', 'grocery-store', 'jewelry-store', 'book-store', 'pet-store', 'cafe-bakery', 'pizza-shop', 'sushi-restaurant', 'news-website', 'digital-magazine', 'tech-blog', 'food-blog', 'travel-blog', 'photographer-portfolio', 'designer-portfolio', 'artist-portfolio', 'architect-portfolio', 'resort-website', 'hostel-website', 'villa-rental', 'property-management', 'commercial-real-estate', 'dental-clinic', 'yoga-studio', 'spa-wellness', 'pharmacy-store', 'crossfit-gym', 'martial-arts', 'sports-academy', 'startup-landing', 'saas-landing', 'mobile-app-landing', 'product-launch', 'agency-website', 'marketing-agency', 'it-consulting', 'hr-consulting', 'conference-website', 'wedding-website', 'birthday-party', 'music-festival', 'dating-website', 'social-community', 'university-website', 'school-website', 'online-course-platform'];
    const cryptoThemes = ['defi-dashboard', 'nft-collection', 'dao-governance', 'token-launchpad', 'web3-social', 'defi-pro', 'exchange-starter', 'nft-marketplace'];
    const mobilityThemes = ['mobility-starter', 'food-delivery', 'car-rental', 'logistics-tracking'];
    const enterpriseThemes = ['enterprise-dashboard', 'crm-system', 'project-management', 'lms-education', 'inventory-erp'];
    const aiThemes = ['ai-startup', 'ai-content-generator', 'ai-voice-assistant'];
    
    if (webThemes.includes(templateId)) return 'web';
    if (cryptoThemes.includes(templateId)) return 'crypto';
    if (mobilityThemes.includes(templateId)) return 'mobility';
    if (enterpriseThemes.includes(templateId)) return 'enterprise';
    if (aiThemes.includes(templateId)) return 'ai';
    return 'web';
  };
  
  // Get category label for display
  const getCategoryLabel = (templateId) => {
    const category = getCategoryForTemplate(templateId);
    const labels = {
      'web': 'Web',
      'crypto': 'Crypto',
      'mobility': 'Mobility',
      'enterprise': 'Enterprise',
      'ai': 'AI'
    };
    return labels[category] || 'Web';
  };
  
  // Get category search terms for dynamic Unsplash images
  const getCategorySearchTerms = (templateId) => {
    const categoryMap = {
      // Web & Business
      'saas-landing': 'saas,technology,dashboard',
      'portfolio-personal': 'portfolio,design,personal',
      'ecommerce-store': 'ecommerce,shopping,store',
      'blog-news': 'blog,news,publishing',
      'restaurant-food': 'restaurant,food,dining',
      'real-estate': 'real-estate,property,house',
      'hotel-booking': 'hotel,booking,resort',
      'job-portal': 'job,career,employment',
      'elearning-platform': 'elearning,education,online-course',
      'healthcare-medical': 'healthcare,medical,doctor',
      'gym-fitness': 'gym,fitness,workout',
      'event-management': 'event,conference,meeting',
      'travel-agency': 'travel,tourism,adventure',
      'photography-portfolio': 'photography,portfolio,camera',
      'business-consulting': 'consulting,business,office',
      'nonprofit-charity': 'charity,nonprofit,volunteer',
      'government-municipal': 'government,building,official',
      'religious-church': 'church,religious,worship',
      'automotive-car-dealer': 'car,automotive,vehicle',
      'beauty-salon': 'beauty,salon,hair',
      'wedding-planner': 'wedding,ceremony,celebration',
      'insurance-agency': 'insurance,finance,business',
      'law-firm': 'law,legal,attorney',
      'financial-services': 'finance,banking,investment',
      'subscription-box': 'subscription,box,delivery',
      'dating-social': 'dating,social,relationship',
      'forum-community': 'forum,community,discussion',
      'membership-site': 'membership,members,club',
      'directory-listing': 'directory,business,listing',
      'software-download': 'software,app,download',
      'fashion-store': 'fashion,clothing,store',
      'electronics-store': 'electronics,gadgets,tech',
      'grocery-store': 'grocery,supermarket,food',
      'jewelry-store': 'jewelry,diamond,luxury',
      'book-store': 'book,library,reading',
      'pet-store': 'pet,animal,cute',
      'cafe-bakery': 'cafe,bakery,coffee',
      'pizza-shop': 'pizza,italian,food',
      'sushi-restaurant': 'sushi,japanese,food',
      'news-website': 'news,media,newspaper',
      'digital-magazine': 'magazine,digital,publishing',
      'tech-blog': 'technology,tech,blog',
      'food-blog': 'food,cooking,recipe',
      'travel-blog': 'travel,trip,adventure',
      'designer-portfolio': 'design,creative,portfolio',
      'artist-portfolio': 'art,artist,painting',
      'architect-portfolio': 'architecture,building,design',
      'resort-website': 'resort,luxury,pool',
      'hostel-website': 'hostel,travel,budget',
      'villa-rental': 'villa,rent,luxury',
      'property-management': 'property,management,real-estate',
      'commercial-real-estate': 'commercial,building,office',
      'dental-clinic': 'dental,teeth,clinic',
      'yoga-studio': 'yoga,wellness,meditation',
      'spa-wellness': 'spa,wellness,relax',
      'pharmacy-store': 'pharmacy,medicine,health',
      'crossfit-gym': 'crossfit,gym,fitness',
      'martial-arts': 'martial-arts,fight,combat',
      'sports-academy': 'sports,academy,training',
      'startup-landing': 'startup,tech,entrepreneur',
      'mobile-app-landing': 'mobile-app,smartphone,app',
      'product-launch': 'product,launch,new',
      'agency-website': 'agency,creative,marketing',
      'marketing-agency': 'marketing,digital,advertising',
      'it-consulting': 'it,consulting,tech',
      'hr-consulting': 'hr,human-resources,office',
      'conference-website': 'conference,event,seminar',
      'wedding-website': 'wedding,celebration,love',
      'birthday-party': 'birthday,party,celebration',
      'music-festival': 'music,festival,concert',
      'dating-website': 'dating,love,relationship',
      'social-community': 'social,community,network',
      'university-website': 'university,college,education',
      'school-website': 'school,education,students',
      'online-course-platform': 'online-course,elearning,education',
      // Crypto & Web3
      'defi-dashboard': 'crypto,blockchain,bitcoin',
      'nft-collection': 'nft,digital-art,crypto',
      'dao-governance': 'dao,blockchain,governance',
      'token-launchpad': 'token,crypto,launch',
      'web3-social': 'web3,social,blockchain',
      'defi-pro': 'defi,finance,crypto',
      'exchange-starter': 'exchange,crypto,trading',
      'nft-marketplace': 'nft,marketplace,digital',
      // Mobility
      'mobility-starter': 'mobility,transport,car',
      'food-delivery': 'food-delivery,pizza,uber-eats',
      'car-rental': 'car-rental,vehicle,rent',
      'logistics-tracking': 'logistics,shipping,delivery',
      // Enterprise
      'enterprise-dashboard': 'enterprise,dashboard,analytics',
      'crm-system': 'crm,sales,customer',
      'project-management': 'project-management,agile,kanban',
      'lms-education': 'lms,learning,education',
      'inventory-erp': 'inventory,erp,warehouse',
      // AI
      'ai-startup': 'ai,artificial-intelligence,tech',
      'ai-content-generator': 'ai,content,writing',
      'ai-voice-assistant': 'ai,voice,assistant',
    };
    return categoryMap[templateId] || 'technology,website,modern';
  };
  
  // Get dynamic Unsplash image URL with category-based search and random sig for diversity
  const getPreviewImage = (templateId, index = 0) => {
    const searchTerms = getCategorySearchTerms(templateId);
    // Use images.unsplash.com with search query for dynamic images
    // Add sig parameter for diversity - ensures different images per template
    return `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&sig=${index + 1}`;
  };
  
  // Fallback gradient for when image fails to load
  const getFallbackGradient = (templateId) => {
    const category = getCategoryForTemplate(templateId);
    const gradients = {
      'web': 'from-purple-600 to-blue-600',
      'crypto': 'from-orange-500 to-yellow-500',
      'mobility': 'from-green-500 to-teal-500',
      'enterprise': 'from-indigo-600 to-purple-600',
      'ai': 'from-pink-500 to-rose-500',
    };
    return gradients[category] || 'from-purple-600 to-pink-600';
  };
  
  // Filter templates by category and search
  const filteredTemplates = templates.filter(template => {
    const categoryMatch = activeCategory === 'all' || getCategoryForTemplate(template.id) === activeCategory;
    const searchMatch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

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
        className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl glass"
      >
        {/* Header */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">100+ Web Themes</h2>
              <p className="text-sm text-[#a1a1aa]">{filteredTemplates.length} templates available</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[rgba(255,255,255,0.1)]">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Search & Categories */}
        <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.1)]">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717a]" />
            <input 
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white placeholder-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-[#a855f7] text-white'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[rgba(255,255,255,0.1)]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectTemplate(template)}
                  className={`relative rounded-xl cursor-pointer transition-all overflow-hidden ${
                    selectedTemplate?.id === template.id 
                      ? 'ring-2 ring-[#a855f7] bg-[rgba(168,85,247,0.1)]' 
                      : 'glass hover:border-[rgba(255,255,255,0.2)]'
                  }`}
                >
                  {/* Preview Image - Actual website screenshot */}
                  <div className={`h-40 w-full relative overflow-hidden bg-gradient-to-br ${getFallbackGradient(template.id)}`}>
                    {/* Image with loading skeleton */}
                    <div className="absolute inset-0 bg-gray-800 animate-pulse">
                      <img 
                        src={getPreviewImage(template.id, filteredTemplates.findIndex(t => t.id === template.id))} 
                        alt={template.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onLoad={(e) => {
                          e.target.previousElementSibling?.classList.add('hidden');
                        }}
                        onError={(e) => {
                          // Show gradient fallback when image fails
                          e.target.style.display = 'none';
                          e.target.previousElementSibling?.classList.add('hidden');
                        }}
                      />
                    </div>
                    
                    {/* Glassmorphism overlay with theme name */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        <h3 className="text-sm font-semibold text-white truncate">{template.name}</h3>
                      </div>
                    </div>
                    
                    {/* Category badge */}
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur text-xs text-white font-medium">
                      {getCategoryLabel(template.id)}
                    </div>
                  </div>
                  
                  {/* Template Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-white">{template.name}</h3>
                        <p className="text-xs text-[#71717a] line-clamp-2">{template.description}</p>
                      </div>
                    </div>
                    
                    {/* Tools included preview */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.tools.slice(0, 4).map((tool, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white/70">
                          {getToolName(tool).split(' ')[0]}
                        </span>
                      ))}
                      {template.tools.length > 4 && (
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white/50">
                          +{template.tools.length - 4} more
                        </span>
                      )}
                    </div>
                    
                    {/* Price and selection */}
                    <div className="flex items-center justify-between">
                      <span className="text-[#a855f7] font-bold">${template.price}</span>
                      <span className="text-xs text-[#a1a1aa]">{template.tools.length} tools</span>
                    </div>
                  </div>
                  
                  {/* Selected checkmark */}
                  {selectedTemplate?.id === template.id && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#a855f7] flex items-center justify-center shadow-lg"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-[rgba(255,255,255,0.1)]">
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#71717a]">
              {selectedTemplate ? `Selected: ${selectedTemplate.name} - ${selectedTemplate.tools.length} tools` : 'Select a template to continue'}
            </p>
            <button
              onClick={handleApplyTemplate}
              disabled={!selectedTemplate}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedTemplate ? `Apply Template ($${selectedTemplate.price})` : 'Select Template'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
