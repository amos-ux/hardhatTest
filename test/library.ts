import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Overrides } from "ethers";
import { PromiseOrValue } from "../typechain-types/common";

describe("library", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ArrayLibrary = await ethers.getContractFactory("ArrayLibrary");
    // 部署
    const arrayLibrary = await ArrayLibrary.deploy();
    const TestArray = await ethers.getContractFactory("TestArray", {
      libraries: {
        ArrayLibrary: arrayLibrary.address,
      },
    });
    // 部署
    const testArray = await TestArray.deploy();
    await testArray.deployed();
    return { testArray, owner, otherAccount };
  }
  describe("Deployment", function () {
    it("initial deleteArr should equals 0", async function () {
      const { testArray } = await loadFixture(deployOneYearLockFixture);
      expect(await testArray.deleteArr()).to.equal(0);
    });
  });
  describe("Functions", function () {
    it("arrayRemove", async function () {
      const { testArray } = await loadFixture(deployOneYearLockFixture);
      const arr = await testArray.arr(1);
      const arrayRemove=await testArray.arrayRemove(1)
      await arrayRemove.wait()
      const arrIndex=await ethers.utils.formatUnits(arr,"wei")
      expect(+arrIndex).to.equal(+ await testArray.deleteArr());
    });
  });
});
