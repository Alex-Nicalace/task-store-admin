import firebase from 'firebase';
import Rebase from 're-base'; //для связки БД с реактом;

const firebaseConfig = {
    apiKey: "AIzaSyBT83V2O5qgXB4p5RRdO0jS1UlQzo8RWOQ",
    authDomain: "first-my-project-firebase.firebaseapp.com",
    databaseURL: "https://first-my-project-firebase-default-rtdb.firebaseio.com",
    projectId: "first-my-project-firebase",
    storageBucket: "first-my-project-firebase.appspot.com",
    messagingSenderId: "761214007404",
    appId: "1:761214007404:web:ee75a5c1324befea0d0049"
}

// const firebaseApp = firebase.initializeApp(firebaseConfig);
//
// const base = Rebase.createClass(firebaseApp.database());

export default class StoreServiceFirebase {

    firebaseApp = firebase.initializeApp(firebaseConfig);

    //base = Rebase.createClass(this.firebaseApp.database());

    base = this.firebaseApp.database();

    createAccount = async (email, password) => {
        return await firebase.auth().createUserWithEmailAndPassword(email, password)
    }

    signAccount = async (email, password) => {
        return await firebase.auth().signInWithEmailAndPassword(email, password) //авторизация
    }

    getItems = async (func) => {
        this.base.ref('items')
            .on('value', func)
            // .on('value', (el) => {
            //     Object.keys(el).map(key => ( {...el[key], key: key} ))
            // })
    }



    // getItems = async() => {
    //     return this.db.ref('items')
    //         //.on('value', elem => elem.val())
    // }

}