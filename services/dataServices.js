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
        console.log("inside getNotes")
        return new Promise((resolve, reject) => {
            this.getUIdFromStorage().then(uid => {
                console.log("uid : " + uid)
                firebase.database()
                    .ref('notes/')
                    .child(uid)
                    .once('value')
                    .then((snapshot) => {
                        console.log("Notes : " + JSON.stringify(snapshot))
                        resolve(snapshot.val())
                    })
                    .catch(error => reject(error))
            })
                .catch(error => reject(error))
        })
    }

    updateNoteToDatabase = (note, key) => {
        return new Promise((resolve, reject) => {
            this.getUIdFromStorage().then(uid => {
                firebase.database().ref('/notes/' + uid).child(key)
                    .update(note)
                    .then(() =>
                        resolve()
                    ).catch(error => reject(error))
            })
                .catch(error => reject(error))

        })
    }

    getNoteFromDatabase = (noteKey) => {
        return new Promise((resolve, reject) => {
            this.getUIdFromStorage().then(uid => {
                firebase.database()
                    .ref('notes/' + uid)
                    .child(noteKey)
                    .once('value')
                     ((snapshot) => {
                        resolve(snapshot.val())
                    })
                    .catch(error => reject(error.message))

            })
                .catch(error => reject(error.message))
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

    getLabelsFromDatabase = () => {
        return new Promise((resolve, reject) => {
            this.getUIdFromStorage().then(uid => {
                firebase.database()
                    .ref('/labels/' + uid)
                    .once('value')
                    .then(snapshot => {
                        resolve(snapshot.val())
                    })
                    .catch(error => reject(error))
            })
                .catch(error => reject(error))

        })
    }

    addLabelToDatabase = (labelObject) => {
        this.getUIdFromStorage().then(uid => {
            console.log("add")
            firebase.database()
                .ref('/labels/' + uid)
                .push(labelObject)
        })
            .catch(error => console.log(error))

    }

    updateLabelToDatabase = (newLabel, key) => {
        this.getUIdFromStorage().then(uid => {
            firebase.database()
                .ref('/labels/' + uid)
                .child(key)
                .update(newLabel)
        })
            .catch(error => console.log(error))
    }

    deleteLabelFromDatabase = (key) => {
        this.getUIdFromStorage().then(uid => {
            firebase.database()
                .ref('/labels/' + uid)
                .child(key)
                .remove()
        })
    }

    getLabelName = (labelKey) => {
        return new Promise(async (resolve, reject) => {
            await this.getUIdFromStorage().then(uid => {
                firebase.database()
                    .ref('/labels/' + uid)
                    .child(labelKey)
                    .once('value')
                    .then(snapshot => {
                        console.log("LabelName Dataservices : " + snapshot.val().labelName)
                        resolve(snapshot.val().labelName)
                    })
                    .catch(error => reject(error.message))
            })
                .catch(error => reject(error.message))
        })
    }

    addNoteKeyToLabel = (noteKey, labelKey) => {

    }

}

export default DataServices;