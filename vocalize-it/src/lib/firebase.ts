import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC_1bNOsPFkSNqma6vSs38Ooc427SYjiLY",
  authDomain: "vocalize-it.firebaseapp.com",
  projectId: "vocalize-it",
  storageBucket: "vocalize-it.firebasestorage.app",
  messagingSenderId: "212768621561",
  appId: "1:212768621561:web:779373ce67773e0a9b328",
  measurementId: "G-YMFRYEFWBS",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Only add analytics later if you need it.
// Analytics can cause issues in Next.js server-side rendering.