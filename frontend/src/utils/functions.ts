import firebase from 'firebase/app'
import 'firebase/functions'

export default {
  httpsCallable: async (
    name: string,
    data: unknown
  ): Promise<firebase.functions.HttpsCallableResult> => {
    console.log(`import.meta.env.MODE=${import.meta.env.MODE}`)
    console.log(
      `import.meta.env.VITE_USE_EMULATOR=${import.meta.env.VITE_USE_EMULATOR}`
    )
    if (import.meta.env.VITE_USE_EMULATOR === 'true') {
      console.log('useEmulator!!!')
      firebase.functions().useEmulator('localhost', 5001)
    }
    const echo_onCall = firebase
      .app()
      .functions('asia-northeast1')
      .httpsCallable(name)
    return await echo_onCall(data)
  },
}
