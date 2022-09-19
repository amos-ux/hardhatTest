import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Overrides } from "ethers";
import { PromiseOrValue } from "../typechain-types/common";

interface IValue extends Overrides {
  value: PromiseOrValue<string>;
}
describe("Proxy", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const MySol = await ethers.getContractFactory("MySol");
    const mysol = await MySol.deploy();
    await mysol.deployed();
    console.log(`deployed at mysol address ${mysol.address} `);

    // proxy
    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy(mysol.address);
    await proxy.deployed();

    const myProxy =await ethers.getContractAt("MySol", proxy.address);
    return { myProxy };
  }
  describe("Deployment", function () {
    it("initial index should equals 0", async function () {
      const { myProxy } = await loadFixture(deployOneYearLockFixture);
      expect(await myProxy.count()).to.be.equal(0);
      expect(await myProxy.x()).to.be.equal(0);
    });
  });
  describe("Functions", function () {
    it("add", async function () {
      const { myProxy } = await loadFixture(deployOneYearLockFixture);
      const add = await myProxy.add();
      await add.wait()
      expect(await  myProxy.count()).to.be.equal(1);
    });
  });
});
