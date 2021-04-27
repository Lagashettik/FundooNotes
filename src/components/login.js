import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { globalStylesheet } from '../styles/global.styles'
import { loginStylesheet } from '../styles/login.styles'
import {globalColorConstant } from '../styles/globalStyleData.styles'
import firebase from '../../database/firebase'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    userLogin = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signin!')
        }
        else {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res)=> {
                    console.log(res)
                    console.log('User logged-in successfully!')
                    this.setState({
                        email : '',
                        password : ''
                    })
                    this.props.navigation.navigate('logout')
                })
                .catch(error => console.log(error.message))
          }
    }

    handleEmail = (email) => {
        const regex = new RegExp('^[A-Za-z0-9@.]{0,}$')
        if (!regex.test(email)) {
            this.setState({
                email: '',
                error: 'Enter correct Email'
            })
        }
        else {
            this.setState({
                email: email,
                error: ''
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
            email: '',
            password: ''
        })
    }

    goToSignUp = () => {
        this.props.navigation.navigate("registration")
    }

    goToForgetPassword = () => {
        this.props.navigation.navigate("forgot-password")
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
                        value={this.state.email}
                        onChangeText={this.handleEmail}
                        selectionColor='red'
                    />
                    <Text>{this.state.error}</Text>

                    <TextInput
                        style={{
                            marginTop: '10%',
                            color: 'red',
                        }}
                        mode='outlined'
                        label='Password'
                        value={this.state.password}
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
                        onPress={this.userLogin()}
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
