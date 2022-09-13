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
  const Mapping = await ethers.getContractFactory("Mapping");
  // 部署
  const mapping = await Mapping.deploy();
  await mapping.deployed();

  // set
  const set=await mapping.set("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",1);
  await set.wait();

  // get 
  const get=await mapping.get(0);

  //getsize
  const getSize=await mapping.getSize()
    
  //updateStruct 
  await mapping.updateStruct(0,"0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB");

  const getStruct=await mapping.getStrcut(+getSize-1);

  console.log(`deployed at address ${mapping.address} getsize ${getSize} get ${get} updateStruct ${getStruct} balance ${get}`);

  for (let slot = 0; slot < 10; slot++) {
    const value = await provider.getStorageAt(mapping.address, slot);
    console.log(value);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
