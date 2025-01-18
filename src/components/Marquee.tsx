"use client";
import React from 'react';
import Image from 'next/image';

interface MarqueeProps {
  backgroundColor: string;
  content: React.ReactNode;
}

const Marquee = ({ backgroundColor, content }: MarqueeProps) => {
  return (
    <div 
      className="w-full overflow-hidden p-[10px]"
      style={{ backgroundColor }}
    >
      <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite]">
        <div className="inline-block">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Marquee; 