import { ArrowRight } from "lucide-react";

interface PlatformSectionProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function PlatformSection({ scrollToSection }: PlatformSectionProps) {
  const platformCards = [
    {
      title: "Secure Wallet Connection",
      description: "Connect your MetaMask wallet securely and manage multiple blockchain networks with ease.",
      buttonText: "Get Started",
      gradientFrom: "from-orange-400",
      gradientTo: "to-orange-600"
    },
    {
      title: "Multi-Chain Support",
      description: "Trade across Ethereum, BSC, Polygon, and Avalanche networks seamlessly in one interface.",
      buttonText: "Explore Networks",
      gradientFrom: "from-green-400",
      gradientTo: "to-teal-600"
    },
    {
      title: "Token Management",
      description: "Merge, swap, and optimize your token holdings with advanced portfolio management tools.",
      buttonText: "Manage Tokens",
      gradientFrom: "from-yellow-400",
      gradientTo: "to-orange-500"
    },
    {
      title: "Advanced Analytics",
      description: "Track performance, analyze trends, and make informed decisions with real-time data insights.",
      buttonText: "View Analytics",
      gradientFrom: "from-indigo-400",
      gradientTo: "to-blue-600"
    }
  ];

  return (
    <section id="platform" className="min-h-screen bg-background p-4 sm:p-8 lg:p-20 relative">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-primary mb-4 sm:mb-6 uppercase tracking-tighter neon-text">CORE_PLATFORM</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto font-mono uppercase tracking-widest">
            The nexus of decentralized asset management and protocol integration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {platformCards.map((card, index) => (
            <div 
              key={index}
              className="cyber-card p-6 sm:p-10 relative group transition-all duration-500 hover:bg-primary/5"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="text-primary group-hover:translate-x-2 transition-transform" />
              </div>
              
              <h3 className="text-2xl sm:text-4xl font-black text-white mb-3 sm:mb-4 uppercase tracking-tighter font-mono group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8 font-mono uppercase tracking-widest leading-relaxed">
                {card.description}
              </p>
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="cyber-button self-start font-black tracking-widest"
                style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
              >
                {card.buttonText.toUpperCase().replace(' ', '_')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
