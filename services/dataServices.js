import firebase from '../database/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

class DataServices {

    saveNotesToDatabase = async (note) => {
        let uid = ''
        console.log("Note" + JSON.stringify(note))
        await this.getUIdFromStorage().then(value => uid = value)
        await firebase.database()
            .ref('notes/' + uid)
            .push(note)

    }

    getNotesFromDatabase = async () => {
        uid = await this.getUIdFromStorage()
        data = {}

        return new Promise((resolve, reject) => {
            firebase.database()
                .ref('notes/' + uid)
                .once('value')
                .then((snapshot) => {
                    console.log(snapshot.val())
                    resolve(snapshot.val())
                })
                .catch(error => reject(error))
        })


    }

    updateNotesToDatabase = (note, key) => {
        console.log("noteup : " + note + " keyup" + key)
        return new Promise((resolve, reject) => {
            firebase.database().ref('/notes/' + uid).child(key)
                .update(note)
                .then(() =>
                    resolve()
                ).catch(error => reject(error))
        })
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

    getUIdFromStorage = async () => {
        try {
            const uid = await AsyncStorage.getItem('uid')
            if (uid !== null) {
                return uid
            }
        } catch (error) {
            console.log("Async Storage get error : " + error)
        }
    }

    removeUIdFromStorage = async () => {
        try {
            await AsyncStorage.removeItem('uid')
        } catch (error) {
            console.log("Async storage remove error : " + error)
        }
    }
}

export default DataServices;