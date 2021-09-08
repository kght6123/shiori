import firebase from 'firebase/app'
import 'firebase/functions'

export default {
  httpsCallable: async (
    name: string,
    data: unknown
  ): Promise<firebase.functions.HttpsCallableResult> => {
    if (import.meta.env.VITE_USE_EMULATOR === 'true')
      firebase.functions().useEmulator('localhost', 5001)
    const echo_onCall = firebase
      .app()
      .functions('asia-northeast1')
      .httpsCallable(name)
    return await echo_onCall(data)
  },
}
