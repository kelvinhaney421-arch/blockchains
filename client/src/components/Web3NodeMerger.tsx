import { useState } from "react";
import { useWeb3 } from "../hooks/useWeb3";
import { useToast } from "@/hooks/use-toast";

export default function Web3NodeMerger() {
  const { 
    selectedNetwork, 
    setSelectedNetwork, 
    walletConnected, 
    balance, 
    account, 
    connecting,
    connectWallet, 
    mergeToken,
    NETWORKS 
  } = useWeb3();
  
  const { toast } = useToast();

  const handleNetworkChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNetwork = e.target.value;
    setSelectedNetwork(newNetwork);
    if (walletConnected) {
      toast({
        title: "Network Changed",
        description: `Switched to ${NETWORKS[newNetwork as keyof typeof NETWORKS].name}`,
      });
    }
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const handleMerge = async () => {
    try {
      await mergeToken();
    } catch (error) {
      console.error("Merge failed:", error);
    }
  };

  return (
    <section id="web3-merger" className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none"></div>
      
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-8 pt-16 sm:pt-20">
        <div className="cyber-card p-6 sm:p-12 text-center w-full max-w-md transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,255,255,0.15)] group">
          <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-primary/40 opacity-0 group-hover:opacity-100 transition-opacity">SECURE_NODE_v4.0.2</div>
          
          <h1 className="gradient-text text-3xl sm:text-5xl font-black tracking-tighter uppercase mb-4 sm:mb-6 neon-text">
           TERMINAL ACCESS
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-10 font-mono uppercase tracking-widest">
            Cross-chain protocol bridge active.
          </p>

          <select
            className="bg-background/80 text-primary p-4 w-full rounded-none border-b-2 border-primary/50 text-lg font-bold mb-10 cursor-pointer focus:outline-none focus:border-primary transition-colors uppercase tracking-widest font-mono"
            value={selectedNetwork}
            onChange={handleNetworkChange}
          >
            <option value="bnb">BSC_CHAIN_NET</option>
            <option value="ethereum">ETH_MAIN_NET</option>
            <option value="polygon">PLY_L2_NET</option>
            <option value="avalanche">AVAX_C_NET</option>
          </select>

          {!walletConnected ? (
            <button
              className="cyber-button w-full h-16 text-xl font-black tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleConnect}
              disabled={connecting}
              style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
            >
              {connecting ? "SYNCING..." : "INIT_CONNECT"}
            </button>
          ) : (
            <div className="bg-primary/5 p-6 border border-primary relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
              
              <div className="mb-4 text-left font-mono">
                <div className="text-[10px] text-primary/60 uppercase mb-1">Authenticated_Session</div>
                <div className="text-primary text-sm break-all font-bold">
                  {account}
                </div>
              </div>
              
              <div className="mb-8 text-left font-mono">
                <div className="text-[10px] text-primary/60 uppercase mb-1">Asset_Liquidity</div>
                <div className="text-2xl font-black text-white tracking-tighter">
                  {parseFloat(balance).toFixed(4)} <span className="text-primary">{NETWORKS[selectedNetwork as keyof typeof NETWORKS].symbol}</span>
                </div>
              </div>

              <button
                className="cyber-button w-full h-14 text-lg font-black tracking-widest"
                onClick={handleMerge}
                style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
              >
                EXECUTE_MERGE
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
