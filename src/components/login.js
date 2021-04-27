import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { globalStylesheet } from '../styles/global.styles'
import { loginStylesheet } from '../styles/login.styles'
import {globalColorConstant } from '../styles/globalStyleData.styles'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Email: '',
            Password: '',
            Error: false
        }
    }


    handleEmail = (email) => {
        const regex = new RegExp('^[A-Za-z0-9@.]{0,}$')
        if (!regex.test(email)) {
            this.setState({
                Email: ''
            })
        }
        else {
            this.setState({
                Email: email,
                Error: true
            })
        }
    }

    handlePassword = (password) => {
        const regex = new RegExp('^[A-Za-z0-9@]{0,}$')
        if (!regex.test(password)) {
            this.setState({
                Password: ''
            })
        }
        else {
            this.setState({
                Password: password
            })
        }
    }

    setstateBlank = () => {
        this.setState({
            Email: '',
            Password: ''
        })
    }

    goToSignUp = () => {
        this.props.navigation.navigate("registration")
    }

    goToForgetPassword = () => {
        this.props.navigation.navigate("forgot-password")
    }

    signIn = () => {
        this.props.navigation.navigate('logout')
    }

    render() {
        return (
            <View style={globalStylesheet.default_View}>
                <View style={{ height: '70%' }}>
                    <Text style={globalStylesheet.header}>Welcome,</Text>
                    <Text style={globalStylesheet.primary_Text}>Sign in to continue!</Text>
                    <TextInput
                        style={{ marginTop: '10%' }}
                        mode='outlined'
                        label='Email'
                        value={this.state.Email}
                        onChangeText={this.handleEmail}
                        selectionColor='red'
                    />

                    <TextInput
                        style={{
                            marginTop: '10%',
                            color: 'red',
                        }}
                        mode='outlined'
                        label='Password'
                        value={this.state.Password}
                        onChangeText={this.handlePassword}
                        selectionColor={globalColorConstant.selectorcolor}
                        underlineColor='red'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={this.goToForgetPassword}>
                        <Text style={{ alignSelf: 'flex-end' }}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button
                        mode='contained'
                        style={loginStylesheet.button_SignIn}
                        labelStyle={{ fontSize: 20 }}
                        onPress={this.signIn()}
                    > Sign In</Button>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', height: '30%' }}>
                    <Text >I'm a new user,</Text>
                    <TouchableOpacity onPress={this.goToSignUp}>
                        <Text
                            style={{ fontWeight: 'bold', color: 'red' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
