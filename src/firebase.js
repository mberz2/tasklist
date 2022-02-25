import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9D4SbVqhKrtMAglIXQsSKIYMM1R4WV4s",
  authDomain: "tasklist-w22.firebaseapp.com",
  projectId: "tasklist-w22",
  storageBucket: "tasklist-w22.appspot.com",
  messagingSenderId: "898319696733",
  appId: "1:898319696733:web:f383075d112c2014379eb4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

//export const boardRef = doc(db, "boards");
export const boardsRef = collection(db, "boards");
export const listsRef = collection(db, "lists");
export const cardsRef = collection(db, "cards");
