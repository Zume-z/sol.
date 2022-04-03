import { ethers } from 'hardhat'
import Ash from '../abi/Ash.json'
import Weth from '../abi/Weth.json'
import Carbon from '../abi/Carbon.json'
import Uniswap from '../abi/Uniswap.json'
import { constants, Contract } from 'ethers'
import prettifyNumber from '../utils/prettifyNumber'
import { ASH_ADDRESS, CARBON_ADDRESS, MARKETPLACE_ADDRESS, UNISWAP_ADDRESS, WETH_ADDRESS } from '../addresses'

const buyWeth = async () => {
  const wallet = (await ethers.getSigners())[0]
  const contract = new Contract(WETH_ADDRESS, Weth, wallet)
  const txResponse = await contract.deposit({ value: '100000000000000000000' })
  const txReceipt = await txResponse.wait()
  console.log('buyWeth')
}

const approveUniswapForWeth = async () => {
  const wallet = (await ethers.getSigners())[0]
  const contract = new Contract(WETH_ADDRESS, Weth, wallet)
  const txResponse = await contract.approve(UNISWAP_ADDRESS, constants.MaxInt256)
  const txReceipt = await txResponse.wait()
  console.log('approveUniswapForWeth')
}

const approveMarketplaceForAsh = async () => {
  const wallet = (await ethers.getSigners())[0]
  const contract = new Contract(ASH_ADDRESS, Ash, wallet)
  const txResponse = await contract.approve(MARKETPLACE_ADDRESS, constants.MaxInt256)
  const txReceipt = await txResponse.wait()
  console.log('approveMarketplaceForAsh')
}

const buyAsh = async () => {
  const wallet = (await ethers.getSigners())[0]
  const contract = new Contract(UNISWAP_ADDRESS, Uniswap, wallet)
  const txResponse = await contract.exactOutputSingle([WETH_ADDRESS, ASH_ADDRESS, 10000, wallet.address, constants.MaxInt256, '600000000000000000000', constants.MaxInt256, 0])
  const txReceipt = await txResponse.wait()
  console.log('buyAsh')
}

const buyToken = async () => {
  const wallet = (await ethers.getSigners())[0]
  const txResponse = await wallet.sendTransaction({
    to: MARKETPLACE_ADDRESS,
    data: '0xefef39a10000000000000000000000000000000000000000000000000000000000000026',
  })
  const txReceipt = await txResponse.wait()
  console.log('buyToken')
}

const burnToken = async () => {
  const wallet = (await ethers.getSigners())[0]
  const contract = new Contract(CARBON_ADDRESS, Carbon, wallet)
  const txResponse = await contract.safeTransferFrom(wallet.address, '0x000000000000000000000000000000000000dead', 23)
  const txReceipt = await txResponse.wait()
  console.log('burnToken')
}

const logAshBalance = async () => {
  const wallet = (await ethers.getSigners())[0]
  const contract = new Contract(ASH_ADDRESS, Ash, wallet)
  const balance = await contract.balanceOf(wallet.address)
  console.log('logAshBalance', prettifyNumber(balance))
}

const fn = async () => {
  await buyWeth()
  await approveUniswapForWeth()
  await approveMarketplaceForAsh()
  await logAshBalance()
  await buyAsh()
  await logAshBalance()
  await buyToken()
  await burnToken()
  await logAshBalance()
}

fn()
