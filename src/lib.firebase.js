import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase Web config (public-safe)
const firebaseConfig = {
  apiKey: "AIzaSyCwQDxDqbIkfA0Q8rcCGubpPdr13UZe-dA",
  authDomain: "surimart-759ea.firebaseapp.com",
  projectId: "surimart-759ea",
  storageBucket: "surimart-759ea.firebasestorage.app",
  messagingSenderId: "339888971473",
  appId: "1:339888971473:web:9aa97552a2bdbf624eeff0"
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
