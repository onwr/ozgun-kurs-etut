import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy0jd8vzvb9525vr2CvteUKvqcSj_pa8A",
  authDomain: "ozgunislem.firebaseapp.com",
  projectId: "ozgunislem",
  storageBucket: "ozgunislem.appspot.com",
  messagingSenderId: "887715769689",
  appId: "1:887715769689:web:09ad8f5addea9883bfb048",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
