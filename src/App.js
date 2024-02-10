import "./App.css";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
} from "wagmi";
import { parseEther } from "viem";
import Head from "./components/Head";
import Body from "./components/Body";
import Bottom from "./components/Bottom";
import Footer from "./components/Footer";
import {
  contractABI,
  contractAddressGold,
  contractAddressSilver,
  chainID,
  tokencontractAddress,
  bscusdtContractAddress,
  tokenABI,
  multisigAddress,
} from "./components/utils/constants";
import { useEffect, useState } from "react";
import Notifier from "./components/Notifier";
import { ethers } from "ethers";

function App() {
  const [notify, setNotify] = useState(false);
  const [notifyType, setNotifyType] = useState("warn"); //it can be success, error, warn
  const [notifymsg, setNotifymsg] = useState("errorooo");
  const [paidBalance, setPaidBalance] = useState();
  const [usdtBalance, setUsdtBalance] = useState();
  const [mintType, setMintType] = useState();

  //for approving things
  const [approveContractPick, setApproveContractPick] = useState();

  //HOOKS and getting accounts
  const { isConnected, address } = useAccount();

  //to read balance for paid
  const {
    data: dataPaidBalance,
    isError: errorBalance,
    isLoading: loadingBalance,
  } = useBalance({
    address: address,
    token: tokencontractAddress,
  });
  //to read balance for usdt on bsc
  const {
    data: dataUsdtBalance,
    isError: errorUsdtBalance,
    isLoading: loadingUsdtBalance,
  } = useBalance({
    address: address,
    token: bscusdtContractAddress,
  });

  // const { data:PaidBalanceT, isError:errorBalanceP, isLoading:loadingBalanceP } = useContractRead({
  //   address: tokencontractAddress,
  //   abi: tokenABI,
  //   functionName: 'balanceOf',
  //   args: [address],

  // })

  //for approving
  const {
    data: dataApprove,
    isLoading: loadingApprove,
    isSuccess: successApprove,
    writeAsync: approve,
  } = useContractWrite({
    address: tokencontractAddress,
    abi: contractABI,
    functionName: "approve",
  });
  //for minting gold
  const {
    data: dataMintGold,
    isLoading: loadingMintGold,
    isSuccess: successMintGold,
    writeAsync: mintGold,
  } = useContractWrite({
    address: contractAddressGold,
    abi: tokenABI,
    functionName: "mint",
  });

  //for minting silver
  const {
    data: dataMintSilver,
    isLoading: loadingMintSilver,
    isSuccess: successMintSilver,
    writeAsync: mintSilver,
  } = useContractWrite({
    address: contractAddressSilver,
    abi: tokenABI,
    functionName: "mint",
  });

  //for depositing
  const {
    data: dataDeposit,
    isLoading: loadingDeposit,
    isSuccess: successDeposit,
    writeAsync: depositUsdt,
  } = useContractWrite({
    address: tokencontractAddress,
    abi: contractABI,
    functionName: "transfer",
  });

  const mintGoldNft = async (nfttype, price) => {
    try {
      //checks
      console.log("skipped here and there", isConnected);

      //check if wallet is connected
      if (!isConnected || !address) {
        console.log("skipped here and there");
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg("Connect wallet to proceed");
        return;
      }

      //check if the minter has enough paid balance
      if (parseFloat(paidBalance.formatted) === 0) {
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg("You Paid token is empty");
        return;
      }

      const requiredBalance = nfttype === "gold" ? 4000 : 800;
      if (parseFloat(paidBalance.formatted) < requiredBalance) {
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg(`Insufficient Paid for ${nfttype} nft`);
        return;
      }
      // console.log(ethers.formatEther(price), price, "checks oooooooo");
      //sets mint type
      setMintType(nfttype);

      // Approve the contract to spend the specified amount of paid tokens
      await approve({
        args: [contractAddressGold, price],
      });
      // Wait for approval transaction to be confirmed

        // Mint the Gold NFT after approval is successful
        await mintGold({
          args: [price],
        });


      setNotify(true);
      setNotifyType("success");
      setNotifymsg("Mint successfull");
    } catch (error) {
      console.log(error);
    }
  };

  const mintSilverNft = async (nfttype, price) => {
    try {
      //checks
      console.log("skipped here and there", isConnected);

      //check if wallet is connected
      if (!isConnected || !address) {
        console.log("skipped here and there");
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg("Connect wallet to proceed");
        return;
      }

      //check if the minter has enough paid balance
      if (parseFloat(paidBalance.formatted) === 0) {
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg("You Paid token is empty");
        return;
      }

      const requiredBalance = nfttype === "gold" ? 4000 : 800;
      if (parseFloat(paidBalance.formatted) < requiredBalance) {
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg(`Insufficient Paid for ${nfttype} nft`);
        return;
      }
      // console.log(ethers.formatEther(price), price, "checks oooooooo");
      //sets mint type
      setMintType(nfttype);

      // Approve the contract to spend the specified amount of paid tokens
      await approve({
        args: [contractAddressSilver, price],
      });
      // Wait for approval transaction to be confirmed

        // Mint the Silver NFT after approval is successful
        await mintSilver({
          args: [price],
        });
      

      setNotify(true);
      setNotifyType("success");
      setNotifymsg("Mint successfull");
    } catch (error) {
      console.log(error);
    }
  };


  const deposit = async (amount) => {
    try {
      //checks
      console.log("skipped here and there", isConnected);

      //check if wallet is connected
      if (!isConnected || !address) {
        console.log("skipped here and there");
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg("Connect wallet to proceed");
        return;
      }

      //check if the minter has enough paid balance
      if (parseFloat(usdtBalance.formatted) === 0) {
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg("Your Usdt token is empty");
        return;
      }

      if (parseFloat(usdtBalance.formatted) < amount) {
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg(`Insufficient usdt`);
        return;
      }

      // Approve the contract to spend the specified amount of paid tokens
      await depositUsdt({
        args: [multisigAddress, amount],
      });
      // Wait for approval transaction to be confirmed

      setNotify(true);
      setNotifyType("success");
      setNotifymsg("Deposit successful");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (notify) {
      setTimeout(() => {
        setNotify(false);
        setNotifymsg("");
      }, 3500);
    }
    if (isConnected) {
      setPaidBalance(dataPaidBalance);
      setUsdtBalance(dataUsdtBalance);
    }
  }, [notify, dataPaidBalance, isConnected]);

  return (
    <div className="w-100 h-[100dvh] bg-[#000] text-white px-5 relative">
      <Head />
      <Body
        deposit={deposit}
        loadingDeposit={loadingDeposit}
        mintGoldNft={mintGoldNft}
        mintSilverNft={mintSilverNft}
        mintType={mintType}
        dataPaidBalance={dataPaidBalance}
        loadingMintGold={loadingMintGold}
        loadingMintSilver={loadingMintSilver}
        loadingApprove={loadingApprove}
      />
      <Bottom />
      <Footer />
      {notify && <Notifier notifyType={notifyType} notifymsg={notifymsg} />}
    </div>
  );
}

export default App;
