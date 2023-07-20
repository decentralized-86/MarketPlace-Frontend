import React from 'react';

export default function MainSection() {
  const imageUri = 'https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=500';

  return (
    <section className="bg-slate-200 flex items-center">
      <div className="container mx-auto flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl sm:text-6xl font-bold text-black mb-8 text-center">
          Buying and Selling in the world of NFT art
        </h1>
        <p className="text-xl sm:text-2xl text-black mb-12 text-center">
          Welcome to the world of NFT art. You can buy and sell art to your heart's content and enjoy all the cool features from us.
        </p>
        <p>50k| User Active   10k|Artworks   806|Artists</p>
      </div>
      <div className="w-100 h-90 relative rounded-full overflow-hidden">
        <img src={imageUri} alt="NFT Artwork" />
      </div>
    </section>
  );
}
