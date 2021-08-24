<template>
  <atoms-button v-if="state.isLoggedin" @click="signout()"
    >Sign out</atoms-button
  >
  <molcules-sign-in-with-google-button @click="signin()" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useAuthStore } from '@/store/auth'
  import AtomsButton from '@/components/atoms/Button.vue'
  import MolculesSignInWithGoogleButton from '@/components/molcules/SignInWithGoogleButton.vue'

  export default defineComponent({
    name: 'OrganismsSignInAndSignOutForm',
    components: {
      MolculesSignInWithGoogleButton,
      AtomsButton,
    },
    setup() {
      const { signout, state, signin } = useAuthStore()
      return {
        state,
        signout,
        signin,
      }
    },
  })
</script>
