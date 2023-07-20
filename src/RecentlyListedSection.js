import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Card from './components/card'; 

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

export default function RecentlyListedSection({Contract}) {
  const { loading, error, data } = useQuery(ACTIVE_ITEMS_QUERY);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-5 bg-gray-100 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Recently Listed NFTs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
        {data.activeitems.map((item) => <Card key={item.id} item={item} Contract={Contract} />)}
      </div>
    </div>
  );
}
