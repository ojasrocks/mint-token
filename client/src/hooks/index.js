import { useEffect, useState } from "react";
import { useSnackbar } from "react-simple-snackbar";
import {
  usePrepareContractWrite,
  useBalance,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
  useToken,
} from "wagmi";
import { ethers } from "ethers";
import axios from "axios";
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
  const [mintAmount, setMintAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedMintAddress = useDebounce(mintAddress);

  const { address } = useAccount();

  const { data: balanceData } = useBalance({
    addressOrName: address,
    token: contractAddress,
    watch: true,
  });

  const { data: token } = useToken({
    address: contractAddress,
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: "mint",
    args: [
      debouncedMintAddress,
      ethers.utils.parseEther(!!mintAmount ? mintAmount : "0"),
    ],
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
      (async () => {
        await axios({
          method: "POST",
          url: "/mint-token/addMintEvent",
          data: data,
        });
      })();
      openSnackbar(`Tokens minted to address: ${mintAddress}`);
      setMintAmount("");
      setMintAddress("");
      setIsLoading(false);
    },
    onError(error) {
      setIsLoading(false);
    },
  });

  const [databaseValue, setDatabaseValue] = useState({
    address: address,
    balance: balanceData?.formatted,
    symbol: token?.symbol,
    tokenName: token?.name,
  });

  useEffect(() => {
    if (!balanceData) return;
    if (!address) return;
    if (!token) return;
    (async () =>
      await axios({
        method: "POST",
        url: "/account/getNset",
        data: {
          address: address,
          balance: balanceData?.formatted,
          symbol: balanceData?.symbol,
          tokenName: token?.name,
        },
      }).then((response) => setDatabaseValue(response.data)))();
  }, [address, balanceData, token]);

  return {
    mintAddress,
    setMintAddress,
    mintAmount,
    setMintAmount,
    write,
    databaseValue,
    isLoading,
    setIsLoading,
  };
};
