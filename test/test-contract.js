const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test first Smart Contract", () => {
  // let variable to interact with the smart contract
  let Token, token, owner, addr1, addr2;

  // running before each describe
  beforeEach(async () => {
    // set Token from the ether getting contract factory
    Token = await ethers.getContractFactory('firstContrat');
    // deploy the contract with "hello, world!" owner information
    token = await Token.deploy("Hello, world!");
    // set owner addr1 and addr2 account from getSigners ethers
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  // run deployment test
  describe('Deployment', () => {
    // check if the owner in the contract are the same as owner address we haved get
    it('Should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address);
    });
    // check if owner balance are equal at totalSupply
    it('should assign the total supply of tokens to the owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transaction', () => {
    // test to transfer some supply to another account
    it('Should transfer tokens between accounts', async () => {
      // call transfer function in contract with address to send supply and number of supply
      await token.transfer(addr1.address, 50);
      // get new balance of addr1
      const addr1Balance = await token.balanceOf(addr1.address);
      // check if addr1 have 50 supply
      expect(addr1Balance).to.equal(50);

      // call connect to addr1 and transfer 50 supply to addr2
      await token.connect(addr1).transfer(addr2.address, 50);
      // get new balance of addr2
      const addr2Balance = await token.balanceOf(addr2.address);
      // check if addr2 balance are equal at 50
      expect(addr2Balance).to.equal(50);
      console.log(addr1Balance, addr2Balance);
    });

    // function test if sender have 1 token supply
    it('Should fail if sender doesnt have enough token', async () => {
      // get initial balance owner
      const initialBalanceOwner = await token.balanceOf(owner.address);
      // check if addr1 can trander 1 token supply to owner address
      await expect(token.connect(addr1).transfer(owner.address, 1))
        .to.be.revertedWith('not enough token')
        expect (await token.balanceOf(owner.address)).to.equal(initialBalanceOwner)
    });

    // function that update balance after transfer
    it('Should update balance after transfer', async () => {
      // get initial balance owner
      const initialBalanceOwner = await token.balanceOf(owner.address);

      // transfer 100 token supply to addr1
      await token.transfer(addr1.address, 100);
      // transfer 50 token supply to addr2
      await token.transfer(addr2.address, 50);

      // final balance owner
      const finalOwnerBalance = await token.balanceOf(owner.address);
      // check if initial balance owner have lost 150 token supply
      expect (finalOwnerBalance).to.equal(initialBalanceOwner - 150);

      // get balance of addr1
      const addr1Balance = await token.balanceOf(addr1.address);
      // check if is equal to 100
      expect (addr1Balance).to.equal(100);
      
      // get balance of addr2
      const addr2Balance = await token.balanceOf(addr2.address);
      // check if is equal to 50
      expect (addr2Balance).to.equal(50);
    });
  });

  // function that change owner information
  describe('Change the owner information string', () => {
    it("Should return the new owner information once it's changed", async function () {
      // check if owner information equal "Hello, world!"
      expect(await token.getownerInformation()).to.equal("Hello, world!");
      // set new information owner into the contract at "Hola, mundo!"
      const setGreetingTx = await token.setownerInformation(owner.address, "Hola, mundo!");
      // wait the change
      await setGreetingTx.wait();
      // check if owner information equal "Hola, mundo!"
      expect(await token.getownerInformation()).to.equal("Hola, mundo!");
    });
  });
  
});
