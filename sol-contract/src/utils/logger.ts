import util from 'util'
import chalk from 'chalk'

const formatArgs = (args: any[]) => {
  const formattedArgs = []
  for (const arg of args) {
    if (typeof arg === 'object') formattedArgs.push(util.inspect(arg, { colors: true }))
    else formattedArgs.push(arg)
  }
  return formattedArgs
}

export const logWarn = (...args: any[]) => {
  const formattedArgs = formatArgs(args)
  console.log(chalk.hex('#FFA500')(...formattedArgs))
}

export const logSuccess = (...args: any[]) => {
  const formattedArgs = formatArgs(args)
  console.log(chalk.green(...formattedArgs))
}

export const logInfo = (...args: any[]) => {
  const formattedArgs = formatArgs(args)
  console.log(chalk.yellow(...formattedArgs))
}

export const logError = (...args: any[]) => {
  const formattedArgs = formatArgs(args)
  console.log(chalk.red(...formattedArgs))
}

export const logTrace = (...args: any[]) => {
  const formattedArgs = formatArgs(args)
  console.log(chalk.grey(...formattedArgs))
}

export const logDebug = (...args: any[]) => {
  const formattedArgs = formatArgs(args)
  console.log(chalk.magenta(...formattedArgs))
}

export const logFatal = (...args: any[]) => {
  const formattedArgs = formatArgs(args)
  console.log(chalk.redBright('Error:', ...formattedArgs))
  throw new Error()
}
