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
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-5 left-5 z-50 bg-primary text-primary-foreground border-none p-3 md:hidden shadow-[0_0_15px_rgba(0,255,255,0.4)]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)" }}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-72 bg-card border-r border-primary/20 z-40 transform transition-transform duration-300 shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Sidebar Header */}
        <div className="p-4 sm:p-6 border-b border-primary/20 flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-none flex items-center justify-center shadow-[0_0_10px_rgba(0,255,255,0.5)]" style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)" }}>
              <Zap size={18} className="sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-primary tracking-tighter neon-text">BLOCKCHAIN</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-primary/60 hover:text-primary p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4 space-y-2">
          <button
            onClick={() => scrollToSection('web3-merger')}
            className={`flex items-center gap-3 p-3 w-full text-left text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 ${activeSection === 'web3-merger' ? 'bg-primary/20 text-primary border-l-4 border-primary shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}
          >
            <Wallet size={18} className="sm:w-5 sm:h-5" />
            Web3 Dashboard
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className={`flex items-center gap-3 p-3 w-full text-left text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 ${activeSection === 'portfolio' ? 'bg-primary/20 text-primary border-l-4 border-primary shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}
          >
            <DollarSign size={18} className="sm:w-5 sm:h-5" />
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection('analytics')}
            className={`flex items-center gap-3 p-3 w-full text-left text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 ${activeSection === 'analytics' ? 'bg-primary/20 text-primary border-l-4 border-primary shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}
          >
            <TrendingUp size={18} className="sm:w-5 sm:h-5" />
            Analytics
          </button>
          <button
            onClick={() => scrollToSection('platform')}
            className={`flex items-center gap-3 p-3 w-full text-left text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 ${activeSection === 'platform' ? 'bg-primary/20 text-primary border-l-4 border-primary shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}
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
        <header className="bg-background/80 backdrop-blur-xl p-3 sm:p-6 border-b border-primary/20 flex justify-between items-center sticky top-0 z-30">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-black text-primary tracking-tighter uppercase neon-text">BLOCKCHAIN CORE</h1>
            <p className="text-muted-foreground text-xs sm:text-sm font-mono uppercase tracking-widest">System Status: Operational</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className={walletStatus.className + " font-mono border border-current bg-transparent"}>
              <div className={`w-2 h-2 ${walletStatus.dotColor} rounded-none`}></div>
              <span className="hidden sm:inline uppercase tracking-tighter">{walletStatus.text}</span>
            </div>
            <button
              onClick={() => {
                if (!walletConnected) {
                  scrollToSection('web3-merger');
                }
              }}
              className={`cyber-button border-none px-3 sm:px-6 py-2 sm:py-3 font-black cursor-pointer flex items-center gap-1 sm:gap-2 transition-all duration-300 shadow-lg text-sm sm:text-base ${
                walletConnected 
                  ? 'bg-green-500 text-white' 
                  : 'bg-primary text-primary-foreground'
              }`}
              style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
            >
              <Zap size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{walletConnected ? 'LINKED' : 'INITIALIZE'}</span>
              <span className="sm:hidden">{walletConnected ? 'LINKED' : 'INIT'}</span>
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
