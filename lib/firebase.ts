import { getApps, initializeApp, FirebaseOptions } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
    apiKey: "SOME_API_KEY_HERE",
    authDomain: "nextjs-template.firebaseapp.com",
    projectId: "nextjs-template",
    storageBucket: "nextjs-template.appspot.com",
    messagingSenderId: "SOME_MESSAGING_SENDER_ID",
    appId: "SOME_APP_ID",
    measurementId: "SOME_MEASUREMENT_ID"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);