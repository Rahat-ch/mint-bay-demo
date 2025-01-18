import { Suspense } from 'react';
import traits from '@/temp_data/traits.json';
import CollectClient from './CollectClient';

export default function CollectPage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24 gap-8">
            <h1 className="text-4xl font-bold">
                Collect
            </h1>
            <Suspense fallback={<div>Loading traits...</div>}>
                <CollectClient traitsData={traits} />
            </Suspense>
        </main>
    );
} 