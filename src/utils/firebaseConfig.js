// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'

// import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "link-in-bio-ce121.firebaseapp.com",
  projectId: "link-in-bio-ce121",
  storageBucket: "link-in-bio-ce121.appspot.com",
  messagingSenderId: "190933485466",
  appId: "1:190933485466:web:56a34b5c7c833d30ccdc23",
  measurementId: "G-XRH6TH6W61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore()

export { auth, db, app }

// Initialize the FirebaseUI Widget using Firebase

// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// var uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//     },
//     uiShown: function() {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none';
//     }
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   signInSuccessUrl: '<url-to-redirect-to-on-success>',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//   ],
//   // Terms of service url.
//   tosUrl: '<your-tos-url>',
//   // Privacy policy url.
//   privacyPolicyUrl: '<your-privacy-policy-url>'
// };

// ui.start('#firebaseui-auth-container', uiConfig);