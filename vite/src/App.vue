<template>
  <Header />
  <Footer />
  <router-view :style="routerViewStyle" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import bodyImgUrl from '@/assets/065AME0226_TP_V.jpg'

  export default defineComponent({
    name: 'App',
    components: {
      Header: Header,
      Footer: Footer,
    },
    setup() {
      return { routerViewStyle: `background-image: url(${bodyImgUrl})` }
    },
  })
</script>
