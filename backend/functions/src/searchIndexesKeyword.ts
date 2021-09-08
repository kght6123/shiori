/* eslint-disable object-curly-spacing */
import * as functions from 'firebase-functions'
import { db } from './firestore'

// https://github.com/azu/kuromojin
import { tokenize, getTokenizer } from 'kuromojin'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
getTokenizer().then((tokenizer) => {
  // kuromoji.js's `tokenizer` instance
  // console.log(tokenizer)
})

interface Header {
  ogImageUrl: string
  title: string
  url: string
  id: string
  favorite: boolean
  pinning: boolean
}

export const searchIndexesKeyword = functions
  .region('asia-northeast1')
  .runWith({
    memory: '512MB',
  })
  .https.onCall(async ({ keyword, limit = 30 }, context) => {
    // ensure #posts exists in the DOM.
    if (context.auth) {
      if (!keyword) return { status: 400 }
      const tokens = await tokenize(keyword)
      console.log(tokens)
      const searchWords = Array.from(
        new Set(tokens.map((token) => token.surface_form)), // 表層系だけの配列にする
      )
      // const searchWords = Array.from(new Set(segmenter.segment(keyword)))
      let query = db
        .collection('shiori-users')
        .doc(context.auth?.uid)
        .collection('indexes')
        .limit(limit)

      // titleとcontentは排他条件
      // searchWords.forEach((word) => {
      //   query = query.where(`content.${word}`, '==', 0)
      // })
      // console.log(searchWords)
      // searchWords.forEach((word) => {
      //   query = query.where(`title.${word}`, '==', 0)
      // })
      console.log(searchWords)
      searchWords.forEach((word) => {
        query = query.where(`${word}`, '==', 0)
      })

      const snap = await query.get()
      console.log(snap.size)
      const idList = snap.docs.map((doc) => doc.id)
      console.log(idList)
      const results = []
      for (const id of idList) {
        const headersDocRef = db
          .collection('shiori-users')
          .doc(context.auth?.uid)
          .collection('headers')
          .doc(id)
        const snapShot = await headersDocRef.get()
        console.log(snapShot.data())
        const data = snapShot.data()
        const {
          ogImageUrl,
          title,
          url,
          favorite = false,
          pinning = false,
        } = data as unknown as Header
        results.push({ ogImageUrl, title, url, favorite, pinning, id })
      }
      return { status: 200, results }
    }
    return { status: 500 }
  })
