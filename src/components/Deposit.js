import React, { useEffect, useState } from "react";
import { LoaderSvg } from "./Usefullcomponents";
import { useAccount } from "wagmi";

export default function Deposit({ 
  deposit, 
  loadingDeposit, 
  depoalloc, 
  calculating, 
  amount,
  goldBalance,
  silverBalance,
  probableAlloc,
  loadingApproveU,
  loading
 }) {

  const { isConnected, address } = useAccount();
  console.log(depoalloc, probableAlloc, "depopo");

  useEffect(() => {

  }, [depoalloc, probableAlloc])
  


  return (
    <div className="w-100 h-100 flex flex-col items-center justify-center gap-20">
      <div className="flex relative flex-col h-[350px] w-[100%] md:w-[60%] p-5 min-w-[250px] shadow-[-1rem_0_3rem_#00000067] transition-[0.2s] rounded-2xl bg-[#191a1a]">
        {/* <h1 className="mb-2">Deposit</h1> */}
        <div className="flex flex-col items-start gap-10 p-5 w-100">
          <div className="font-semibold">Deposit USDT</div>

          <div className="font-semibold"> {address ?
           <div className="">
            Your wallet allocation is <span className="border-b border-[#00ff55]">{ probableAlloc === undefined ? 0 : probableAlloc?.toFixed(4)}</span> USDT
          </div> :
             "Connect Wallet to see your allocation"
           } </div>

          <div className="text-xs font-semibold ">
            (You are to deposit with usdt on bsc. Any other currency would be
            rejected)
          </div>
          <div className="flex items-center gap-2 w-[100%]">
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => calculating(e)}
                className="remove-arrow px-6 border-none py-4 outline-none w-[100%] h-auto text-[#fff] bg-[#000] rounded focus:outline-none focus:border-blue-500 font-semibold"
              />
            <button
              onClick={() => deposit()}
              className={`relative bg-[#FFD700] ${
                (loadingDeposit || loading) ? "p-[29px]" : "p-4"
              } rounded text-[#000] font-semibold w-[20%] flex justify-center items-center`}
            >
              {(loadingDeposit || loading) ? <LoaderSvg /> : <>Deposit</>}
            </button>
          </div>
        </div>


      </div>


      <div className="w-100">
          <h3>Previous Projects</h3>

          <div className="flex flex-col md:flex-row gap-2 p-3">
            <div className="flex relative items-center justify-center flex-col h-[200px] w-[100%] md:w-[60%] p-5 min-w-[250px] shadow-[-1rem_0_3rem_#00000067] transition-[0.2s] rounded-xl bg-[#191a1a]">COMING SOON</div>
            <div className="flex relative items-center justify-center flex-col h-[200px] w-[100%] md:w-[60%] p-5 min-w-[250px] shadow-[-1rem_0_3rem_#00000067] transition-[0.2s] rounded-xl bg-[#191a1a]">COMING SOON</div>
            <div className="flex relative items-center justify-center flex-col h-[200px] w-[100%] md:w-[60%] p-5 min-w-[250px] shadow-[-1rem_0_3rem_#00000067] transition-[0.2s] rounded-xl bg-[#191a1a]">COMING SOON</div>
          </div>
      </div>

    </div>
  );
}
