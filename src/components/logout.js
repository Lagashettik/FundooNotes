import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper'
import { globalStylesheet } from '../styles/global.styles';
import UserServices from '../../services/userServices';
import StringsOfLanguages from '../localization/stringsOfLanguages';

export default class Logout extends Component {

    logout = () => {
        new UserServices().userLogout()
            .then(() => this.props.navigation.replace('login'))
            .catch(error => console.log(error))
    }


    render() {

        return (
            <View style={globalStylesheet.parent_conatiner_view}>
                <Text style={{ fontSize: 40, fontWeight: 'bold' }}>{StringsOfLanguages.welcome}</Text>
                <Text style={{ fontSize: 20, color: 'black' }}> {'\n'}</Text>
                <Button mode='contained' onPress={this.logout}
                    style={{ marginTop: '10%', backgroundColor: 'red' }} >{StringsOfLanguages.signOut}</Button>
            </View>
        )
    }

}