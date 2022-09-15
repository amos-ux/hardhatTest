import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Overrides } from "ethers";
import { PromiseOrValue } from "../typechain-types/common";

interface IValue extends Overrides {
  value: PromiseOrValue<string>;
}
describe("etherWallet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const EtherWallet = await ethers.getContractFactory("EtherWallet");
    const amount = await ethers.utils.parseEther("0.0000001");
    const etherWallet = await EtherWallet.deploy({ value: amount } as any);
    await etherWallet.deployed();
    return { etherWallet, owner, otherAccount };
  }
  describe("Functions", function () {
    it("withdraw", async function () {
      const { etherWallet } = await loadFixture(deployOneYearLockFixture);
      const amount = await ethers.utils.parseUnits("0.000000000000001", "wei");
      await etherWallet.withdraw(amount);
      console.log(await ethers.utils.parseEther("0.00000000001"));
      console.log(amount);
      expect(await etherWallet.getBalance()).to.be.equal(
        (+await ethers.utils.parseUnits("0.00000000001", "wei")) - +amount
      );
    });
  });
});
