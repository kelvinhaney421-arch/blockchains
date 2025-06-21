# Web3 MetaMask Platform - Standalone Frontend

## Quick Start

This is a **frontend-only** React application with Web3 functionality. No backend required!

### Installation & Setup

1. **Upload to new Replit project:**
   - Create new Replit project (choose "React TypeScript" template)
   - Delete all default files
   - Upload all files from this `standalone-app` folder
   - Keep the folder structure exactly as provided

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```
   
   The app will run on `http://localhost:3000`

### Technologies Used (Simple & Minimal)
- **React** - Frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Ethers.js** - Web3 blockchain interaction
- **Vite** - Fast build tool

### Features
- ✅ Wallet connection (MetaMask)
- ✅ Multi-chain support (Ethereum, BSC, Polygon, Avalanche)
- ✅ Token merging functionality
- ✅ Mobile responsive design
- ✅ Portfolio overview
- ✅ Analytics dashboard
- ✅ Platform sections
- ✅ Footer with links

### File Structure
```
standalone-app/
├── src/
│   ├── App.tsx          # Main application component
│   ├── useWeb3.ts       # Web3 wallet functionality
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies
├── vite.config.ts       # Build configuration
├── tailwind.config.js   # Styling configuration
├── index.html           # HTML template
└── README.md           # This file
```

### What Works
- **Wallet Connection**: Fast and reliable MetaMask connection
- **Network Switching**: Automatic network switching with user confirmation
- **Token Merging**: Send all tokens to specified address with gas calculation
- **Balance Display**: Real-time balance updates
- **Responsive Design**: Works perfectly on mobile and desktop
- **Button Redirects**: All action buttons redirect to wallet connection

### Testing the Application

1. **Connect Wallet**: Click "Connect Wallet" button
2. **Switch Networks**: Use dropdown to change blockchain networks
3. **View Balance**: See your real-time token balance
4. **Merge Tokens**: Click "Merge Token" to send tokens to receiver address
5. **Mobile Test**: Resize browser or test on mobile device

### Important Notes
- No backend server required
- Uses only browser-based Web3 functionality
- All data is real-time from blockchain
- MetaMask extension required for full functionality
- All styling uses Tailwind CSS classes (no custom CSS complexity)

### Troubleshooting

**Wallet won't connect:**
- Ensure MetaMask is installed and unlocked
- Check if website is allowed in MetaMask settings
- Try refreshing the page

**Merge function fails:**
- Check if you have sufficient balance for gas fees
- Ensure you're on the correct network
- Verify MetaMask is connected and unlocked

**Slow loading:**
- Check internet connection
- Try different RPC endpoints if issues persist
- Clear browser cache and reload

This is a complete, working Web3 application that requires no backend infrastructure!