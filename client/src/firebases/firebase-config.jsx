import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA92Qkj7hvWY2tjo_7sMcLpnzRbNm78UAs",
  authDomain: "social-media-ad8ff.firebaseapp.com",
  projectId: "social-media-ad8ff",
  storageBucket: "social-media-ad8ff.appspot.com",
  messagingSenderId: "533759974063",
  appId: "1:533759974063:web:23da81ac300f11322c925a",
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };
