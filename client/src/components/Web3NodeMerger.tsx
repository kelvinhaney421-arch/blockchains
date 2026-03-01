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
    <section id="web3-merger" className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 relative">
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-8 pt-16 sm:pt-20">
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-lg p-6 sm:p-12 rounded-2xl shadow-2xl text-center w-full max-w-md transition-all duration-300 hover:scale-105">
          <h1 className="text-gold text-3xl sm:text-5xl font-bold tracking-wider uppercase mb-4 sm:mb-6">
           BLOCKCHAIN Web3 MANAGEMENT PLATFORM
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-10">
            Connect to Web3 node, protocol, token, merge management.
          </p>

          <select
            className="bg-gray-700 text-gold p-4 w-full rounded-lg border-2 border-gold-dark text-lg font-medium mb-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={selectedNetwork}
            onChange={handleNetworkChange}
          >
            <option value="bnb">BNB Smart Chain</option>
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="avalanche">Avalanche</option>
          </select>

          {!walletConnected ? (
            <button
              className="p-4 bg-gray-700 text-gold font-bold text-lg border border-gold rounded-lg w-full cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleConnect}
              disabled={connecting}
            >
              {connecting ? "Connecting..." : "Connect Wallet"}
            </button>
          ) : (
            <div className="bg-orange-500 bg-opacity-5 p-6 border border-gold rounded-xl">
              <p className="mb-3 text-base">
                <strong className="text-gold">Wallet:</strong>
                <span className="text-white block text-sm font-mono mt-1">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              </p>
              <p className="mb-6 text-base">
                <strong className="text-gold">Balance:</strong>
                <span className="text-white">
                  {" "}{parseFloat(balance).toFixed(4)} {NETWORKS[selectedNetwork as keyof typeof NETWORKS].symbol}
                </span>
              </p>
              <button
                className="p-4 bg-gray-700 text-gold font-bold text-lg border border-gold rounded-lg w-full cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-gray-900"
                onClick={handleMerge}
              >
                Merge Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
