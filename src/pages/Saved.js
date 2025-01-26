import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Outlet } from "react-router-dom";
import PorfolioCard from '../components/PorfolioCard';
import abiAssetManager from "../contracts/AssetManager.json";
import abiBet from "../contracts/Bet.json";

const Saved = () => {
  const [state, setState] = useState({  
    provider: null,
    signer: null,
    contractAssetManager: null,
    contractBet: null
  });
  const [account, setAccount] = useState("None");
  const [isConnecting, setIsConnecting] = useState(false);
  const [userBets, setUserBets] = useState([]);

  const { provider, signer, contractAssetManager, contractBet } = state;

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddressAssetManager = "0xFFa73AAEeE475B69c11a551b07f60754c524b507";
      const contractABIAssetManager = abiAssetManager.abi;
      const contractAddressBet = "0xD9F8f06eAbd2c39C27ceC41f828Ba7199c8233aD";
      const contractABIBet = abiBet.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          if (!isConnecting) {
            setIsConnecting(true);

            console.log("Connecting to MetaMask...");
            const provider = new ethers.providers.Web3Provider(ethereum);
            console.log("Provider:", provider);

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Accounts:", accounts);
            setAccount(accounts[0]);

            const signer = provider.getSigner();
            const contractAssetManager = new ethers.Contract(contractAddressAssetManager, contractABIAssetManager, signer);
            const contractBet = new ethers.Contract(contractAddressBet, contractABIBet, signer);

            console.log("Signer:", signer);
            console.log("Contract Asset Manager:", contractAssetManager);
            console.log("Contract Bet:", contractBet);

            setState({ provider, signer, contractAssetManager, contractBet });

            ethereum.on("chainChanged", () => {
              console.log("Chain changed, reloading...");
              window.location.reload();
            });
            ethereum.on("accountsChanged", () => {
              console.log("Accounts changed, reloading...");
              window.location.reload();
            });

            console.log("Fetching user bets...");
            fetchUserBets(accounts[0], contractBet);
          }
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        if (error.code === -32002) {
          console.log("MetaMask is already processing a request. Please wait.");
        } else {
          console.error("Error in connectWallet:", error);
        }
      } finally {
        setIsConnecting(false);
      }
    };

    const fetchUserBets = async (account, contractBet) => {
      try {
        console.log("Getting user bets from contract...");
        const userBets = await contractBet.getUserBets(account);
        console.log("User Bets:", userBets);

        const detailedBets = await Promise.all(userBets.map(async (bet) => {
          console.log("Fetching asset details for address:", bet.assetAddress);
          const assetDetails = await contractAssetManager.getAssetDetails(bet.assetAddress);
          console.log("Asset Details:", assetDetails);

          return {
            ...bet,
            assetName: assetDetails.name,
            assetSymbol: assetDetails.symbol,
            openingTime: formatDate(assetDetails.openingTime),
            closingTime: formatDate(assetDetails.closingTime),
            resultTime: formatDate(assetDetails.resultTime)
          };
        }));

        console.log("Detailed Bets:", detailedBets);
        setUserBets(detailedBets);
      } catch (error) {
        console.error("Error fetching user bets:", error);
      }
    };

    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000); // Assuming timestamp is in seconds
      return date.toLocaleString(); // Format to a readable string
    };

    connectWallet();
  }, [isConnecting]);

  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <div className="w-full min-h-[60vh] py-8 border border-gray-100 rounded">
        <div className="flex justify-center items-center flex-wrap">
          {
            userBets.map((bet, index) => {
              console.log("Rendering bet card for:", bet);
              return (
                <PorfolioCard
                  key={index}
                  name={bet.assetName}
                  symbol={bet.assetSymbol}
                  opening={bet.openingTime}
                  closing={bet.closingTime}
                  result={bet.resultTime}
                  Bet_Price={bet.amountPaid.toString()}
                  Bet_seller={bet.userAddress}
                  Winning_Amount={bet.winningAmount.toString()} // Add winning amount
                />
              );
            })
          }
        </div>
      </div>
      <Outlet />
    </section>
  );
};

export default Saved;
