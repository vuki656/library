import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
})

export const firebase = getFirestore(app)
