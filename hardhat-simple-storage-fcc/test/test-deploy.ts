import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";
import { assert } from "chai";

describe("SimpleStorage", function () {
  let simpleStorageFactory: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;

  this.beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), "0");
  });

  it("Shold update when we call store", async function () {
    const transactionResponse = await simpleStorage.store(42);
    await transactionResponse.wait();

    const newValue = await simpleStorage.retrieve();
    assert.equal(newValue.toString(), "42");
  });
});
