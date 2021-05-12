import firebase from '../database/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

class DataServices {

    saveNotesToDatabase = async (note) => {
        let uid = ''
        console.log("Note" + note)
        await this.getUIdFromStorage().then(data => uid = data)
        key = await firebase.database()
            .ref('/notes' + uid)
            .push(note)
            .key

        await this.storeKeyToStorage(key)
    }

    getNotesFromDatabase = async () => {
        uid = await this.getUIdFromStorage()
        notes = firebase.database().ref('/notes').child(uid).get().then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot)
            } else {
                console.log('no data')
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    updateNotesToDatabase = async () =>{
        
    }

    storeKeyToStorage = async (key) => {
        try {
            await AsyncStorage.setItem('key', key)
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