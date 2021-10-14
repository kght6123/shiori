<template>
  <div class="z-20 fixed-header glass dark:glass-dark">
    <div class="navbar-start">
      <!-- TODO:後でAmazonの手を振ってくれるアニメーションみたいなの入れたい
      <span v-if="state.isLoggedin" class="text-lg font-bold"
        >こんにちは、&nbsp;{{ state.displayName }}&nbsp;さん</span
      >
      -->
    </div>
    <div v-if="state.isLoggedin" class="flex-1 navbar-center">
      <div class="form-control">
        <div class="flex space-x-2">
          <input
            v-model="data.keyword"
            type="text"
            placeholder="Search"
            class="input input-ghost"
          />
          <button
            class="btn btn-square btn-ghost"
            @click="searchIndexesKeyword"
          >
            <component :is="search" class="inline-block w-6 h-6 fill-current" />
          </button>
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <!--atoms-button
        v-if="state.isLoggedin"
        class="btn btn-square btn-ghost"
        @click="signout()"
      >
        <component :is="signOut" class="inline-block w-6 h-6 fill-current" />
      </atoms-button-->
      <div v-if="state.isLoggedin" class="avatar">
        <div class="w-10 h-10 m-1 mask mask-squircle">
          <img :src="state.photoURL" />
        </div>
      </div>
    </div>
    <!-- div v-if="state.isLoggedin" class="flex-none">
      <button class="btn btn-square btn-ghost">
        <component :is="heart" class="inline-block w-6 h-6 mr-1 fill-current" />
      </button>
    </div-->
    <!-- div class="flex-none">
      <router-link class="btn btn-square btn-ghost" to="/" tag="button">
        <component :is="home" class="inline-block w-6 h-6 mr-1 fill-current" />
      </router-link>
    </div-->
    <!-- div v-if="state.isLoggedin" class="flex-none">
      <router-link class="btn btn-square btn-ghost" to="/setting" tag="button">
        <component :is="cog" class="inline-block w-6 h-6 mr-1 fill-current" />
      </router-link>
    </div-->
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useAuthStore } from '@/store/auth'
  import AtomsButton from '@/components/atoms/Button.vue'
  import home from '@/icons/home-solid.svg'
  import cog from '@/icons/cog-solid.svg'
  import heart from '@/icons/heart-solid.svg'
  import search from '@/icons/search-solid.svg'
  // import signOut from '@/icons/sign-out-alt-solid.svg'

  export interface Data {
    keyword: string | null
  }
  export default defineComponent({
    name: 'Header',
    components: { AtomsButton: AtomsButton },
    emits: ['search'],
    setup(props, { emit }) {
      const router = useRouter()
      const { state, getUser } = useAuthStore()
      const route = useRoute()
      const data = reactive<Data>({ keyword: null })
      const searchIndexesKeyword = async () => {
        console.log('push', {
          name: 'SearchKeyword',
          params: { keyword: data.keyword, id: getUser()?.uid },
        })
        await router.push({
          name: 'SearchKeyword',
          params: { id: getUser()?.uid, keyword: data.keyword },
        })
        emit('search', data.keyword)
        // firebase.functions().useEmulator('localhost', 5001)
        // const echo_onCall = firebase
        //   .functions()
        //   .httpsCallable('searchIndexesKeyword')
        // echo_onCall({ keyword: data.keyword }).then((result) =>
        //   alert(JSON.stringify(result))
        // )
      }
      onMounted(() => {
        data.keyword = route.params.keyword as string
        console.log('data.keyword', data.keyword)
      })
      return {
        state,
        // signout,
        search,
        heart,
        home,
        cog,
        // signOut,
        data,
        searchIndexesKeyword,
      }
    },
  })
</script>

<style scoped>
  .fixed-header {
    @apply fixed w-full shadow-lg navbar text-neutral-content;
  }
</style>
