import { ArrowRight, Zap, Shield, Globe, Cpu, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PlatformSectionProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function PlatformSection({ scrollToSection }: PlatformSectionProps) {
  const platformCards = [
    {
      title: "Secure Wallet Connection",
      description: "Connect your MetaMask wallet securely and manage multiple blockchain networks with ease.",
      buttonText: "Get Started",
      icon: Shield
    },
    {
      title: "Multi-Chain Support",
      description: "Trade across Ethereum, BSC, Polygon, and Avalanche networks seamlessly in one interface.",
      buttonText: "Explore Networks",
      icon: Globe
    },
    {
      title: "Token Management",
      description: "Merge, swap, and optimize your token holdings with advanced portfolio management tools.",
      buttonText: "Manage Tokens",
      icon: Cpu
    },
    {
      title: "Advanced Analytics",
      description: "Track performance, analyze trends, and make informed decisions with real-time data insights.",
      buttonText: "View Analytics",
      icon: BarChart3
    }
  ];

  return (
    <section id="platform" className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-black mb-6">Unified <span className="gradient-text">Protocol</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-black">
            The next generation of decentralized finance management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {platformCards.map((card, index) => (
            <Card 
              key={index}
              className="rounded-[2rem] border border-border bg-card p-10 relative group transition-all duration-500 hover:shadow-2xl"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <card.icon size={28} />
              </div>

              <div className="absolute top-10 right-10 text-primary opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                <ArrowRight size={32} />
              </div>
              
              <h3 className="text-3xl font-black mb-4 tracking-tight">
                {card.title}
              </h3>
              <p className="text-lg mb-10 leading-relaxed text-muted-foreground">
                {card.description}
              </p>
              <button 
                onClick={() => scrollToSection?.('web3-merger')}
                className="premium-button"
              >
                <Zap size={18} />
                {card.buttonText}
              </button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
