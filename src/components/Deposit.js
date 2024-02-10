import React, { useState } from "react";
import { LoaderSvg } from "./Usefullcomponents";

export default function Deposit({ deposit, loadingDeposit }) {
  const [amount, setAmount] = useState();

  return (
    <div className="w-100 h-100 flex items-center justify-center gap-20">
      <div className="flex relative flex-col h-[350px] w-[100%] md:w-[60%] min-w-[250px] shadow-[-1rem_0_3rem_#00000067] transition-[0.2s] p-4 rounded-2xl bg-[#191a1a]">
        <h1 className="mb-2">Deposit</h1>
        <div className="flex flex-col items-start gap-10 p-5 w-100">
          <div className="font-semibold">Deposit USDT</div>

          <div className="">who is eligible</div>

          <div className="text-xs font-semibold ">
            (You are to deposit with usdt on bsc. Any other currency would be
            rejected)
          </div>
          <div className="flex gap-2 w-[100%]">
            <div className="bg-[#fff] flex-grow rounded flex justify-center items-center p-2">
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="remove-arrow border-none outline-none w-[100%] h-auto text-[#000] rounded focus:outline-none focus:border-blue-500 font-semibold"
              />
            </div>
            <button
              onClick={() => deposit(amount)}
              className={`relative bg-[#FFD700] ${
                loadingDeposit ? "p-[29px]" : "p-4"
              } rounded text-[#000] font-semibold w-[20%] flex justify-center items-center mt-3`}
            >
              {loadingDeposit ? <LoaderSvg /> : <>Deposit</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
