import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/globalStyle.scss";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCm0LrhC1cJHcbIWn02VP8qsoXLWCUibQ",
  authDomain: "todo-6cee2.firebaseapp.com",
  projectId: "todo-6cee2",
  storageBucket: "todo-6cee2.appspot.com",
  messagingSenderId: "661751739738",
  appId: "1:661751739738:web:2a0365da5db9cc27acaf63",
  measurementId: "G-L61SYRWGGQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

createApp(App).use(store).use(router).mount("#app");
