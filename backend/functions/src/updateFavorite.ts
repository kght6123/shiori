/* eslint-disable object-curly-spacing */
import * as functions from 'firebase-functions'
import { db } from './firestore'

export const updateFavorite = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 60,
    memory: '128MB',
  })
  .https.onCall(async ({ favorite = true, id = null }, context) => {
    // ensure #posts exists in the DOM.
    if (context.auth && id !== null) {
      await db
        .collection('shiori-users')
        .doc(context.auth?.uid)
        .collection('headers')
        .doc(id)
        .update({
          favorite,
        })
      return { status: 200 }
    }
    return { status: 500 }
  })
