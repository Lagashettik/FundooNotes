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

    userRegister = (email, password) => {
        let errorMessage = '';
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User registration successfully')
                errorMessage = ''
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

    resetPassword = (email) => {
        let errorMessage = '';
        firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(
                errorMessage = ''
            )
            .catch(error => console.log(error.message))
        console.log(errorMessage)
        return errorMessage
    }
}
export default UserServices;