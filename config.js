import * as firebase from 'firebase';
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyAdPA_QDFYjvXxOQzpxOd-SC6_J5sXc0U8",
    authDomain: "booksanta-fa333.firebaseapp.com",
    databaseURL: "https://booksanta-fa333.firebaseio.com",
    projectId: "booksanta-fa333",
    storageBucket: "booksanta-fa333.appspot.com",
    messagingSenderId: "749207967098",
    appId: "1:749207967098:web:a1e16d2bccd27592a8f2c3"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();