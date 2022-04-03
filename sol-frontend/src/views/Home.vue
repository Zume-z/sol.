<template>
  <div class="flex md:flex-row flex-col-reverse w-full p-8 max-w-screen-lg m-auto border border-gray-800">
    <Sidebar class="md:flex-1" />
    <div class="md:w-10 md:h-auto h-8 w-auto flex-shrink-0" />
    <div class="md:w-3/5">
      <Image :url="image" />
    </div>
  </div>
</template>

<script lang="ts">

import Image from '../components/Image.vue'
import Video from '../components/Video.vue'
import Sidebar from '../components/Sidebar.vue'
import { defineComponent } from '@vue/runtime-core'
export default defineComponent({
  components: {
    Image,
    Video,
    Sidebar,
  },
  data: () => ({
    menuActive: false,
    image: new URL('../assets/img/sol.svg', import.meta.url).href,
    mp4: new URL('../assets/img/luxury.mp4', import.meta.url).href,
  }),
  
})
</script>
