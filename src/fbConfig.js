import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
apiKey: "AIzaSyA5lL5uNfPaFUQ4iPnthTixkboCJEsKMuI",
authDomain: "todo-practice-d7ce9.firebaseapp.com",
databaseURL: "https://todo-practice-d7ce9.firebaseio.com",
projectId: "todo-practice-d7ce9",
storageBucket: "",
messagingSenderId: "73211594990"
};

firebase.initializeApp(config);
firebase.firestore()
// with timeStampsInSnapshots
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;