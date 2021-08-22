<template>
  <div class="hello">
    <h1>Hello, {{ state.isLoggedin ? state.displayName : guest }}</h1>
    <p>This is a example of an article.</p>
    <p>Vue3 + Composition API + store pattern + Firebase Auth</p>
    <h3>Related links</h3>
    <ul>
      <li>
        <a
          href="https://github.com/ErgoFriend/vue-firebase-authl"
          target="_blank"
          rel="noopener"
          >GitHub Repo</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript"
          target="_blank"
          rel="noopener"
          >Zenn Article</a
        >
      </li>
    </ul>
    <br />
    <p>
      Copyright © 2021 <a href="https://kasu.dev">kasu.dev</a> All Rights
      Reserved.
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useAuthStore } from '@/store/auth'

  export default defineComponent({
    name: 'Home',
    setup() {
      const guest = '{{ Guest }}'
      const { state } = useAuthStore()
      return { guest, state }
    },
  })
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
