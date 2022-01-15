import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDpgwmrwyStgYDrLhKZ6-SLdnVF21O5M3I",
  authDomain: "finances-6ef5f.firebaseapp.com",
  projectId: "finances-6ef5f",
  storageBucket: "finances-6ef5f.appspot.com",
  messagingSenderId: "815372894177",
  appId: "1:815372894177:web:db2fe2b99aa99adbbc1ca0"
};

const app = initializeApp(firebaseConfig);

export default app;