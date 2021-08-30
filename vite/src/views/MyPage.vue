<template>
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
        {{ registList }}
        <div class="mt-2 form-control">
          <button type="button" class="btn btn-primary" @click="regist">
            とうろく
          </button>
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
