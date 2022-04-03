//SPDX-License-Identifier: Unlicense
// set solidity version a 0.8.0
pragma solidity ^0.8.0;
// import console.sol from hardhat to debug the contract with console.log()
import "hardhat/console.sol";

contract firstContrat {
    // set name to your contract
    string public name = "My first Smart Contract";
    // set secret string information, only owner can set the information but all user can see it
    string private ownerInformation;
    // set Total Supply at 100000 to create limited token supply
    uint public totalSupply = 100000;
    // set owner address by creator of this contract
    address public owner;
    // set a tab of balances to transfer supply from account to another
    mapping(address => uint) balances;

    constructor(string memory _ownerInformation) {
        // set secret information from the owner contract input
        ownerInformation = _ownerInformation;
        // set owner balance with total supply
        balances[msg.sender] = totalSupply;
        // set owner address variable with owner address
        owner = msg.sender;
        console.log("Deploying first smart Contract with secret information:", _ownerInformation);
    }

    function getownerInformation() public view returns (string memory) {
        // return the owner information
        return ownerInformation;
    }

    function setownerInformation(address account, string memory _ownerInformation) public {
        // check if sender account is the owner
        require(account == owner);
        // change owner information by new information
        ownerInformation = _ownerInformation;
        console.log("Changing ownerInformation from '%s' to '%s'", ownerInformation, _ownerInformation);
    }

    function transfer(address to, uint amount) external {
        // check if balance of sender have amount to want send
        require(balances[msg.sender] >= amount, 'not enough token');
        // delete the amount into balance of sender
        balances[msg.sender] -= amount;
        // add the amount into balance of receiver
        balances[to] += amount;
        console.log('Sender balance is %s tokens', balances[msg.sender]);
        console.log('Trying to send %d to %s', amount, to);
    }

    function balanceOf(address account) external view returns (uint) {
        // return the amount of the actual sender balance
        return (balances[account]);
    }
}
