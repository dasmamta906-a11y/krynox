# KRYNOX - AI Crypto Builder Platform Specification

## 1. Project Overview

**Project Name:** KRYNOX - AI-Powered Crypto Builder
**Type:** Web Application (React SPA)
**Core Functionality:** A drag-and-drop builder for crypto/web3 projects with hidden billing logic that reveals pricing only at checkout
**Target Users:** Crypto developers, traders, and web3 entrepreneurs

---

## 2. UI/UX Specification

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           HEADER                                        │
│  [Logo: KRYNOX]              [AI: ARCANE AI]           [Launch Project] │
├────────────┬──────────────────────────────┬────────────────────────────┤
│            │                              │                            │
│  LEFT      │        CENTER                │        RIGHT               │
│  SIDEBAR   │        CANVAS                │        SIDEBAR             │
│            │                              │                            │
│  AI Chat   │   GrapesJS Editor            │   Component Library        │
│  Interface │   (Drag & Drop)              │   (140+ Components)        │
│            │                              │                            │
│  - Chat    │   - Canvas Area               │   - Layouts                │
│  - Memory  │   - Properties Panel          │   - Forms                  │
│  - Persona │                              │   - Buttons                │
│            │                              │   - Crypto Charts           │
│            │                              │   - Wallet Connectors       │
│            │                              │   - Live Tickers            │
│            │                              │                            │
├────────────┴──────────────────────────────┴────────────────────────────┤
│                           FOOTER                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints
- Desktop: 1440px+ (Full layout)
- Tablet: 1024px-1439px (Collapsible sidebars)
- Mobile: <1024px (Stacked layout with hamburger menu)

### Visual Design

#### Color Palette
- **Primary Background:** #0a0a0f (Deep space black)
- **Secondary Background:** #12121a (Dark charcoal)
- **Glass Effect:** rgba(255, 255, 255, 0.05) with backdrop-blur
- **Primary Accent:** #00d4aa (Cyber teal)
- **Secondary Accent:** #7c3aed (Mystic purple)
- **Tertiary Accent:** #f59e0b (Golden amber)
- **Text Primary:** #ffffff
- **Text Secondary:** #a1a1aa
- **Success:** #10b981
- **Warning:** #f59e0b
- **Error:** #ef4444
- **Border:** rgba(255, 255, 255, 0.1)

#### Typography
- **Font Family:** 'Inter', sans-serif
- **Headings:** Inter Bold, 24px-48px
- **Body:** Inter Regular, 14px-16px
- **Small:** Inter Regular, 12px
- **Button Text:** Inter Semibold, 14px

#### Spacing System
- **Base Unit:** 4px
- **Small:** 8px
- **Medium:** 16px
- **Large:** 24px
- **XL:** 32px
- **2XL:** 48px

#### Visual Effects
- **Border Radius:** 20px (large), 16px (medium), 12px (small), 8px (buttons)
- **Glassmorphism:** backdrop-filter: blur(20px), background: rgba(255,255,255,0.05)
- **Glow Effects:** box-shadow: 0 0 40px rgba(0, 212, 170, 0.3)
- **Animations:** 
  - Fade in: 0.3s ease-out
  - Slide: 0.4s cubic-bezier(0.4, 0, 0.2, 1)
  - Pulse: 2s infinite

### Components

#### Header
- Logo with subtle glow animation
- ARCANE AI status indicator (pulsing dot)
- "Launch Project" button (primary accent, glowing)

#### Left Sidebar - AI Chat
- Chat interface with message bubbles
- User messages: right-aligned, secondary accent background
- AI messages: left-aligned, glass effect background
- Input field with send button
- Typing indicator animation
- Memory status indicator

#### Center Canvas - Editor
- GrapesJS canvas area
- Top toolbar (device toggle, undo/redo, preview)
- Right-click context menu
- Selection handles

#### Right Sidebar - Component Library
- Tabbed navigation (Layouts, Forms, Buttons, Crypto, Wallet, Tickers)
- Search functionality
- Component cards with drag handle
- No prices visible - all look free
- Hover preview effect

#### Invoice Modal (Checkout)
- Premium dark modal with glass effect
- Header: "Project Invoice" with KRYNOX logo
- Itemized list: Tool Name -> Hidden Price
- Subtotal calculation
- Total amount (revealed)
- "Pay & Download Source Code" button
- Close button

#### AI Crypto Commander Popup
- Triggered at $3,000 threshold or user asks
- Elite subscription pricing
- Standard: $500/week
- Annual: $300/15 days (with toggle)
- Professional design with purple accent

---

## 3. Functionality Specification

### Core Features

#### 3.1 Drag-and-Drop Editor (GrapesJS)
- Initialize GrapesJS with custom config
- Custom block manager
- Style manager integration
- Trait manager for component properties
- Device manager (desktop, tablet, mobile)
- Storage manager (localStorage)

#### 3.2 Component Library (140+ Components)
**Layouts (20):** Navbar, Footer, Sidebar, Hero, Grid, Flex, Cards, etc.
**Forms (25):** Input, Select, Checkbox, Radio, Form, etc.
**Buttons (20):** Primary, Secondary, Icon, Social, etc.
**Crypto Charts (30):** TradingView widgets, candlestick, line charts, etc.
**Wallet Connectors (25):** MetaMask, WalletConnect, Coinbase, etc.
**Live Tickers (20):** Price tickers, volume displays, etc.

#### 3.3 Hidden Billing Logic
- **Standard Tools:** $5 each (Navbar, Text, Images, etc.)
- **Professional Crypto/Chart Tools:** $30 each (TradingView, Wallets, etc.)
- **Counter:** Background tracker updating in real-time
- **$3,000 Trigger:** Triggers AI Crypto Commander popup

#### 3.4 AI Assistant (ARCANE AI)
- **Chat Interface:** Natural language input
- **2-Year Memory:** LocalStorage persistence
- **Persona:** Professional, elite, supportive
- **Commands:** Add component, modify, explain, etc.
- **Memory Structure:**
  ```json
  {
    "userPreferences": {},
    "conversationHistory": [],
    "projectHistory": [],
    "lastActive": "timestamp"
  }
  ```

#### 3.5 AI Crypto Commander
- **Trigger:** $3,000+ bill OR user asks for "Trading Bot"
- **Pricing:**
  - Standard: $500/week
  - Annual Loyalty: $300/15 days (requires toggle)
- **Features:** Trading automation, advanced charts, priority support

#### 3.6 Checkout Flow
- "Launch Project" button
- Invoice modal reveals prices FIRST time
- Itemized breakdown
- Total calculation
- "Pay & Download" action (simulated)

### User Interactions
1. User drags components to canvas → hidden bill updates
2. User chats with AI → remembers preferences
3. Bill exceeds $3,000 → Commander popup appears
4. User clicks Launch → Invoice modal with prices
5. User pays → Download (simulated)

### Edge Cases
- Component removal → bill decreases
- Multiple same components → cumulative pricing
- Browser refresh → restore from localStorage
- Invalid AI commands → helpful error message

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with cyber teal accents applied
- [ ] Inter font loaded and applied
- [ ] 20px+ border radius on cards and buttons
- [ ] Glassmorphism effects visible on modals
- [ ] Subtle animations on interactions
- [ ] No prices visible in component library

### Functional Checkpoints
- [ ] GrapesJS editor loads and accepts drops
- [ ] Components can be dragged from library to canvas
- [ ] Hidden bill counter updates on component add
- [ ] $3,000 trigger shows Commander popup
- [ ] AI Chat responds to messages
- [ ] Memory persists after refresh
- [ ] Launch button opens invoice modal
- [ ] Invoice shows itemized prices for first time

### Technical Checkpoints
- [ ] React app builds without errors
- [ ] No console errors on load
- [ ] LocalStorage operations work
- [ ] Responsive on desktop/tablet

---

## 5. Technical Stack

- **Framework:** React 18
- **Styling:** Tailwind CSS + Custom CSS
- **Editor:** GrapesJS
- **State Management:** React Context + useReducer
- **Storage:** LocalStorage
- **Build:** Vite
- **Icons:** Lucide React
