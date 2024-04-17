import React, { useEffect, useState } from "react";
import { LoaderSvg } from "./Usefullcomponents";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
  configureChains,
} from "wagmi";
import {
  contractABI,
  contractAddressGold,
  contractAddressSilver,
  chainID,
  tokencontractAddress,
  bscusdtContractAddress,
  tokenABI,
  multisigAddress,
  operatorAddress,
  bnToNumber,
  allocationContractAddress,
  allocationABI,
  LOCAL_URL,
  PRODUCTION_URL,
} from "../components/utils/constants.js";
import { bscTestnet, bsc, mainnet } from "viem/chains";
import { publicProvider } from "wagmi/providers/public";
import { ethers } from "ethers";
import { BigNumber } from "ethers";
import Preloader from "./Preloader.js";
import ComponentLoad from "./ComponentLoad.js";
// import { useProvider } from 'wagmi/dist/providers';
import { createWalletClient, custom } from "viem";

export default function Burn({
  deposit,
  loadingDeposit,
  depoalloc,
  calculating,
  amount,
  goldBalance,
  silverBalance,
  probableAlloc,
  loadingApproveU,
  loading,
  setLoading,
  setNotify,
  setNotifyType,
  setNotifymsg,
}) {
  const { isConnected, address } = useAccount();
  const [nftToBurn, setNftToBurn] = useState("gold");
  const [goldbalanceagain, setGoldBal] = useState();
  const [silverbalanceagain, setSilverBal] = useState();
  const [idsGold, setIdGold] = useState([]);
  const [idsSilver, setIdSilver] = useState([]);
  //checking if things have loaded
  const [isloadedGold, setIsLoadedGold] = useState(false);
  const [isloadedSilver, setIsLoadedSilver] = useState(false);
  //preloaders
  const [preloaders, setPreloaders] = useState(true);
  // let provider;

  let provider;
  let signer;
  let gameContractGold;
  let gameContractSilver;

  const client = createWalletClient({
    transport: custom(window.ethereum),
  });

  const initializeContracts = async () => {
    provider = new ethers.providers.Web3Provider(client.transport, "any");
    // provider = new ethers.providers.JsonRpcProvider(providerUrl);
    signer = provider.getSigner();
    gameContractGold = new ethers.Contract(
      contractAddressGold,
      contractABI,
      signer
    );
    gameContractSilver = new ethers.Contract(
      contractAddressSilver,
      contractABI,
      signer
    );
  };

  const getGameContractSilver = () => {
    if (!gameContractSilver) {
      console.log("Contracts not initialized");
    }
    return gameContractSilver;
  };

  const getGameContractGold = () => {
    if (!gameContractGold) {
      console.log("Contracts not initialized");
    }
    return gameContractGold;
  };

  const {
    data: balanceDataGold,
    isError: goldbalerr,
    isLoading: loadingBalanceGold,
  } = useContractRead({
    address: contractAddressGold,
    abi: tokenABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const {
    data: balanceDataSilver,
    isError: silverbalerr,
    isLoading: loadingBalanceSilver,
  } = useContractRead({
    address: contractAddressSilver,
    abi: tokenABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const {
    data: dataapproveGold,
    isLoading: loadingapproveGold,
    isSuccess: successapproveGold,
    writeAsync: approveGold,
  } = useContractWrite({
    address: contractAddressGold,
    abi: contractABI,
    functionName: "setApprovalForAll",
  });
  const {
    data: datatransGold,
    isLoading: loadingtransGold,
    isSuccess: successtransGold,
    writeAsync: transferGold,
  } = useContractWrite({
    address: contractAddressGold,
    abi: contractABI,
    functionName: "transferFrom",
  });

  //for silver
  const {
    data: dataapproveSilver,
    isLoading: loadingapproveSilver,
    isSuccess: successapproveSilver,
    writeAsync: approveSilver,
  } = useContractWrite({
    address: contractAddressSilver,
    abi: contractABI,
    functionName: "setApprovalForAll",
  });

  const {
    data: datatransSilver,
    isLoading: loadingtransSilver,
    isSuccess: successtransSilver,
    writeAsync: transferSilver,
  } = useContractWrite({
    address: contractAddressSilver,
    abi: contractABI,
    functionName: "transferFrom",
  });

  const getGoldTokensIds = async () => {
    try {
      const Contract = await getGameContractGold();
      const loopNumber = bnToNumber(balanceDataGold);

      const promises = [];
      for (let i = 0; i < loopNumber; i++) {
        // promises.push(
        //   Contract.tokenOfOwnerByIndex(address, i, { gasLimit: 500000 })
        // );
        const tokenId = await Contract.tokenByIndex(i);
        promises.push(tokenId);
      }

      const tokenIds = await Promise.all(promises);
      const numberedTokenIds = tokenIds.map(bnToNumber);
      setIdGold(numberedTokenIds);
      setIsLoadedGold(true);
    } catch (error) {
      console.log(error, "gold");
    }
  };

  const getSilverTokensIds = async () => {
    try {
      const Contract = await getGameContractSilver();
      console.log(Contract, "hiiiiiiiiiiiii");
      const loopNumber = bnToNumber(balanceDataSilver);
      console.log(loopNumber, "LLLLLooooooooooop Number");
      const promises = [];
      for (let i = 0; i <= loopNumber; i++) {
        console.log(i);
        // if (await Contract.tokenByIndex(i)) {
        //   const tokenId = await Contract.tokenOfOwnerByIndex(address, i, {
        //     gasLimit: 500000,
        //   });
        //   promises.push(tokenId);
        // } else {
        //   console.log(`Token at index ${i} does not exist.`);
        // }
        const tokenId = await Contract.tokenByIndex(i);
        promises.push(tokenId);
        console.log(promises, "checking promises oooo", i);
      }
      console.log("for once again lets gooooooooo");
      //tokenByIndex
      const tokenIds = await Promise.all(promises);
      const numberedTokenIds = tokenIds.map(bnToNumber);
      // console.log(tokenIds, "checking token ids");
      console.log(numberedTokenIds, "numbered token ids");
      setIdSilver(numberedTokenIds);
      setIsLoadedSilver(true);
    } catch (error) {
      // console.log(error, "silver");
      console.error("Transaction data:", error);
    }
  };

  const burn = async () => {
    try {
      console.log(
        idsSilver,
        "silllllllllllllllllllllllllllllvvvvverrrrrrrrrrr"
      );
      setLoading(true);
      if (nftToBurn === "gold" && goldbalanceagain === 0) {
        setLoading(false);
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg(" Insufficient Gold NFTs in wallet!");
        return;
      }

      if (nftToBurn === "silver" && silverbalanceagain === 0) {
        setLoading(false);
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg(" Insufficient Silver NFTs in wallet!");
        return;
      }

      if (!isConnected || !address) {
        setLoading(false);
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg("Connect wallet to proceed");
        return;
      }

      if (nftToBurn === "gold") {
        await approveGold({ args: [operatorAddress, true] });
        console.log("helping");
        const delayInMilliseconds = 20 * 1000; // 30 seconds in milliseconds
        await new Promise((resolve) =>
          setTimeout(resolve, delayInMilliseconds)
        ); // 2 minutes in milliseconds
        await transferGold({ args: [address, operatorAddress, idsGold[0]] });
        // await tx.wait();
        console.log("Token burned successfully");
      } else {
        console.log("before silver", operatorAddress);
        await approveSilver({
          args: [operatorAddress, true],
        });
        const delayInMilliseconds = 20 * 1000; // 30 seconds in milliseconds
        await new Promise((resolve) =>
          setTimeout(resolve, delayInMilliseconds)
        ); // 2 minutes in milliseconds
        console.log("helping silver");
        await transferSilver({
          args: [address, operatorAddress, idsSilver[0]],
        });
        // await tx.wait();
        console.log("Token burned successfully");
      }

      setNotify(true);
      setNotifyType("success");
      setNotifymsg("Burn successful");
      setLoading(false);
    } catch (error) {
      console.log(error, "catching errors ooooo");
    }
  };

  useEffect(() => {
    if (address) {
      console.log(
        balanceDataSilver,
        idsGold.length === 0,
        silverbalanceagain,
        idsSilver,
        "silverbalanceagain hhhhg"
      );

      if (goldbalanceagain === undefined && idsGold.length === 0) {
        console.log("data ishhhhhhhhhhhhhhhh");
        let value = bnToNumber(balanceDataGold);
        setGoldBal(value | 0);
        getGoldTokensIds();
      }
      if (silverbalanceagain === undefined && idsSilver.length === 0) {
        console.log("silvering");
        let value = bnToNumber(balanceDataSilver);
        console.log(value, "insidee silverring");
        setSilverBal(value | 0);
        getSilverTokensIds();
      }
    }
  }, []);

  // const getProvider = async () => {
  //   if (!provider) {
  //     const providerIn = await new ethers.providers.Web3Provider(window.ethereum);
  //     setProvider(providerIn);
  //   }
  // }

  useEffect(() => {
    console.log(idsSilver, "chaaaaaaaaaaannnnnnnnnnnnniiiiiii");
    if (isloadedGold && isloadedSilver) {
      console.log("loaded");
      setPreloaders(false);
    }
    if (!gameContractGold && !gameContractSilver) {
      initializeContracts();
    }
  }, [isloadedGold, isloadedSilver]);

  return (
    <div className="w-100 h-100 flex flex-col items-center justify-center gap-20">
      <div className="flex relative flex-col h-[350px] w-[100%] md:w-[60%] p-5 min-w-[250px] shadow-[-1rem_0_3rem_#00000067] transition-[0.2s] rounded-2xl bg-[#191a1a]">
        {/* <h1 className="mb-2">Deposit</h1> */}
        <div className="flex flex-col items-start gap-10 p-5 w-100">
          <div className="font-semibold">Burn NFTS</div>

          {/* <div className="font-semibold">
            <div className="">
              Your wallet allocation is 
            </div> 
          </div> */}

          <div className="text-md font-semibold ">
            You can burn your NFTS, add the number and nft type
          </div>
          <div
            className={`flex flex-col gap-2 items-center w-[100%] shadow-md transition-opacity ${
              preloaders ? "opacity-50" : "opacity-100"
            } `}
          >
            <div className="flex gap-7 w-full h-auto justify-center items-center">
              <div
                className="border border-[#FFD700] rounded w-28 h-28 font-semibold text-[#FFD700] flex flex-col justify-center items-center hover:bg-[#FFD700] hover:text-[#fff] cursor-pointer"
                onClick={() => setNftToBurn("gold")}
              >
                <span>Burn Gold</span>
                <div className="flex justify-center items-center w-[90%]">
                  <span>{goldbalanceagain | 0}</span>
                </div>
              </div>

              <div
                className="border border-[#C0C0C0] rounded w-28 h-28 font-semibold text-[#C0C0C0] flex flex-col justify-center items-center hover:bg-[#C0C0C0] hover:text-[#fff] cursor-pointer"
                onClick={() => setNftToBurn("silver")}
              >
                <span>Burn Silver</span>
                <div className="flex justify-center items-center w-[90%]">
                  <span>{silverbalanceagain | 0}</span>
                </div>
              </div>
            </div>

            <button
              className={`relative whitespace-nowrap ${
                nftToBurn === "gold" ? "bg-[#FFD700]" : "bg-[#C0C0C0]"
              }  ${
                loadingDeposit || loading ? "p-[29px]" : "p-4"
              } rounded text-[#000] font-semibold w-[25%] flex justify-center items-center`}
              onClick={burn}
            >
              {(nftToBurn === "gold" ? loadingtransGold : loadingtransSilver) ||
              loading ? (
                <LoaderSvg />
              ) : (
                <>
                  {!address
                    ? `Connect Wallet`
                    : preloaders && address
                    ? "Loading..."
                    : `Burn ${nftToBurn}`}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
