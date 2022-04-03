import { ethers, network } from 'hardhat'

export default async (eoaAddress: string) => {
  await network.provider.request({ method: 'hardhat_impersonateAccount', params: [eoaAddress] })
  return ethers.getSigner(eoaAddress)
}
