import firebase from 'firebase/app'
import 'firebase/auth'
import { inject, InjectionKey, reactive } from 'vue'

const authStore = () => {
  console.log('init authStore')
  const state = reactive({ isLoggedin: false, displayName: '', photoURL: '' })
  const setUser = (user: firebase.User | null) => {
    state.isLoggedin = !!user
    if (user) {
      state.displayName = user.displayName ?? ''
      state.photoURL = user.photoURL ?? ''
    }
  }
  const signin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    return await firebase.auth().signInWithPopup(provider)
  }
  const signout = () => {
    console.log('signOut!!!')
    firebase.auth().signOut()
  }
  const updateUser = (input: { displayName?: string; photoURL?: string }) => {
    firebase
      .auth()
      .currentUser?.updateProfile(input)
      .then(() => setUser(firebase.auth().currentUser))
  }
  const getUser = () => {
    return firebase.auth().currentUser
  }

  firebase.auth().onAuthStateChanged((user) => setUser(user))

  return {
    state,
    getUser,
    setUser,
    signin,
    signout,
    updateUser,
  }
}

export default authStore

export type AuthStore = ReturnType<typeof authStore>

export const authStoreKey: InjectionKey<AuthStore> = Symbol('authStore')

export const useAuthStore = () => {
  const store = inject(authStoreKey)
  if (!store) {
    throw new Error(`${authStoreKey} is not provided`)
  }
  return store
}
