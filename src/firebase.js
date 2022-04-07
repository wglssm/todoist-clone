import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyCT9TH1S4kmqe-D6Om4usBkq9ruiXgCF_w',
  authDomain: 'todoise-clone.firebaseapp.com',
  databaseURL:
    'https://todoise-clone-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'todoise-clone',
  storageBucket: 'todoise-clone.appspot.com',
  messagingSenderId: '807620091563',
  appId: '1:807620091563:web:e81b28fd3f613afea1a1ee',
});

export { firebaseConfig as firebase };
