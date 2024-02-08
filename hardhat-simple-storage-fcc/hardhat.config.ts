import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import { configDotenv } from "dotenv";

configDotenv();

const sepolia_rpc_url = process.env.SEPOLIA_RPC_URL;
const private_key = process.env.PRIVATE_KEY!;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      url: sepolia_rpc_url,
      accounts: [private_key],
      chainId: 11155111,
    },
  },
};

export default config;
