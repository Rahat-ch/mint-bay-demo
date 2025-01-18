"use client";

import { AbstractWalletProvider } from "@abstract-foundation/agw-react";

export default function AbstractProvider({ children }: { children: React.ReactNode }) {

    const config = {
        testnet: true,
    }

    return (
    <AbstractWalletProvider config={config}>
        {children}
    </AbstractWalletProvider>
    )
}
