require('dotenv').config()
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import { HardhatUserConfig } from 'hardhat/types'

const config: HardhatUserConfig = {
  paths: {
    sources: './src/contracts',
    tests: './src/tests',
    artifacts: './dist/artifacts',
    cache: './dist/cache',
  },
  networks: {
    hardhat: {},
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [process.env.WALLET_KEY as string],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.11',
      },
    ],
  },
}

export default config
