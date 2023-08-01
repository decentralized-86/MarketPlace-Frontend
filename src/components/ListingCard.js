import React, { useState } from 'react';
import UpdateListingModal from './UpdateListingModal';

const ListingCard = ({ item, Contract, showUpdateModal, setShowUpdateModal, handleConfirmUpdate }) => {
  const { tokenId, nftAddress, seller, price, tokenURI } = item;

  const [newListingPrice, setNewListingPrice] = useState('');

  const handleUpdateListing = () => {
    setShowUpdateModal(true);
  };

  const handleConfirmUpdateListing = () => {
    handleConfirmUpdate(nftAddress , tokenId, newListingPrice);
    setNewListingPrice('');
  };

  const handleCancelListing = async () => {
    try {
      const CancelListing  = await Contract.CancelListing(nftAddress, tokenId);
      await CancelListing.wait(1);

      console.log(`Canceling listing for tokenId: ${tokenId}`);
    } catch (error) {
      console.error('Error canceling listing:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold">Token ID: {tokenId}</div>
        <div className="text-gray-500">Seller: {seller}</div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>Price: {price}</div>
        <div>
          <button onClick={handleUpdateListing} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update Listing
          </button>
          <button onClick={handleCancelListing} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded">
            Cancel Listing
          </button>
        </div>
      </div>
      <img src={tokenURI} alt="NFT Artwork" className="w-full h-32 object-cover mb-4" />

      {showUpdateModal && (
        <UpdateListingModal
          isOpen={showUpdateModal}
          onRequestClose={() => setShowUpdateModal(false)}
          newListingPrice={newListingPrice}
          setNewListingPrice={setNewListingPrice}
          onConfirmUpdate={handleConfirmUpdateListing}
        />
      )}
    </div>
  );
};

export default ListingCard;
