//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCuFKFy95Rn-DYoXRiEQCjCHZ-HwrVG_xE",
  authDomain: "comp1800bby12.firebaseapp.com",
  projectId: "comp1800bby12",
  storageBucket: "comp1800bby12.appspot.com",
  messagingSenderId: "7475846884",
  appId: "1:7475846884:web:a731c979cda59cdb0c16f1"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
