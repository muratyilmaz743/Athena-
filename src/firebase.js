// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDlcAYr1NC-vLAe9ZUDib22kcVHvhSpcOA",

  authDomain: "athena-dms.firebaseapp.com",

  databaseURL: "https://athena-dms-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "athena-dms",

  storageBucket: "athena-dms.appspot.com",

  messagingSenderId: "192363895658",

  appId: "1:192363895658:web:e7ac32086bb4723a386313",

  measurementId: "G-DYVHNL6HGW"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;