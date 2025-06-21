export default function AnalyticsSection() {
  return (
    <section id="analytics" className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">Advanced Analytics</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get insights into your crypto portfolio performance and market trends
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Chart Placeholder */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6">Portfolio Performance</h3>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="text-6xl mb-4">📈</div>
                <div>Chart will be rendered here</div>
                <div className="text-sm mt-2">Connect wallet to view performance data</div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Return</span>
                  <span className="text-green-400 font-semibold">+0.00%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Best Performing Asset</span>
                  <span className="text-white font-semibold">N/A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Portfolio Diversity</span>
                  <span className="text-blue-400 font-semibold">0</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Market Insights</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap</span>
                  <span className="text-white font-semibold">$2.1T</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">24h Volume</span>
                  <span className="text-white font-semibold">$89.2B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">BTC Dominance</span>
                  <span className="text-white font-semibold">42.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Transaction History</h4>
            <div className="text-center text-gray-400 py-8">
              <div className="text-4xl mb-2">📊</div>
              <div>No transactions yet</div>
              <div className="text-sm mt-2">Connect wallet to view history</div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Gas Tracker</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Ethereum</span>
                <span className="text-blue-400">25 gwei</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">BSC</span>
                <span className="text-green-400">5 gwei</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Polygon</span>
                <span className="text-purple-400">30 gwei</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">DeFi Positions</h4>
            <div className="text-center text-gray-400 py-8">
              <div className="text-4xl mb-2">🏦</div>
              <div>No DeFi positions</div>
              <div className="text-sm mt-2">Start staking to see positions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
