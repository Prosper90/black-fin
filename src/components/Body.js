import React, { useState } from "react";
import Mint from "./Mint";
import Deposit from "./Deposit";
import Burn from "./Burn";

export default function Body({
  deposit,
  loadingDeposit,
  mintGoldNft,
  mintSilverNft,
  mintType,
  loadingMintGold,
  loadingMintSilver,
  loadingApprove,
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
  setNotifymsg
}) {
  const [selected, SetSelected] = useState("mint");

  return (
    <div className="w-100 flex flex-col mt-5">
      <div className="flex self-center md:self-end justify-center items-center pr-0 md:pr-10 mt-0 md:mt-5 gap-3">
        <span
          onClick={() => SetSelected("mint")}
          className={`cursor-pointer text-xs md:text-sm font-semibold ${
            selected === "mint" ? "text-[#fff]" : "text-[#333]"
          }`}
        >
          Mint
        </span>
        |
        <span
          onClick={() => SetSelected("burn")}
          className={`cursor-pointer text-xs md:text-sm font-semibold ${
            selected === "burn" ? "text-[#fff]" : "text-[#333]"
          }`}
        >
          Burn
        </span>
        |
        <span
          onClick={() => SetSelected("deposit")}
          className={`cursor-pointer text-xs md:text-sm font-semibold ${
            selected === "deposit" ? "text-[#fff]" : "text-[#333]"
          }`}
        >
          Deposit
        </span>
      </div>

      {selected === "mint" ? (
        <Mint
          mintGoldNft={mintGoldNft}
          mintSilverNft={mintSilverNft}
          mintType={mintType}
          loadingMintGold={loadingMintGold}
          loadingMintSilver={loadingMintSilver}
          loadingApprove={loadingApprove}
        />
      ) : selected  === "deposit" ? (
        <Deposit 
          deposit={deposit} 
          loadingDeposit={loadingDeposit}
          loading={loading}
          depoalloc={depoalloc} 
          calculating={calculating} 
          amount={amount}
          goldBalance={goldBalance}
          silverBalance={silverBalance}
          probableAlloc={probableAlloc}
          loadingApproveU={loadingApproveU}
          />
      ):(
          <Burn 
          deposit={deposit} 
          loadingDeposit={loadingDeposit}
          loading={loading}
          setLoading={setLoading}
          depoalloc={depoalloc} 
          calculating={calculating} 
          amount={amount}
          goldBalance={goldBalance}
          silverBalance={silverBalance}
          probableAlloc={probableAlloc}
          loadingApproveU={loadingApproveU}
          setNotify={setNotify}
          setNotifyType={setNotifyType}
          setNotifymsg={setNotifymsg}
          />)
      }
    </div>
  );
}
