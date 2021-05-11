import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';
import firebase from '../database/firebase'
import UserServices from '../services/userServices';

class SocialServices {

    facebookLogin = () => {

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

                    console.log(loginToken)
                    const credential =
                        firebase
                            .auth
                            .FacebookAuthProvider
                            .credential(loginToken);

                    console.log(credential)

                    // let responce = firebase
                    // .auth().currentUser
                    // .linkAndRetrieveDataWithCredential(credential)

                    // console.log(responce)

                    firebase
                        .auth().signInWithCredential(credential).then(userCredentials => {
                            const user = {
                                firstName: userCredentials.additionalUserInfo.profile.first_name,
                                lastName: userCredentials.additionalUserInfo.profile.last_name,
                                date: '',
                                emailId: userCredentials.additionalUserInfo.profile.email
                            }
                            new UserServices().saveUserToDatabase(user)
                        }).catch(error => {
                            console.log(error);
                        });
                        this.props.navigation.navigate('logout')
                    }
            },
                (error) => {
                    console.log(error)
                }
            )
    }
}

export default SocialServices;