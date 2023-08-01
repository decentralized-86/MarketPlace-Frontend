import React from 'react';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

export default function Header({ onConnectDisconnect, isConnected, address }) {
  const scrollToRecentListed = () => {
    scroll.scrollTo(550); 
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md font-poppins">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="font-semibold text-2xl flex items-center space-x-8">
          <Link to="/" className="cursor-pointer">
            NFT Marketplace
          </Link>
          <input
            type="text"
            placeholder="Search "
            className="w-72 h-10 py-2 px-4 text-black placeholder-black border-2 border-white rounded bg-white focus:bg-white focus:border-black"
          />
        </div>
        <div className="space-x-4 flex items-center">
          <button
            onClick={scrollToRecentListed}
            className="px-4 h-10 py-2 border-2 border-white rounded font-semibold hover:bg-white hover:text-black transition-colors duration-200"
          >
            Buy
          </button>
          <Link to="/sell-nft" className="px-4 h-10 py-2 border-2 border-white rounded font-semibold hover:bg-white hover:text-black transition-colors duration-200">
            Sell
          </Link>
          <button
            onClick={onConnectDisconnect}
            className={`h-10 py-2 px-4 border-2 border-white rounded font-semibold ${isConnected ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-700'}`}
          >
            {isConnected ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </nav>
  );
}
