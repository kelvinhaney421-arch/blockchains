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
    <section id="portfolio" className="min-h-screen bg-background p-8 lg:p-20 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">Portfolio <span className="gradient-text">Intelligence</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Real-time insights into your cross-chain asset distribution.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:shadow-black/5 group">
            <div className="text-4xl font-bold tracking-tight mb-2">$0.00</div>
            <div className="text-muted-foreground text-sm font-semibold uppercase tracking-wider group-hover:text-primary transition-colors">Total Net Value</div>
          </div>
          <div className="rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:shadow-black/5 group">
            <div className="text-4xl font-bold tracking-tight text-green-500 mb-2">+0.00%</div>
            <div className="text-muted-foreground text-sm font-semibold uppercase tracking-wider group-hover:text-green-500 transition-colors">24h Trajectory</div>
          </div>
          <div className="rounded-3xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:shadow-black/5 group">
            <div className="text-4xl font-bold tracking-tight text-blue-500 mb-2">0</div>
            <div className="text-muted-foreground text-sm font-semibold uppercase tracking-wider group-hover:text-blue-500 transition-colors">Active Protocol Relays</div>
          </div>
        </div>

        {/* Balance Section */}
        <div className="rounded-[2.5rem] p-12 mb-16 bg-gradient-to-br from-primary to-blue-600 text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <div className="text-5xl sm:text-7xl font-bold tracking-tighter mb-4">0.00 <span className="opacity-70">ETH</span></div>
            <div className="text-xl opacity-80 mb-12 font-medium">Equiv: $0.00 USD</div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="h-14 px-10 bg-white text-primary font-bold rounded-2xl hover:bg-opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Acquire
              </button>
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="h-14 px-10 bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Transmit
              </button>
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="h-14 px-10 bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Bookmark size={20} />
                Stake
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <div 
                key={index}
                onClick={() => scrollToSection?.('web3-merger')}
                className="rounded-3xl border bg-card p-8 text-center cursor-pointer group hover:bg-accent transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">{action.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
