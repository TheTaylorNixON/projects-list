import firebase from 'firebase/app';
import 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyClGg4uNu6RviZYrS_U5-PVGV5wbFVIeDI",
    authDomain: "todo-list-c85d9.firebaseapp.com",
    databaseURL: "https://todo-list-c85d9.firebaseio.com",
    projectId: "todo-list-c85d9",
    storageBucket: "",
    messagingSenderId: "127468982712",
    appId: "1:127468982712:web:9c65c5e667c4326c"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export default database;