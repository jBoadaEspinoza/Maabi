import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Importa la función getStorage
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase de tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyABmL2FLcMfZhBzIdMGuI9I7IY4GgMraOo",
  authDomain: "gestionafacil-75f28.firebaseapp.com",
  projectId: "gestionafacil-75f28",
  storageBucket: "gestionafacil-75f28.appspot.com",
  messagingSenderId: "804972187576",
  appId: "1:804972187576:web:890a58ce4c1ce0b176494d",
  measurementId: "G-RN7J0ZJ123"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const firestore = getFirestore(app);

// Inicializar Firebase Storage
const storage = getStorage(app);

// Inicializar Analytics solo si está disponible y el objeto window está definido
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, firestore, storage, analytics };
