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
  const lockedAmount = await ethers.utils.parseEther("111");
  const Array = await ethers.getContractFactory("Array");
  // 部署
  const array = await Array.deploy(lockedAmount);
  await array.deployed();
  //add
  const addArr = await array.addArr(5);
  await addArr.wait();

  // remove
  const removeArr = await array.removeArr(1);
  await removeArr.wait();

  // delete
  const deleteArr = await array.deleteArr(1);
  await deleteArr.wait();
  console.log(`deployed at address ${array.address} new arr ${deleteArr}`);

  for (let slot = 0; slot < 10; slot++) {
    const value = await provider.getStorageAt(array.address, slot);
    console.log(value);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
