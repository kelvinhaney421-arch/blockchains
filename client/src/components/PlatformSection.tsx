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
    <section id="platform" className="min-h-screen bg-background p-8 lg:p-20 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">Unified <span className="gradient-text">Protocol</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            The next generation of decentralized finance management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {platformCards.map((card, index) => (
            <div 
              key={index}
              className="rounded-[2rem] border bg-card p-10 relative group transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
            >
              <div className="absolute top-10 right-10 text-primary opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                <ArrowRight size={32} />
              </div>
              
              <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-10 font-medium leading-relaxed">
                {card.description}
              </p>
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="premium-button self-start"
              >
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
