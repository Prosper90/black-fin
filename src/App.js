import "./App.css";
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
  bnToNumber,
  allocationContractAddress,
  allocationABI,
  LOCAL_URL,
  PRODUCTION_URL,
  chainId,
} from "./components/utils/constants";
import { useEffect, useState } from "react";
import Notifier from "./components/Notifier";
import { ethers } from "ethers";
import { makeCall } from "./components/utils/makeCall";
import Preloader from "./components/Preloader";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import Home from "./components/Home";

function App() {
  const [notify, setNotify] = useState(false);
  const [notifyType, setNotifyType] = useState(""); //it can be success, error, warn
  const [notifymsg, setNotifymsg] = useState("");

  useEffect(() => {
    if (notify) {
      setTimeout(() => {
        setNotify(false);
        setNotifymsg("");
      }, 3500);
    }
  }, [notify]);

  return (
    <div className="w-100 sm:h-[100dvh] h-[100dvh] md:h-screen bg-[#000] text-white px-5 relative">
      <Routes>
        <Route
          path="/admin_ffggsjjs"
          element={
            <Admin
              setNotify={setNotify}
              setNotifyType={setNotifyType}
              setNotifymsg={setNotifymsg}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              setNotify={setNotify}
              setNotifyType={setNotifyType}
              setNotifymsg={setNotifymsg}
              notifymsg={notifymsg}
              notifyType={notifyType}
              notify={notify}
            />
          }
        />
      </Routes>
      {notify && <Notifier notifyType={notifyType} notifymsg={notifymsg} />}
    </div>
  );
}

export default App;
