import { useState, useEffect } from 'react';
import { Menu, Zap, Wallet, DollarSign, TrendingUp, Home, X, Plus, Send, Bookmark, ArrowRight, Github, Twitter, MessageCircle, Mail, Globe, Shield, Lock, FileText, ArrowUpDown, Star, Circle } from 'lucide-react';
import { useWeb3 } from './useWeb3';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("web3-merger");
  const { 
    selectedNetwork, 
    setSelectedNetwork, 
    walletConnected, 
    balance, 
    account, 
    connecting,
    connectWallet, 
    mergeToken,
    NETWORKS 
  } = useWeb3();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const sections = ['web3-merger', 'portfolio', 'analytics', 'platform', 'footer'];
      let currentSection = '';
      
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
          }
        }
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      if (window.innerWidth <= 768) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const getWalletStatus = () => {
    if (walletConnected) {
      return {
        className: "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-green-500 bg-opacity-20 text-green-400",
        text: "Connected",
        dotColor: "bg-green-400"
      };
    } else if (connecting) {
      return {
        className: "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-blue-500 bg-opacity-20 text-blue-400",
        text: "Connecting",
        dotColor: "bg-blue-400 animate-pulse"
      };
    } else {
      return {
        className: "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-red-500 bg-opacity-20 text-red-400",
        text: "Disconnected",
        dotColor: "bg-red-400"
      };
    }
  };

  const walletStatus = getWalletStatus();

  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNetwork = e.target.value;
    setSelectedNetwork(newNetwork);
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const handleMerge = async () => {
    try {
      await mergeToken();
    } catch (error) {
      console.error("Merge failed:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-5 left-5 z-50 bg-orange-500 text-white border-none p-3 rounded-lg cursor-pointer md:hidden shadow-lg"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-72 bg-slate-800 z-40 transform transition-transform duration-300 shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Sidebar Header */}
        <div className="p-4 sm:p-6 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap size={18} className="sm:w-5 sm:h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">MetaMask</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4">
          <button
            onClick={() => scrollToSection('web3-merger')}
            className={`nav-item w-full text-left text-sm sm:text-base ${activeSection === 'web3-merger' ? 'active' : ''}`}
          >
            <Wallet size={18} className="sm:w-5 sm:h-5" />
            Web3 Merger
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className={`nav-item w-full text-left text-sm sm:text-base ${activeSection === 'portfolio' ? 'active' : ''}`}
          >
            <DollarSign size={18} className="sm:w-5 sm:h-5" />
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection('analytics')}
            className={`nav-item w-full text-left text-sm sm:text-base ${activeSection === 'analytics' ? 'active' : ''}`}
          >
            <TrendingUp size={18} className="sm:w-5 sm:h-5" />
            Analytics
          </button>
          <button
            onClick={() => scrollToSection('platform')}
            className={`nav-item w-full text-left text-sm sm:text-base ${activeSection === 'platform' ? 'active' : ''}`}
          >
            <Home size={18} className="sm:w-5 sm:h-5" />
            Platform
          </button>
        </nav>

        {/* Account Section */}
        <div className="p-3 sm:p-6 mt-4 sm:mt-8">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-400 mb-3 sm:mb-4">ACCOUNTS</h3>
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer mb-2 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-300">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
              A1
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-medium truncate">Account 1</div>
              <div className="text-xs text-gray-400">0.00 ETH</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer mb-2 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-300">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs">
              A2
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-medium truncate">Account 2</div>
              <div className="text-xs text-gray-400">0.00 BNB</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen transition-all duration-300">
        {/* Header */}
        <header className="bg-slate-800 bg-opacity-95 backdrop-blur-lg p-3 sm:p-6 border-b border-gray-600 flex justify-between items-center sticky top-0 z-30">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-white truncate">Web3 Node Merger</h1>
            <p className="text-gray-400 text-xs sm:text-sm">Connect & manage your Web3 assets</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className={walletStatus.className}>
              <div className={`w-2 h-2 ${walletStatus.dotColor} rounded-full`}></div>
              <span className="hidden sm:inline">{walletStatus.text}</span>
            </div>
            <button
              onClick={() => {
                if (!walletConnected) {
                  scrollToSection('web3-merger');
                }
              }}
              className={`border-none px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-300 hover:-translate-y-0.5 shadow-lg text-sm sm:text-base ${
                walletConnected 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              <Zap size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{walletConnected ? 'Connected' : 'Connect Wallet'}</span>
              <span className="sm:hidden">{walletConnected ? 'Connected' : 'Connect'}</span>
            </button>
          </div>
        </header>

        {/* Web3 Merger Section */}
        <section id="web3-merger" className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 relative">
          <div className="flex justify-center items-center min-h-screen px-4 sm:px-8 pt-16 sm:pt-20">
            <div className="bg-gray-800 bg-opacity-90 backdrop-blur-lg p-6 sm:p-12 rounded-2xl shadow-2xl text-center w-full max-w-md transition-all duration-300 hover:scale-105">
              <h1 className="text-yellow-400 text-3xl sm:text-5xl font-bold tracking-wider uppercase mb-4 sm:mb-6">
                Web3 Node Merger
              </h1>
              <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-10">
                Connect to Web3 node, protocol, token, merge management.
              </p>

              <select
                className="bg-gray-700 text-yellow-400 p-4 w-full rounded-lg border-2 border-yellow-600 text-lg font-medium mb-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedNetwork}
                onChange={handleNetworkChange}
              >
                <option value="bnb">BNB Smart Chain</option>
                <option value="ethereum">Ethereum</option>
                <option value="polygon">Polygon</option>
                <option value="avalanche">Avalanche</option>
              </select>

              {!walletConnected ? (
                <button
                  className="p-4 bg-gray-700 text-yellow-400 font-bold text-lg border border-yellow-400 rounded-lg w-full cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleConnect}
                  disabled={connecting}
                >
                  {connecting ? "Connecting..." : "Connect Wallet"}
                </button>
              ) : (
                <div className="bg-orange-500 bg-opacity-5 p-6 border border-yellow-400 rounded-xl">
                  <p className="mb-3 text-base">
                    <strong className="text-yellow-400">Wallet:</strong>
                    <span className="text-white block text-sm font-mono mt-1">
                      {account.slice(0, 6)}...{account.slice(-4)}
                    </span>
                  </p>
                  <p className="mb-6 text-base">
                    <strong className="text-yellow-400">Balance:</strong>
                    <span className="text-white">
                      {" "}{parseFloat(balance).toFixed(4)} {NETWORKS[selectedNetwork as keyof typeof NETWORKS].symbol}
                    </span>
                  </p>
                  <button
                    className="p-4 bg-gray-700 text-yellow-400 font-bold text-lg border border-yellow-400 rounded-lg w-full cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-gray-900"
                    onClick={handleMerge}
                  >
                    Merge Token
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-700 p-4 sm:p-8 lg:p-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6 gradient-text">Portfolio Overview</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Monitor your crypto assets across multiple wallets and networks
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16">
              <div className="bg-gradient-to-br from-slate-700 to-slate-600 border border-gray-600 rounded-2xl p-4 sm:p-8 shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-2xl sm:text-4xl font-bold text-white mb-2">$0.00</div>
                <div className="text-gray-400 text-xs sm:text-sm">Total Portfolio Value</div>
              </div>
              <div className="bg-gradient-to-br from-slate-700 to-slate-600 border border-gray-600 rounded-2xl p-4 sm:p-8 shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-2xl sm:text-4xl font-bold text-green-400 mb-2">+0.00%</div>
                <div className="text-gray-400 text-xs sm:text-sm">24h Change</div>
              </div>
              <div className="bg-gradient-to-br from-slate-700 to-slate-600 border border-gray-600 rounded-2xl p-4 sm:p-8 shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-2xl sm:text-4xl font-bold text-blue-400 mb-2">0</div>
                <div className="text-gray-400 text-xs sm:text-sm">Active Networks</div>
              </div>
            </div>

            {/* Balance Section */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-800 rounded-3xl p-6 sm:p-12 mb-12 text-white shadow-2xl">
              <div className="text-3xl sm:text-6xl font-bold mb-2">0.00 ETH</div>
              <div className="text-base sm:text-lg opacity-90 mb-6 sm:mb-8">≈ $0.00 USD</div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={() => scrollToSection('web3-merger')}
                  className="flex-1 bg-white bg-opacity-20 border-none text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-opacity-30 hover:-translate-y-1"
                >
                  <Plus size={18} className="sm:w-5 sm:h-5" />
                  Buy
                </button>
                <button 
                  onClick={() => scrollToSection('web3-merger')}
                  className="flex-1 bg-white bg-opacity-20 border-none text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-opacity-30 hover:-translate-y-1"
                >
                  <Send size={18} className="sm:w-5 sm:h-5" />
                  Send
                </button>
                <button 
                  onClick={() => scrollToSection('web3-merger')}
                  className="flex-1 bg-white bg-opacity-20 border-none text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-opacity-30 hover:-translate-y-1"
                >
                  <Bookmark size={18} className="sm:w-5 sm:h-5" />
                  Stake
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {[
                { title: "Buy Crypto", description: "Purchase crypto with your debit card or bank account", icon: DollarSign, bgColor: "bg-green-500", bgOpacity: "bg-opacity-10", textColor: "text-green-500" },
                { title: "Swap Tokens", description: "Exchange tokens instantly across multiple networks", icon: ArrowUpDown, bgColor: "bg-blue-500", bgOpacity: "bg-opacity-10", textColor: "text-blue-500" },
                { title: "Earn Rewards", description: "Stake your tokens and earn passive income", icon: Star, bgColor: "bg-purple-500", bgOpacity: "bg-opacity-10", textColor: "text-purple-500" },
                { title: "Spend Crypto", description: "Use your crypto for everyday purchases", icon: Circle, bgColor: "bg-orange-500", bgOpacity: "bg-opacity-10", textColor: "text-orange-500" }
              ].map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <div 
                    key={index}
                    onClick={() => scrollToSection('web3-merger')}
                    className="bg-white rounded-2xl p-4 sm:p-8 text-center cursor-pointer shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 ${action.bgColor} ${action.bgOpacity} ${action.textColor} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                      <IconComponent size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{action.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{action.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section id="analytics" className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-8 lg:p-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">Advanced Analytics</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Get insights into your crypto portfolio performance and market trends
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
              {/* Chart Placeholder */}
              <div className="bg-gray-800 rounded-2xl p-4 sm:p-8 border border-gray-700">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Portfolio Performance</h3>
                <div className="h-48 sm:h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400 text-center px-4">
                    <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">📈</div>
                    <div className="text-sm sm:text-base">Chart will be rendered here</div>
                    <div className="text-xs sm:text-sm mt-1 sm:mt-2">Connect wallet to view performance data</div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Performance Metrics</h4>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-400">Total Return</span>
                      <span className="text-green-400 font-semibold">+0.00%</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-400">Best Performing Asset</span>
                      <span className="text-white font-semibold">N/A</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-400">Portfolio Diversity</span>
                      <span className="text-blue-400 font-semibold">0</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Market Insights</h4>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-400">Market Cap</span>
                      <span className="text-white font-semibold">$2.1T</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-400">24h Volume</span>
                      <span className="text-white font-semibold">$89.2B</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-400">BTC Dominance</span>
                      <span className="text-white font-semibold">42.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Transaction History</h4>
                <div className="text-center text-gray-400 py-4 sm:py-8">
                  <div className="text-3xl sm:text-4xl mb-2">📊</div>
                  <div className="text-sm sm:text-base">No transactions yet</div>
                  <div className="text-xs sm:text-sm mt-1 sm:mt-2">Connect wallet to view history</div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Gas Tracker</h4>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Ethereum</span>
                    <span className="text-blue-400">25 gwei</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">BSC</span>
                    <span className="text-green-400">5 gwei</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400">Polygon</span>
                    <span className="text-purple-400">30 gwei</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">DeFi Positions</h4>
                <div className="text-center text-gray-400 py-4 sm:py-8">
                  <div className="text-3xl sm:text-4xl mb-2">🏦</div>
                  <div className="text-sm sm:text-base">No DeFi positions</div>
                  <div className="text-xs sm:text-sm mt-1 sm:mt-2">Start staking to see positions</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Section */}
        <section id="platform" className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 p-4 sm:p-8 lg:p-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">MetaMask Platform</h2>
              <p className="text-base sm:text-xl text-white opacity-90 max-w-3xl mx-auto">
                Experience the future of decentralized finance with our comprehensive Web3 platform. 
                Connect, trade, and manage your digital assets with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              {[
                { title: "Secure Wallet Connection", description: "Connect your MetaMask wallet securely and manage multiple blockchain networks with ease.", buttonText: "Get Started" },
                { title: "Multi-Chain Support", description: "Trade across Ethereum, BSC, Polygon, and Avalanche networks seamlessly in one interface.", buttonText: "Explore Networks" },
                { title: "Token Management", description: "Merge, swap, and optimize your token holdings with advanced portfolio management tools.", buttonText: "Manage Tokens" },
                { title: "Advanced Analytics", description: "Track performance, analyze trends, and make informed decisions with real-time data insights.", buttonText: "View Analytics" }
              ].map((card, index) => (
                <div 
                  key={index}
                  className="bg-white bg-opacity-95 rounded-3xl p-6 sm:p-10 sm:pr-32 lg:pr-44 relative overflow-hidden backdrop-blur-lg shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 min-h-56 sm:min-h-72 flex flex-col justify-center"
                >
                  <h3 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-lg text-gray-700 opacity-80 mb-4 sm:mb-6 leading-relaxed">
                    {card.description}
                  </p>
                  <button 
                    onClick={() => scrollToSection('web3-merger')}
                    className="bg-white text-gray-800 border-none px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 self-start flex items-center gap-2"
                  >
                    {card.buttonText}
                    <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer id="footer" className="bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Globe size={20} className="sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">MetaMask Platform</h3>
                </div>
                <p className="text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                  The ultimate Web3 platform for managing your crypto assets across multiple blockchain networks. 
                  Secure, fast, and user-friendly.
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  {[
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: MessageCircle, href: "#", label: "Discord" },
                    { icon: Github, href: "#", label: "GitHub" },
                    { icon: Mail, href: "#", label: "Email" }
                  ].map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                        aria-label={social.label}
                      >
                        <IconComponent size={18} className="sm:w-5 sm:h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Footer Links */}
              {[
                {
                  title: "Product",
                  links: [
                    { name: "Web3 Merger", href: "#web3-merger" },
                    { name: "Portfolio", href: "#portfolio" },
                    { name: "Analytics", href: "#analytics" },
                    { name: "Platform", href: "#platform" }
                  ]
                },
                {
                  title: "Resources",
                  links: [
                    { name: "Documentation", href: "#" },
                    { name: "API Reference", href: "#" },
                    { name: "Community", href: "#" },
                    { name: "Support", href: "#" }
                  ]
                },
                {
                  title: "Company",
                  links: [
                    { name: "About", href: "#" },
                    { name: "Blog", href: "#" },
                    { name: "Careers", href: "#" },
                    { name: "Contact", href: "#" }
                  ]
                },
                {
                  title: "Legal",
                  links: [
                    { name: "Privacy Policy", href: "#" },
                    { name: "Terms of Service", href: "#" },
                    { name: "Cookie Policy", href: "#" },
                    { name: "Security", href: "#" }
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="lg:col-span-1">
                  <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">{section.title}</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-orange-500 transition-colors duration-200 text-sm sm:text-base"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Security & Trust Section */}
            <div className="border-t border-gray-800 pt-6 sm:pt-8 mb-6 sm:mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Shield size={20} className="sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Bank-Level Security</div>
                    <div className="text-xs sm:text-sm text-gray-400">Your assets are protected</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Lock size={20} className="sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">End-to-End Encryption</div>
                    <div className="text-xs sm:text-sm text-gray-400">Privacy guaranteed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FileText size={20} className="sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Audited Smart Contracts</div>
                    <div className="text-xs sm:text-sm text-gray-400">Verified and secure</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 pt-6 sm:pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
                  © 2025 MetaMask Platform. All rights reserved.
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                  <span className="text-gray-400 text-center">
                    Built with ❤️ for the Web3 community
                  </span>
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>All systems operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;