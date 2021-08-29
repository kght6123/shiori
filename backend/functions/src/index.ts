/* eslint-disable object-curly-spacing */
import * as functions from 'firebase-functions'
import { RuntimeOptions } from 'firebase-functions'
import admin = require('firebase-admin')
import path = require('path')

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
import { chromium } from 'playwright-chromium'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const read = require('node-readability')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const TinySegmenter = require('./tiny_segmenter-0.2.js')

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

const segmenter = new TinySegmenter()

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 300,
  memory: '1GB',
}

export const helloWorld = functions
  .runWith(runtimeOpts)
  .https.onCall(async (data, context) => {
    // ensure #posts exists in the DOM.
    if (context.auth) {
      // console.log('context.auth.uid: ' + context.auth.uid)
      const url =
        'https://kght6123.page/posts/Re:VIEW/IBM%20Plex%20Sans%20JP%20を%20Re:VIEW%20に導入してみた/'
      // console.log('data: ' + JSON.stringify(data))
      // console.log('context.auth: ' + JSON.stringify(context.auth))
      const browser = await chromium.launch({
        args: ['--ignore-certificate-errors', '--lang=ja,en-US,en'],
      })
      const page = await browser.newPage()
      // Googleアナリティクスをブロック
      await page.route(
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
        (route) => route.abort(),
      )
      // ドキュメントとスクリプト、Ajax、Fetch、CSS のみ許可する
      await page.route(
        () => true,
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
      await page.waitForLoadState('networkidle')
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
      const readResult = await new Promise((resolve) => {
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
          // Resolve
          resolve({
            title: article.title,
            content: article.content,
            index: {
              title: Array.from(
                new Set(segmenter.segment(article.title)),
              ).reduce(
                // https://firebase.google.com/docs/firestore/solutions/index-map-field
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (acc, curr) => (((acc as any)[curr as any] = 0), acc),
                {},
              ),
              content: Array.from(
                new Set(
                  segmenter.segment(
                    article.content.replace(/<[^>]+>/g, '').replace(/\n/g, ' '),
                  ),
                ),
              ).reduce(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (acc, curr) => (((acc as any)[curr as any] = 0), acc),
                {},
              ),
            },
          })
          // Close article to clean up jsdom and prevent leaks
          article.close()
        })
      })
      data.html = readResult
      // firestoreに保存
      const headersRef = db
        .collection('shiori-users')
        .doc(context.auth?.uid)
        .collection('headers')
        .doc()
      await headersRef.set({
        url,
        title: data.html.title,
        ogImageUrl,
      })
      const indexesRef = db
        .collection('shiori-users')
        .doc(context.auth?.uid)
        .collection('indexes')
        .doc(headersRef.id)
      await indexesRef.set(data.html.index)
      const detailsRef = db
        .collection('shiori-users')
        .doc(context.auth?.uid)
        .collection('details')
        .doc(headersRef.id)
      await detailsRef.set({
        content: data.html.content,
      })
      return { status: 200 }
    }
    return { status: 500 }
  })
