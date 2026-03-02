import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AnalyticsSectionProps {
  scrollToSection?: (sectionId: string) => void;
}

export default function AnalyticsSection({ scrollToSection }: AnalyticsSectionProps) {
  return (
    <section id="analytics" className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-black mb-6">Market <span className="gradient-text">Analytics</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-black">
            Strategic insights powered by neural performance tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h3 className="text-xl font-black mb-6">Portfolio Trajectory</h3>
            <div className="h-64 bg-accent rounded-2xl flex items-center justify-center relative overflow-hidden border border-border">
              <div className="text-center relative z-10 p-8">
                <div className="text-6xl mb-6">📈</div>
                <div className="text-lg font-black uppercase tracking-wider text-primary">Awaiting Synchronization</div>
                <p className="text-sm font-black mt-2 uppercase tracking-widest text-muted-foreground">Establish link to reveal metrics</p>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-primary">Growth Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-black">Aggregate Yield</span>
                  <span className="text-green-500 font-black">+0.00%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-black">Prime Asset</span>
                  <span className="font-black">N/A</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-black">Allocation Alpha</span>
                  <span className="text-blue-500 font-black">0.00</span>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-primary">Market Pulse</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-black">Global Market Cap</span>
                  <span className="font-black">$2.1T</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-black">24h Momentum</span>
                  <span className="font-black">$89.2B</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-black">Bitcoin Dominance</span>
                  <span className="font-black">42.8%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h4 className="text-lg font-black mb-6">TX Registry</h4>
            <div className="text-center py-8">
              <div className="text-5xl mb-4 opacity-20">📜</div>
              <p className="font-black uppercase tracking-widest text-xs text-muted-foreground">No entries indexed</p>
            </div>
          </Card>
          
          <Card className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h4 className="text-lg font-black mb-6">Gas Oracle</h4>
            <div className="space-y-4 text-sm font-black tracking-tight">
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
          </Card>
          
          <Card className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h4 className="text-lg font-black mb-6">Yield Vaults</h4>
            <div className="text-center py-8">
              <div className="text-5xl mb-4 opacity-20">🏦</div>
              <p className="font-black uppercase tracking-widest text-xs text-muted-foreground">No vaults active</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
