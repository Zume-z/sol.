<template>
  <div class="flex flex-col font-Nb">
    <div class="text-lg font-bold">Sol.</div>
    <div class="text-base pb-10">Edition {{ contractTokenCount }} of 10</div>
    <div class="text-sm pb-10">
      Description: The Sun is expected to die in 5 billion years. Until that point Sol will continue to change, never repeating itself giving you something to look at whilst you
      wait.
    </div>
    <div class="text-sm pb-10">ERC-721: SVG. On-chain/Dynamic.</div>
    <div class="text-sm pb-10">Contract: 0x5fbdb2315678afecb367f032d93f642f64180aa3</div>
    <div class="text-sm">{{ priceDisplay }}</div>
    <MintButton :button-text="buttonText" :options="mintOptions" @optionClick="getPriceDisplay" class="mb-8" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import MintButton from '../components/MintButton.vue'
import useConnectWallet from '../compositions/ConnectWallet'
export default defineComponent({
  components: {
    MintButton,
  },
  data: () => ({
    contractTokenCount: '1',
    priceDisplay: '0.10Ξ',
    buttonText: 'MINT',
    mintOptions: [],
  }),
  setup() {
    const { contractTokenCount } = useConnectWallet()
    return { contractTokenCount }
  },

  methods: {
    onMint(amount: number) {
      console.log(amount)
    },
    getPriceDisplay(amount: number) {
      const priceEachNFT = 0.069
      const priceAll = Math.round(amount * priceEachNFT * 1000) / 1000
      this.priceDisplay = `${priceAll}Ξ`
    },
  },
})
</script>


