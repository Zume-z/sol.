<template>
  <div class="w-full p-8">
    <div class="grid grid-cols-2  w-full">
      <div class="grid p-2 text-2xl font-Nb">Λ.</div>
      <WalletConnect />
    </div>
  </div>
</template>

<script lang="ts">
import WalletConnect from '../components/WalletConnect.vue'
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  components: {
    WalletConnect,
  },
})
</script>
