import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import UserServices from '../../services/userServices';

export default class SplashScreen extends Component {

    enterApp = () => {
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
        setTimeout(() => this.enterApp(), 2000)
        return (
            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/note_icon.png')} style={{ height: '25%', width: '40%' }}
                    resizeMode='contain' />
                <Text style={{ fontSize: 40 }}>Fundoo Notes</Text>

            </View>
        )
    }
}