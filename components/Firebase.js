import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {};

const config = {
  apiKey: "AIzaSyBMH_vRiyUIrz3He2ewuBUg0mjJYjv2yQw",
  authDomain: "newsfeed-fb975.firebaseapp.com",
  databaseURL: "https://newsfeed-fb975.firebaseio.com",
  projectId: "newsfeed-fb975",
  storageBucket: "newsfeed-fb975.appspot.com",
  messagingSenderId: "1044579514059"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
