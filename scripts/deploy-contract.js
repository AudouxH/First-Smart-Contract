
const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('deploy contract with this address: ', deployer.address);

  const balance = await deployer.getBalance();
  console.log('Account balance: ', balance.toString())

  const Token = await hre.ethers.getContractFactory("firstContrat");
  const token = await Token.deploy("Hello, world!");

  await token.deployed();
  console.log("First Smart Contract deployed to:", token.address);

  const data = {
    address: token.address,
    abi: JSON.parse(token.interface.format('json'))
  };
  fs.writeFileSync('front/src/firstContract.json', JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
