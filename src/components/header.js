import React from 'react';
import ConnectButton from './Connectbutton';
import { Link } from 'react-router-dom';

export default function Header({ onConnectDisconnect, isConnected, address }) {
  return (
    <nav className="bg-gray-200">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">NFT Marketplace</h1>
            <div className="ml-4">
              <input
                type="text"
                placeholder="Search"
                className="w-48 py-2 px-3 text-gray-700 border rounded-md outline-none bg-white focus:bg-white focus:border-indigo-600"
              />
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/buy"
              className="ml-4 py-2 px-4 rounded bg-black text-white font-bold hover:bg-gray-800"
            >
              Buy
            </Link>
            <Link
              to="/Sell-nft"
              className="ml-4 py-2 px-4 rounded bg-black text-white font-bold hover:bg-gray-800"
            >
              Sell
            </Link>
            <ConnectButton onConnectDisconnect={onConnectDisconnect} isConnected={isConnected} address={address} />
          </div>
        </div>
      </div>
    </nav>
  );
}
