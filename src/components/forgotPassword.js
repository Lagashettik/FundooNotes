import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, TextInput, Snackbar } from 'react-native-paper';
import { globalStylesheet } from '../styles/global.styles';
import firebase from '../../database/firebase';
import { globalThemeConstant } from '../styles/globalStyleData.styles';
import { forgotPasswordStyleSheet } from '../styles/forgotPassword.styles';

export default class ForgotPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            errorEmail: '',
            showSnackbar: false,
            snackbarMessage: ''
        }
    }

    resetPassword = () => {
        const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')

        if (!emailRegex.test(this.state.email)) {
            this.setState({
                // showSnackbar: true,
                // snackbarMessage: 'Enter email id correctly'
                errorEmail: 'Enter valid email id'
            })
        } else {
            firebase
                .auth()
                .sendPasswordResetEmail(this.state.email)
                .then(
                    this.setState({
                        errorEmail: '',
                        showSnackbar: true,
                        snackbarMessage: 'Reset password instructions send to your email'
                    })
                )
                .catch(error => console.log(error.message))
        }
    }

    handleEmail = (value) => {
        const regex = new RegExp('^[A-Za-z0-9@.-]{0,}$')
        if (!regex.test(value)) {
            this.setState({
                errorEmail: 'Enter valid email id'
            })
        }
        else {
            this.setState({
                email: value,
                errorEmail: ''
            })
        }
    }

    goToLogin = () => {
        this.props.navigation.navigate("login")
    }


    render() {
        return (
            <View style={{
                height: '90%',
                margin: '10%'
            }}>
                <Text style={globalStylesheet.header}>Forgot Your Password,</Text>
                <Text style={{ fontSize: 20, color: 'gray' }}>Don't worry!</Text>
                <Text style={{ fontSize: 15, color: 'gray', marginBottom: '10%' }}>
                    Enter  your email and click on reset you get password reset instructions on your email
                </Text>

                <TextInput
                    style={globalStylesheet.text_input}
                    mode='outlined'
                    label='Email'
                    value={this.state.email}
                    onChangeText={this.handleEmail}
                    theme = {globalThemeConstant.textInputTheme}
                />
                <Text >{this.state.errorEmail}</Text>


                <Button mode='contained'
                    style={forgotPasswordStyleSheet.button_reset}
                    theme = {{
                        roundness : 10
                    }}
                    labelStyle={{ fontSize: 20 }}
                    onPress={this.resetPassword}
                >Reset</Button>
                <Snackbar
                    visible={this.state.showSnackbar}
                    action={{
                        label: 'Ok',
                        onPress: this.goToLogin
                    }}
                    onDismiss={() => console.log('onDismiss')}
                    duration={5000}
                >{this.state.snackbarMessage}</Snackbar>

                <View style={{ height: '10%', justifyContent: 'center', flexDirection: 'row', alignItems : 'flex-end' }}>
                    <Text>I already have account,</Text>
                    <TouchableOpacity onPress={this.goToLogin}>
                        <Text style={{ alignSelf: 'center', color: 'red', fontWeight: 'bold' }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}