import React, { useState } from 'react';
import { ethers } from 'ethers';
import getContractABI from './ContractAbi';
import App from '../App';

export default function SellNFTPage({ isConnected, Contract , Signer }) {
  const [nftAddress, setNFTAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');

  const handleNFTAddressChange = (event) => {
    setNFTAddress(event.target.value);
  };

  const handleTokenIdChange = (event) => {
    setTokenId(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSellNFT = async (e) => {
    e.preventDefault();
    const POLYGONSCAN_API_KEY = "EWBS9FISBMY4UGYKFYJNS8PWYPFK9DVK8C"
    console.log(POLYGONSCAN_API_KEY);
    console.log(" fetching ABI ");
    const ABI =  await getContractABI(nftAddress,POLYGONSCAN_API_KEY);
    console.log(JSON.stringify(ABI));
    const nftContract = new ethers.Contract(nftAddress,ABI,Signer);
    const Approval = await  nftContract.approve("0xA0Db67C5A14a2805B4157d8799449EA0B271188f" ,parseInt(tokenId));
    await Approval.wait(2);
     const priceinWie = ethers.utils.parseEther(price);
    const listing  = await Contract.ListNfts(nftAddress, parseInt(tokenId), priceinWie);
    await listing.wait(2);  
    console.log(listing);
    console.log("Listing Updated");
    
    console.log('NFT listed:', { nftAddress, tokenId, price });  
    alert("Successfully Listed... :)")

    setNFTAddress('');
    setTokenId('');
    setPrice('');
};


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg border rounded-lg p-8">
        {isConnected ? (
          <>
            <h1 className="text-3xl font-bold mb-4">Sell NFT</h1>
            <form onSubmit={handleSellNFT}>
            <div className="mb-4">
            <label htmlFor="nftAddress" className="block font-bold mb-1">NFT Address</label>
            <input
              type="text"
              id="nftAddress"
              value={nftAddress}
              onChange={handleNFTAddressChange}
              className="w-full py-2 px-3 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tokenId" className="block font-bold mb-1">Token ID</label>
            <input
              type="text"
              id="tokenId"
              value={tokenId}
              onChange={handleTokenIdChange}
              className="w-full py-2 px-3 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-bold mb-1">Price</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={handlePriceChange}
              className="w-full py-2 px-3 border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded">
            Sell NFT
          </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">SELL NFT</h1>
            <p className="text-lg text-gray-600">Connect your wallet to sell NFTs</p>
          </>
        )}
      </div>
    </div>
  );
}
