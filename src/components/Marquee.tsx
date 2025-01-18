"use client";

interface MarqueeProps {
  backgroundColor: string;
  content: React.ReactNode;
}

export default function Marquee({ backgroundColor, content }: MarqueeProps) {
  return (
    <div 
      className="w-full overflow-hidden py-2"
      style={{ backgroundColor }}
    >
      <div className="animate-marquee whitespace-nowrap">
        {content}
      </div>
    </div>
  );
} 