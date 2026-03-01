import { Plus, Send, Bookmark, DollarSign, ArrowUpDown, Star, Circle } from "lucide-react";

interface PortfolioSectionProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function PortfolioSection({ scrollToSection }: PortfolioSectionProps) {
  const quickActions = [
    {
      title: "Buy Crypto",
      description: "Purchase crypto with your debit card or bank account",
      icon: DollarSign,
      bgColor: "bg-green-500",
      bgOpacity: "bg-opacity-10",
      textColor: "text-green-500"
    },
    {
      title: "Swap Tokens",
      description: "Exchange tokens instantly across multiple networks",
      icon: ArrowUpDown,
      bgColor: "bg-blue-500",
      bgOpacity: "bg-opacity-10",
      textColor: "text-blue-500"
    },
    {
      title: "Earn Rewards",
      description: "Stake your tokens and earn passive income",
      icon: Star,
      bgColor: "bg-purple-500",
      bgOpacity: "bg-opacity-10",
      textColor: "text-purple-500"
    },
    {
      title: "Spend Crypto",
      description: "Use your crypto for everyday purchases",
      icon: Circle,
      bgColor: "bg-orange-500",
      bgOpacity: "bg-opacity-10",
      textColor: "text-orange-500"
    }
  ];

  return (
    <section id="portfolio" className="min-h-screen bg-background p-4 sm:p-8 lg:p-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-primary mb-4 sm:mb-6 uppercase tracking-tighter neon-text">Asset_Matrix</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto font-mono uppercase tracking-widest">
            Real-time synchronization with global node network
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16">
          <div className="cyber-card p-4 sm:p-8 group hover:border-primary transition-colors">
            <div className="text-2xl sm:text-4xl font-black text-white mb-2 font-mono tracking-tighter">$0.00</div>
            <div className="text-primary/60 text-xs sm:text-sm font-mono uppercase">Net_Capital_Value</div>
          </div>
          <div className="cyber-card p-4 sm:p-8 group hover:border-primary transition-colors">
            <div className="text-2xl sm:text-4xl font-black text-primary mb-2 font-mono tracking-tighter">+0.00%</div>
            <div className="text-primary/60 text-xs sm:text-sm font-mono uppercase">Delta_24H_Shift</div>
          </div>
          <div className="cyber-card p-4 sm:p-8 group hover:border-primary transition-colors">
            <div className="text-2xl sm:text-4xl font-black text-secondary mb-2 font-mono tracking-tighter">0</div>
            <div className="text-primary/60 text-xs sm:text-sm font-mono uppercase">Active_Node_Relays</div>
          </div>
        </div>

        {/* Balance Section */}
        <div className="cyber-card p-6 sm:p-12 mb-12 border-primary/40 bg-primary/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-primary/30">ENCRYPTED_DATA_STREAM</div>
          <div className="text-3xl sm:text-6xl font-black mb-2 text-white tracking-tighter font-mono">0.00 <span className="text-primary">ETH</span></div>
          <div className="text-base sm:text-lg text-primary/60 mb-6 sm:mb-8 font-mono">EST_VAL: $0.00_USD</div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              onClick={() => scrollToSection?.('web3-merger')}
              className="cyber-button flex-1"
              style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
            >
              <Plus size={18} className="sm:w-5 sm:h-5" />
              ACQUIRE
            </button>
            <button 
              onClick={() => scrollToSection?.('web3-merger')}
              className="cyber-button flex-1 bg-transparent border-2 border-primary text-primary hover:bg-primary/10"
              style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
            >
              <Send size={18} className="sm:w-5 sm:h-5" />
              TRANSMIT
            </button>
            <button 
              onClick={() => scrollToSection?.('web3-merger')}
              className="cyber-button flex-1 bg-secondary text-secondary-foreground"
              style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
            >
              <Bookmark size={18} className="sm:w-5 sm:h-5" />
              STAKE_NODE
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <div 
                key={index}
                onClick={() => scrollToSection?.('web3-merger')}
                className="cyber-card p-4 sm:p-8 text-center cursor-pointer group hover:bg-primary/10 transition-all duration-300"
              >
                <div className={`w-10 h-10 sm:w-14 sm:h-14 bg-primary/10 text-primary rounded-none flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-primary/20`} style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)" }}>
                  <IconComponent size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white mb-2 font-mono uppercase tracking-tighter group-hover:text-primary transition-colors">{action.title.replace(' ', '_')}</h3>
                <p className="text-xs sm:text-sm text-primary/60 font-mono uppercase tracking-widest leading-tight">{action.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
