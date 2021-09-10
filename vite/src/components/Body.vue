<template>
  <div>
    <span
      class="fixed top-0 left-0 block w-screen h-screen bg-cover z--10"
      :style="routerViewStyle"
    ></span>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import bodyImgUrl from '@/assets/065AME0226_TP_V.jpg'

  export default defineComponent({
    name: 'Body',
    components: {},
    setup() {
      return { routerViewStyle: `background-image: url(${bodyImgUrl})` }
    },
  })
</script>
