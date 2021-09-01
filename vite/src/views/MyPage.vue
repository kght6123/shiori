<template>
  <div>
    <div class="min-h-screen hero">
      <div class="flex-shrink-0 w-full max-w-sm shadow-2xl card glass-dark">
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
      <div class="mt-72 hero">
        <div class="btn-group">
          <button class="btn btn-active">お気に入り</button>
          <button class="btn">たぐ1</button>
          <button class="btn">たぐ2</button>
          <button class="btn">
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
          v-for="item in registList"
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
            <div class="justify-end card-actions">
              <button class="btn btn-secondary">More info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  window.global = window
  import { defineComponent, reactive } from 'vue'
  import firebase from 'firebase/app'
  import 'firebase/functions'

  interface Header {
    ogImageUrl: string
    title: string
    url: string
  }
  export interface State {
    url: string | null
  }
  export default defineComponent({
    name: 'MyPage',
    components: {},
    setup() {
      const state = reactive<State>({ url: null })
      const regist = async () => {
        console.log(state.url)
        // const response = await fetch(state.url, {
        //   // method: 'GET',
        //   // mode: 'no-cors',
        //   // headers: {
        //   //   'Content-Type': 'text/html',
        //   // },
        // })
        // const text = await response.text()
        // console.log(text)
        const value = {
          url: state.url,
        }
        // HTTP呼び出し
        firebase.functions().useEmulator('localhost', 5001)
        const echo_onCall = firebase.functions().httpsCallable('helloWorld')
        echo_onCall(value).then((result) => alert(JSON.stringify(result)))
      }
      const registList: Array<Header> = reactive([])
      const searchCreateAtDesc = () => {
        // HTTP呼び出し
        firebase.functions().useEmulator('localhost', 5001)
        const echo_onCall = firebase
          .functions()
          .httpsCallable('searchCreateAtDesc')
        echo_onCall({ limit: 30 }).then((result) => {
          // alert(JSON.stringify(result.data.results))
          ;(result.data.results as Array<Header>).forEach((header) => {
            registList.push(header)
          })
        })
      }
      searchCreateAtDesc()
      return { state, regist, registList }
    },
  })
</script>
