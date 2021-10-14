<template>
  <div
    v-if="state.isLoggedin"
    class="z-20 py-4 fixed-footer artboard artboard-demo bg-transparent"
  >
    <ul
      class="px-3 shadow-lg menu rounded-box horizontal glass dark:glass-dark"
    >
      <li>
        <a @click="signout()">
          <component
            :is="signOut"
            class="inline-block w-6 h-6 fill-current"
          /><span class="mx-1 hidden md:inline">ログアウト</span>
        </a>
      </li>
      <li>
        <router-link to="/">
          <component
            :is="home"
            class="inline-block w-6 h-6 fill-current"
          /><span class="mx-1 hidden md:inline">ホーム</span>
        </router-link>
      </li>
      <li>
        <a @click="searchBookmarkList()">
          <component
            :is="list"
            class="inline-block w-6 h-6 fill-current"
          /><span class="mx-1 hidden md:inline">すべて</span>
        </a>
      </li>
      <li>
        <a @click="searchFavoriteOnly()">
          <component
            :is="heart"
            class="inline-block w-6 h-6 fill-current"
          /><span class="mx-1 hidden md:inline">お気に入りのみ</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useAuthStore } from '@/store/auth'
  import heart from '@/icons/heart-solid.svg'
  import home from '@/icons/home-solid.svg'
  import thumbtack from '@/icons/thumbtack-solid.svg'
  import tag from '@/icons/tag-solid.svg'
  import signOut from '@/icons/sign-out-alt-solid.svg'
  import list from '@/icons/list-solid.svg'

  export default defineComponent({
    name: 'FooterMenu',
    setup() {
      const router = useRouter()
      const { signout, state, getUser } = useAuthStore()
      // const route = useRoute()
      const searchFavoriteOnly = async () => {
        await router.push({
          name: 'FavoriteOnly',
          params: { id: getUser()?.uid },
        })
      }
      const searchBookmarkList = async () => {
        await router.push({ name: 'MyPage', params: { id: getUser()?.uid } })
      }
      return {
        state,
        signout,
        heart,
        home,
        thumbtack,
        tag,
        signOut,
        list,
        searchFavoriteOnly,
        searchBookmarkList,
      }
    },
  })
</script>

<style scoped>
  .fixed-footer {
    @apply fixed bottom-0 shadow-lg;
  }
</style>
