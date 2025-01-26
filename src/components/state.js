import abiAssetManager from "../contracts/AssetManager.json";
// import abiBet from "./contracts/Bet.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
// import Bet from "./components/Bet";

function state() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contractAssetManager: null
    // contractBet: null
  });
  const [account, setAccount] = useState("None");
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddressAssetManager = "0xA5a9e98828E15fED7BDbe3733560Fb8a9332b873";
      const contractABIAssetManager = abiAssetManager.abi;

      // const contractAddressBet = "0x7Bb8a73D2AD7d3e4B8BDb1700F5326863BA3df73";
      // const contractABIBet = abiBet.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          if (!isConnecting) {
            setIsConnecting(true);

            const provider = new ethers.providers.Web3Provider(ethereum);
            // Request user permission for wallet connection (recommended)
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]); // Assuming only one account is connected

            const signer = provider.getSigner();
            const contractAssetManager = new ethers.Contract(contractAddressAssetManager, contractABIAssetManager, signer);
            // const contractBet = new ethers.Contract(contractAddressBet, contractABIBet, signer);

            setState({ provider, signer, contractAssetManager});

            // Listen for network changes and reload app
            ethereum.on("chainChanged", () => window.location.reload());

            // Listen for account changes and reload app
            ethereum.on("accountsChanged", () => window.location.reload());
          }
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        if (error.code === -32002) {
          console.log("MetaMask is already processing a request. Please wait.");
        } else {
          console.error(error);
        }
      } finally {
        setIsConnecting(false);
      }
    };

    connectWallet();
  }, [isConnecting]);

  console.log(state);
}

export default {state};
