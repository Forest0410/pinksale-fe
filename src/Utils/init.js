import Web3 from "web3";
import { config, PresaleContractAddresses } from "./config";
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";
import { getNetwork } from "./initialFunctions";

// Initialize contract & set global variables
export async function initContracts(callback) {
  window.correctChainId = config.networkId;
  if (window.provider === undefined) {
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
    window.provider = await web3Modal.connect();
    await window.provider.enable();
    window.web3 = new Web3(window.provider);
  }

  window.userAddress = (await window.web3.eth.getAccounts())[0];
  window.currency = "";
  window.autolist = true;

  if (window.userAddress) {
    window.ethInitialized = true;
    window.chainId = await window.web3.eth.getChainId();
    if(getNetwork().length > 0) {
      window.presaleFactoryAddress =
      PresaleContractAddresses[getNetwork()[0]].PresaleFactoryAddress;
    window.presaleGeneratorAddress =
      PresaleContractAddresses[getNetwork()[0]].PreSaleGeneratorAddress;
    window.fairlaunchGeneratorAddress =
      PresaleContractAddresses[getNetwork()[0]].FairLaunchGeneratorAddress;
    window.auctionGeneratorAddress =
      PresaleContractAddresses[getNetwork()[0]].AuctionGeneratorAddress;
    window.PresaleFactoryContract = new window.web3.eth.Contract(
      config.PresaleFactoryAbi,
      PresaleContractAddresses[getNetwork()[0]].PresaleFactoryAddress,
      { from: window.userAddress }
    );
    window.PresaleGeneratorContract = new window.web3.eth.Contract(
      config.PresaleGeneratorAbi,
      PresaleContractAddresses[getNetwork()[0]].PreSaleGeneratorAddress,
      { from: window.userAddress }
    );
    window.FairLaunchGeneratorContract = new window.web3.eth.Contract(
      config.FairGeneratorAbi,
      PresaleContractAddresses[getNetwork()[0]].FairLaunchGeneratorAddress,
      { from: window.userAddress }
    );
    window.AuctionGeneratorContract = new window.web3.eth.Contract(
      config.AuctionGeneratorAbi,
      PresaleContractAddresses[getNetwork()[0]].AuctionGeneratorAddress,
      { from: window.userAddress }
    );
    }
  }
  window.provider.on("accountsChanged", () => {
    window.location.reload();
  });

  window.provider.on("chainChanged", () => {
    window.location.reload();
  });
  window.provider.on("disconnect", () => {
    window.location.reload();
  });

  if (callback) {
    callback();
  }
}

export async function initConnected() {
  await initContracts();
  // const accounts = await window.ethereum.request({ method: "eth_accounts" });

  // if (typeof window.ethereum !== "undefined" && accounts > 0) {
  //   await initContracts();
  // }
}
