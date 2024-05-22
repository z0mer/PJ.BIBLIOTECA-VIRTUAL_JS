// Import the functions you need from the SDKs you need
import firebase from "firebase";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo7Nqn33jvNf46uMhRjmtfMiR7nnf9GrE",
  authDomain: "biblioteca-virtual-9ec7f.firebaseapp.com",
  databaseURL: "https://biblioteca-virtual-9ec7f-default-rtdb.firebaseio.com",
  projectId: "biblioteca-virtual-9ec7f",
  storageBucket: "biblioteca-virtual-9ec7f.appspot.com",
  messagingSenderId: "1062722649404",
  appId: "1:1062722649404:web:7d30c955c0377d54357239",
  measurementId: "G-JFK5BKC1WQ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;