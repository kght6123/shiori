<template>
  <div class="view">
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
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue'
  import { useAuthStore } from '@/store/auth'

  export default defineComponent({
    name: 'Setting',
    setup() {
      const { state, updateUser } = useAuthStore()
      const displayName = ref('')
      const photoURL = ref('')
      const update = () =>
        updateUser({ displayName: displayName.value, photoURL: photoURL.value })

      watchEffect(() => {
        displayName.value = state.displayName
        photoURL.value = state.photoURL
      })

      return { displayName, photoURL, update }
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
