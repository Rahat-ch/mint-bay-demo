import Link from 'next/link';
import Image from 'next/image';

interface CollectionCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export default function CollectionCard({ title, description, imageUrl, link }: CollectionCardProps) {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-[350px]">
      <div className="relative w-full aspect-square mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-md [image-rendering:pixelated]"
        />
      </div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-center mb-4">{description}</p>
      <div className="text-center">
        <Link 
          href={link}
          className="text-blue-600 hover:underline"
        >
          Mint Collection
        </Link>
      </div>
    </div>
  );
} 