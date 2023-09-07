import { Networks } from "./network";
import { PresaleContractAddresses, SaleTokenAddresses } from "./config";
export const checkNetwork = () => {
  let netFlg = true;
  Object.keys(Networks).forEach((key) => {
    if (Networks[key].ChainID === Number(window.chainId)) {
      netFlg = false;
      return;
    }
  });
  return netFlg;
};
export const getNetwork = () => {
  return Object.keys(Networks).filter((key) => {
    return Networks[key].ChainID === Number(window.chainId);
  });
};

export const findPresaleAddress = (addr) => {
  return Object.keys(PresaleContractAddresses[getNetwork()[0]]).filter(key =>{
    return PresaleContractAddresses[getNetwork()[0]][key].toLowerCase() === addr.toLowerCase();
  })[0];
}
export const findCurrency = (addr) => {
  return Object.keys(SaleTokenAddresses[getNetwork()[0]]).filter(key =>{
    return SaleTokenAddresses[getNetwork()[0]][key].address.toLowerCase() === addr.toLowerCase();
  })[0];
}
