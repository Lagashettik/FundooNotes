import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../database/firebase'
import DataServices from './dataServices';

class UserServices {

    userLogin = (email, password) => {

        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    new DataServices().storeUIdToStorage(userCredential.user.uid)
                    this.userLoggedIn()
                    console.log('User logged-in successfully!')
                    resolve()
                })
                .catch(error => reject(error.message))
        })

    }

    userRegister = (user, password) => {

        return new Promise((resolve, reject) => {
            firebase.auth()
                .createUserWithEmailAndPassword(user.emailId, password)
                .then(userCredential => {
                    console.log('User registration successfully')
                    new DataServices().storeUIdToStorage(userCredential.user.uid)
                    this.saveUserToDatabase(user)
                    this.userLoggedIn()
                    resolve()
                })
                .catch(error => reject(error.message))
        })

    }

    userLogout = () => {

        return new Promise((resolve, reject) => {
            firebase.auth().signOut()
                .then(() => {
                    new DataServices().removeUIdFromStorage();
                    this.userLoggedOut()
                    resolve()
                })
                .catch(error => reject(error.message))
        })

    }

    resetPassword = (email) => {
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(() => resolve())
                .catch(error => reject(error.message))
        })
    }

    saveUserToDatabase = (user) => {
        console.log("save database start")
        new DataServices().getUIdFromStorage()
            .then(uid => {
                firebase.database()
                    .ref('users/' + uid)
                    .push(user)
                console.log("User done")
            })
            .catch(error => console.log(error))
    }

    userLoggedIn = () => {
        AsyncStorage.setItem('isLoggedIn', 'true')
    }

    userLoggedOut = () => {
        AsyncStorage.setItem('isLoggedIn', 'false')
    }

    checkLoginStatus = () => {
        return AsyncStorage.getItem('isLoggedIn')
    }

}
export default UserServices;