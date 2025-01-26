import React from "react";
import { NavLink } from "react-router-dom";

import { useState, useEffect } from "react";
const Navigation = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("User rejected the request.");
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      });
    }
  }, []);

  return (
    <div className="relative w-full mt-16">
      <nav className="w-[40%] mx-auto flex justify-around align-middle border border-cyan rounded-lg">
      <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `w-full text-base text-center font-nunito m-2.5 ${
              isActive
                ? "bg-cyan text-gray-300"
                : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
            } border-0 cursor-pointer rounded capitalize font-semibold`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/stock"
          className={({ isActive }) =>
            `w-full text-base text-center font-nunito m-2.5 ${
              isActive
                ? "bg-cyan text-gray-300"
                : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
            } border-0 cursor-pointer rounded capitalize font-semibold`
          }
        >
          Stock
        </NavLink>

        <NavLink
          to="/crypto"
          className={({ isActive }) =>
            `w-full text-base text-center font-nunito m-2.5 ${
              isActive
                ? "bg-cyan text-gray-300"
                : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
            } border-0 cursor-pointer rounded capitalize font-semibold`
          }
        >
          Crypto
        </NavLink>

        <NavLink
          to="/trending"
          className={({ isActive }) =>
            `w-full text-base text-center font-nunito m-2.5 ${
              isActive
                ? "bg-cyan text-gray-300"
                : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
            } border-0 cursor-pointer rounded capitalize font-semibold`
          }
        >
          Trending
        </NavLink>

        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `w-full text-base text-center font-nunito m-2.5 ${
              isActive
                ? "bg-cyan text-gray-300"
                : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
            } border-0 cursor-pointer rounded capitalize font-semibold`
          }
        >
          Portfolio
        </NavLink>
      </nav>

      <button
        className="absolute top-[-1rem] right-[1rem] text-black font-semibold py-2 px-4 rounded bg-black hover:bg-gray-800 active:bg-gray-700 transition-colors duration-300 ease-in-out"
        style={{ backgroundColor: "#14FFEC", transition: "background-color 0.3s" }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0DA79A")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#14FFEC")}
        onClick={walletAddress ? disconnectWallet : connectWallet}
      >
        <span> {walletAddress ? "Disconnect" : "Connect Wallet"}</span>
      </button>
    </div>
  );
};

export default Navigation;

