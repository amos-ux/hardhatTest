import { Address } from "cluster";
import { ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { isExternal } from "util/types";

async function main() {
  const provider = ethers.provider;
  const networkInfo = await provider.getNetwork();
  console.log(`networkInfo: ${JSON.stringify(networkInfo)}`);

  const curBlockHeight = await provider.getBlockNumber();
  console.log(`current block height: ${curBlockHeight}`);

  const myAddr = "0x1DBdB7e4Dc0056e0bf9a402087E230696F07E18E";
  const myAddrBalance = await provider.getBalance(myAddr);
  console.log(
    `native token balance: ${myAddr} - ${ethers.utils.formatEther(
      myAddrBalance
    )} ETH\n`
  );

  const signer = await ethers.getSigner(myAddr);
  console.log(`connected wallet: ${signer.address}`);

  const Test = await ethers.getContractFactory("Test");
  // 部署
  const test = await Test.deploy();
  await test.deployed();

  const tx = await test.create("amos");
  await tx.wait();
  const ax = await test.get(0);
  const ux=await test.updateText(0,"amos1");
  await ux.wait();
  const ox=await test.toggleCom(0);
  await ox.wait();
  console.log(
    `deployed at address ${test.address} todos value ${ax} ${ux}`
  );
  for (let slot = 0; slot < 10; slot++) {
    const value = await provider.getStorageAt(test.address, slot);
    console.log(value);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
