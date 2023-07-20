import React from 'react';

const ConnectButton = ({ onConnectDisconnect, isConnected, address }) => {
  return (
    <div>
      <button
        onClick={onConnectDisconnect}
        className={`ml-4 py-2 px-4 rounded font-bold ${isConnected ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-black text-white hover:bg-gray-800'}`}
      >
        {isConnected ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default ConnectButton;
