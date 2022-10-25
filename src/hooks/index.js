import { useEffect, useState } from "react";
import { useSnackbar } from "react-simple-snackbar";
import {
  usePrepareContractWrite,
  useBalance,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";

import { contractAddress } from "../values";
import abi from "../values/abi.json";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useMintTokens = () => {
  const [openSnackbar] = useSnackbar({
    position: "top-center",
    style: {
      backgroundColor: "#92C47C",
      color: "#000000",
    },
    closeStyle: {
      color: "#000000",
    },
  });
  const [mintAddress, setMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedMintAddress = useDebounce(mintAddress);

  const { address } = useAccount();

  const { data: balanceData } = useBalance({
    addressOrName: address,
    token: contractAddress,
    watch: true,
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: "mint",
    args: [debouncedMintAddress, ethers.utils.parseEther("10")],
    enabled: Boolean(debouncedMintAddress),
  });

  const { data: mintData, write } = useContractWrite({
    ...config,
    onError(error) {
      setIsLoading(false);
    },
  });

  useWaitForTransaction({
    hash: mintData?.hash,
    onSuccess(data) {
      openSnackbar(`Tokens minted to address: ${mintAddress}`);
      setMintAddress("");
      setIsLoading(false);
    },
    onError(error) {
      setIsLoading(false);
    },
  });

  return {
    mintAddress,
    setMintAddress,
    balanceData,
    write,
    isLoading,
    setIsLoading,
  };
};
