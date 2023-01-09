import type { FirebaseOptions } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
    collection,
    getFirestore,
} from 'firebase/firestore'

export const firebaseConifg: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
}

const app = initializeApp(firebaseConifg)

export const database = getFirestore(app)
export const auth = getAuth()

export enum COLLECTION_NAMES {
    employees = 'employees'
}

export const COLLECTIONS = {
    employees: collection(database, COLLECTION_NAMES.employees),
}
