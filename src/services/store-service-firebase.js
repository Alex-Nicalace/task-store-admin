import firebase from 'firebase';

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

    // getItems = (func) => {
    //     this.base.ref('items')
    //         .on('value', func)
    // }
    getItems = () => {
        return new Promise((resolve, reject) => {
            this.base.ref('items')
                .on('value', (element) => {
                    const itemsObj = element.val();
                    const itemsArr = Object.keys(itemsObj).map(key => ({...itemsObj[key], id: key}));
                    //console.log('getItems promise');
                    resolve(itemsArr);
                    //dispatch(itemsLoaded(itemsArr)
                });
        })
    }

    getItem = (id, func) => {
        this.base.ref(`items/${id}`)
            .on('value', func)
    }
    // getItem = (id) => {
    //     return new Promise((resolve, reject) => {
    //         this.base.ref(`items/${id}`)
    //             .on('value', (element) => {
    //                 const itemObj = element.val();
    //                 resolve(itemObj);
    //                 //dispatch(itemsLoaded(itemsArr)
    //             });
    //     })
    // }

    postItem = async (item) => {
        item.dateModify = this.base.ServerValue.TIMESTAMP;
        await this.base.ref('items').push(item);
        return item
    }

    deleteItem = (id) => {
        this.base.ref(`items/${id}`).remove()
    }


}