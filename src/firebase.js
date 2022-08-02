import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import{ getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnVnJKBZSngE7pLp6xS2jI3hADnmxrlT4",
  authDomain: "my-ecommerce-c6160.firebaseapp.com",
  projectId: "my-ecommerce-c6160",
  storageBucket: "my-ecommerce-c6160.appspot.com",
  messagingSenderId: "526832316231",
  appId: "1:526832316231:web:11437a315241bc4920a662"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;