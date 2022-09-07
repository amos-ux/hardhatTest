import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Test = await ethers.getContractFactory("Test");
    const test = await Test.deploy();
    await test.deployed();
    return { test, owner, otherAccount };
  }
  // describe("Deployment", function () {
  //   it("initial count should equals 0", async function () {
  //     const { test } = await loadFixture(deployOneYearLockFixture);
  //     console.log(await test.todos(0))
  //      expect((await test.todos(0)).text).to.equal("amos1")
  //   });
  // });
  describe("Functions", function () {
    it("create", async function () {
      const { test } = await loadFixture(deployOneYearLockFixture);
      await test.create("amos")
      const data= await test.get(0);
      expect(data[0]).to.equal("amos");
    });
    it("update", async function () {
      const { test } = await loadFixture(deployOneYearLockFixture);
      await test.create("amos")
      await test.updateText(0,"amos")
      const data= await test.get(0);
      expect(data[0]).to.equal("amos");
    });
    it("toggleCom", async function () {
      const { test } = await loadFixture(deployOneYearLockFixture);
      await test.create("amos")
      await test.toggleCom(0)
      const data= await test.get(0);
      expect(data[1]).to.equal(true);
    });
  });

});
