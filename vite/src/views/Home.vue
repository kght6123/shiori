<template>
  <Header />
  <Body class="min-h-screen hero">
    <div class="flex-col justify-center hero-content lg:flex-row">
      <div class="text-center lg:text-left">
        <h1 class="mb-5 text-5xl font-bold">栞</h1>
        <p class="mb-5">
          後で読みたいWebサイト（URL）を保存（ブックマーク）して、タグ付けやコメントで管理することができるサービスです。保存したWebサイトはログインユーザごとに公開されます。
        </p>
      </div>
      <div class="flex-shrink-0 w-full max-w-sm shadow-2xl card glass-dark">
        <div class="card-body">
          <div class="form-control">
            <label class="label label-text">メールアドレス</label>
            <input
              placeholder="shiori@kght6123.jp"
              class="input input-bordered"
              type="text"
            />
          </div>
          <div class="form-control">
            <label class="label label-text">パスワード</label>
            <input
              placeholder="パスワード"
              class="input input-bordered"
              type="password"
            />
            <label class="label">
              <a href="#" class="label-text-alt">パスワードを忘れたときは？</a>
            </label>
          </div>
          <div class="mt-2 form-control">
            <input type="button" value="Login" class="btn btn-primary" />
          </div>
          <div class="mt-4 form-control">
            <organisms-sign-in-and-sign-out-form />
          </div>
        </div>
      </div>
    </div>
  </Body>
  <Footer />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Header from '@/components/Header.vue'
  import Body from '@/components/Body.vue'
  import Footer from '@/components/Footer.vue'
  import OrganismsSignInAndSignOutForm from '@/components/organisms/SignInAndSignOutForm.vue'
  import { useAuthStore } from '@/store/auth'

  export default defineComponent({
    name: 'Home',
    components: {
      OrganismsSignInAndSignOutForm,
      Header: Header,
      Body: Body,
      Footer: Footer,
    },
    setup() {
      const guest = '{{ Guest }}'
      const { state } = useAuthStore()
      return { guest, state }
    },
  })
</script>
