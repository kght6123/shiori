<template>
  <Header @search="search" />
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
          class="card bordered break-inside glass-dark"
        >
          <figure>
            <img :src="item.ogImageUrl" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              {{ item.title }}
              <div class="mx-2 badge badge-secondary">NEW</div>
            </h2>
            <a target="_blank" :href="item.url" class="link link-secondary">{{
              item.url
            }}</a>
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
                    class="inline-block w-10 h-10 fill-current"
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
                    class="inline-block w-10 h-10 fill-current"
                  />
                </button>
              </div>
              <button class="btn btn-secondary">More info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Body>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import Header from '@/components/Header.vue'
  import Body from '@/components/Body.vue'
  import heart from '@/icons/heart-solid.svg'
  import thumbtack from '@/icons/thumbtack-solid.svg'
  import firebase from 'firebase/app'
  import 'firebase/functions'

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
    },
    setup() {
      const route = useRoute()
      const searchList: Array<ShioriHeader> = reactive([])
      const search = async (keyword: string) => {
        console.log('search', keyword)
        const value = {
          keyword,
        }
        firebase.functions().useEmulator('localhost', 5001)
        const echo_onCall = firebase
          .functions()
          .httpsCallable('searchIndexesKeyword')
        echo_onCall(value).then((result) => {
          // alert(JSON.stringify(result.data.results))
          searchList.splice(0)
          console.log(result.data.results)
          ;(result.data.results as Array<ShioriHeader>).forEach((header) => {
            searchList.push(header)
          })
        })
      }
      onMounted(() => {
        const keyword = route.params.keyword as string
        console.log('keyword', keyword)
        search(keyword)
      })
      const updateFavorite = async (
        id: string,
        favorite = true,
        index: number
      ) => {
        // HTTP呼び出し
        firebase.functions().useEmulator('localhost', 5001)
        const result = await firebase
          .functions()
          .httpsCallable('updateFavorite')({ id, favorite: !favorite })
        alert(JSON.stringify(result))
        searchList[index].favorite = !favorite
      }
      const updatPinning = async (
        id: string,
        pinning = true,
        index: number
      ) => {
        // HTTP呼び出し
        firebase.functions().useEmulator('localhost', 5001)
        const result = await firebase.functions().httpsCallable('updatPinning')(
          { id, pinning: !pinning }
        )
        alert(JSON.stringify(result))
        searchList[index].pinning = !pinning
      }
      return {
        search,
        searchList,
        heart,
        thumbtack,
        updateFavorite,
        updatPinning,
      }
    },
  })
</script>
