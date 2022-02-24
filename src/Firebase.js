//import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9D4SbVqhKrtMAglIXQsSKIYMM1R4WV4s",
  authDomain: "tasklist-w22.firebaseapp.com",
  projectId: "tasklist-w22",
  storageBucket: "tasklist-w22.appspot.com",
  messagingSenderId: "898319696733",
  appId: "1:898319696733:web:f383075d112c2014379eb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const db = getDatabase(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db };

export const boardsRef = collection(db, "boards");

//const boardsRef = db.collection("boards");
//const listsRef = db.collection("lists");
//const cardsRef = db.collection("cards");

//export { boardsRef, listsRef, cardsRef };
