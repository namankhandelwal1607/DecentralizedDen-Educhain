// src/components/Popup.js

import React from 'react';
import './popup.css'


const Popup = ({ estimatedPrice, setEstimatedPrice, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black-1">
      <div className="bg-black-800 p-6 rounded-lg shadow-lg w-80 max-w-md">
        <h2 className="text-xl font-bold text-cyan mb-4">Place Your Bet</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="estimatedPrice">
              Estimated Price (ETH):
            </label>
            <input
              type="text"
              id="estimatedPrice"
              value={estimatedPrice}
              onChange={(e) => setEstimatedPrice(e.target.value)}
              className="border border-gray-600 rounded w-full py-2 px-3 text-gray-100  focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-cyan text-black hover:bg-teal-500 transition-colors duration-300 ease-in-out font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red hover:bg-red_700 text-white transition-colors duration-300 ease-in-out font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;