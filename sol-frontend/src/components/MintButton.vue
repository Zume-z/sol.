<template>
  <Listbox as="div" v-model="selected" class="relative">
    <div class="relative flex border border-gray-800 box-content">
      <button class="flex-1 text-sm font-Nb hover:bg-gray-50 hover:text-black transition duration-300 ease-in-out p-3" @click="execute">
        {{ buttonText }}
      </button>
    </div>
  </Listbox>
</template>

<script lang="ts">
import { ref, PropType } from 'vue'

import { defineComponent } from '@vue/runtime-core'
import useConnectWallet from '../compositions/ConnectWallet'
import { Listbox, ListboxButton, ListboxLabel } from '@headlessui/vue'

export default defineComponent({
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<{ id: number; name: string }[]>,
      required: true,
    },
  },
  components: {
    Listbox,
    ListboxButton,
  },

  setup(props) {
    const { connected, connect, disconnect, account, execute } = useConnectWallet()
    const selected = ref(props.options[0])

    return {
      selected,
      connected,
      connect,
      disconnect,
      account,
      execute,
    }
  },
})
</script>
