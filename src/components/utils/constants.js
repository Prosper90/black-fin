import contractAbi from "./ContractABI.json";
import tokenAbi from "./TokenABI.json";
import allocAbi from "./AllocationAbi.json";
import { BigNumber } from "ethers";

//testnet gold 0x2b60e312174f33598AFe0E59e9645c8CC088998a
//mainnet gold 0xea281D07420b8f5f59cfd5CFC2C9FC97f213bd31
export const contractAddressGold = "0xea281D07420b8f5f59cfd5CFC2C9FC97f213bd31";

//testnet silver 0x25050dFA16632374F98c45Bbc10bFDD50C218F7c
//mainnet silver 0x131868E7f20984dA4BFbfAb7d0b3032Ab3826E5D
export const contractAddressSilver =
  "0x131868E7f20984dA4BFbfAb7d0b3032Ab3826E5D";

//testnet 0xd678B27116BCe1c4d400E9Bd34179912300a03FE
//mainnet 0xad86d0e9764ba90ddd68747d64bffbd79879a238
export const tokencontractAddress =
  "0xad86d0e9764ba90ddd68747d64bffbd79879a238";
//mainnet
//standard testnet 0x337610d27c682E347C9cD60BD4b3b107C9d34dDd
//sample testnet 0xeC5d5E42c07380a4801a0F0188A593e4D55A5172
//mainnet 0x55d398326f99059fF775485246999027B3197955
export const bscusdtContractAddress =
  "0x55d398326f99059fF775485246999027B3197955";

export const allocationContractAddress =
  "0x8CFC2DCa359b730D222acB96E9D22bb6C8F59f22";

export const multisigAddress = "0x3cD832f0A5eB4a6A4Eea32e3C8Fb749d2B43A6f7";

export const operatorAddress = "0x85Dbb54334910CE423434250DD8A1aFbb64f78Cc";

//mainnet busd contractaddress    0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
//testnet busd contract address   0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7
export const contractABI = contractAbi;
export const tokenABI = tokenAbi;
export const allocationABI = allocAbi;

//export const tokenABI = tABI;
//export const pancakeABIuse = pancakeABI;
//test 97
//mainnet 56
export const chainId = 56;
//export const pancakeRouter = "0x9326BFA02ADD2366b30bacB125260Af641031331";

export const ProviderUrl = "";

export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    // minute: '2-digit',
    // second: '2-digit',
    // timeZoneName: 'short',
  };
  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  return formattedDate;
};

export function bnToNumber(bn) {
  // Convert BN.js object to string
  let stringValue = bn?.toString();

  // Remove extra decimals
  stringValue = stringValue.replace(/\.\d*?0+$/, "");

  // Convert to number
  const numberValue = Number(stringValue);

  return numberValue;
}

export const PRODUCTION_URL = "https://blackfin-backend.onrender.com";

export const LOCAL_URL = "http://localhost:8000";

export const providerUrl = "";
