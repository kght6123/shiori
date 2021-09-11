/* eslint-disable object-curly-spacing */
import * as functions from 'firebase-functions'
import { db } from './firestore'
import admin = require('firebase-admin')

export const helloWorld = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 60,
    memory: '256MB',
  })
  .https.onCall(async ({ url }, context) => {
    // ensure #posts exists in the DOM.
    if (context.auth) {
      // firestoreに保存
      const headersRef = db
        .collection('shiori-users')
        .doc(context.auth?.uid)
        .collection('headers')
        .doc()
      await headersRef.set({
        id: headersRef.id,
        favorite: false,
        pinning: false,
        url,
        title: '読み込み中・・・',
        ogImageUrl:
          'http://placehold.jp/80/444444/ffffff/630x400.png?text=Loading...',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      } as Header)
      return { status: 200 }
    }
    return { status: 500 }
  })

interface Header {
  ogImageUrl: string
  title: string
  url: string
  id: string
  favorite: boolean
  pinning: boolean
}
