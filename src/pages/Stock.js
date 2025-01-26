import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import BetCard from "../components/BetCard";
import abiAssetManager from "../contracts/AssetManager.json";
import abiBet from "../contracts/Bet.json";
import abiPriceFeed from "../contracts/PriceFeed.json";

const Stock = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contractAssetManager: null,
    contractBet: null,
    contractPriceFeed: null
  });
  const [account, setAccount] = useState("None");
  const [isConnecting, setIsConnecting] = useState(false);
  const [assetDetails, setAssetDetails] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    openingTime: 0,
    closingTime: 0,
    resultTime: 0,
    betPrice: 0,
  });

  const { provider, signer, contractAssetManager, contractBet, contractPriceFeed } = state;

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddressAssetManager = "0xFFa73AAEeE475B69c11a551b07f60754c524b507";
      const contractABIAssetManager = abiAssetManager.abi;
      const contractAddressBet = "0xD9F8f06eAbd2c39C27ceC41f828Ba7199c8233aD";
      const contractABIBet = abiBet.abi;
      const contractAddressPriceFeed = "0x92645cA4ab91455E1805d06a2883486a1b18aD5E";
      const contractABIPriceFeed= abiPriceFeed.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          if (!isConnecting) {
            setIsConnecting(true);

            const provider = new ethers.providers.Web3Provider(ethereum);
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);

            const signer = provider.getSigner();
            const contractAssetManager = new ethers.Contract(contractAddressAssetManager, contractABIAssetManager, signer);
            const contractBet = new ethers.Contract(contractAddressBet, contractABIBet, signer);
            const contractPriceFeed = new ethers.Contract(contractAddressPriceFeed, contractABIPriceFeed, signer);

            setState({ provider, signer, contractAssetManager, contractBet, contractPriceFeed });
            ethereum.on("chainChanged", () => window.location.reload());
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

  useEffect(() => {
    if (contractAssetManager) {
      fetchAssets();
    }
  }, [contractAssetManager]);

  const fetchAssets = async () => {
    const assetAddresses = await contractAssetManager.getAllAssets();
    const assets = await Promise.all(assetAddresses.map(async (address) => {
      const details = await contractAssetManager.getAssetDetails(address);
      return { address, ...details };
    }));
    setAssetDetails(assets);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createAsset = async () => { 
    const { name, symbol, openingTime, closingTime, resultTime, betPrice } = formData;
    await contractAssetManager.createAsset(name, symbol, openingTime, closingTime, resultTime, ethers.utils.parseEther(betPrice.toString()));

    fetchAssets();
  };

  return (
    <div>
      <ul>
        {assetDetails
          .filter(asset => asset.closingTime.toNumber() * 1000 > Date.now())
          .map((asset, index) => (
          <li key={index}>
            <BetCard 
              address={asset.address}
              name={asset.name} 
              symbol={asset.symbol}
              opening={new Date(asset.openingTime.toNumber() * 1000).toString()} 
              closing={new Date(asset.closingTime.toNumber() * 1000).toString()} 
              result={new Date(asset.resultTime.toNumber() * 1000).toString()} 
              Bet_Price={ethers.utils.formatEther(asset.betPrice.toString())} 
              provider={provider}
              signer={signer}
              contractBet={contractBet}
              contractPriceFeed={contractPriceFeed}
            />        
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stock;
