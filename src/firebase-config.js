import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsC6tV30HzPSXK24qoPSQoo6SEzKVDtIQ",
  authDomain: "firebasics-d510c.firebaseapp.com",
  projectId: "firebasics-d510c",
  storageBucket: "firebasics-d510c.appspot.com",
  messagingSenderId: "47043386430",
  appId: "1:47043386430:web:04d5f38cc9c6ab3f75c56f",
  measurementId: "G-ZF7RM9DQ82"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);