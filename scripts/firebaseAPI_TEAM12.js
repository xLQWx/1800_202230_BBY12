//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyCR6cSs7wI596YRIaT8CIgzknKgMXnhGiA",
  authDomain: "newcomp1800.firebaseapp.com",
  projectId: "newcomp1800",
  storageBucket: "newcomp1800.appspot.com",
  messagingSenderId: "877063493219",
  appId: "1:877063493219:web:96be842870562b8ba28a56"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
