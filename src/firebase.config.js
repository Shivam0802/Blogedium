import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "blogsphere-93d6d.firebaseapp.com",
  projectId: "blogsphere-93d6d",
  storageBucket: "blogsphere-93d6d.appspot.com",
  messagingSenderId: "598158810998",
  appId: "1:598158810998:web:26c0b3a75478f99ebda457"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };

