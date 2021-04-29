import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper'
import { globalStylesheet } from '../styles/global.styles';
import firebase from '../../database/firebase'
import UserServices from '../../services/userServices';


export default class Logout extends Component {

    logout = () => {
        let userServices = new UserServices()
        let value = userServices.userLogout()
        if( value == '')
        this.props.navigation.navigate('login')
        else
        console.log(value)
    }
    
    
    render() {
        
        return (
            <View style={globalStylesheet.parent_conatiner_view}>
                <Text style={{fontSize: 40, fontWeight : 'bold'}}>Welcome,</Text>
                <Text style={{ color: 'red', fontSize : 20 }}>Krishna
                <Text style={{fontSize : 15, color : 'black'}}> {'\n'}successfully Logged In</Text></Text>
                <Button onPress={this.logout} >Logout</Button>
            </View>
        )
    }

}