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
  const MySol = await ethers.getContractFactory("MySol");
  const mysol = await MySol.deploy();
  await mysol.deployed();
  console.log(`deployed at mysol address ${mysol.address} `);

  // proxy
  const Proxy = await ethers.getContractFactory("Proxy");
  const proxy = await Proxy.deploy(mysol.address);
  await proxy.deployed();

  const myProxy =await ethers.getContractAt("MySol", proxy.address);
  console.log(
    `deployed at mysol address ${proxy.address} ${await myProxy.count()}`
  );
  for (let slot = 0; slot < 10; slot++) {
    const value = await provider.getStorageAt(proxy.address, slot);
    console.log(value);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
