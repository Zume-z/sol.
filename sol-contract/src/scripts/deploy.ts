import { run } from 'hardhat'
import { ethers } from 'hardhat'
import deploy from '../functions/deploy'
import { parseUnits } from 'ethers/lib/utils'
import { Contract } from '@ethersproject/contracts'
import { logSuccess, logInfo, logTrace } from '../utils/logger'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

let wallet1: SignerWithAddress
let wallet2: SignerWithAddress

const func = async () => {
  ;[wallet1, wallet2] = await ethers.getSigners()

  logInfo('Deploying...')
  const baseContract = (await deploy('solERC721')).contract

  logSuccess('Deploy success')
  logTrace('Base contract:', baseContract.address)
  logTrace('Deployer address:', wallet1.address)
  logTrace('User address:', wallet2.address)

  console.log('contract:', baseContract)

  logInfo('Minting token...')
  await baseContract.mint({ value: parseUnits('0.1', 'ether') })
  logSuccess('Mint Success')
  

  await run('node')


  // logInfo('Check owner of token 1...')
  // const owner = await baseContract.ownerOf(1)
  // logSuccess('Owner:', owner)

  // logInfo('Set royalties...')
  // await baseContract.setRoyalties(1, baseContract.address, 1000)
  // const raribleRoyalties = await baseContract.getRaribleV2Royalties(1)
  // logSuccess('Royalties:', raribleRoyalties)

  // const ERC2981Royalties = await baseContract.royaltyInfo(1, 1000)
  // logSuccess('ERC2981 Royalties For Sale of 1000:', ERC2981Royalties)

  // logInfo('Get token URI...')
  // const tokenURI = await baseContract.tokenURI(1)
  // logSuccess('Token URI:', tokenURI)
}

func()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
