import { formatUnits } from 'ethers/lib/utils'
import { BigNumber } from '@ethersproject/bignumber'

// prettier-ignore
export default (
  value: BigNumber | number | string,
  decimals = 18,
  symbol = 'eth',
  round = 2
) => {
  if (typeof value === 'string') value = value
  else if (typeof value === 'number') value = value.toString()
  else value = value.toString()
  const float = parseFloat(formatUnits(value, decimals))
  return `${Math.round(float) === float ? float : float.toFixed(round)} ${symbol}`
}
