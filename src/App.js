import React, { useState } from 'react';
import './App.css';
import Header from './components/header';
import MainSection from './components/mainContent';
import RecentlyListedSection from './RecentlyListedSection';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecentTransactionsSection from './RecentTransactions';
import SellNFTPage from './components/Sell-nft';
import abi  from "./Constants/Marketplace.json"
import WithdrawSection from './components/WithdrawSection';
import { ApolloProvider } from '@apollo/client';
import { ethers } from 'ethers';
import { client } from './apollo';
import UserListedNFTs from './components/UserListedNFTs';

function App() {
  const [Contract,SetContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [Signer,setSigner] = useState('');

  const handleConnectDisconnect = async () => {
    try {
      if (window.ethereum) {
        if (isConnected) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setIsConnected(false);
          setAddress('');
          SetContract(null);
        } else {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          if (provider) {
            window.ethereum.on("accountsChanged", () => {
              window.location.reload();
            });
            window.ethereum.on("chainChanged", () => {
              window.location.reload();
            });
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            setSigner(signer);
            const address = await signer.getAddress();
            console.log("Address",address);
            setAddress(address);
            const marketplace = new ethers.Contract("0xA0Db67C5A14a2805B4157d8799449EA0B271188f", abi.abi, signer);
            console.log("MARKETPLACE"+ marketplace.address);
            SetContract(marketplace);
          }
          setIsConnected(true);
          alert ("wallet Connected baby");
        }
      } else {
        console.error('Metamask not installed');
      }
    } catch (error) {
      console.error('Error connecting/disconnecting wallet:', error);
    }
  };
  

  return (
    <BrowserRouter>
    <ApolloProvider client={client}>
      <Header onConnectDisconnect={handleConnectDisconnect} isConnected={isConnected} address={address} />
      <WithdrawSection isConnected={isConnected} Contract={Contract} address={address} />
      <Routes>
        <Route path="/" element={<MainSection  />} />
        <Route path="/Sell-nft" element={<SellNFTPage isConnected={isConnected} Contract={Contract} Signer={Signer}/>} />
        <Route path="/UserListedNFTs" element={<UserListedNFTs Contract={Contract} address={address} />} />
      </Routes>
      {isConnected ? (
        <RecentlyListedSection Contract={Contract} address={address} />
      ) : (
        <section className="bg-gray-600 text-white py-6">
          <div className="container mx-auto flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">Recently Listed NFT</h2>
            <p className="text-lg">Connect your wallet to view recently listed NFTs</p>
          </div>
        </section>
      )}
      <RecentTransactionsSection />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
