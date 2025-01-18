"use client";
import Image from 'next/image';
import Marquee from '@/components/Marquee';
import CollectionCard from '@/components/CollectionCard';

export default function Home() {
  const marqueeContent = (
    <div className="flex items-center gap-2 text-black">
      <Image 
        src="/images/smiley.gif" 
        alt="Smiley" 
        width={20} 
        height={20}
      />
      Mint your fully on-chain Collection on Abstract
      <Image 
        src="/images/smiley.gif" 
        alt="Smiley" 
        width={20} 
        height={20}
      />
      Upload your Art {'->'} Set rarity {'->'} Preview collection {'->'} Deploy contract
      <Image 
        src="/images/smiley.gif" 
        alt="Smiley" 
        width={20} 
        height={20}
      />
    </div>
  );

  const collections = [
    {
      title: "Marilyn",
      description: "1000 hand-drawn pfp",
      imageUrl: "/images/marilyn.png",
      link: "/collect"
    },
    {
      title: "Marilyn",
      description: "This is a brief description of Collection",
      imageUrl: "/images/marilyn.png",
      link: "/collect"
    },
    {
      title: "Marilyn",
      description: "this is an example description",
      imageUrl: "/images/marilyn.png",
      link: "/collect"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Marquee backgroundColor="#4ade80" content={marqueeContent} />
      <hr className="border-t-2 border-black mt-4" />
      <h1 className="text-center font-bold uppercase mt-4 text-[1.5em]">
        Explore Trending Collections
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {collections.map((collection, index) => (
          <CollectionCard
            key={index}
            {...collection}
          />
        ))}
      </div>
    </main>
  );
}
