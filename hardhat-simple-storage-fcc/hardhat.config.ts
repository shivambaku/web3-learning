import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "./tasks/block-number";
import { configDotenv } from "dotenv";

configDotenv();

const sepolia_rpc_url = process.env.SEPOLIA_RPC_URL;
const private_key = process.env.PRIVATE_KEY!;
const etherscan_api_key = process.env.ETHERSCAN_API_KEY!;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: sepolia_rpc_url,
      accounts: [private_key],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: etherscan_api_key,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
  },
};

export default config;
