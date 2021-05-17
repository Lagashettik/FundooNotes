import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../database/firebase'
import DataServices from './dataServices';

class UserServices {

    userLogin = async (email, password) => {
        let errorMessage = '';
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                new DataServices().storeUIdToStorage(userCredential.user.uid)
                this.userLoggedIn()
                console.log('User logged-in successfully!')
            })
            .catch(error => {
                console.log(error.message)
                errorMessage = error.message
                console.log('errormessage ' + errorMessage)
            })
        return errorMessage
    }

    userRegister = async (user, password) => {
        let errorMessage = '';
        firebase
            .auth()
            .createUserWithEmailAndPassword(user.emailId, password)
            .then(async (userCredential) => {
                console.log('User registration successfully')
                errorMessage = ''
                await new DataServices().storeUIdToStorage(userCredential.user.uid)
                console.log("after storage save")
                this.saveUserToDatabase(user)
                this.userLoggedIn()
                console.log("end")
            })
            .catch(error => {
                console.log(error.message)
                errorMessage = error.message
            })

        return errorMessage
    }

    userLogout = async () => {
        let errorMessage = '';
        await firebase.auth().signOut().then(async () => {
            errorMessage = ''
            console.log('No Error')
            dataServices = await new DataServices()
                .removeUIdFromStorage();
                this.userLoggedOut()
        })
            .catch(error => {
                errorMessage = error.message
                console.log(error.message)
            })
        return errorMessage
    }

    resetPassword = async (email) => {
        let errorMessage = '';
        await firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(
                errorMessage = ''
            )
            .catch(error => errorMessage = error.message)
        console.log("errorMessage " + errorMessage)
        return errorMessage
    }

    saveUserToDatabase = (user) => {
        console.log("save database start")
        new DataServices().getUIdFromStorage()
            .then(async uid => {
                await firebase.database()
                .ref('users/' + uid)
                .push(user)
                console.log("User done")
            })
            .catch(error => console.log(error))
    }

    userLoggedIn = () => {
        AsyncStorage.setItem('isLoggedIn', 'true' )
    }

    userLoggedOut = () => {
        AsyncStorage.setItem('isLoggedIn', 'false')
    }

    checkLoginStatus = () =>{
        return AsyncStorage.getItem('isLoggedIn')
    }
 
}
export default UserServices;