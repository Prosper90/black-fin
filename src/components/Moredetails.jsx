import React, { useState } from "react";
import { LOCAL_URL } from "./utils/constants";
import { makeCall } from "./utils/makeCall";

const Moredetails = ({
  openMore,
  setOpenMore,
  selectedUser,
  setSelectedUser,
  setNotify,
  setNotifyType,
  setNotifymsg,
  setData,
}) => {
  const [loading, setLoading] = useState(false);
  const [allocation, setAllocation] = useState();
  const [goldBalance, setGoldBalance] = useState();
  const [silverBalance, setSilverBalance] = useState();
  const [ownership, setOwnership] = useState();
  //   const [accountNumber, setAccountNumber] = useState();

  const updateUser = async () => {
    try {
      setLoading(true);
      const endpoint = `${LOCAL_URL}/update_user`;
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        address: selectedUser?.address,
        allocation: allocation,
        goldBalance: goldBalance,
        silverBalance: silverBalance,
        ownership: ownership,
      };
      const response = await makeCall(endpoint, body, headers, "put");

      if (!response.status) {
        setLoading(false);
        setNotify(true);
        setNotifyType("warn");
        setNotifymsg(response.message);
        return;
      }
      setLoading(false);
      setNotify(true);
      setNotifyType("success");
      setNotifymsg(response.message);
      setSelectedUser(response?.data);
      setData(response.allup);
    } catch (error) {
      setLoading(false);
      console.log(error, "fixing out error");
    }
  };

  return (
    <div
      className={`fixed modal_showinf inset-0 ${
        openMore ? "flex" : "hidden"
      }  items-center justify-center z-50 bg-black border border-[#fff] rounded bg-opacity-50`}
    >
      <div className="flex flex-col p-5 justify-start items-start w-[100%] relative">
        <div className="flex justify-between w-[100%] relative">
          <span className="text-white">Edit {selectedUser.address}</span>

          <svg
            onClick={() => setOpenMore(false)}
            className="w-3 h-3  right-8 top-6 cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
            viewBox="0 0 14 14"
            width={17}
          >
            <path
              stroke="white"
              strokelinecap="round"
              strokelinejoin="round"
              strokewidth={2}
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </div>

        <div className="text-[#fff] font-medium mt-5 mb-2 text-xs">
          Allocation
        </div>
        <input
          type="tel"
          name="phone"
          className="flex-1 border text-black h-full px-5 py-4 w-full overflow-hidden rounded-xl outline-primary"
          defaultValue={selectedUser?.allocation}
          onChange={(e) => setAllocation(e.target.value)}
        />

        <div className="text-[#fff] font-medium mt-5 mb-2 text-xs">
          Gold Balance
        </div>
        <input
          type="tel"
          name="phone"
          className="flex-1 border text-black h-full px-5 py-4 w-full overflow-hidden rounded-xl outline-primary"
          defaultValue={selectedUser?.goldBalance}
          onChange={(e) => setGoldBalance(e.target.value)}
        />
        <div className="text-[#fff] font-medium mt-5 mb-2 text-xs">
          Silver Balance
        </div>

        <input
          type="tel"
          name="phone"
          className="flex-1 border text-black h-full px-5 py-4 w-full overflow-hidden rounded-xl outline-primary"
          defaultValue={selectedUser?.silverBalance}
          onChange={(e) => setSilverBalance(e.target.value)}
        />

        <div className="text-[#fff] font-medium mt-5 mb-2 text-xs">
          Ownership
        </div>
        <input
          type="text"
          name="phone"
          className="flex-1 border text-black h-full px-5 py-4 w-full overflow-hidden rounded-xl outline-primary"
          defaultValue={selectedUser?.ownership}
          onChange={(e) => setOwnership(e.target.value)}
        />

        <div className="flex justify-items-end mt-5 p-1 w-[100%]">
          <button
            onClick={() => updateUser()}
            className="text-black px-3 text-xs py-2 rounded-[20px] cursor-pointer"
            style={{
              background: "#FFF",
              borderRadius: "12px",
              padding: "10px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            {!loading ? "Update" : "Loading..."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Moredetails;
