import MaticLogo from "../assets/images/network/ic-matic.png";
import EthLogo from "../assets/images/network/ic-eth.svg";
import BNBLogo from "../assets/images/network/ic-bsc.png";
import AvaxLogo from "../assets/images/network/ic-avax.svg";
import CroLogo from "../assets/images/network/ic-cronos.svg";
import DogeLogo from "../assets/images/network/ic-doge.png";
import FtmLogo from "../assets/images/network/ic-fantom.svg";

export const TOKEN_DECIMALS = 18;

export const Networks = {
  ETH: {
    ChainID: 1,
    Name: "Ethereum",
    logo: EthLogo,
    hexValue: "0x1",
    label: "ETH MAINNET",
    tokenName: 'Ethereum Mainnet',
    tokenSymbol: 'ETH',
    tokenDecimals: 18,
    rpcUrl: 'https://mainnet.infura.io/v3/'
  },
  BNB: {
    ChainID: 56,
    Name: "BNB Smart Chain",
    logo: BNBLogo,
    hexValue: "0x38",
    label: "BSC MAINNET",
    tokenName: 'Binance Smart Chain Mainnet',
    tokenSymbol: 'BNB',
    tokenDecimals: 18,
    rpcUrl: 'https://bsc-dataseed1.binance.org'
  },
  MATIC: {
    ChainID: 137,
    Name: "Matic(Polygon)",
    logo: MaticLogo,
    hexValue: "0x89",
    label: "MATIC MAINNET",
    tokenName: 'Polygon Mainnet',
    tokenSymbol: 'MATIC',
    tokenDecimals: 18,
    rpcUrl: 'https://polygon-rpc.com'
  },
  AVAX: {
    ChainID: 43114,
    Name: "Avalanche",
    logo: AvaxLogo,
    hexValue: "0xa86a",
    label: "AVAX",
    tokenName: 'Avalanche C-Chain',
    tokenSymbol: 'AVAX',
    tokenDecimals: 18,
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc'
  },
  FTM: {
    ChainID: 250,
    Name: "Fantom Opera",
    logo: FtmLogo,
    hexValue: "0xfa",
    label: "Fantom",
    tokenName: 'Fantom Opera',
    tokenSymbol: 'FTM',
    tokenDecimals: 18,
    rpcUrl: 'https://endpoints.omniatech.io/v1/fantom/mainnet/public'
  },
  CRO: {
    ChainID: 25,
    Name: "Cronos",
    logo: CroLogo,
    hexValue: "0x19",
    label: "Cronos",
    tokenName: 'Cronos Mainnet Beta',
    tokenSymbol: 'CRO',
    tokenDecimals: 8,
    rpcUrl: 'https://evm.cronos.org'
  },
  DOGE: {
    ChainID: 2000,
    Name: "DogeChain",
    logo: DogeLogo,
    hexValue: "0x7d0",
    label: "DogeChain",
    tokenName: 'Dogechain Mainnet',
    tokenSymbol: 'DOGE',
    tokenDecimals: 18,
    rpcUrl: 'https://rpc.dogechain.dog'
  },
  // TEST NET
  ETH_TESTNET: {
    ChainID: 5,
    Name: "Goerli Ethererum",
    logo: EthLogo,
    hexValue: "0x5",
    label: "Goerli ETH",
    tokenSymbol: 'ETH',
  },
  BSC_TESTNET: {
    ChainID: 97,
    Name: "BNB Smart Chain",
    logo: BNBLogo,
    hexValue: "0x61",
    label: "BSC TESTNET",
    tokenName: 'Binance Smart Chain Testnet',
    tokenSymbol: 'BNB',
    tokenDecimals: 18,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545'
  },
  MUMBAI_TESTNET: {
    ChainID: 80001,
    Name: "Matic Mumbai",
    logo: MaticLogo,
    hexValue: "0x13881",
    label: "MUMBAI",
    tokenName: 'Mumbai',
    tokenSymbol: 'MATIC',
    tokenDecimals: 18,
    rpcUrl: 'https://endpoints.omniatech.io/v1/matic/mumbai/public'
  },
};

export const DEFAULT_NETWORK = Networks.Goerli;
