import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper'

export default class Logout extends Component {
    constructor(){
        super()
        this.state = {
            firstname : '',
            lastname : ''
        }
    }

   logout = () => {
    this.props.navigation.goBack()
   }

    render() {
        
        return (
            <View>
                <Text>Welcome {this.state.firstname} {this.state.uid}</Text>
                <Text style={{ color: 'green' }}>successfully Logged In</Text>
                <Button onPress={this.logout}>Logout</Button>
            </View>
        )
    }

}