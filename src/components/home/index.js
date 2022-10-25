import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useMintTokens } from "../../hooks";
import Row from "./row";

function Home() {
  const {
    mintAddress,
    setMintAddress,
    balanceData,
    write,
    isLoading,
    setIsLoading,
  } = useMintTokens();

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg">
        <nav className=" flex items-center justify-end px-5 py-3 mb-3">
          <ConnectButton showBalance={false} />
        </nav>
        <div className="flex flex-wrap ml-14">
          <div>
            <Row label="Token name:" value={!balanceData ? "" : "TestToken"} />
            <Row label="Token symbol:" value={!balanceData ? "" : "TTK"} />
            <Row
              label="User balance:"
              value={!balanceData ? "" : balanceData.formatted}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center w-full max-w-sm">
            <input
              className="justify-self-stretch font-bold text-xs appearance-none bg-transparent border border-gray-200 rounded text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none md:min-w-full"
              type="text"
              value={mintAddress}
              placeholder="Insert user address here"
              aria-label="Mint address"
              onChange={(e) => setMintAddress(e.target.value)}
            />
            <button
              disabled={!write || isLoading}
              onClick={() => {
                setIsLoading(true);
                write?.();
              }}
              className="disabled:opacity-25 enabled:hover:scale-105 transform transition bg-blue-500 hover:bg-primary text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Mint tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
