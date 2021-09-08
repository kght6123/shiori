/* eslint-disable object-curly-spacing */
import * as functions from 'firebase-functions'
import admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)
export const db = admin.firestore()
