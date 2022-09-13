import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("mapping", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Mapping = await ethers.getContractFactory("Mapping");
    const mapping = await Mapping.deploy();
    await mapping.deployed();
    return { mapping, owner, otherAccount };
  }
  describe("Deployment", function () {
    it("initial index should equals 0", async function () {
      const { mapping } = await loadFixture(deployOneYearLockFixture);
      expect(await mapping.index()).to.be.equal(0);
    });
  });
  describe("Functions", function () {
    // set
    it("set", async()=>{
      const { mapping } = await loadFixture(deployOneYearLockFixture);
      expect(await mapping.index()).to.be.equal(0);
      const set=await mapping.set("0x617F2E2fD72FD9D5503197092aC168c91465E7f2",1);
      expect(await mapping.index()).to.be.equal(1);
      const size= await mapping.getSize();
      const adr= await mapping.keys(Number(size)-1);
      expect(await adr).to.be.equal("0x617F2E2fD72FD9D5503197092aC168c91465E7f2");
    })
    it("get", async()=>{
      const { mapping } = await loadFixture(deployOneYearLockFixture);
      expect(await mapping.index()).to.be.equal(0);
      await mapping.set("0x617F2E2fD72FD9D5503197092aC168c91465E7f2",1);
      expect(await mapping.index()).to.be.equal(1);
      const size= await mapping.getSize();
      const value=await mapping.get(Number(size)-1);
      expect(await value).to.be.equal(1);
    })
    it("getSize", async()=>{
      const { mapping } = await loadFixture(deployOneYearLockFixture);
      expect(await mapping.index()).to.be.equal(0);
      await mapping.set("0x617F2E2fD72FD9D5503197092aC168c91465E7f2",1);
      expect(await mapping.index()).to.be.equal(1);
      const size= await mapping.getSize();
      expect(await size).to.be.equal(1);
    })
    it("updateStruct", async()=>{
      const { mapping } = await loadFixture(deployOneYearLockFixture);
      expect(await mapping.index()).to.be.equal(0);
      await mapping.set("0x617F2E2fD72FD9D5503197092aC168c91465E7f2",1);
      expect(await mapping.index()).to.be.equal(1);
      await mapping.updateStruct(0,"0x617F2E2fD72FD9D5503197092aC168c91465E7f2")

      expect(await (await mapping.BalanceList(0)).adr).to.be.equal("0x617F2E2fD72FD9D5503197092aC168c91465E7f2");
    })
    it("updateStruct", async()=>{
      const { mapping } = await loadFixture(deployOneYearLockFixture);
      expect(await mapping.index()).to.be.equal(0);
      await mapping.set("0x617F2E2fD72FD9D5503197092aC168c91465E7f2",1);
      expect(await mapping.index()).to.be.equal(1);
      const getStrcut =await mapping.getStrcut(0)
      expect(await getStrcut).to.be.equal("0x617F2E2fD72FD9D5503197092aC168c91465E7f2");
    })
  });
});

