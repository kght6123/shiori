/* eslint-disable object-curly-spacing */
import * as functions from 'firebase-functions'
import { db } from './firestore'

export const updatPinning = functions
  .region('asia-northeast1')
  .https.onCall(async ({ pinning = true, id = null }, context) => {
    // ensure #posts exists in the DOM.
    if (context.auth && id !== null) {
      await db
        .collection('shiori-users')
        .doc(context.auth?.uid)
        .collection('headers')
        .doc(id)
        .update({
          pinning,
        })
      return { status: 200 }
    }
    return { status: 500 }
  })
