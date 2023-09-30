import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlNG-bgiezAnpcZyro90V3odkZ2XowXSU",
  authDomain: "scrapie-85d87.firebaseapp.com",
  projectId: "scrapie-85d87",
  storageBucket: "scrapie-85d87.appspot.com",
  messagingSenderId: "92530576790",
  appId: "1:92530576790:web:53b0af7a2afd1583b721b7",
  measurementId: "G-KPV0GF3HHE",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
