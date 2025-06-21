import { Plus, Send, Bookmark, DollarSign, ArrowUpDown, Star, Circle } from "lucide-react";

export default function PortfolioSection() {
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
    <section id="portfolio" className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-700 p-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 gradient-text">Portfolio Overview</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monitor your crypto assets across multiple wallets and networks
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-slate-700 to-slate-600 border border-gray-600 rounded-2xl p-8 shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-4xl font-bold text-white mb-2">$0.00</div>
            <div className="text-gray-400 text-sm">Total Portfolio Value</div>
          </div>
          <div className="bg-gradient-to-br from-slate-700 to-slate-600 border border-gray-600 rounded-2xl p-8 shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-4xl font-bold text-green-400 mb-2">+0.00%</div>
            <div className="text-gray-400 text-sm">24h Change</div>
          </div>
          <div className="bg-gradient-to-br from-slate-700 to-slate-600 border border-gray-600 rounded-2xl p-8 shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="text-4xl font-bold text-blue-400 mb-2">0</div>
            <div className="text-gray-400 text-sm">Active Networks</div>
          </div>
        </div>

        {/* Balance Section */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-800 rounded-3xl p-12 mb-12 text-white shadow-2xl">
          <div className="text-6xl font-bold mb-2">0.00 ETH</div>
          <div className="text-lg opacity-90 mb-8">≈ $0.00 USD</div>
          <div className="flex gap-4">
            <button className="flex-1 bg-white bg-opacity-20 border-none text-white px-6 py-4 rounded-xl font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-opacity-30 hover:-translate-y-1">
              <Plus size={20} />
              Buy
            </button>
            <button className="flex-1 bg-white bg-opacity-20 border-none text-white px-6 py-4 rounded-xl font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-opacity-30 hover:-translate-y-1">
              <Send size={20} />
              Send
            </button>
            <button className="flex-1 bg-white bg-opacity-20 border-none text-white px-6 py-4 rounded-xl font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:bg-opacity-30 hover:-translate-y-1">
              <Bookmark size={20} />
              Stake
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 text-center cursor-pointer shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-14 h-14 ${action.bgColor} ${action.bgOpacity} ${action.textColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{action.title}</h3>
                <p className="text-gray-600">{action.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
