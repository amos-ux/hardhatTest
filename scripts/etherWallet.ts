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
  const EtherWallet = await ethers.getContractFactory("EtherWallet");
  // 部署
  const amount = await ethers.utils.parseEther("0.00000001");
  const etherWallet = await EtherWallet.deploy({ value: amount } as any);
  await etherWallet.deployed();

  const baseBalance = await etherWallet.getBalance()
  const withdraw= await etherWallet.withdraw(await ethers.utils.parseEther("0.00000000000003"));
  await withdraw.wait()
  const Balance = await etherWallet.getBalance()
  // set
 


  console.log(`deployed at address ${etherWallet.address} base ${baseBalance} end ${Balance} getbalance ${await provider.getBalance(etherWallet.address)}`);

  for (let slot = 0; slot < 10; slot++) {
    const value = await provider.getStorageAt(etherWallet.address, slot);
    console.log(value);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
