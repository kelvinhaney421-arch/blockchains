interface AnalyticsSectionProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function AnalyticsSection({ scrollToSection }: AnalyticsSectionProps) {
  return (
    <section id="analytics" className="min-h-screen bg-background p-4 sm:p-8 lg:p-20 relative">
      <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)", backgroundSize: "100px 100px" }}></div>
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-primary mb-4 sm:mb-6 uppercase tracking-tighter neon-text">NEURAL_ANALYTICS</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto font-mono uppercase tracking-widest">
            Predictive market heuristics and yield optimization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {/* Chart Placeholder */}
          <div className="cyber-card p-4 sm:p-8 bg-card/60">
            <h3 className="text-lg sm:text-xl font-black text-primary mb-4 sm:mb-6 uppercase font-mono tracking-widest">PERFORMANCE_ENGINE</h3>
            <div className="h-48 sm:h-64 bg-background/50 border border-primary/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 flex flex-col justify-between p-4 pointer-events-none">
                {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-primary"></div>)}
              </div>
              <div className="text-primary/60 text-center px-4 relative z-10 font-mono">
                <div className="text-4xl sm:text-6xl mb-2 sm:mb-4 animate-pulse">⚡</div>
                <div className="text-sm sm:text-base uppercase font-bold">Waiting_for_Data_Link</div>
                <div className="text-[10px] mt-1 sm:mt-2 opacity-50">ESTABLISH_WALLET_CONNECTION_TO_SYNC</div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-4 sm:space-y-6">
            <div className="cyber-card p-4 sm:p-6 bg-card/60">
              <h4 className="text-base sm:text-lg font-bold text-primary mb-3 sm:mb-4 uppercase font-mono">SYSTEM_METRICS</h4>
              <div className="space-y-3 sm:space-y-4 font-mono uppercase text-xs">
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span className="text-primary/60">Net_Yield</span>
                  <span className="text-primary font-bold">+0.00%</span>
                </div>
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span className="text-primary/60">Peak_Asset</span>
                  <span className="text-white font-bold">NULL_REF</span>
                </div>
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span className="text-primary/60">Diversity_Index</span>
                  <span className="text-secondary font-bold">0.00</span>
                </div>
              </div>
            </div>

            <div className="cyber-card p-4 sm:p-6 bg-card/60">
              <h4 className="text-base sm:text-lg font-bold text-primary mb-3 sm:mb-4 uppercase font-mono">MARKET_INTEL</h4>
              <div className="space-y-3 sm:space-y-4 font-mono uppercase text-xs">
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span className="text-primary/60">Global_Cap</span>
                  <span className="text-white font-bold">$2.1T_USD</span>
                </div>
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span className="text-primary/60">Volume_24H</span>
                  <span className="text-white font-bold">$89.2B_USD</span>
                </div>
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span className="text-primary/60">Dominance_BTC</span>
                  <span className="text-white font-bold">42.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <div className="cyber-card p-4 sm:p-6 bg-card/60">
            <h4 className="text-base sm:text-lg font-bold text-primary mb-3 sm:mb-4 uppercase font-mono">TX_LOGS</h4>
            <div className="text-center text-primary/40 py-4 sm:py-8 font-mono">
              <div className="text-3xl sm:text-4xl mb-2">📜</div>
              <div className="text-xs uppercase font-bold tracking-widest">No_Logs_Found</div>
              <div className="text-[10px] mt-1 sm:mt-2 opacity-50 uppercase">Sync_Required</div>
            </div>
          </div>
          
          <div className="cyber-card p-4 sm:p-6 bg-card/60 font-mono">
            <h4 className="text-base sm:text-lg font-bold text-primary mb-3 sm:mb-4 uppercase font-mono">GAS_ORACLE</h4>
            <div className="space-y-2 sm:space-y-3 text-[10px] uppercase tracking-widest font-bold">
              <div className="flex justify-between border-b border-primary/10 pb-1">
                <span className="text-primary/60">ETH_MAIN</span>
                <span className="text-primary">25_GWEI</span>
              </div>
              <div className="flex justify-between border-b border-primary/10 pb-1">
                <span className="text-primary/60">BSC_SMART</span>
                <span className="text-primary">5_GWEI</span>
              </div>
              <div className="flex justify-between border-b border-primary/10 pb-1">
                <span className="text-primary/60">POLY_L2</span>
                <span className="text-primary">30_GWEI</span>
              </div>
            </div>
          </div>
          
          <div className="cyber-card p-4 sm:p-6 bg-card/60">
            <h4 className="text-base sm:text-lg font-bold text-primary mb-3 sm:mb-4 uppercase font-mono">DEFI_VAULTS</h4>
            <div className="text-center text-primary/40 py-4 sm:py-8 font-mono">
              <div className="text-3xl sm:text-4xl mb-2">🏦</div>
              <div className="text-xs uppercase font-bold tracking-widest">Empty_Registry</div>
              <div className="text-[10px] mt-1 sm:mt-2 opacity-50 uppercase">Initialize_Stake</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
