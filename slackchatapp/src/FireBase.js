import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
    apiKey: "AIzaSyAIawkEiznUlAK6-47h91Cn8IOAVE9XlE0",
    authDomain: "slack-chat-app-71d51.firebaseapp.com",
    databaseURL: "https://slack-chat-app-71d51.firebaseio.com",
    projectId: "slack-chat-app-71d51",
    storageBucket: "slack-chat-app-71d51.appspot.com",
    messagingSenderId: "399475817206"
  };
  firebase.initializeApp(config);


  export default firebase;