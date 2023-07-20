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

  if (!isConnected) {
    return (
      <section className="bg-black py-4">
        <div className="container mx-auto text-center">
          <p className="text-white font-bold">Connect Wallet to Withdraw Earnings</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black py-4">
      <div className="container mx-auto text-center">
        {/* <a href="#withdraw" className="text-white font-bold text-lg" onClick={handleWithdraw}> */}
        <a href="#withdraw" className="text-white font-bold text-lg" >
          {/* Withdraw Earnings = {balance}  ETH */}
          Withdraw Earnings = 0  ETH
        </a>
      </div>
    </section>
  );
}
