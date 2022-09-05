import firebase from "firebase"

const firebaseConfig = {
  //place your firebase config here
  apiKey: "AIzaSyBW9v5u3jjkwJP6bAAcu35ikoJwNDEACY4",
  authDomain: "linkedinclone-a6de7.firebaseapp.com",
  projectId: "linkedinclone-a6de7",
  storageBucket: "linkedinclone-a6de7.appspot.com",
  messagingSenderId: "712523842453",
  appId: "1:712523842453:web:e76756cf3e1066cabeec9c"
};


//This special line of code here connects everything
const firebaseApp = firebase.initializeApp(firebaseConfig);

//gets the firestore database
const db = firebaseApp.firestore();

//we want to use firebase authentication
const auth = firebase.auth();
export { db, auth }