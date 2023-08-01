import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const RECENT_TRANSACTIONS_QUERY = gql`
  query {
    itemboughts(first: 5, orderBy: id, orderDirection: desc) {
      id
      nftcontractaddress
      soldto
      tokenId
      price
    }
  }
`;

export default function RecentTransactionsSection() {
  const { loading, error, data } = useQuery(RECENT_TRANSACTIONS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const transactions = data.itemboughts;

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Recent Transactions</h2>
        <div className="py-1">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction Hash</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Buyer</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NFT Contract Address</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Token ID</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{transaction.id}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{transaction.soldto}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{transaction.nftcontractaddress}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{transaction.tokenId}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{transaction.price}</td>
                      {/* You might want to replace the following line with actual transaction date */}
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{"Unknown Date"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
