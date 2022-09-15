import { ethers } from "hardhat";

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

  const base = await testArray.deleteArr();

  const arrayRemove = await testArray.arrayRemove(1);
  await arrayRemove.wait();
  // set

  console.log(
    `deployed at address ${
      testArray.address
    } base ${base} end ${await testArray.deleteArr()}`
  );

  for (let slot = 0; slot < 10; slot++) {
    const value = await provider.getStorageAt(testArray.address, slot);
    console.log(value);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
