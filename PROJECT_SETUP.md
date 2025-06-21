# Web3 MetaMask Platform - Project Setup Guide

## Quick Start (Manual Setup)

To replicate this project on a new Replit account, you need these **essential files only**:

### Core Technologies Used
- **React** (frontend framework)
- **HTML/CSS/JavaScript** (as requested - simple base technologies)
- **Tailwind CSS** (for styling)
- **Node.js** (backend server)

### Essential Files to Copy

#### 1. Root Configuration Files
```
package.json              - Dependencies and scripts
vite.config.ts           - Build configuration
tailwind.config.ts       - Styling configuration
tsconfig.json            - TypeScript configuration
```

#### 2. Frontend Core Files (client/src/)
```
client/src/App.tsx                    - Main React app
client/src/main.tsx                   - App entry point
client/src/index.css                  - Global styles
client/src/hooks/useWeb3.ts           - Wallet connection logic
client/src/lib/web3.ts               - Web3 utilities
client/src/components/Layout.tsx      - Main layout component
client/src/components/Web3NodeMerger.tsx - Original merger functionality
client/src/components/PortfolioSection.tsx
client/src/components/AnalyticsSection.tsx
client/src/components/PlatformSection.tsx
client/src/components/FooterSection.tsx
```

#### 3. Backend Files (server/)
```
server/index.ts          - Express server
server/routes.ts         - API routes
server/storage.ts        - Data storage
server/vite.ts          - Vite integration
```

#### 4. Base HTML
```
client/index.html        - Main HTML template
```

## Manual Start Commands

If starting manually (not using Replit workflows):

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

The app will run on port 5000.

## Key Dependencies (from package.json)

### Essential Packages
- `react` & `react-dom` - Core React
- `ethers` - Web3 blockchain integration
- `tailwindcss` - CSS styling
- `express` - Backend server
- `vite` - Build tool
- `tsx` - TypeScript execution

### UI Components
- `lucide-react` - Icons
- `@radix-ui/*` - UI components (buttons, forms, etc.)

## Project Structure Overview

```
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── components/        # All React components
│   │   ├── hooks/            # Custom React hooks (Web3)
│   │   ├── lib/              # Utility functions
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   └── index.html            # HTML template
├── server/                   # Backend Express server
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API endpoints
│   ├── storage.ts           # Data management
│   └── vite.ts              # Development integration
├── shared/                  # Shared types/schemas
├── package.json             # Dependencies
├── vite.config.ts          # Build configuration
├── tailwind.config.ts      # CSS configuration
└── tsconfig.json           # TypeScript settings
```

## What Makes This Simple

Despite having many files, the core technologies are exactly what you requested:
- **HTML** - Single `client/index.html` file
- **CSS** - Tailwind CSS (utility-first, no complex custom CSS)
- **JavaScript/React** - Component-based, straightforward structure
- **Node.js** - Simple Express server

## Replication Steps for New Replit

1. Create new Node.js Replit project
2. Copy all files maintaining the folder structure above
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the application
5. The app will be available on port 5000

## Important Notes

- All Web3 functionality is contained in `useWeb3.ts` hook
- All styling uses Tailwind classes (no complex custom CSS)
- The original Web3 merger functionality is preserved in `Web3NodeMerger.tsx`
- Mobile responsiveness is built into all components
- All action buttons redirect to the wallet connection section as requested

## Technologies Kept Minimal

- No complex state management libraries
- No additional databases (uses in-memory storage)
- No complex build processes
- Standard React patterns throughout
- Simple Express server without middleware complexity