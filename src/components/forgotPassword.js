import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { globalStylesheet } from '../styles/global.styles';
import { globalThemeConstant } from '../styles/globalStyleData.styles';
import { forgotPasswordStyleSheet } from '../styles/forgotPassword.styles';
import UserServices from '../../services/userServices';
import StringsOfLanguages from '../localization/stringsOfLanguages';

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

    resetPassword = async () => {
        const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')

        if (this.state.email == '') {
            this.setState({
                errorEmail: 'Enter email'
            })
        } else if (emailRegex.test(this.state.email)) {
            new UserServices().resetPassword(this.state.email)
                .then(() => {
                    this.setState({
                        errorEmail: '',
                        showSnackbar: true,
                        snackbarMessage: 'Reset password instructions send to your email'
                    })
                })
                .catch(error => console.log(error))

        } else {
            this.setState({
                errorEmail: 'Enter valid email id'
            })
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
        this.props.navigation.goBack()
    }

    snackbarDismiss = () => {
        this.setState({
            showSnackbar: false
        })
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={{
                height: '90%',
                margin: '10%'
            }}>
                <Text style={globalStylesheet.header}>{StringsOfLanguages.forgotYourPassword}</Text>
                <Text style={{ fontSize: 20, color: 'gray' }}>{StringsOfLanguages.dontWorry}</Text>
                <Text style={{ fontSize: 15, color: 'gray', marginBottom: '10%' }}>
                    {StringsOfLanguages.forgotPasswordDescription}</Text>

                <TextInput
                    style={globalStylesheet.text_input}
                    mode='outlined'
                    label={StringsOfLanguages.email}
                    value={this.state.email}
                    onChangeText={this.handleEmail}
                    theme={globalThemeConstant.textInputTheme}
                />
                <Text style={globalStylesheet.text_Error}>{this.state.errorEmail}</Text>


                <Button mode='contained'
                    style={forgotPasswordStyleSheet.button_reset}
                    theme={{
                        roundness: 10
                    }}
                    labelStyle={{ fontSize: 20 }}
                    onPress={this.resetPassword}
                >{StringsOfLanguages.reset}</Button>
                <Snackbar
                    visible={this.state.showSnackbar}
                    action={{
                        label: 'Ok',
                        onPress: this.goToLogin
                    }}
                    onDismiss={this.snackbarDismiss}
                    duration={5000}
                >{this.state.snackbarMessage}</Snackbar>

                <View style={{ height: '10%', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text>{StringsOfLanguages.alreadyHaveAccount}</Text>
                    <TouchableOpacity onPress={this.goToLogin}>
                        <Text style={{ alignSelf: 'center', color: 'red', fontWeight: 'bold' }}>{StringsOfLanguages.signInTag}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}