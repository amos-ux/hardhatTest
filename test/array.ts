import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("array", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Array = await ethers.getContractFactory("Array");
    const lockedAmount = await ethers.utils.parseEther("111");
    const array = await Array.deploy(lockedAmount);
    await array.deployed();
    return { array, owner, otherAccount };
  }
  describe("Deployment", function () {
    it("initial count should equals 0", async function () {
      const { array } = await loadFixture(deployOneYearLockFixture);
      expect(await array.ower()).to.be.revertedWith("verify failed");
    });
  });
  describe("Functions", function () {
    it("removeArr", async function () {
      const { array } = await loadFixture(deployOneYearLockFixture);
      // [1,2,3,4]
      await expect(array.removeArr(4)).to.be.revertedWith("length failed");
      await array.removeArr(1);
      expect(await array.arr(1)).to.equal(3);
    });
    it("addArr", async function () {
      const { array } = await loadFixture(deployOneYearLockFixture);
      // [1,2,3,4]
      await array.addArr(5);
      expect(await array.arr(4)).to.equal(5);
    });
    it("removeWay", async function () {
      const { array } = await loadFixture(deployOneYearLockFixture);
      // [1,2,3,4]
      await array.removeWay(1);
      expect(await array.arr(1)).to.equal(4);
    });
    it("deleteArr", async function () {
      const { array } = await loadFixture(deployOneYearLockFixture);
      // [1,2,3,4]
      expect(array.deleteArr(4)).to.be.revertedWith("length failed");
      await array.deleteArr(1);
      expect(await array.arr(1)).to.equal(0);
    });
  });
});
