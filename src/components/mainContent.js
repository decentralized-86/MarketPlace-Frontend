import React, { useState } from 'react';
import UserListedNFTs from './UserListedNFTs';

export default function MainSection({ Contract, address }) {
  const imageUri = 'https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=500';

  const [showListings, setShowListings] = useState(false);

  const handleShowListings = () => {
    setShowListings(true);
  };

  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-10">
          <div className="text-center sm:text-left space-y-4 max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-snug">Buying and Selling in the world of NFT art</h1>
            <p className="text-xl sm:text-2xl text-white leading-relaxed">Welcome to the world of NFT art. You can buy and sell art to your heart's content and enjoy all the cool features from us.</p>
            <p className="text-xl sm:text-2xl text-white mt-4 leading-relaxed">50k| User Active   10k|Artworks   806|Artists</p>
            <button
              onClick={handleShowListings}
              className="mt-4 inline-block px-6 py-3 text-lg font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-500 transition-colors duration-200"
            >
              Get Listings
            </button>
          </div>
          <div className="w-64 h-64 sm:w-80 sm:h-80 relative rounded-lg overflow-hidden shadow-lg">
            <img src={imageUri} alt="NFT Artwork" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {showListings && <UserListedNFTs Contract={Contract} address={address} />}
    </section>
  );
}
