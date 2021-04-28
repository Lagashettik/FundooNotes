import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper'
import { globalStylesheet } from '../styles/global.styles';

export default class Logout extends Component {


   logout = () => {
    this.props.navigation.goBack()
   }

    render() {
        
        return (
            <View style={globalStylesheet.parent_conatiner_view}>
                <Text style={{fontSize: 40, fontWeight : 'bold'}}>Welcome</Text>
                <Text style={{ color: 'green' }}>successfully Logged In</Text>
                <Button onPress={this.logout} >Logout</Button>
            </View>
        )
    }

}