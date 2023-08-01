import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { ethers } from "ethers";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    transition: "opacity 400ms",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#2d3748",
    borderRadius: "1rem",
    padding: "2rem",
    color: "#f7fafc",
    width: "80%",
    maxWidth: "800px",
    fontFamily: "Roboto, sans-serif",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease-out",
  },
};

const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const Card = ({ item, Contract }) => {
  const ipfsGateway = "https://ipfs.io/ipfs/";
  const [ImageURL, setImageURL] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  useEffect(() => {
    const fetchTokenURI = async () => {
      const url = item.tokenURI.replace("ipfs://", ipfsGateway);
      try {
        console.log("URL is  " + url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const metadata = await response.json();
        console.log("metadata image url ", metadata.image);
        setImageURL(metadata.image);
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setFetchSuccess(false);
      }
    };
    fetchTokenURI();
  }, [item]);
  useEffect(() => {
    console.log("Image URL " + ImageURL);
    setFetchSuccess(true); // You may want to set this only when the ImageURL is successfully fetched
  }, [ImageURL]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const buyNft = async () => {
    try {
      const tokenId = parseInt(item.tokenId);
      const priceInWei = ethers.BigNumber.from(item.price);
      const Buying = await Contract.BuyNfts(item.nftAddress, tokenId, {
        gasLimit: 500000,
        value: priceInWei,
      });
      await Buying.wait(1);
      closeModal();
    } catch (err) {
      console.error("An error occurred while buying the NFT:", err);
    }
  };

  return (
    fetchSuccess && (
      <div
        className="flex flex-col justify-between overflow-hidden rounded-lg shadow-lg bg-white max-w-xs m-4 cursor-pointer font-sans"
        onClick={openModal}
        style={{
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease-out",
        }}
      >
        <img
          src={ImageURL}
          alt="NFT"
          className="w-48 h-48 object-cover mx-auto"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-lg mb-2 text-black">
            NFT ID: {item.tokenId}
          </div>
          <p className="font-bold text-lg text-black">
            Seller: {shortenAddress(item.seller)}
          </p>
          <p className="font-bold text-lg text-black">Price: {item.price}</p>
        </div>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={true}
          style={customStyles}
          contentLabel="NFT Detail"
        >
          <div className="flex flex-col items-center font-sans">
            <img
              src={ImageURL}
              alt="NFT"
              className="w-48 h-48 object-contain rounded-t-lg mb-4"
            />
            <h2 className="font-bold text-4xl mt-4 mb-2 text-center">
              NFT ID: {item.tokenId}
            </h2>
            <p className="text-xl mb-2 text-center">
              Seller: {shortenAddress(item.seller)}
            </p>
            <p className="text-xl mb-4 text-center">Price: {item.price}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={buyNft}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Buy
              </button>
            </div>
          </div>
        </ReactModal>
      </div>
    )
  );
};

export default Card;
