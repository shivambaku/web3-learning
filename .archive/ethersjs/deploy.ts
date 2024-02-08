import { ethers } from "ethers";

async function main() {
  const privateKey = Bun.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY environment variable is required");
  }

  const rpcURL = Bun.env.RPC_URL;
  if (!rpcURL) {
    throw new Error("RPC_URL environment variable is required");
  }

  const provider = new ethers.JsonRpcProvider(rpcURL);
  const wallet = new ethers.Wallet(privateKey, provider);

  const abi = await Bun.file(
    "./bin/SimpleStorage_sol_SimpleStorage.abi"
  ).text();

  const binary = await Bun.file(
    "./bin/SimpleStorage_sol_SimpleStorage.bin"
  ).text();

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying contract...");
  const contract = await contractFactory.deploy();
  console.log(contract);
  console.log("Contract deployed to:", await contract.getAddress());
  await contract.waitForDeployment();
  console.log("Contract deployed successfully");

  // const currentFavoriteNumber = await contract.getFunction("favoriteNumber")();
  // console.log("Current favorite number:", currentFavoriteNumber.toString());
}

try {
  await main();
} catch (error) {
  console.error("Error deploying contract", error);
}
