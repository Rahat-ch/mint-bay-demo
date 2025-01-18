"use client";

import { useState, useRef, useEffect } from 'react';
import { useWriteContractSponsored } from '@abstract-foundation/agw-react';
import { getGeneralPaymasterInput } from "viem/zksync";
import { useAccount } from 'wagmi';
import abi from "@/abi/nft.json";
import Link from 'next/link';

interface Trait {
  id: string;
  block_number: string;
  timestamp_: string;
  transactionHash_: string;
  contractId_: string;
  tokenId: string;
  category: string;
  name: string;
  imageURI: string;
}

interface TraitsData {
  data: {
    Background: Trait[];
    Face: Trait[];
    Hair: Trait[];
    Mouth: Trait[];
  };
}

const categories = ['Background', 'Face', 'Hair', 'Mouth'] as const;

interface CollectClientProps {
  traitsData: TraitsData;
}

export default function CollectClient({ traitsData }: CollectClientProps) {
  const [selectedTraits, setSelectedTraits] = useState<Record<string, Trait>>({});
  const [combinedImage, setCombinedImage] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { isConnected } = useAccount();
  const { writeContractSponsored, isPending, isSuccess, error, data: txHash } = useWriteContractSponsored();

  // Show image when transaction succeeds
  useEffect(() => {
    if (isSuccess && generatedImage) {
      setCombinedImage(generatedImage);
    }
  }, [isSuccess, generatedImage]);

  // Debug log for state changes
  useEffect(() => {
    console.log('State Update:', {
      isSuccess,
      txHash,
      combinedImage: combinedImage ? 'exists' : 'none',
      generatedImage: generatedImage ? 'exists' : 'none'
    });
  }, [isSuccess, txHash, combinedImage, generatedImage]);

  const generateAndMint = async () => {
    if (!isConnected) {
      alert("Please Connect Wallet");
      return;
    }

    // Generate random traits
    const randomTraits = categories.reduce((acc, category) => {
      const categoryTraits = traitsData.data[category];
      const randomIndex = Math.floor(Math.random() * categoryTraits.length);
      acc[category] = categoryTraits[randomIndex];
      return acc;
    }, {} as Record<string, Trait>);

    setSelectedTraits(randomTraits);

    // Generate image
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load and draw images
    for (const category of categories) {
      const trait = randomTraits[category];
      if (trait && trait.imageURI) {
        try {
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = trait.imageURI;
          });
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        } catch (error) {
          console.error(`Error loading image for ${category}:`, error);
          return;
        }
      }
    }

    const dataUrl = canvas.toDataURL('image/png');
    setGeneratedImage(dataUrl);
    console.log('Image generated');
    
    // Prepare trait arrays for the contract
    const traitTypes = Object.entries(randomTraits).map(([category]) => category);
    const traitValues = Object.entries(randomTraits).map(([_, trait]) => trait.name);

    try {
      console.log('Starting mint transaction...');
      await writeContractSponsored({
        abi,
        address: "0xb4824D41170f8bbe42f940302EA812cE4e09Fa96",
        functionName: "mint",
        args: [dataUrl, traitTypes, traitValues],
        paymaster: "0x88802338093CF8A191856F84cFc85AB5026EAC87",
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });
    } catch (err) {
      console.error("Minting error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button 
        onClick={generateAndMint}
        className="inline-block px-5 py-[5px] text-base font-bold text-black bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] cursor-pointer disabled:opacity-50"
        disabled={!isConnected || isPending}
      >
        {isPending ? "Generating & Minting..." : "Generate & Mint NFT"}
      </button>
      
      <canvas 
        ref={canvasRef}
        width={64}
        height={64}
        className="hidden"
        style={{ 
          imageRendering: 'pixelated'
        }}
      />

      {error && (
        <p className="text-red-500">Error: {error.message}</p>
      )}

      {isSuccess && combinedImage && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <img 
            src={combinedImage} 
            alt="Your Minted NFT" 
            width={500}
            height={500}
            style={{ 
              imageRendering: 'pixelated'
            }}
            className="border border-gray-300"
          />
          {txHash && (
            <Link 
              href={`https://explorer.testnet.abs.xyz/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Transaction
            </Link>
          )}
        </div>
      )}
    </div>
  );
} 