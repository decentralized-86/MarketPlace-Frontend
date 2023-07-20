import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { ethers } from 'ethers';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1f2937', // dark gray-blue
    borderRadius: '1rem',
    padding: '2rem',
    color: '#f3f4f6', // off-white
    width: '80%',
    maxWidth: '600px',
    fontFamily: 'Roboto, sans-serif', // specify the font here
  },
};

const shortenAddress = (address) => {
  return `${address.slice(0,6)}...${address.slice(-4)}`;
}

const Card = ({ item , Contract }) => {
  const ipfsGateway = "https://ipfs.io/ipfs/";
  const [imageURL, setImageURL] = useState("");
  const [modalIsOpen,setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTokenURI = async () => {
      const url = item.tokenURI.replace("ipfs://", ipfsGateway);
      const response = await fetch(url);
      const metadata = await response.json();

      setImageURL(metadata.image);
    }
    fetchTokenURI();
  }, [item]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }
  const buyNft = async () => {
    try {
      console.log(Contract);
      console.log(typeof(item.nftAddress))
      console.log(item.nftAddress)
      console.log(item.price)
      const tokenId = parseInt(item.tokenId);
      console.log(tokenId)
      console.log("tokenId",typeof(tokenId))
      const priceInWei = ethers.BigNumber.from(item.price);
      console.log(priceInWei)
      console.log(priceInWei.toString());
      const Buying =  await  Contract.BuyNfts(item.nftAddress,tokenId,{gasLimit :500000, value :priceInWei});
      await Buying.wait(1);
      closeModal();

    } catch (err) {
      console.error("An error occurred while buying the NFT:", err);
    }
  };

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-lg shadow-lg bg-white max-w-xs m-4 cursor-pointer font-sans" onClick={openModal}>
      <img src={imageURL} alt="NFT" className="h-64 w-full object-cover"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">NFT ID: {item.tokenId}</div>
        <p className="text-grey-darker text-sm">Seller: {shortenAddress(item.seller)}</p>
        <p className="text-grey-darker text-sm">Price: {item.price}</p>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        contentLabel="NFT Detail"
      >
        <div className="flex flex-col items-center font-sans"> {/* CSS Flexbox container */}
          <img src={imageURL} alt="NFT" className="w-64 h-64 object-contain rounded-t-lg mb-4"/>
          <h2 className="font-bold text-3xl mt-4 mb-2 text-center">NFT ID: {item.tokenId}</h2>
          <p className="text-lg mb-2 text-center">Seller: {shortenAddress(item.seller)}</p>
          <p className="text-lg mb-4 text-center">Price: {item.price}</p>
          <div className="flex justify-center space-x-4"> {/* Flex container for the buttons */}
            <button onClick={buyNft} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Buy</button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default Card;
