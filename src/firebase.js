import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfJnTm8xNmRxNvs0MSN2To7brOmW3weKI",
    authDomain: "whatsapp-clone-2c79f.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-2c79f.firebaseio.com",
    projectId: "whatsapp-clone-2c79f",
    storageBucket: "whatsapp-clone-2c79f.appspot.com",
    messagingSenderId: "578683310551",
    appId: "1:578683310551:web:a5ea95a76e422054cbfb92",
    measurementId: "G-TS8BKXHGZ3",
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth = firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;
   