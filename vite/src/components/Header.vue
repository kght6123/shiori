<template>
  <div class="fixed-header glass-dark">
    <div class="flex-none hidden lg:flex">
      <button class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
    <div class="flex-1 hidden px-2 mx-2 lg:flex">
      <span v-if="state.isLoggedin" class="text-lg font-bold"
        >こんにちは、&nbsp;{{ state.displayName }}&nbsp;さん</span
      >
    </div>
    <div v-if="state.isLoggedin" class="flex-1 lg:flex-none">
      <div class="form-control">
        <input type="text" placeholder="Search" class="input input-ghost" />
      </div>
    </div>
    <div v-if="state.isLoggedin" class="flex-none">
      <button class="btn btn-square btn-ghost">
        <component
          :is="search"
          class="inline-block w-6 h-6 mr-1 fill-current"
        />
      </button>
    </div>
    <div v-if="state.isLoggedin" class="flex-none">
      <button class="btn btn-square btn-ghost">
        <component :is="heart" class="inline-block w-6 h-6 mr-1 fill-current" />
      </button>
    </div>
    <div class="flex-none">
      <router-link class="btn btn-square btn-ghost" to="/" tag="button">
        <component :is="home" class="inline-block w-6 h-6 mr-1 fill-current" />
      </router-link>
    </div>
    <div v-if="state.isLoggedin" class="flex-none">
      <router-link class="btn btn-square btn-ghost" to="/setting" tag="button">
        <component :is="cog" class="inline-block w-6 h-6 mr-1 fill-current" />
      </router-link>
    </div>
    <div v-if="state.isLoggedin" class="flex-none">
      <atoms-button class="btn btn-square btn-ghost" @click="signout()">
        <component
          :is="signOut"
          class="inline-block w-6 h-6 mr-1 fill-current"
        />
      </atoms-button>
    </div>
    <div v-if="state.isLoggedin" class="flex-none">
      <div class="avatar">
        <div class="w-10 h-10 m-1 mask mask-squircle">
          <img :src="state.photoURL" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useAuthStore } from '@/store/auth'
  import AtomsButton from '@/components/atoms/Button.vue'
  import home from '@/icons/home-solid.svg'
  import cog from '@/icons/cog-solid.svg'
  import heart from '@/icons/heart-solid.svg'
  import search from '@/icons/search-solid.svg'
  import signOut from '@/icons/sign-out-alt-solid.svg'

  export default defineComponent({
    name: 'Header',
    components: { AtomsButton: AtomsButton },
    setup() {
      const { signout, state } = useAuthStore()
      return {
        state,
        signout,
        search,
        heart,
        home,
        cog,
        signOut,
      }
    },
  })
</script>

<style scoped>
  .fixed-header {
    @apply fixed w-full shadow-lg navbar text-neutral-content;
  }
</style>
