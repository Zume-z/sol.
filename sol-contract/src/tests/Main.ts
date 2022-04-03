import { expect } from 'chai'
import { ethers } from 'hardhat'
import { parseUnits } from 'ethers/lib/utils'
import { Contract } from '@ethersproject/contracts'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('SolERC721 Test', () => {
  let contract: Contract
  let wallet1: SignerWithAddress
  let wallet2: SignerWithAddress

  const time = {
    Hour: 3600,
    Day: 86400,
    week: 604800,
    year: 31536000,
  }

  beforeEach(async () => {
    ;[wallet1, wallet2] = await ethers.getSigners()
    const Contract = await ethers.getContractFactory('solERC721')
    contract = await Contract.deploy()
    await contract.mint({ value: parseUnits('0.1', 'ether') })
  })

  it('Token Mintable', async () => {
    await contract.mint({ value: parseUnits('0.1', 'ether') })
  })

  it('Correct Owner Assigned Token', async () => {
    const tokenOneOwner = await contract.ownerOf(1)
    expect(tokenOneOwner).to.equal(wallet1.address)
  })

  it('Correct Token Count', async () => {
    const tokenCount = await contract.tokenCount()
    expect(tokenCount).to.equal(2)
  })

  it('Has No Royalties If Not Set', async function () {
    const NoRoyalties = await contract.royaltyInfo(1, 100)
    expect(NoRoyalties[1].toNumber()).to.be.equal(0)
    expect(NoRoyalties[0]).to.be.equal(ethers.constants.AddressZero)
  })

  it('Possible to set Rarible Royalties', async () => {
    await contract.setRoyalties(1, contract.address, 1000)
    const royalties = (await contract.getRaribleV2Royalties(1))[0]
    expect(royalties.value.toNumber()).to.be.equal(1000)
    expect(royalties.account).to.be.equal(contract.address)
  })

  it('Possible to set ERC2981Royalties', async () => {
    await contract.setRoyalties(1, contract.address, 1000)
    const royalties = await contract.royaltyInfo(1, 1000)
    expect(royalties.royaltyAmount.toNumber()).to.be.equal(100)
    expect(royalties.receiver).to.be.equal(contract.address)
  })

  // URI Testing over time
  // it('URI Changes Over Time Correclty', async () => {
  //   const tokenURIbefore = await contract.tokenURI(0)
  //   console.log('Before', tokenURIbefore)
  //   await ethers.provider.send('evm_increaseTime', [time.week * 1]) // add 10 seconds
  //   await ethers.provider.send('evm_mine', []) // force mine the next block
  //   const tokenURIAfter = await contract.tokenURI(1)
  //   console.log('After', tokenURIAfter)
  //   await ethers.provider.send('evm_increaseTime', [time.week * 1]) // add 10 seconds
  //   await ethers.provider.send('evm_mine', []) // force mine the next block
  //   const tokenURIAfter2 = await contract.tokenURI(1)
  //   console.log('After', tokenURIAfter2)
  //   await ethers.provider.send('evm_increaseTime', [time.week * 1 - 60]) // add 10 seconds
  //   await ethers.provider.send('evm_mine', []) // force mine the next block
  //   const tokenURIAfter3 = await contract.tokenURI(1)
  //   console.log('After', tokenURIAfter3)
  // })
})
