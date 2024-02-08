import { ethers } from "ethers";

async function main() {
  const privateKey = Bun.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY environment variable is required");
  }

  console.log(privateKey);

  // const provider = new ethers.JsonRpcProvider("HTTP://127.0.0.1:7545");
  // const wallet = new ethers.Wallet(privateKey, provider);

  // const abi = await Bun.file(
  //   "./bin/SimpleStorage_sol_SimpleStorage.abi"
  // ).text();

  // const binary = await Bun.file(
  //   "./bin/SimpleStorage_sol_SimpleStorage.bin"
  // ).text();

  // const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  // console.log("Deploying contract...");
  // const contract = await contractFactory.deploy({
  //   gasPrice: 20000000000,
  //   gasLimit: 6721975,
  // });
  // console.log(contract);

  // const currentFavoriteNumber = await contract.retrieve();
  // console.log("Current favorite number:", currentFavoriteNumber.toString());
}

try {
  await main();
} catch (error) {
  console.error("Error deploying contract", error);
}
