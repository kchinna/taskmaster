import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6drXkXYzdQWr1ULc2ISndeYdMUj9sdMg",
  authDomain: "taskmaster-a4c01.firebaseapp.com",
  projectId: "taskmaster-a4c01",
  storageBucket: "taskmaster-a4c01.appspot.com",
  messagingSenderId: "210427615752",
  appId: "1:210427615752:web:77544dd1972d5f5e80cfbd",
  measurementId: "G-LFNLR82430",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
