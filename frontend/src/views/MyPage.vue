<template>
  <Loading ref="loading" />
  <Header />
  <Body>
    <div class="min-h-screen hero">
      <div
        class="flex-shrink-0 w-full max-w-sm shadow-2xl  card glass dark:glass-dark"
      >
        <div class="card-body">
          <div class="form-control">
            <label class="label label-text">URL</label>
            <input
              v-model="state.url"
              placeholder="https://kght6123.page/"
              class="input input-bordered"
              type="text"
            />
          </div>
          <div class="mt-2 form-control">
            <button type="button" class="btn btn-primary" @click="regist">
              とうろく
            </button>
          </div>
        </div>
      </div>
      <div class="z-10 mt-72 hero">
        <div class="shadow-2xl btn-group">
          <button class="shadow-2xl btn btn-active" @click="searchFavoriteOnly">
            <component
              :is="heart"
              class="inline-block w-6 h-6 mr-1 fill-current"
            />お気に入りのみ
          </button>
          <!-- TODO: タグ検索用の拡張用
          <button class="btn btn-ghost glass dark:glass-dark">
            <component
              :is="tag"
              class="inline-block w-6 h-6 mr-1 fill-current"
            />たぐ1
          </button>
          <button class="btn btn-ghost glass dark:glass-dark">
            <component
              :is="tag"
              class="inline-block w-6 h-6 mr-1 fill-current"
            />たぐ2
          </button>
          <button class="btn btn-ghost glass dark:glass-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-4 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
          -->
        </div>
      </div>
    </div>
    <div
      class="
        -mt-36
        sm:-mt-64
        md:-mt-28
        lg:-mt-56
        xl:-mt-52
        2xl:-mt-80
        hero
        min-h-[24rem]
        pb-48
      "
    >
      <div
        class="
          w-11/12
          max-w-[100vw]
          sm:masonry-2-col
          md:masonry-2-col
          lg:masonry-3-col
          xl:masonry-4-col
          2xl:masonry-5-col
          before:box-inherit
          after:box-inherit
          space-y-4
        "
      >
        <div
          v-for="(item, index) in registList"
          :key="item.url"
          class="card break-inside glass dark:glass-dark"
        >
          <figure class="hidden md:inline">
            <img :src="item.ogImageUrl" />
          </figure>
          <div class="card-body">
            <h2 class="text-base card-title">
              {{ item.title }}
              <div class="mx-2 text-xs badge badge-secondary">NEW</div>
            </h2>
            <a
              target="_blank"
              :href="item.url"
              class="text-sm truncate link link-secondary"
              >{{ item.url }}</a
            >
            <div class="justify-between card-actions">
              <div>
                <button
                  class="btn btn-square btn-ghost"
                  @click="updateFavorite(item.id, item.favorite, index)"
                >
                  <component
                    :is="heart"
                    :class="{
                      'text-pink-500': item.favorite,
                      'text-gray-300': !item.favorite,
                    }"
                    class="inline-block w-8 h-8 fill-current"
                  />
                </button>
                <button
                  class="btn btn-square btn-ghost"
                  @click="updatPinning(item.id, item.pinning, index)"
                >
                  <component
                    :is="thumbtack"
                    :class="{
                      'text-pink-500': item.pinning,
                      'text-gray-300': !item.pinning,
                    }"
                    class="inline-block w-8 h-8 fill-current"
                  />
                </button>
              </div>
              <button class="text-xs btn btn-secondary">More info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Body>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/store/auth'
  import Header from '@/components/Header.vue'
  import Body from '@/components/Body.vue'
  import Loading from '@/components/Loading.vue'
  import heart from '@/icons/heart-solid.svg'
  import thumbtack from '@/icons/thumbtack-solid.svg'
  import tag from '@/icons/tag-solid.svg'
  import functions from '@/utils/functions'

  interface ShioriHeader {
    ogImageUrl: string
    title: string
    url: string
    id: string
    favorite: boolean
    pinning: boolean
  }
  export interface State {
    url: string | null
  }
  export default defineComponent({
    name: 'MyPage',
    components: {
      Header: Header,
      Body: Body,
      Loading: Loading,
    },
    setup() {
      const loading = ref<InstanceType<typeof Loading>>()
      const state = reactive<State>({ url: null })
      const router = useRouter()
      const { getUser } = useAuthStore()
      const regist = async () => {
        loading?.value?.start()
        console.log(state.url)
        const value = {
          url: state.url,
        }
        const result = functions.httpsCallable('helloWorld', value)
        alert(
          `とうろく完了しました。\nタイトルや画像の表示、キーワード検索が出来るようになるまで、時間がかかることがあります。\n${JSON.stringify(
            result
          )}`
        )
        loading?.value?.finish()
      }
      const registList: Array<ShioriHeader> = reactive([])
      const searchCreateAtDesc = async () => {
        loading?.value?.start()
        const result = await functions.httpsCallable('searchCreateAtDesc', {
          limit: 30,
        })
        const results = result.data.results as Array<ShioriHeader>
        results.forEach((header) => {
          registList.push(header)
        })
        loading?.value?.finish()
      }
      const updateFavorite = async (
        id: string,
        favorite = true,
        index: number
      ) => {
        loading?.value?.start()
        const result = await functions.httpsCallable('updateFavorite', {
          id,
          favorite: !favorite,
        })
        alert(JSON.stringify(result))
        registList[index].favorite = !favorite
        loading?.value?.finish()
      }
      const updatPinning = async (
        id: string,
        pinning = true,
        index: number
      ) => {
        loading?.value?.start()
        const result = await functions.httpsCallable('updatPinning', {
          id,
          pinning: !pinning,
        })
        alert(JSON.stringify(result))
        registList[index].pinning = !pinning
        loading?.value?.finish()
      }
      const searchFavoriteOnly = async () => {
        await router.push({
          name: 'FavoriteOnly',
          params: { id: getUser()?.uid },
        })
      }
      onMounted(() => {
        searchCreateAtDesc()
      })
      return {
        state,
        regist,
        registList,
        heart,
        thumbtack,
        tag,
        updateFavorite,
        updatPinning,
        searchFavoriteOnly,
        loading,
      }
    },
  })
</script>
