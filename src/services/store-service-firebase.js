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
                .once('value', (element) => {
                    const itemsObj = element.val();
                    const itemsArr = Object.keys(itemsObj).map(key => ({...itemsObj[key], id: key}));
                    //console.log('getItems promise');
                    resolve(itemsArr);
                    //dispatch(itemsLoaded(itemsArr)
                });
        })
    }

    // getItem = (id, func) => {
    //     this.base.ref(`items/${id}`)
    //         .on('value', func)
    // }
    getItem = (id) => {
        return new Promise((resolve, reject) => {
            this.base.ref(`items/${id}`)
                .once('value', (element) => {
                    const itemObj = element.val();
                    resolve(itemObj);
                    //dispatch(itemsLoaded(itemsArr)
                });
        })
    }

    postItem = async (item) => {
        item.dateModify = await firebase.database.ServerValue.TIMESTAMP;
        const id = await this.base.ref('items').push(item);
        //const key = id.key;
        let it = null;
        await this.base.ref(`items/${id.key}`).once('value', el => {
            it = el.val()
        });
        return it
    }

    deleteItem = async (id) => {
        await this.base.ref(`items/${id}`).remove();
    }

    putItem = async (item, id) => {
        item.dateModify = await firebase.database.ServerValue.TIMESTAMP;
        await this.base.ref(`items/${id}`).update(item);
        let it = null;
        await this.base.ref(`items/${id}`).once('value', el => {
            it = el.val()
        });
        return it
    }


}

export const itemLoaded = (newItem) => {
    return {
        type: 'FETCH_ITEM_SUCCESS',
        payload: newItem,
    }
}

export const itemRequested = () => {
    return {
        type: 'FETCH_ITEM_REQUEST',
    }
}

export const itemError = (error) => {
    return {
        type: 'FETCH_ITEM_FAILURE',
        payload: error,
    }
}

export const fetchItem = (id) => (storeService, dispatch) => {
    dispatch(itemRequested());
    storeService.getItem(id)
        .then((response) => dispatch(itemLoaded(response)))
        .catch((error) => dispatch(itemError(error)) )
}

// export const fetchItem = (id) => (storeService, dispatch) => {
//     dispatch(itemRequested());
//     storeService.getItem(id, (element) => {
//         const itemsObj = element.val();
//         dispatch(itemLoaded(itemsObj))
//     });
// }

export const updateItem = (item, id) => (storeService, dispatch) => {
    storeService.putItem(item, id)
        .then((response) => {
            dispatch(itemLoaded(response)
            )})
}
