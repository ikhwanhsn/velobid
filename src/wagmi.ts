import "@rainbow-me/rainbowkit/styles.css";
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";
// import { sepolia } from "wagmi/chains";

// const goChainTestnet = {
//   id: 31337,
//   name: "GoChain Testnet",
//   iconUrl: "https://gochain.io/assets/img/favicon.ico",
//   iconBackground: "#fff",
//   nativeCurrency: { name: "GoChain", symbol: "GO", decimals: 18 },
//   rpcUrls: {
//     default: { http: ["https://127.0.0.1:8545"] },
//   },
//   blockExplorers: {
//     default: {
//       name: "GoChain Explorer",
//       url: "https://testnet-explorer.gochain.io/",
//     },
//   },
//   contracts: {
//     multicall3: {
//       address: "0xcA11bde05977b3631167028862bE2a173976CA11",
//       blockCreated: 1_234_567,
//     },
//   },
// } as const satisfies Chain;

const eduChainTestnet = {
  id: 656476,
  name: "EduChain Testnet",
  iconUrl: "",
  iconBackground: "#fff",
  nativeCurrency: { name: "EduChain", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.open-campus-codex.gelato.digital/"] },
  },
  blockExplorers: {
    default: {
      name: "EduChain Explorer",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1_234_567,
    },
  },
} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: "Template Fullstack Web3",
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "",
  chains: [eduChainTestnet],
  ssr: true,
});
