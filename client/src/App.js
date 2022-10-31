import React from "react";
import SnackbarProvider from "react-simple-snackbar";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import Home from "./components/home";

import "@rainbow-me/rainbowkit/styles.css";

const { chains, provider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ apiKey: process.env.REACT_APP_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "TestToken mint page",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

export default function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <SnackbarProvider>
          <Home />
        </SnackbarProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
