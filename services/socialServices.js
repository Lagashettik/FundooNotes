import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import firebase from '../database/firebase'
import UserServices from '../services/userServices';
import DataServices from './dataServices';

class SocialServices {

    facebookLogin = () => {
        login = false
        LoginManager
            .logInWithPermissions(['public_profile', 'email'])
            .then(async (result) => {
                if (result.isCancelled) {
                    console.log('Login Cancelled')
                } else {
                    console.log('Login success with permission: ' + result.grantedPermissions.toString())
                    console.log(result)
                    let loginToken;
                    await AccessToken
                        .getCurrentAccessToken()
                        .then((data) => loginToken = data.accessToken.toString())

                    console.log("FbLoginToken : " + JSON.stringify(loginToken))
                    const credential =
                        await firebase
                            .auth
                            .FacebookAuthProvider
                            .credential(loginToken);

                    console.log("FbCredentials : " + JSON.stringify(credential))

                    // let responce = firebase
                    // .auth().currentUser
                    // .linkAndRetrieveDataWithCredential(credential)

                    // console.log(responce)

                    firebase
                        .auth().signInWithCredential(credential).then(async userCredentials => {
                            console.log("UserCredentials : " + JSON.stringify(userCredentials))
                            const user = {
                                firstName: userCredentials.additionalUserInfo.profile.first_name,
                                lastName: userCredentials.additionalUserInfo.profile.last_name,
                                date: '',
                                emailId: userCredentials.additionalUserInfo.profile.email
                            }
                            await new DataServices().storeUIdToStorage(userCredentials.user.uid)
                            console.log("User : " + user)
                            new UserServices().saveUserToDatabase(user)
                        }).catch(error => {
                            console.log("error : " + error);
                        });
                }
            },
                (error) => {
                    console.log(error)
                }
            )
    }
}

export default SocialServices;