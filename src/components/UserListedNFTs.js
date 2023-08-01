import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import ListingCard from './ListingCard';

const ACTIVE_ITEMS_QUERY = gql`
  query {
    activeitems(first: 10) {
      id
      tokenId
      nftAddress
      seller
      price
      tokenURI
    }
  }
`;

const UserListedNFTs = ({ address, Contract }) => {
  const [userNFTs, setUserNFTs] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { loading, error, data } = useQuery(ACTIVE_ITEMS_QUERY);

  useEffect(() => {
    if (data) {
      const userNFTData = data.activeitems.filter((nft) => nft.seller.toLowerCase() === address.toLowerCase());
      setUserNFTs(userNFTData);
    }
  }, [data, address]);

  const handleConfirmUpdate = async (nftAddress , tokenId, newListingPrice) => {
    try {
      const UpdateListing = await Contract.UpdateListing(nftAddress,tokenId,newListingPrice);
      await UpdateListing.wait(1);
      console.log(`Updating listing for tokenId: ${tokenId} with new price: ${newListingPrice}`);
      setShowUpdateModal(false); // Close the modal
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Failed to fetch user NFTs:', error);
    return <p>Error fetching user NFTs</p>;
  }

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">My Listed NFTs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userNFTs.map((nft) => (
            <ListingCard
              key={nft.tokenId}
              item={nft}
              Contract={Contract}
              showUpdateModal={showUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
              handleConfirmUpdate={handleConfirmUpdate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserListedNFTs;
