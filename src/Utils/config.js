import { DEFAULT_NETWORK } from "./network";
import * as PreFactoryAbi from "./ABIs/PresaleFactoryABI.json";
import * as PresaleGeneratorAbi from "./ABIs/PresaleGeneratorABI.json";
import * as FairGeneratorAbi from "./ABIs/FairelaunchGeneratorABI.json";
import * as AuctionGeneratorAbi from "./ABIs/AuctionGeneratorABI.json";
export const config = {
  networkId: DEFAULT_NETWORK,
  PresaleFactoryAbi: PreFactoryAbi.default,
  PresaleGeneratorAbi: PresaleGeneratorAbi.default,
  FairGeneratorAbi: FairGeneratorAbi.default,
  AuctionGeneratorAbi: AuctionGeneratorAbi.default,
};

export const PresaleContractAddresses = {
  BSC_TESTNET: {
    PresaleFactoryAddress: "0xf50576a483c06Fe586733cAbBE92097343602e90",
    PreSaleGeneratorAddress: "0xD4c2D3De2E9D4a293d62A9911707ee08f7F72Eb7",
    FairLaunchGeneratorAddress: "0xf50576a483c06Fe586733cAbBE92097343602e90",
    AuctionGeneratorAddress: "0x9944945D8Db1CE2C94c9C42315822ce69Ff37d56",
    UniswapFactoryAddress: "0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc",
    WETHAddress: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
    PresaleLockForwardAddress: "0xA030A6deDBCcb593143fd0f0d27214a2A83EeCBc",
  },
  ETH_TESTNET: {
    PresaleFactoryAddress: "0x0042C54039288e6c0c2f37cf8467d7bEAe04A365",
    PreSaleGeneratorAddress: "0x196c0D851a60Afdd3CF6F32D2C060d59B8770c47",
    FairLaunchGeneratorAddress: "0x14121314F40CFF754DA23b7BBa86dD7EEc4B7C06",
    AuctionGeneratorAddress: "0x4E56aC5b5a48F894Ef82280ec5a6AB766fEa752B",
    UniswapFactoryAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    WETHAddress: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
    PresaleLockForwardAddress: "0xDA58D856916f7Da7FEE46d2C3968F1cb4DB6EF5A",
  },
};

export const SaleTokenAddresses = {
  BSC_TESTNET: {
    bnb: {
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
    },
    busd: {
      address: "0x8301F2213c0eeD49a7E28Ae4c3e91722919B8B47",
      decimals: 18,
    },
    usdc: {
      address: "0xFA3C228a243A00C3DE9D77528016a900c42Ec041",
      decimals: 18,
    },
    usdt: {
      address: "0x1119C3a415b62127CB8Ef653a77a717839414310",
      decimals: 18,
    },
  },
  ETH_TESTNET: {
    eth: {
      address: "0x0000000000000000000000000000000000000000",
      decimals: 18,
    },
    usdc: {
      address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
      decimals: 6,
    },
    usdt: {
      address: "0x56705db9f87c8a930ec87da0d458e00a657fccb0",
      decimals: 18,
    },
  },
};
export const SwapRouters = {
  BSC_TESTNET: [{ name: "Pancakeswap", factoryAddress: "0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc" }],
  ETH_TESTNET: [{ name: "Uniswap", factoryAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" }],
};
