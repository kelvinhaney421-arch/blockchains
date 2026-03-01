interface AnalyticsSectionProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function AnalyticsSection({ scrollToSection }: AnalyticsSectionProps) {
  return (
    <section id="analytics" className="min-h-screen bg-background p-8 lg:p-20 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">Market <span className="gradient-text">Analytics</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Strategic insights powered by neural performance tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Chart Placeholder */}
          <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Portfolio Trajectory</h3>
            <div className="h-64 bg-accent/50 rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
              <div className="text-center relative z-10 p-8">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">📈</div>
                <div className="text-lg font-bold uppercase tracking-wider text-primary">Awaiting Synchronization</div>
                <p className="text-sm text-muted-foreground font-medium mt-2 uppercase tracking-widest">Establish link to reveal metrics</p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-6">
            <div className="rounded-3xl border bg-card p-8 shadow-sm">
              <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-primary/80">Growth Metrics</h4>
              <div className="space-y-4 font-medium">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Aggregate Yield</span>
                  <span className="text-green-500 font-bold">+0.00%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Prime Asset</span>
                  <span className="font-bold">N/A</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Allocation Alpha</span>
                  <span className="text-blue-500 font-bold">0.00</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border bg-card p-8 shadow-sm">
              <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-primary/80">Market Pulse</h4>
              <div className="space-y-4 font-medium">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Global Market Cap</span>
                  <span className="font-bold">$2.1T</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">24h Momentum</span>
                  <span className="font-bold">$89.2B</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Bitcoin Dominance</span>
                  <span className="font-bold">42.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl border bg-card p-8 shadow-sm group hover:border-primary/50 transition-colors">
            <h4 className="text-lg font-bold mb-6 group-hover:text-primary transition-colors">TX Registry</h4>
            <div className="text-center py-8">
              <div className="text-5xl mb-4 opacity-20">📜</div>
              <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">No entries indexed</p>
            </div>
          </div>
          
          <div className="rounded-3xl border bg-card p-8 shadow-sm group hover:border-primary/50 transition-colors">
            <h4 className="text-lg font-bold mb-6 group-hover:text-primary transition-colors">Gas Oracle</h4>
            <div className="space-y-4 text-sm font-bold tracking-tight">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ethereum</span>
                <span className="text-blue-500">25 GWEI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">BNB Chain</span>
                <span className="text-green-500">5 GWEI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Polygon</span>
                <span className="text-purple-500">30 GWEI</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-3xl border bg-card p-8 shadow-sm group hover:border-primary/50 transition-colors">
            <h4 className="text-lg font-bold mb-6 group-hover:text-primary transition-colors">Yield Vaults</h4>
            <div className="text-center py-8">
              <div className="text-5xl mb-4 opacity-20">🏦</div>
              <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">No vaults active</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
