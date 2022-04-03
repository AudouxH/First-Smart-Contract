//SPDX-License-Identifier: Unlicense
// set solidity version a 0.8.0
pragma solidity ^0.8.0;
// import console.sol from hardhat to debug the contract with console.log()
import "hardhat/console.sol";

contract firstContrat {
    string public name = "My first Smart Contract";
    string private greeting;
    uint public totalSupply = 100000;
    address public owner;
    mapping(address => uint) balances;

    constructor(string memory _greeting) {
        console.log("Deploying first smart Contract with secret information:", _greeting);
        greeting = _greeting;
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function getSecretInformation() public view returns (string memory) {
        return greeting;
    }

    function setSecretInformation(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function transfer(address to, uint amount) external {
        console.log('Sender balance is %s tokens', balances[msg.sender]);
        console.log('Trying to send %d to %s', amount, to);
        require(balances[msg.sender] >= amount, 'not enough token');
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint) {
        return (balances[account]);
    }
}
