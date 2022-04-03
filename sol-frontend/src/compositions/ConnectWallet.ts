import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import Fortmatic from 'fortmatic'
import { parseUnits } from 'ethers/lib/utils'
import solAbi from '../assets/abi/solAbi.json'
import { computed, ComputedRef, Ref, ref } from 'vue'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Web3Provider, ExternalProvider } from '@ethersproject/providers'

let signer: any
let contractTokenCount = 1
let provider: Web3Provider | null = null
const error: Ref<string> = ref('')
const account: Ref<string> = ref('')
const connected: ComputedRef<boolean> = computed(() => !!account.value)
const constractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: { infuraId: import.meta.env.VITE_INFURA_KEY },
    },
    fortmatic: {
      package: Fortmatic,
      options: { key: import.meta.env.VITE_FORTMATIC_KEY },
    },
  },
})

const getProvider = () => {
  if (provider) return provider
  throw new Error('Provider has not been set.')
}

const updateWallet = async () => {
  if (provider) {
    const accounts = await provider.listAccounts()
    if (accounts.length) account.value = accounts[0]
  }
}

const setAccount = (newAccount: string) => {
  if (newAccount === '') {
    account.value = ''
    localStorage.removeItem('userIsConnected')
  } else {
    account.value = newAccount
    localStorage.setItem('userIsConnected', 'true')
  }
}

const setSigner = (signature: any) => {
  signer = signature
}

const setTokenCount = (tokenCount: any) => {
  contractTokenCount = tokenCount
}

const connect = async () => {
  try {
    console.log('connecting wallet...')
    const instance = await web3Modal.connect()
    instance.on('accountsChanged', updateWallet)
    instance.on('disconnect', updateWallet)
    provider = new Web3Provider(instance)
    const externalProvider = provider.provider as ExternalProvider
    const accounts = await externalProvider.request!({ method: 'eth_requestAccounts' })
    setSigner(provider.getSigner())
    setAccount(accounts[0])
    tokenCount()
  } catch (err) {
    console.log(err)
    error.value = 'Error retrieving account.'
  }
}
const connectOnLoad = async () => {
  if (web3Modal.cachedProvider)
    try {
      console.log('Reconnecting wallet...')
      const connectedUser = await web3Modal.connect()
      provider = new Web3Provider(connectedUser)
      setSigner(provider.getSigner())
      setAccount(connectedUser.selectedAddress)
      tokenCount()
      console.log('walletConnected')
    } catch (err) {
      console.log(err)
    }
}

const disconnect = async () => {
  setAccount('')
  web3Modal.clearCachedProvider()
}

const execute = async () => {
  if (typeof window.ethereum !== 'undefined') {
    const baseContract = new ethers.Contract(constractAddress, solAbi, signer)
    try {
      console.log('Minting...')
      await baseContract.mint({ value: parseUnits('0.1', 'ether') })
      console.log('Mint Success')
      const owner = await baseContract.ownerOf(1)
      console.log(owner)
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('Wallet not found.')
  }
}

const tokenCount = async () => {
  const baseContract = new ethers.Contract(constractAddress, solAbi, signer)
  try {
    const tokenCount = await baseContract.tokenCount()
    setTokenCount(tokenCount)
  } catch (err) {
    console.log(err)
  }
}

export default () => ({
  account,
  connect,
  connected,
  connectOnLoad,
  disconnect,
  getProvider,
  error,
  execute,
  contractTokenCount,
})
