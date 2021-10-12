<template>
  <Loading ref="loading" />
  <Header />
  <Body class="view">
    <h1>Setting</h1>
    <div class="updater">
      <label>displayName</label>
      <input v-model="displayName" type="text" />
    </div>
    <div class="updater">
      <label>photoURL</label>
      <input v-model="photoURL" type="text" />
    </div>
    <button @click="update()">Update</button>
  </Body>
  <Footer />
</template>

<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue'
  import Header from '@/components/Header.vue'
  import Body from '@/components/Body.vue'
  import Footer from '@/components/Footer.vue'
  import Loading from '@/components/Loading.vue'

  import { useAuthStore } from '@/store/auth'

  export default defineComponent({
    name: 'Setting',
    components: {
      Header: Header,
      Footer: Footer,
      Body: Body,
      Loading: Loading,
    },
    setup() {
      const loading = ref<InstanceType<typeof Loading>>()
      const { state, updateUser } = useAuthStore()
      const displayName = ref('')
      const photoURL = ref('')
      const update = () => {
        loading?.value?.start()
        updateUser({ displayName: displayName.value, photoURL: photoURL.value })
        loading?.value?.finish()
      }

      watchEffect(() => {
        displayName.value = state.displayName
        photoURL.value = state.photoURL
      })

      return { displayName, photoURL, update, loading }
    },
  })
</script>

<style scoped>
  .updater {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  label {
    flex: 1;
  }

  input {
    flex: 3;
  }

  button {
    float: right;
  }
</style>
