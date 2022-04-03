import { run } from 'hardhat'
import deploy from '../functions/deploy'

const func = async () => {
  const { contract } = await deploy('ManifoldERC')
  console.log(`Successfully deployed contract: ${contract.address}`)
  await run('node')
}

func()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
