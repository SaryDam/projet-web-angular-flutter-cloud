import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyC73EMcuLUntRJpVBFWNV_PkSWHzcnII5w",
  authDomain: "projet-angular-flutter-web.firebaseapp.com",
  projectId: "projet-angular-flutter-web",
  storageBucket: "projet-angular-flutter-web.firebasestorage.app",
  messagingSenderId: "13961874557",
  appId: "1:13961874557:web:bc45a5999d27f616a7f514",
  measurementId: "G-6TEMP460BV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
