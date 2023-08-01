import React, { useState, useEffect } from 'react';

export default function WithdrawSection({ isConnected, Contract, address }) {
  const [balance, setBalance] = useState(0); 

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (isConnected) {
          const currentBalance = await Contract.GetProceeds(address); 
          setBalance(currentBalance.toString());
        }
      } catch (error) {
        console.error(`Failed to fetch balance: ${error}`);
        setBalance(0);
      }
    };

    fetchBalance();
  }, [isConnected, Contract , address]);

  const handleWithdraw = async () => {
    const transaction = await Contract.withdrawProcess({ gasLimit: 500000, value: balance });
    await transaction.wait(2);
    const newBalance = await Contract.GetProceeds(address); 
    setBalance(newBalance.toString());
    console.log("Amount withdrawn");
  };

  return (
    <section className="bg-gray-600 text-white shadow-sm py-2">
      <div className="container mx-auto text-center">
        <a
          href="#withdraw"
          className="px-2 py-1 text-white rounded hover:bg-gray-500 hover:text-black"
          onClick={isConnected ? handleWithdraw : undefined}
        >
          Withdraw Earnings: {isConnected ? balance : 'Connect Wallet'} ETH
        </a>
      </div>
    </section>
  );
}
