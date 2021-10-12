<template>
  <router-view class="bg-fixed bg-cover" :style="routerViewStyle" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import bodyImgUrl from '@/assets/065AME0226_TP_V.jpg'

  export default defineComponent({
    name: 'App',
    components: {},
    setup() {
      return { routerViewStyle: `background-image: url(${bodyImgUrl})` }
    },
  })
</script>
