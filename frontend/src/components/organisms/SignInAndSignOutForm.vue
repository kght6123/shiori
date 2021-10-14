<template>
  <molcules-sign-in-with-google-button @click="onSignIn()" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter /*, useRoute*/ } from 'vue-router'
  import { useAuthStore } from '@/store/auth'
  import MolculesSignInWithGoogleButton from '@/components/molcules/SignInWithGoogleButton.vue'

  export default defineComponent({
    name: 'OrganismsSignInAndSignOutForm',
    components: {
      MolculesSignInWithGoogleButton: MolculesSignInWithGoogleButton,
    },
    setup() {
      const router = useRouter()
      // const route = useRoute()
      const { state, signin } = useAuthStore()
      const onSignIn = async () => {
        const result = await signin()
        if (result && result.user) {
          router.push({ name: 'MyPage', params: { id: result.user.uid } })
        }
      }
      return {
        state,
        onSignIn,
      }
    },
  })
</script>
