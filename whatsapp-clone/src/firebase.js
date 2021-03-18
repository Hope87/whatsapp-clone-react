import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAlXuP6IQsveFYmIOkk0p3cUA_b-YUgIhA",
  authDomain: "whatsapp-clone-f35b0.firebaseapp.com",
  projectId: "whatsapp-clone-f35b0",
  storageBucket: "whatsapp-clone-f35b0.appspot.com",
  messagingSenderId: "653659286318",
  appId: "1:653659286318:web:e504af113c4a408dd5e8bf",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
