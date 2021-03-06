import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3W5OBj1LXByH2zyzp4JB_XQCSDxCkc-M",
  authDomain: "must-watch-67d82.firebaseapp.com",
  projectId: "must-watch-67d82",
  storageBucket: "must-watch-67d82.appspot.com",
  messagingSenderId: "328745516915",
  appId: "1:328745516915:web:5308c15244696a4b1ecf06"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;