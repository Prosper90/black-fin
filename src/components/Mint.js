import React from "react";
import { LoaderSvg } from "./Usefullcomponents";

export default function Mint({
  mintGoldNft,
  mintSilverNft,
  mintType,
  loadingMintGold,
  loadingMintSilver,
  loadingApprove,
}) {
  return (
    <div className=" flex overflow-x-auto md:overflow-hidden items-baseline justify-start md:justify-center gap-2 mt-10">
      <div className="md:grid md:grid-cols-2">
        <div className="flex flex-col items-center justify-center h-100">
        <div className="flex justify-center items-center">
          <img
            src="/silvernft.jpg"
            className="w-[100%] md:w-[70%] h-auto"
            alt=""
          />
        </div>

        <button
          onClick={() => mintSilverNft("silver", 800)}
          className={`relative bg-[#C0C0C0]  ${
            (loadingMintSilver || loadingApprove) && mintType === "silver"
              ? "p-[29px]"
              : "p-4"
          } rounded text-[#000] font-semibold w-[100%] md:w-[70%] flex justify-center items-center mt-3`}
        >
          {(loadingMintSilver || loadingApprove) && mintType === "silver" ? (
            <LoaderSvg />
          ) : (
            <>
              Mint <div className="font-xs font-bold">(800 PAID)</div>
            </>
          )}
        </button>
        </div>
        {/* Benefits part */}
        <div className="">
          <h1 className="text-md font-bold">Benefit</h1>
          <div className="flex flex-col">
            <div className="">-Access to early pool</div>
            <div className="">-Allocation in all IDO</div>
          </div>
        </div>
      </div>

      <div className="md:grid md:grid-cols-2 ">
       <div className="flex flex-col items-center justify-center h-100">
        <div className="flex justify-center items-center">
          <img
            src="/goldnft.jpg"
            className="w-[100%] md:w-[70%] h-auto"
            alt=""
          />
        </div>

        <button
          onClick={() => mintGoldNft("gold", 4000)}
          className={`relative bg-[#FFD700] ${
            (loadingMintGold || loadingApprove) && mintType === "gold"
              ? "p-[29px]"
              : "p-4"
          } rounded text-[#000] font-semibold w-[100%] md:w-[70%] flex justify-center items-center mt-3`}
        >
          {(loadingMintGold || loadingApprove) && mintType === "gold" ? (
            <LoaderSvg />
          ) : (
            <>
              Mint <div className="font-xs font-bold">(4000 PAID)</div>
            </>
          )}
        </button>
       </div>
        {/* Benefits part */}
        <div className="">
          <h1 className="text-md font-bold">Benefit</h1>
          <div className="flex flex-col">
            <div className="">-Access to early pool</div>
            <div className="">-Allocation in all IDO</div>
            <div className="">-Recieve Revenue Share</div>
            <div className="">-Recieve Airdrops</div>
            <div className="">-Participate in governance</div>
          </div>
        </div>
      </div>
    </div>
  );
}
