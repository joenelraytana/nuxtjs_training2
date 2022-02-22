import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDQr841YCZcJO-8ezY1jbR-VPPgfMug9Cc",
    authDomain: "bookapp-a6768.firebaseapp.com",
    projectId: "bookapp-a6768",
    storageBucket: "bookapp-a6768.appspot.com",
    messagingSenderId: "424786428542",
    appId: "1:424786428542:web:5a1139294c4ccb54a34e2f",
    measurementId: "G-ER2MQ1N3FR"
  };

// initialize firebase
let app = null;
if(!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
}

export default firebase
