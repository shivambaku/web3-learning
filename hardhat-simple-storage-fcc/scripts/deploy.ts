import { run, network, ethers } from "hardhat";

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying SimpleStorage...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();

  const contractAddress = await simpleStorage.getAddress();
  console.log("SimpleStorage deployed to:", contractAddress);

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deploymentTransaction()!.wait(5);
    await verify(contractAddress, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log("Current value:", currentValue.toString());

  const transactionResponse = await simpleStorage.store(42);
  await transactionResponse.wait();
  const newValue = await simpleStorage.retrieve();
  console.log("New value:", newValue.toString());
}

async function verify(contractAddress: string, args: any[]) {
  console.log("Verifying contract...");

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (_e) {
    const e = _e as Error;
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log(e.message);
    }
  }
  console.log("Contract verified!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// import { ethers } from "hardhat";

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = ethers.parseEther("0.001");

//   const lock = await ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
