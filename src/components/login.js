import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { globalStylesheet } from '../styles/global.styles'
import { loginStylesheet } from '../styles/login.styles'
import {globalStyleData} from '../styles/globalStyleData.styles'
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            USERNAME: 'Admin',
            PASSWORD: 'Admin123',
            username: '',
            password: '',
            warning: false
        }
    }

    handleUsername = (username) => {
        const regex = new RegExp('^[A-Za-z0-9@.]{0,}$')
        if (!regex.test(username)) {
            <Text>Enter Correct username</Text>
            this.setState({
                username: ''
            })

            return (<Text style={{ fontSize: 30 }}>Enter Correct username</Text>)

        }
        else {
            this.setState({
                username: username,
                warning: true
            })
        }
    }

    handlePassword = (password) => {
        const regex = new RegExp('^[A-Za-z0-9@]{0,}$')
        if (!regex.test(password)) {
            this.setState({
                password: ''
            })
        }
        else {
            this.setState({
                password: password
            })
        }
    }

    setstateBlank = () => {
        this.setState({
            username: '',
            password: ''
        })
    }

    signIn = () => {
        if (this.state.username === this.state.USERNAME && this.state.password === this.state.PASSWORD) {
            alert('Sign Sucessful!')
            this.setstateBlank()
        }
        else {
            alert('Invalid username or pasword')
            this.setstateBlank()
        }
    }

    goToSignUp = () => {
        this.props.navigation.navigate("registration")
    }

    goToForgetPassword = () => {
        this.props.navigation.navigate("forgot-password", { setEmailPassword: this.setEmailPassword })
    }

    setEmailPassword = (email, password) => {
        if (this.state.USERNAME == email) {
            this.setState({
                PASSWORD: password
            })
        }
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
                        value={this.state.username}
                        onChangeText={this.handleUsername}
                        selectionColor='red'
                    />

                    <TextInput
                        style={{
                            marginTop: '10%',
                            color: 'red',
                        }}
                        mode='outlined'
                        label='Password'
                        value={this.state.password}
                        onChangeText={this.handlePassword}
                        selectionColor={globalStyleData.selectorcolor}
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
                        onPress={this.signIn}
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
