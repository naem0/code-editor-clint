// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJa1S2Q-LjnEFnCh8N3yVSlh9l8TmEuZM",
  authDomain: "realtime-code-editor-7a7ad.firebaseapp.com",
  projectId: "realtime-code-editor-7a7ad",
  storageBucket: "realtime-code-editor-7a7ad.appspot.com",
  messagingSenderId: "270827497663",
  appId: "1:270827497663:web:e159ac2567c27a856ebe0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;