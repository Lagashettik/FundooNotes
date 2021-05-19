import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import UserServices from '../../services/userServices';
import StringsOfLanguages from '../localization/stringsOfLanguages';

export default class SplashScreen extends Component {

    checkUserLogin = () => {
         new UserServices().checkLoginStatus().then((isLoggedIn) => {
            console.log("data login : " + isLoggedIn)
            if (isLoggedIn === 'true')
                this.props.navigation.replace('home-page')
            else
                this.props.navigation.replace('login')
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        setTimeout(() => this.checkUserLogin(), 2000)
        return (
            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/note_icon.png')} style={{ height: '25%', width: '40%' }}
                    resizeMode='contain' />
                <Text style={{ fontSize: 40 }}>{StringsOfLanguages.appName}</Text>

            </View>
        )
    }
}