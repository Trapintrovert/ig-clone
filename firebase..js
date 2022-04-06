import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBo3IiYTRFznC4ur2U1qeWCgdW-MveHg2g",
  authDomain: "rn-instagram-clone-live-761f8.firebaseapp.com",
  projectId: "rn-instagram-clone-live-761f8",
  storageBucket: "rn-instagram-clone-live-761f8.appspot.com",
  messagingSenderId: "187335224761",
  appId: "1:187335224761:web:f6efac6c195a018dc95a68"
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore()

module.exports = {firebase, db};