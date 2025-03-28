/** @format */
// setup the provider
"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { createConfig, WagmiProvider, http } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// Import the wallets that are needed
import {
  metaMaskWallet,
  phantomWallet,
} from "@rainbow-me/rainbowkit/wallets";

const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, phantomWallet],
    },
  ],
  {
    appName: "RainbowKit App",
    projectId: projectId || " ",
  }
);

const config = createConfig({
  chains: [sepolia, mainnet], // networks
  connectors: connectors,
  ssr: true,
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
