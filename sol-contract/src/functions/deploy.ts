import { ethers } from 'hardhat'

export default async (contractName: string, args: any[] = []) => {
  const Contract = await ethers.getContractFactory(contractName)
  const contract = await Contract.deploy(...args)
  const txResponse = await contract.deployed()
  const txReceipt = await txResponse.deployTransaction.wait()
  return {
    contract,
    txReceipt,
  }
}
