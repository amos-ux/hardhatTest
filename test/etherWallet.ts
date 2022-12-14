import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Overrides } from "ethers";
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
    const amount = await ethers.utils.parseUnits("10","ether");
    const etherWallet = await EtherWallet.deploy({ value: amount } as any);
    await etherWallet.deployed();
    return { etherWallet, owner, otherAccount };
  }
  describe("Functions", function () {
    it("withdraw", async function () {
      const { etherWallet } = await loadFixture(deployOneYearLockFixture);
      const amount = await ethers.utils.parseUnits("2","ether");
      const format = async (value: BigNumber) => {
        return await ethers.utils.formatEther(value);
      };
      const withdraw = await etherWallet.withdraw(+await format(amount));
      await withdraw.wait()
      console.log(+await format(await ethers.utils.parseUnits("8", "ether")));
      console.log(+await etherWallet.getBalance())
      expect(1).to.be.equal(1)
      expect(+await format(await etherWallet.getBalance())).to.be.equal(10);
    });
    it("getBalance", async function () {
      const { etherWallet } = await loadFixture(deployOneYearLockFixture);
      const format = async (value: BigNumber) => {
        return await ethers.utils.formatEther(value);
      };
      expect(+await format(await etherWallet.getBalance())).to.be.equal(10);
    });
  });
});
