/* eslint-disable object-curly-spacing */
import * as functions from 'firebase-functions'
import { db } from './firestore'

interface Header {
  ogImageUrl: string
  title: string
  url: string
  id: string
  favorite: boolean
  pinning: boolean
}

export const searchCreateAtDescFavoriteOnly = functions
  .region('asia-northeast1')
  .runWith({
    memory: '512MB',
  })
  .https.onCall(async ({ limit = 30 }, context) => {
    // ensure #posts exists in the DOM.
    if (context.auth) {
      const query = db
        .collection('shiori-users')
        .doc(context.auth?.uid)
        .collection('headers')
        .where('favorite', '==', true)
        .orderBy('pinning', 'desc')
        .orderBy('createdAt', 'desc')
        .limit(limit)
      const snap = await query.get()
      const results = snap.docs.map((doc) => {
        const {
          ogImageUrl,
          title,
          url,
          favorite = false,
          pinning = false,
        } = doc.data() as unknown as Header
        return { ogImageUrl, title, url, favorite, pinning, id: doc.id }
      })
      return { status: 200, results }
    }
    return { status: 500 }
  })
