import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper'
import { globalStylesheet } from '../styles/global.styles';
import UserServices from '../../services/userServices';

export default class Logout extends Component {

    logout = async () => {
        let userServices = new UserServices()
        let value = await userServices.userLogout()
        if( value == '')
        this.props.navigation.navigate('login')
        else
        console.log(value)
    }
    
    
    render() {
        
        return (
            <View style={globalStylesheet.parent_conatiner_view}>
                <Text style={{fontSize: 40, fontWeight : 'bold'}}>Welcome,</Text>
                <Text style={{fontSize : 20, color : 'black'}}> {'\n'}successfully Logged In</Text>
                <Button mode='contained' onPress={this.logout}
                style={{marginTop : '10%', backgroundColor : 'red'}} >Logout</Button>
            </View>
        )
    }

}