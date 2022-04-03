<template>
  <div class="flex flex-col w-full">
    <Header />
    <router-view class="flex-1 min-h-0" />
  </div>
</template>

<script lang="ts">
import Header from './components/Header.vue'
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  components: {
    Header,
  },
})
</script>
