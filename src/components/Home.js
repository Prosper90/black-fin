import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useContractEvent,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { parseEther } from "viem";
import Head from "./Head";
import Body from "./Body";
import Bottom from "./Bottom";
import Footer from "./Footer";
import {
  contractABI,
  contractAddressGold,
  contractAddressSilver,
  chainID,
  tokencontractAddress,
  bscusdtContractAddress,
  tokenABI,
  multisigAddress,
  bnToNumber,
  allocationContractAddress,
  allocationABI,
  LOCAL_URL,
  PRODUCTION_URL,
  chainId,
} from "./utils/constants.js";
import { useEffect, useState } from "react";
import Notifier from "./Notifier";
import { ethers } from "ethers";
import { makeCall } from "./utils/makeCall";
import Preloader from "./Preloader";

export default function Home({ setNotify, setNotifyType, setNotifymsg }) {
  const [paidBalance, setPaidBalance] = useState();
  const [usdtBalance, setUsdtBalance] = useState();
  const [mintType, setMintType] = useState();
  const [loading, setLoading] = useState(false);
  //preloaders
  const [preloaders, setPreloaders] = useState(true);

  //for approving things
  const [approveContractPick, setApproveContractPick] = useState();

  //nft balance
  const [goldBalance, setGoldBalance] = useState(0);
  const [silverBalance, setSilverBalance] = useState(0);

  //state to handle total Supply
  const [totGold, setTotGold] = useState(0);
  const [totSilver, setTotSilver] = useState(0);

  //get and hold of deposit allocation amount
  const [depoalloc, setDepoalloc] = useState();
  const [probableAlloc, setProbableAlloc] = useState();

  //just setting amount for deposit
  const [amount, setAmount] = useState();

  // update useffect from minted event
  const [minted, setMinted] = useState(false);

  //for duplicate
  const [duplicate, setDuplicate] = useState();
  //limit for allocation
  const limitAlloc = 15750;

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

  //for approving paid
  const {
    data: dataApprove,
    isLoading: loadingApprove,
    isSuccess: successApprove,
    writeAsync: approve,
  } = useContractWrite({
    address: tokencontractAddress,
    abi: tokenABI,
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
    abi: contractABI,
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
    abi: contractABI,
    functionName: "mint",
  });

  //for depositing
  const {
    data: dataDeposit,
    isLoading: loadingDeposit,
    isSuccess: successDeposit,
    writeAsync: depositUsdt,
  } = useContractWrite({
    address: bscusdtContractAddress,
    abi: tokenABI,
    functionName: "transfer",
  });

  //For reading totalSupply of nfts
  //for gold
  const {
    data: goldtot,
    isError: goldtoterr,
    isLoading: goldtotload,
  } = useContractRead({
    address: contractAddressGold,
    abi: tokenABI,
    functionName: "totalSupply",
    watch: true,
  });
  //for silver
  const {
    data: silvertot,
    isError: silvertoterr,
    isLoading: silvertotload,
  } = useContractRead({
    address: contractAddressSilver,
    abi: tokenABI,
    functionName: "totalSupply",
    watch: true,
  });

  //for getting nfts balances of user
  //for gold
  const {
    data: goldbal,
    isError: goldbalerr,
    isLoading: goldbalload,
  } = useContractRead({
    address: contractAddressGold,
    abi: tokenABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });
  //for silver
  const {
    data: silverbal,
    isError: silverbalerr,
    isLoading: silverbalload,
  } = useContractRead({
    address: contractAddressSilver,
    abi: tokenABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  //for approving usdt
  const {
    data: dataApproveU,
    isLoading: loadingApproveU,
    isSuccess: successApproveU,
    writeAsync: approveU,
  } = useContractWrite({
    address: bscusdtContractAddress,
    abi: tokenABI,
    functionName: "approve",
  });

  //catch mint event for gold
  useContractEvent({
    address: contractAddressGold,
    abi: contractABI,
    eventName: "Minted",
    listener(log) {
      console.log(log, "in in in logging gold");
      if (log[0].args.minter === address) {
        // setDuplicate(log[0].transactionHash);
        eventUpdateAlloc();
        // setMinted(true);
      }
    },
  });

  //catch mint event for silver
  useContractEvent({
    address: contractAddressSilver,
    abi: contractABI,
    eventName: "Minted",
    listener(log) {
      console.log(log, "in in in logging silver");
      if (log[0].args.minter === address) {
        // setDuplicate(log[0].transactionHash);
        eventUpdateAlloc();
        // setMinted(true);
      }
    },
  });

  const mintGoldNft = async (nfttype, price) => {
    try {
      //checks
      // console.log("skipped here and there", isConnected);

      //check if wallet is connected
      if (!isConnected || !address) {
        // console.log("skipped here and there");
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

      // Convert to a decimal BN
      const amountBN = ethers.BigNumber.from(Math.round(price));
      // 10^18 for standard ERC20 decimal precision
      const amountToApprove = amountBN.mul(ethers.BigNumber.from(10).pow(18));
      // console.log(amountToApprove, "amount to approve");
      // Approve the contract to spend the specified amount of paid tokens
      await approve({
        args: [contractAddressGold, amountToApprove],
      });
      // Wait for approval transaction to be confirmed

      // Convert to a decimal BN
      // const limitBN = ethers.BigNumber.from(Math.round(limitAlloc));
      // // 10^18 for standard ERC20 decimal precision
      // const amountforLimit = limitBN.mul(ethers.BigNumber.from(10).pow(18));
      // Mint the Gold NFT after approval is successful
      await mintGold({
        args: [amountToApprove],
        gas: 2000000,
      });

      await addAlloc();

      setNotify(true);
      setNotifyType("success");
      setNotifymsg("Mint Successfull");
    } catch (error) {
      console.log(error, "happy");
    }
  };

  const mintSilverNft = async (nfttype, price) => {
    try {
      //checks
      // console.log("skipped here and there", isConnected, price);

      //check if wallet is connected
      if (!isConnected || !address) {
        // console.log("skipped here and there");
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

      // Convert to a decimal BN
      const amountBN = ethers.BigNumber.from(Math.round(price));
      // 10^18 for standard ERC20 decimal precision
      const amountToApprove = amountBN.mul(ethers.BigNumber.from(10).pow(18));

      // Approve the contract to spend the specified amount of paid tokens
      await approve({
        args: [contractAddressSilver, amountToApprove],
      });
      // Wait for approval transaction to be confirmed

      // Convert to a decimal BN
      // const limitBN = ethers.BigNumber.from(Math.round(limitAlloc));
      // // 10^18 for standard ERC20 decimal precision
      // const amountforLimit = limitBN.mul(ethers.BigNumber.from(10).pow(18));
      // Mint the Silver NFT after approval is successful
      await mintSilver({
        args: [amountToApprove],
        gas: 2000000,
      });

      await addAlloc();

      setNotify(true);
      setNotifyType("success");
      setNotifymsg("Mint Successfull");
    } catch (error) {
      console.log(error);
    }
  };

  const calculating = (e) => {
    if (e.target.value > probableAlloc) {
      setNotify(true);
      setNotifyType("warn");
      setNotifymsg(
        `cant deposit above ${probableAlloc.toFixed(2)}, your allocation`
      );
      return;
    }
    setAmount(e.target.value);
  };

  const deposit = async () => {
    try {
      //checks
      // console.log("skipped here and there", isConnected);
      setLoading(true);
      if (amount > probableAlloc) {
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg("cant deposit above" + probableAlloc + " ");
        return;
      }

      //check if wallet is connected
      if (!isConnected || !address) {
        // console.log("skipped here and there");
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg("Connect wallet to proceed");
        return;
      }
      //check if value is in the input
      if (amount === "") {
        // console.log("skipped here and there");
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg("Amount cannot be empty");
        return;
      }

      //check if the minter has enough usdt balance
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

      // Convert to a decimal BN
      const amountBN = ethers.BigNumber.from(Math.round(amount));

      // 10^18 for standard ERC20 decimal precision
      const amountToApprove = amountBN.mul(ethers.BigNumber.from(10).pow(18));

      // Approve the contract to spend the specified amount of paid tokens
      // await approveU({
      //   args: [multisigAddress, amountToApprove],
      // });

      await depositUsdt({
        args: [multisigAddress, amountToApprove],
      });
      // Wait for approval transaction to be confirmed

      await updateAlloc();

      setNotify(true);
      setNotifyType("success");
      setNotifymsg("Deposit successful");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  const fetchAlloc = async () => {
    console.log("Iwant to know oooo");
    try {
      console.log("inside try");
      const url = `${PRODUCTION_URL}/info/${address}`;
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await makeCall(url, {}, headers, "get");
      console.log(response, "here twenty three");

      if (response.status) {
        setProbableAlloc(response.data.allocation);
      }
    } catch (error) {
      console.log("checking oooo fetch", error);
    }
  };

  //add alloc
  const addAlloc = async () => {
    console.log("here jjjk", goldBalance, silverBalance, totGold, totSilver);
    try {
      const endpoint = `${PRODUCTION_URL}/addAlloc/${address}`;
      console.log(endpoint, duplicate, "Oya na hhhiiyyaa");
      const data = {
        duplicate: duplicate,
        limit: limitAlloc,
        goldBalance: bnToNumber(goldbal),
        silverBalance: bnToNumber(silverbal),
        totalGold: bnToNumber(goldtot),
        totalSilver: bnToNumber(silvertot),
      };
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await makeCall(endpoint, data, headers, "post");

      console.log(response, "checking response");
      console.log("sent sent sent");

      if (response.status) {
        setNotify(true);
        setNotifyType("success");
        setNotifymsg("allocation added");
        setProbableAlloc(response.data.allocation);
        return;
      } else {
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg(response.message);
        return;
      }
    } catch (error) {
      console.log("checking oooo add", error);
    }
  };

  //update user based on events
  const eventUpdateAlloc = async () => {
    console.log("here jjjk", goldBalance, silverBalance, totGold, totSilver);
    try {
      const endpoint = `${PRODUCTION_URL}/updateEvent/${address}`;
      const data = {
        limit: limitAlloc,
        goldBalance: bnToNumber(goldbal),
        silverBalance: bnToNumber(silverbal),
        totalGold: bnToNumber(goldtot),
        totalSilver: bnToNumber(silvertot),
      };
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await makeCall(endpoint, data, headers, "post");

      console.log(response, "checking response");
      console.log("sent sent sent");

      if (response.status) {
        setNotify(true);
        setNotifyType("success");
        setNotifymsg("allocation added");
        setProbableAlloc(response.data.allocation);
        return;
      } else {
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg(response.message);
        return;
      }
    } catch (error) {
      console.log("checking oooo add", error);
    }
  };

  //update alloc
  const updateAlloc = async () => {
    try {
      const endpoint = `${PRODUCTION_URL}/updateAlloc/${address}`;
      // console.log( socketData, "Oya na" );
      const data = {
        amount: amount,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await makeCall(endpoint, data, headers, "post");

      console.log(response, "checking response");

      if (response.status) {
        setNotify(true);
        setNotifyType("success");
        setNotifymsg("allocation updated");
        setProbableAlloc(response.data.allocation);
        return;
      } else {
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg(response.message);
        return;
      }
    } catch (error) {
      console.log("checking oooo update");
    }
  };

  useEffect(() => {
    // if (notify) {
    //   setTimeout(() => {
    //     setNotify(false);
    //     setNotifymsg("");
    //   }, 3500);
    // }

    if (minted) {
      setTimeout(() => {
        setMinted(false);
      }, 4500);
    }

    if (address) {
      console.log(chain, typeof chain?.id, "logging current chain");
      console.log(
        chain?.id,
        chainId,
        chainId == chain?.id,
        "everything oooooo"
      );
      if (chainId !== chain?.id) {
        console.log("in in inside");
        switchNetwork?.(56);
      }
      // if (successMintSilver || successMintGold) {
      //   setNotify(true);
      //   setNotifyType("success");
      //   setNotifymsg("Mint successful");
      // }

      if (isConnected && address) {
        setPaidBalance(dataPaidBalance);
        setUsdtBalance(dataUsdtBalance);
        fetchAlloc();
      }

      // if (goldbal || goldBalance !== bnToNumber(goldbal)) {
      //   setGoldBalance(bnToNumber(goldbal));
      // }

      // if (silverbal || silverBalance !== bnToNumber(silverbal)) {
      //   setSilverBalance(bnToNumber(silverbal));
      // }
      // console.log(probableAllocation, "lets seee");
      // if(probableAllocation) {
      //   // console.log("inside probableallocation");
      //   setProbableAlloc(bnToNumber(probableAllocation))
      // }
      //(goldtot || totGold !== bnToNumber(goldtot)) || (silvertot || totSilver !== bnToNumber(silvertot))
      if (goldtot || silvertot) {
        console.log("I am almost done here");
        const totGoldNum = bnToNumber(goldtot);
        const totSilverNum = bnToNumber(silvertot);
        const goldBalanceNum = bnToNumber(goldbal);
        const silverBalanceNum = bnToNumber(silverbal);

        const addedalloc =
          ((goldBalanceNum * 5 + silverBalanceNum) /
            (totGoldNum * 5 + totSilverNum)) *
          0.5;

        console.log(
          addedalloc,
          totGoldNum,
          totSilverNum,
          silverBalanceNum,
          probableAlloc,
          "addedalloc"
        );
        setDepoalloc(addedalloc);

        setTotGold(totGoldNum);
        setTotSilver(totSilverNum);
        setGoldBalance(goldBalanceNum);
        setSilverBalance(silverBalanceNum);
        console.log("state updated for them ooooooooo");
        //add allocation
        // addAlloc();
        // if(minted) {
        //   // console.log("tryingggggggg ooooooh");
        //    addAlloc();
        // }
      }

      setTimeout(() => {
        //  setPreloaders(false)
        console.log(
          goldBalance,
          silverBalance,
          totGold,
          totSilver,
          "Still tracking after setTimeout"
        );
      }, 10000);
    }
  }, [minted, address, chainId, goldtot]);

  useEffect(() => {
    setTimeout(() => {
      setPreloaders(false);
    }, 5000);
  }, [preloaders]);

  return (
    <>
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
        loadingApproveU={loadingApproveU}
        depoalloc={depoalloc}
        amount={amount}
        goldBalance={goldBalance}
        silverBalance={silverBalance}
        probableAlloc={probableAlloc}
        calculating={calculating}
        loading={loading}
        setLoading={setLoading}
        setNotify={setNotify}
        setNotifyType={setNotifyType}
        setNotifymsg={setNotifymsg}
      />
      {/* <Bottom /> */}
      <Footer />
      {preloaders && <Preloader />}
    </>
  );
}
