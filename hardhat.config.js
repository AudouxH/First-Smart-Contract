/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

const INFURA_URL = "https://rinkeby.infura.io/v3/d624360bfb12418392e81e0a932e66e9";
const PRIVATE_KEY = "0x7237df569e28aacefd71ed6a769cfcf4e006b028b3cebafd32118c6c417b6745"


module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [PRIVATE_KEY],
    },
  }
};
