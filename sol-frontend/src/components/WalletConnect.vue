<template>
  <div class="grid justify-end">
    <button v-if="!connected" class="border-gray-800 box-border p-4 border transition text-xs duratioz-300 ease-in-out font-Nb hover:bg-gray-800 hover:text-white" @click="connect">
      CONNECT WALLET
    </button>
    <button v-else class="border-gray-800 box-border p-4 border transition duratioz-300 text-xs ease-in-out font-Nb hover:bg-gray-50 hover:text-black" @click="disconnect">
      {{ formattedAddress }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import useConnectWallet from '../compositions/ConnectWallet'
export default defineComponent({
  data: () => ({}),
  methods: {},
  setup() {
    const { connected, connect, disconnect, account, connectOnLoad } = useConnectWallet()
    return { connected, connect, disconnect, account, connectOnLoad }
  },
  mounted() {
    this.connectOnLoad()
  },
  computed: {
    formattedAddress() {
      return `${this.account.slice(0, 6)}...${this.account.slice(38, 42)}`
    },
  },
})
</script>
