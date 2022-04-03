const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test first Smart Contract", () => {
  let Token, token, owner, addr1, addr2;

  beforeEach(async () => {
    Token = await ethers.getContractFactory('firstContrat');
    token = await Token.deploy("Hello, world!");
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address);
    });
    it('should assign the total supply of tokens to the owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transaction', () => {
    it('Should transfer tokens between accounts', async () => {
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await token.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it('Should fail if sender doesnt have enough token', async () => {
      const initialBalanceOwner = await token.balanceOf(owner.address);

      await expect(
        token
          .connect(addr1)
          .transfer(owner.address, 1)
      )
        .to
        .be
        .revertedWith('not enough token')
        expect (
          await token.balanceOf(owner.address)
        )
          .to
          .equal(initialBalanceOwner)
    });

    it('Should update balance after transfer', async () => {
      const initialBalanceOwner = await token.balanceOf(owner.address);

      await token.transfer(addr1.address, 100);
      await token.transfer(addr2.address, 50);

      const finalOwnerBalance = await token.balanceOf(owner.address);
      expect (finalOwnerBalance).to.equal(initialBalanceOwner - 150);

      const addr1Balance = await token.balanceOf(addr1.address);
      expect (addr1Balance).to.equal(100);

      const addr2Balance = await token.balanceOf(addr2.address);
      expect (addr2Balance).to.equal(50);
    });
  });

  describe('Change the secret information string', () => {
    it("Should return the new greeting once it's changed", async function () {
      expect(await token.getSecretInformation()).to.equal("Hello, world!");
      const setGreetingTx = await token.setSecretInformation("Hola, mundo!");
      await setGreetingTx.wait();
      expect(await token.getSecretInformation()).to.equal("Hola, mundo!");
    });
  });
  
});
