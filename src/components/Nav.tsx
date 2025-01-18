"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";

const Nav = () => {
  const { login, logout } = useLoginWithAbstract();
  const { address } = useAccount();

  const handleClick = () => {
    if (address) {
      logout();
    } else {
      login();
      console.log("Connected address:", address);
    }
  };

  return (
    <nav className="w-full flex flex-col items-center justify-center py-4 bg-white relative">
      <div className="absolute right-4 top-4">
        <button 
          onClick={handleClick}
          className="inline-block mt-[10px] px-5 py-[5px] text-base font-bold text-black bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] cursor-pointer"
        >
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Login'}
        </button>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Image 
          src="/images/world.gif" 
          alt="World Globe" 
          width={24} 
          height={24}
        />
        <Link href="/" className="text-blue-600 hover:underline">
          <h1 className="text-[3.5em] font-bold">
            [MintBay]
          </h1>
        </Link>
        <Image 
          src="/images/world.gif" 
          alt="World Globe" 
          width={24} 
          height={24}
        />
      </div>
      <div className="flex gap-4 mt-2">
        <Link href="/collect" className="text-blue-600 hover:underline text-[20px] font-bold">
          [ Collect ]
        </Link>
        <Link href="/create" className="text-blue-600 hover:underline text-[20px] font-bold">
          [ Create ]
        </Link>
      </div>
    </nav>
  );
};

export default Nav; 