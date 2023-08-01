import React from 'react';

const ConnectButton = ({ onConnectDisconnect, isConnected, address }) => {
  return (
    <div>
      <button
        onClick={onConnectDisconnect}
        className={`ml-4 h-8 py-2 px-6 border-2 border-white rounded font-semibold ${isConnected ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-700'}`}
      >
        {isConnected ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default ConnectButton;