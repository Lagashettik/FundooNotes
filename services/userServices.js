import firebase from '../database/firebase'

class UserServices {

    userLogin = (email, password) => {
        let errorMessage = '';
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log('User logged-in successfully!')
            })
            .catch(error => {
                console.log(error.message)
                errorMessage = error.message
                console.log('errormessage ' + errorMessage)
            })
        return errorMessage
    }

    userRegister = (user, password) => {
        let errorMessage = '';
        firebase
            .auth()
            .createUserWithEmailAndPassword(user.emailId, password)
            .then(() => {
                console.log('User registration successfully')
                errorMessage = ''
                this.saveDataToDatabase(user)
            })
            .catch(error => {
                console.log(error.message)
                errorMessage = error.message
            })

        return errorMessage
    }

    userLogout = () => {
        let errorMessage = '';
        firebase.auth().signOut().then(() => {
            errorMessage = ''
            console.log('No Error')
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

    saveDataToDatabase = (user) =>{
        firebase.database().ref('/users').push(user)
    }

}
export default UserServices;