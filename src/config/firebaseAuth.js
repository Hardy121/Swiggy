
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD0ADRZHWYWgZoumjyKZukEtndl9hAqJbQ",
  authDomain: "swiggy-project-ee8b2.firebaseapp.com",
  projectId: "swiggy-project-ee8b2",
  storageBucket: "swiggy-project-ee8b2.appspot.com",
  messagingSenderId: "579888749123",
  appId: "1:579888749123:web:5e4fa5862cb5e7f28bd2f6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}