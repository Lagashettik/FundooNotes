import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper'
import { globalStylesheet } from '../styles/global.styles';

export default class Logout extends Component {
    constructor(){
        super()
        this.state = {
            email : '',
            uid : ''
        }
    }


    logout = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('login')
        })
            .catch(error => console.log(error.message))
    }
    
    
    render() {
        this.state = {
            email : firebase.auth().currentUser.email,
            uid : firebase.auth().currentUser.uid
        }
    
        
        return (
            <View style={globalStylesheet.parent_conatiner_view}>
                <Text style={{fontSize: 40, fontWeight : 'bold'}}>Welcome {this.state.email}</Text>
                <Text style={{ color: 'green' }}>successfully Logged In</Text>
                <Button onPress={this.logout} >Logout</Button>
            </View>
        )
    }

}