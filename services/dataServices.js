import firebase from '../database/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

class DataServices {

    saveNotesToDatabase = (note) => {
        this.getUIdFromStorage().then(uid => {
            firebase.database()
                .ref('notes/' + uid)
                .push(note)
        })
            .catch(error => console.log(error))
    }

    getNotesFromDatabase = () => {
        return new Promise((resolve, reject) => {
            this.getUIdFromStorage().then(uid => {
                firebase.database()
                    .ref('notes/' + uid)
                    .once('value')
                    .then((snapshot) => {
                        console.log(snapshot.val())
                        resolve(snapshot.val())
                    })
                    .catch(error => reject(error))
            })
                .catch(error => reject(error))
        })
    }

    updateNotesToDatabase = (note, key) => {
        console.log("noteup : " + JSON.stringify(note) + " keyup : " + key)
        return new Promise((resolve, reject) => {
            firebase.database().ref('/notes/' + uid).child(key)
                .update(note)
                .then(() =>
                    resolve()
                ).catch(error => reject(error))
        })
    }

    deleteOrRestoreNote = (key, deletes = true) => {
        console.log(key)
        deleted = {
            isDeleted: deletes
        }
        this.getUIdFromStorage().then(uid => {
            firebase.database().ref('/notes/' + uid).child(key).update(deleted)
            console.log("after deleted")
        })
        .catch(error => console.log(error))
    }

    archiveNote = (key) => {
        console.log(key)
        archive = {
            isArchive: true
        }
        this.getUIdFromStorage().then(uid => {
        firebase.database().ref('/notes/' + uid).child(key).update(archive)
        })
        .catch(error => console.log(error))

    }

    removeNotesFromDatabase = (key) => {
        firebase.database().ref('/notes/' + uid).child(key).remove()
    }

    storeKeyToStorage = async (key) => {
        try {
            await AsyncStorage.setItem('key', key).then((data) => console.log("Done key store : " + data))
                .catch(error => console.log("Key store : " + error.message))
        } catch (error) {
            console.log("Async Storage error : " + error)
        }
    }

    getKeyFromStorage = async () => {
        try {
            const key = await AsyncStorage.getItem('key')
            if (key !== null) {
                return key
            }
        } catch (error) {
            console.log("Async Storage get error : " + error)
        }
    }

    storeUIdToStorage = async (uid) => {
        try {
            await AsyncStorage.setItem('uid', uid)
        } catch (error) {
            console.log("Async Storage error : " + error)
        }
    }

    getUIdFromStorage = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('uid').then(uid => {
                if (uid != null)
                    resolve(uid)
                else reject("Uid is null, Uid is not present please login or register")
            })
                .catch(error => reject(error.message))
        })

    }

    removeUIdFromStorage = async () => {
        try {
            await AsyncStorage.removeItem('uid')
        } catch (error) {
            console.log("Async storage remove error : " + error)
        }
    }

    getLabelsFromDatabase = async () => {
        return new Promise((resolve, reject) => {
            this.getUIdFromStorage().then(uid =>{
                firebase.database()
                .ref('/labels/' + uid)
                .once('value')
                .then(snapshot => {
                    console.log("labels : " + JSON.stringify(snapshot.val()))
                    resolve(snapshot.val())
                })
                .catch(error => reject(error))
            })
            .catch(error => reject(error))
            
        })
    }

    addLabelToDatabase =  (labelObject) => {
        this.getUIdFromStorage().then(uid => {
            firebase.database()
            .ref('/labels/' + uid)
            .push(labelObject)
        })
        .catch(error => console.log(error))
        
    }

    updateLabelToDatabase = async (newLabel, key) => {
         this.getUIdFromStorage().then(uid => {
             firebase.database()
            .ref('/labels/' + uid)
            .child(key)
            .update(newLabel)
         })
        .catch(error => console.log(error))
    }

    deleteLabelFromDatabase = (key) => {
        this.getUIdFromStorage().then(uid =>{
            firebase.database()
            .ref('/labels/' + uid)
            .child(key)
            .remove()
        })
    }

}

export default DataServices;