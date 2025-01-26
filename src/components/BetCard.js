import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Popup from './Popup'; // Adjust the import path as necessary

const BetCard = (props) => {
  const { provider, signer, contractBet, contractPriceFeed } = props;
  const [price, setPrice] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState('');

  useEffect(() => {
    const fetchCoinData = async () => {
      if (props.name && contractPriceFeed) {
        try {
          const latestPrice = await contractPriceFeed.getLatestPrice(props.symbol);
          setPrice(latestPrice.toString());
        } catch (error) {
          console.error('Error fetching price:', error);
        }
      }
    };

    fetchCoinData();
  }, [props.name, contractPriceFeed]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBetClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePopupSubmit = async (e) => {
    e.preventDefault();
    
    if (!contractBet) {
      console.error('Contract not initialized');
      return;
    }
    
    try {
      const estimate = ethers.utils.parseUnits(estimatedPrice, 'ether'); // Assuming estimatedPrice is in ether
      const tx = await contractBet.setBet(props.address, estimate, { value: ethers.utils.parseUnits(props.Bet_Price, 'ether') });
      await tx.wait();
      console.log('Bet placed successfully');
    } catch (error) {
      console.error('Error placing bet:', error);
    } finally {
      setIsPopupOpen(false);
    }
  };
  
  return (
    <div className="m-5 flex justify-start text-wrap">
      <div className="bg-gray-200 shadow-md rounded-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-2 flex font-bold">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">Name: </label>
            <label className='text-cyan mx-2'>{props.name}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="symbol">Symbol: </label>
            <label className='text-cyan mx-2'>{props.symbol}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="price">Current Price: </label>
            <label className='text-cyan mx-2'>{price || 'Fetching...'}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="opening">Opening Time: </label>
            <label className='text-cyan mx-2'>{props.opening}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="closing">Closing Time: </label>
            <label className='text-cyan mx-2'>{props.closing}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="result">Result Time: </label>
            <label className='text-cyan mx-2'>{props.result}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="betPrice">Bet Price: </label>
            <label className='text-cyan mx-2'>{props.Bet_Price}</label>
          </div>
          <button className="bg-cyan hover:bg-teal-500 text-black transition-colors duration-300 ease-in-out font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleBetClick}>
            Place Bet
          </button>
        </form>
      </div>
      {isPopupOpen && (
  <Popup
    onClose={handleClosePopup}
    estimatedPrice={estimatedPrice}
    setEstimatedPrice={setEstimatedPrice}
    onSubmit={handlePopupSubmit}
  >
    <form onSubmit={handlePopupSubmit}>
      <label className="block text-black text-sm font-bold mb-2">Enter estimated price:</label>
      <input
        type="number"
        value={estimatedPrice}
        onChange={(e) => setEstimatedPrice(e.target.value)}  // Use setEstimatedPrice to update state
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
        required
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="submit">
        Submit
      </button>
    </form>
  </Popup>
)}

    </div>
  );
};

export default BetCard;
