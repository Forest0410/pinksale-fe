import { Networks } from "./network";
import { getBSCMainURI, getBSCTestURI } from "./getRPCUri";
import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Pinksale Fork", // Required
      rpc: {
        [Networks.BNBTEST]: getBSCTestURI(),
        [Networks.BNB]: getBSCMainURI(),
    },
    }
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
        rpc: {
            [Networks.BNBTEST]: getBSCTestURI(),
            [Networks.BNB]: getBSCMainURI(),
        },
    }
  }
};
