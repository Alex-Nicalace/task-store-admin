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

    storage = this.firebaseApp.storage();

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

    postItem = async (item, file) => {
        if (file) {
            item.img = await this.uploadFile(file); //загрузить файл и получить ссылку
        }
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

    putItem = async (item, id, file, fileURL) => {
        if (fileURL !== item.img) {
            await this.deleteFile(fileURL)
        }
        if (file) {
            item.img = await this.uploadFile(file); //загрузить файл и получить ссылку
        }
        item.dateModify = await firebase.database.ServerValue.TIMESTAMP;
        await this.base.ref(`items/${id}`).update(item);
        let it = null;
        await this.base.ref(`items/${id}`).once('value', el => {
            it = el.val()
        });
        return it
    }

    getProps = () => {
        const init = {
            props: {
                id: null,
                propName: null,
                propType: null,
            }
        };
        return new Promise((resolve, reject) => {
            this.base.ref('props')
                .once('value', (element) => {
                    const propsObj = element.val() ?? init;
                    const propsArr = Object.keys(propsObj).map(key => ({...propsObj[key], id: key}));
                    //console.log('getItems promise');
                    resolve(propsArr);
                    //dispatch(itemsLoaded(itemsArr)
                });
        })
    }

    postProp = async (prop) => {
        prop.dateModify = await firebase.database.ServerValue.TIMESTAMP;
        const id = await this.base.ref('props').push(prop);
        //const key = id.key;
        let resolve = null;
        await this.base.ref(`props/${id.key}`).once('value', el => {
            resolve = el.val()
        });
        return resolve
    }

    deleteProp = async (id) => {
        await this.base.ref(`props/${id}`).remove();
    }

    uploadFile = async (file) => {
        const storageRef = this.storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        return await fileRef.getDownloadURL();
    }

    deleteFile = async (fileURL) => {
        // удалить файл если он существует
        try {
            const fileRef = await this.storage.refFromURL(fileURL);
            const storageRef = this.storage.ref();
            storageRef.child(fileRef.fullPath).getDownloadURL()
                .then(async () => {
                        console.log('delete file');
                        await fileRef.delete();
                    }
                )
                .catch(() => console.log('file not exists'))
        } catch (e) {
        }
    }


}
