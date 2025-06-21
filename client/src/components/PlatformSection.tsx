import { ArrowRight } from "lucide-react";

export default function PlatformSection() {
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
    <section id="platform" className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 p-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">MetaMask Platform</h2>
          <p className="text-xl text-white opacity-90 max-w-3xl mx-auto">
            Experience the future of decentralized finance with our comprehensive Web3 platform. 
            Connect, trade, and manage your digital assets with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {platformCards.map((card, index) => (
            <div 
              key={index}
              className="bg-white bg-opacity-95 rounded-3xl p-10 pr-44 relative overflow-hidden backdrop-blur-lg shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 min-h-72 flex flex-col justify-center"
            >
              <h3 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {card.title}
              </h3>
              <p className="text-lg text-gray-700 opacity-80 mb-6 leading-relaxed">
                {card.description}
              </p>
              <button className="bg-white text-gray-800 border-none px-8 py-4 rounded-xl font-bold text-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 self-start flex items-center gap-2">
                {card.buttonText}
                <ArrowRight size={20} />
              </button>
              
              {/* Abstract geometric decoration */}
              <div className={`absolute -right-20 -top-10 w-40 h-40 bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} rounded-full opacity-10`}></div>
              <div className={`absolute -right-10 top-20 w-24 h-24 bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} rounded-full opacity-15`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
