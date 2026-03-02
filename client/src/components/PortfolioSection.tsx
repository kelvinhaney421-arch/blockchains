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
    },
    {
      title: "Swap Tokens",
      description: "Exchange tokens instantly across networks",
      icon: ArrowUpDown,
    },
    {
      title: "Earn Rewards",
      description: "Stake your tokens and earn passive income",
      icon: Star,
    },
    {
      title: "Spend Crypto",
      description: "Use your crypto for everyday purchases",
      icon: Circle,
    }
  ];

  return (
    <section id="portfolio" className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-black mb-6">Portfolio <span className="gradient-text">Intelligence</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-bold">
            Real-time insights into your cross-chain asset distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="text-4xl font-black mb-2">$0.00</div>
            <div className="text-sm font-black uppercase tracking-wider text-muted-foreground">Total Net Value</div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="text-4xl font-black text-green-500 mb-2">+0.00%</div>
            <div className="text-sm font-black uppercase tracking-wider text-muted-foreground">24h Trajectory</div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="text-4xl font-black text-blue-500 mb-2">0</div>
            <div className="text-sm font-black uppercase tracking-wider text-muted-foreground">Active Protocols</div>
          </div>
        </div>

        <div className="rounded-[2.5rem] p-12 mb-16 bg-gradient-to-br from-primary to-blue-600 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-5xl sm:text-7xl font-black tracking-tighter mb-4">0.00 <span className="opacity-70">ETH</span></div>
            <div className="text-xl opacity-90 mb-12 font-black">Equiv: $0.00 USD</div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="h-14 px-10 bg-white text-primary font-black rounded-2xl hover:bg-opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Acquire
              </button>
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="h-14 px-10 bg-white/20 backdrop-blur-md text-white font-black rounded-2xl hover:bg-white/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Transmit
              </button>
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="h-14 px-10 bg-white/20 backdrop-blur-md text-white font-black rounded-2xl hover:bg-white/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Bookmark size={20} />
                Stake
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickActions.map((action, index) => (
            <div 
              key={index}
              onClick={() => scrollToSection?.('web3-merger')}
              className="rounded-3xl border border-border bg-card p-8 text-center cursor-pointer group hover:bg-accent transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <action.icon size={28} />
              </div>
              <h3 className="text-xl font-black mb-2">{action.title}</h3>
              <p className="text-sm font-bold text-muted-foreground">{action.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
