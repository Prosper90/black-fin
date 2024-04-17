import React, { useEffect, useState } from "react";
import { LOCAL_URL, PRODUCTION_URL, formatDate } from "./utils/constants";
import { makeCall } from "./utils/makeCall";
import Moredetails from "./Moredetails";
import { shortenAddress } from "./utils/shortenAddress";

export default function Admin({ setNotify, setNotifyType, setNotifymsg }) {
  const [data, setData] = useState([]);
  const [preLoading, setPreLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});
  const [openMore, setOpenMore] = useState(false);

  const getUsers = async () => {
    try {
      // Replace with your actual bearer token
      const url = `${LOCAL_URL}/get_users`;
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await makeCall(url, {}, headers, "get");

      if (response.status) {
        // const data = await response.json();
        console.log(response);
        setData(response.data);
        setPreLoading(false);
      }
    } catch (error) {
      console.log(error, "check the error");
    }
  };

  useEffect(() => {
    if (preLoading) {
      getUsers();
    }
  }, [data]);

  return (
    <div className="w-100 h-100 flex flex-col justify-center items-center p-10 relative">
      <h1>Admin</h1>
      <div className="font-semibold text-lg ">Data for the minters</div>

      <div
        className={`m-5 border rounded-2xl ${
          data ? "h-auto" : "h-96"
        } px-4 md:px-0 py-2 w-[100%]`}
      >
        {data?.length !== 0 ? (
          <div className="relative  overflow-x-auto pt-4 md:pt-0 sm:rounded-lg h-auto ">
            <table className="max-w-[none] w-full text-sm text-left rtl:text-right text-[#fff] ">
              <thead
                className="text-xs text-[#fff] uppercase table-auto"
                style={{ verticalAlign: "middle" }}
              >
                <tr>
                  <th scope="col" className="px-5 py-3 ">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Silver
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Gold
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ownership
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Allocation
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, idx) => (
                  <tr
                    onClick={() => {
                      setOpenMore(true);
                      setSelectedUser(item);
                    }}
                    className="border border-[#fff] relative"
                    key={idx}
                  >
                    <td
                      scope="row"
                      className="font-medium pl-2 text-[#fff] xs:hidden"
                    >
                      {/* {item.type === "Payment" ? <TxiconIn /> : <TxiconOut />} */}
                      <div className="flex justify-start items-start gap-1">
                        <div className="rounded-[100%] flex justify-center items-center bg-[#a23eff33] p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#a23eff"
                              d="M9.775 12q-.9 0-1.5-.675T7.8 9.75l.325-2.45q.2-1.425 1.3-2.363T12 4q1.475 0 2.575.938t1.3 2.362l.325 2.45q.125.9-.475 1.575t-1.5.675zM4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
                            />
                          </svg>
                        </div>

                        <div className="flex flex-col justify-start gap-1">
                          <div className="font-semibold text-md">
                            {shortenAddress(item.address)}
                          </div>
                          <div className="font-normal text-xs">
                            {formatDate(item.createdAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-4 py-4 font-medium text-[#fff]"
                    >
                      {item.silverBalance}
                    </th>
                    <td className="px-6 py-4">{item.goldBalance}</td>
                    <td className="px-6 py-4 lg:hidden">
                      {formatDate(item.updatedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap sm:hidden">
                      {/* {formatDate(item.createdAt)} */}
                      {item.gender}
                    </td>
                    <td className="px-6 py-4 ">{item.ownership}</td>
                    <td className="px-6 py-4 ">{item.allocation}</td>
                    <td className="px-6 py-4 relative ">
                      <div className="border border-[#fff] rounded cursor-pointer text-center">
                        Edit
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center flex-col mt-20 items-center ">
            <img src="./no-transaction.png" className="w-28 h-28" alt="" />
            <p className="font-semibold text-xs text-black">
              You have no transactions
            </p>
            <p className="font-normal text-xs text-gray-600">
              Users would show up, when data are entered
            </p>
          </div>
        )}
      </div>
      {openMore && (
        <Moredetails
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          openMore={openMore}
          setOpenMore={setOpenMore}
          setNotify={setNotify}
          setNotifyType={setNotifyType}
          setNotifymsg={setNotifymsg}
          setData={setData}
        />
      )}
    </div>
  );
}
