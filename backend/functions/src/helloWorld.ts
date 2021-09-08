/* eslint-disable object-curly-spacing */
import * as functions from 'firebase-functions'
import { db } from './firestore'
// import { RuntimeOptions } from 'firebase-functions'
import admin = require('firebase-admin')
import path = require('path')

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
import * as playwright from 'playwright-aws-lambda'

// https://github.com/azu/kuromojin
import { tokenize, getTokenizer } from 'kuromojin'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
getTokenizer().then((tokenizer) => {
  // kuromoji.js's `tokenizer` instance
  // console.log(tokenizer)
})

// eslint-disable-next-line @typescript-eslint/no-var-requires
const read = require('node-readability')

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const TinySegmenter = require('./tiny_segmenter-0.2.js')

// admin.initializeApp(functions.config().firebase)
// const db = admin.firestore()

// const segmenter = new TinySegmenter()

export const helloWorld = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 300,
    memory: '1GB',
  })
  .https.onCall(async ({ url }, context) => {
    // ensure #posts exists in the DOM.
    if (context.auth) {
      // console.log('context.auth.uid: ' + context.auth.uid)
      // const url =
      //   'https://kght6123.page/posts/Re:VIEW/IBM%20Plex%20Sans%20JP%20を%20Re:VIEW%20に導入してみた/'
      // console.log('data: ' + JSON.stringify(data))
      // console.log('context.auth: ' + JSON.stringify(context.auth))
      const browser = await playwright.launchChromium({
        args: ['--ignore-certificate-errors', '--lang=ja,en-US,en'],
      })
      const page = await browser.newPage()
      // Googleアナリティクスをブロック
      await page.route(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (url) => {
          const blocklist = [
            'www.google-analytics.com',
            '/gtag/js',
            'ga.js',
            'analytics.js',
          ]
          // console.log(`url=${url}`)
          if (blocklist.find((regex) => url.toString().match(regex))) {
            console.log(`yes`)
            return true
          } else {
            console.log(`no`)
            return false
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (route) => route.abort(),
      )
      // ドキュメントとスクリプト、Ajax、Fetch、CSS のみ許可する
      await page.route(
        () => true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (route, req) => {
          const allowlist = ['document', 'script', 'xhr', 'fetch', 'stylesheet']
          if (!allowlist.includes(req.resourceType())) {
            route.abort()
          } else {
            route.continue()
          }
        },
      )
      const urlObj = new URL(url)
      await page.goto(urlObj.href) // { waitUntil: 'networkidle0' }
      // 仮で入れる
      // await page.waitForNavigation({waitUntil: ['load', 'networkidle']});
      // https://playwright.dev/docs/next/api/class-page#pagewaitforloadstatestate-options
      await page.waitForLoadState('domcontentloaded')
      // og:imageタグを取得
      const metaOgImage = await page.$(`meta[property='og:image']`)
      const metaOgImageUrl = await metaOgImage?.getAttribute('content')
      let ogImageUrl = null
      if (path.isAbsolute(metaOgImageUrl as string)) {
        ogImageUrl = new URL(metaOgImageUrl as string, urlObj.origin).href
      } else {
        ogImageUrl = metaOgImageUrl
      }
      console.log(ogImageUrl)
      // data.metaTags = metaTags
      // ページコンテンツを取得
      const html = await page.content()
      const readResult = (await new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        read(html, (err: any, article: any) => {
          // Main Article
          // console.log(article.content)
          // Title
          // console.log(article.title)
          // HTML Source Code
          // console.log(article.html)
          // DOM
          // console.log(article.document)
          // Response Object from Request Lib
          // console.log(meta)
          tokenize(
            // HTMLタグを取り除いた、タイトル＋コンテンツにする
            article.title +
              '。' +
              article.content.replace(/<[^>]+>/g, '').replace(/\n/g, ' '),
          ).then((tokens) => {
            console.log(tokens)
            /*
                word_id: 509800,          // 辞書内での単語ID
                word_type: 'KNOWN',       // 単語タイプ
                (辞書に登録されている単語ならKNOWN, 未知語ならUNKNOWN)
                word_position: 1,         // 単語の開始位置
                surface_form: '黒文字',    // 表層形
                pos: '名詞',               // 品詞
                pos_detail_1: '一般',      // 品詞細分類1
                pos_detail_2: '*',        // 品詞細分類2
                pos_detail_3: '*',        // 品詞細分類3
                conjugated_type: '*',     // 活用型
                conjugated_form: '*',     // 活用形
                basic_form: '黒文字',      // 基本形
                reading: 'クロモジ',       // 読み
                pronunciation: 'クロモジ'  // 発音
            */
            const index = Array.from(
              // 表層系と読みだけの配列にする
              new Set(
                tokens
                  .map((token) => token.surface_form)
                  .concat(tokens.map((token) => token.reading)),
              ),
            ).reduce(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (acc, curr) => (((acc as any)[curr as any] = 0), acc),
              {},
            )
            // Resolve
            resolve({
              title: article.title,
              content: article.content,
              index: index,
              // index: {
              //   title: Array.from(
              //     new Set(segmenter.segment(article.title)),
              //   ).reduce(
              //     // https://firebase.google.com/docs/firestore/solutions/index-map-field
              //  // eslint-disable-next-line @typescript-eslint/no-explicit-any
              //     (acc, curr) => (((acc as any)[curr as any] = 0), acc),
              //     {},
              //   ),
              //   content: Array.from(
              //     new Set(
              //       segmenter.segment(
              //         article.content
              //           .replace(/<[^>]+>/g, '')
              //           .replace(/\n/g, ' '),
              //       ),
              //     ),
              //   ).reduce(
              //  // eslint-disable-next-line @typescript-eslint/no-explicit-any
              //     (acc, curr) => (((acc as any)[curr as any] = 0), acc),
              //     {},
              //   ),
              // },
            })
            // Close article to clean up jsdom and prevent leaks
            article.close()
          })
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any
      // data.html = readResult
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
        title: readResult.title,
        ogImageUrl,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      } as Header)
      const indexesRef = db
        .collection('shiori-users')
        .doc(context.auth?.uid)
        .collection('indexes')
        .doc(headersRef.id)
      await indexesRef.set(readResult.index)
      const detailsRef = db
        .collection('shiori-users')
        .doc(context.auth?.uid)
        .collection('details')
        .doc(headersRef.id)
      await detailsRef.set({
        content: readResult.content,
      })
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
