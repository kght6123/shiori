<template>
  <Loading ref="loading" />
  <Header />
  <Body>
    <div class="min-h-screen pt-20 hero">
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
          v-for="(item, index) in searchList"
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
  <OrganismsFooterMenu />
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, onMounted } from 'vue'
  import functions from '@/utils/functions'
  import Header from '@/components/Header.vue'
  import Body from '@/components/Body.vue'
  import Loading from '@/components/Loading.vue'
  import OrganismsFooterMenu from '@/components/organisms/FooterMenu.vue'
  import heart from '@/icons/heart-solid.svg'
  import thumbtack from '@/icons/thumbtack-solid.svg'

  interface ShioriHeader {
    ogImageUrl: string
    title: string
    url: string
    id: string
    favorite: boolean
    pinning: boolean
  }
  export interface State {
    keyword: string | null
  }
  export default defineComponent({
    name: 'MyPage',
    components: {
      Header: Header,
      Body: Body,
      Loading: Loading,
      OrganismsFooterMenu: OrganismsFooterMenu,
    },
    setup() {
      const loading = ref<InstanceType<typeof Loading>>()
      const searchList: Array<ShioriHeader> = reactive([])
      const search = async () => {
        // HTTP呼び出し
        loading?.value?.start()
        const result = await functions.httpsCallable(
          'searchCreateAtDescFavoriteOnly',
          { limit: 30 }
        )
        const results = result.data.results as Array<ShioriHeader>
        results.forEach((header) => {
          searchList.push(header)
        })
        loading?.value?.finish()
      }
      onMounted(() => {
        search()
      })
      const updateFavorite = async (
        id: string,
        favorite = true,
        index: number
      ) => {
        loading?.value?.start()
        // HTTP呼び出し
        // firebase.functions().useEmulator('localhost', 5001)
        const result = await functions.httpsCallable('updateFavorite', {
          id,
          favorite: !favorite,
        })
        alert(JSON.stringify(result))
        searchList[index].favorite = !favorite
        loading?.value?.finish()
      }
      const updatPinning = async (
        id: string,
        pinning = true,
        index: number
      ) => {
        loading?.value?.start()
        // HTTP呼び出し
        // firebase.functions().useEmulator('localhost', 5001)
        const result = await functions.httpsCallable('updatPinning', {
          id,
          pinning: !pinning,
        })
        alert(JSON.stringify(result))
        searchList[index].pinning = !pinning
        loading?.value?.finish()
      }
      return {
        search,
        searchList,
        heart,
        thumbtack,
        updateFavorite,
        updatPinning,
        loading,
      }
    },
  })
</script>
