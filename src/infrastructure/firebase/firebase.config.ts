import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAjVTZIHste8CyoOmDYCYQg4R4TcMnCYRk",
    authDomain: "comtrin-pwa-fase3-final.firebaseapp.com",
    projectId: "comtrin-pwa-fase3-final",
    storageBucket: "comtrin-pwa-fase3-final.firebasestorage.app",
    messagingSenderId: "912245890452",
    appId: "1:912245890452:web:4bec7c6dc5d7fbff1c8381"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);