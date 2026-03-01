import { useState, useEffect } from "react";
import { Menu, Zap, Wallet, DollarSign, TrendingUp, Home, X } from "lucide-react";
import Web3NodeMerger from "./Web3NodeMerger";
import PortfolioSection from "./PortfolioSection";
import AnalyticsSection from "./AnalyticsSection";
import PlatformSection from "./PlatformSection";
import FooterSection from "./FooterSection";
import { useWeb3 } from "../hooks/useWeb3";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("web3-merger");
  const { walletConnected, connecting, connectWallet } = useWeb3();

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

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-5 left-5 z-50 bg-metamask-orange text-white border-none p-3 rounded-lg cursor-pointer md:hidden shadow-lg"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-72 bg-dark-blue z-40 transform transition-transform duration-300 shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Sidebar Header */}
        <div className="p-4 sm:p-6 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-metamask-orange rounded-lg flex items-center justify-center">
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
            Web3 Dashboard
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
        <header className="bg-dark-navy bg-opacity-95 backdrop-blur-lg p-3 sm:p-6 border-b border-gray-600 flex justify-between items-center sticky top-0 z-30">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-white truncate">BLOCKCHAIN WEB3</h1>
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
                  : 'bg-metamask-orange hover:bg-orange-600 text-white'
              }`}
            >
              <Zap size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{walletConnected ? 'Connected' : 'Connect Wallet'}</span>
              <span className="sm:hidden">{walletConnected ? 'Connected' : 'Connect'}</span>
            </button>
          </div>
        </header>

        {/* Sections */}
        <Web3NodeMerger />
        <PortfolioSection scrollToSection={scrollToSection} />
        <AnalyticsSection scrollToSection={scrollToSection} />
        <PlatformSection scrollToSection={scrollToSection} />
        <FooterSection />
      </div>
    </div>
  );
}
