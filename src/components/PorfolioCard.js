import React from 'react';

const BetCard = (props) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex m-5">
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
            <label className="block text-white text-sm font-bold mb-2" htmlFor="betPrice">Bet Price:</label>
            <label className='text-cyan mx-2'>{props.Bet_Price}</label>
          </div>
          <div className="mb-2 flex font-bold">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="betPrice">Winning Amount:</label>
            <label className='text-cyan mx-2'>{props.Winning_Amount}</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BetCard;
