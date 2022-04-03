import { Contract } from 'ethers'
import deploy from '../functions/deploy'
import RateEngine from '../abi/RateEngine.json'
import impersonate from '../functions/impersonate'
import prettifyNumber from '../utils/prettifyNumber'
import { CARBON_ADDRESS, MARKETPLACE_ADDRESS, PAK_ADDRESS, RATE_ENGINE_ADDRESS, RATE_ENGINE_OWNER } from '../addresses'

const updateRateEngine = async () => {
  const wallet = await impersonate(RATE_ENGINE_OWNER)
  const contract = new Contract(RATE_ENGINE_ADDRESS, RateEngine, wallet)
  await contract.updateRateClass([CARBON_ADDRESS], [1])
}

const activateSale = async () => {
  const wallet = await impersonate(PAK_ADDRESS)
  const txResponse = await wallet.sendTransaction({
    to: MARKETPLACE_ADDRESS,
    data: '0x67c4ef68000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000003E7000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000002086AC3510526000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064d91f12ece7362f91a6f8e7940cd55f05060b9200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a30000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000080000000000000000000000000b89fe5a72b3a71e585f468c3ff2d1f67df13b2560000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000f02cd6f7b3d001b3f81e747e73a06ad73cbd5e5b000000000000000000000000000000000000000000000000000000000000245e0000000000000000000000002ce780d7c743a57791b835a9d6f998b15bbba5a400000000000000000000000000000000000000000000000000000000000002b2',
  })
  const txReceipt = await txResponse.wait()
  console.log(txReceipt)
}

const execute = async () => {
  const { contract } = await deploy('Mev')
  console.log(`Successfully deployed contract: ${contract.address}`)
  console.log('Balance: ', prettifyNumber(await contract.signer.getBalance()))
  const txResponse = await contract.start(32)
  await txResponse.wait()
  console.log('Balance: ', prettifyNumber(await contract.signer.getBalance()))
}

const fn = async () => {
  await updateRateEngine()
  await activateSale()
  await execute()
}

fn()