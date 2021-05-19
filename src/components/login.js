import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { globalStylesheet } from '../styles/global.styles'
import { loginStylesheet } from '../styles/login.styles'
import { globalColorConstant, globalThemeConstant } from '../styles/globalStyleData.styles'
import UserServices from '../../services/userServices';
import SocialServices from '../../services/socialServices'
import StringsOfLanguages from '../localization/stringsOfLanguages';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            error: '',
            avatar_url: '',
            avatar_show: false
        }
    }

    userLogin = async () => {
        let regex = new RegExp('^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$')
        if (this.state.email == '' && this.state.password == '') {
            this.setState({
                errorEmail: 'Enter email',
                errorPassword: 'Enter password'
            })
        } else if (this.state.email != '' && this.state.password == '') {
            this.setState({
                errorPassword: 'Enter Password'
            })
        } else if (this.state.email == '' && this.state.password != '') {
            this.setState({
                errorEmail: 'Enter Email'
            })
        } else if (regex.test(this.state.email)) {
            let userServices = new UserServices()
            await userServices.userLogin(this.state.email, this.state.password)
                .then(() => {
                    this.setState({
                        email: '',
                        password: '',
                        errorEmail: ''
                    })
                    this.props.navigation.replace('home-page')
                })
                .catch(error => {
                    this.setState({
                        error: error
                    })
                    console.log(error)
                })
        } else {
            this.setState({
                errorEmail: 'Invalid Email id',
                ErrorPassword: 'Invalid Password'
            })
        }
    }

    handleEmail = (value) => {
        const regex = new RegExp('^[A-Za-z0-9@.]{0,}$')
        if (!regex.test(value)) {
            this.setState({
                email: '',
                errorEmail: 'Enter correct Email'
            })
        }
        else {
            this.setState({
                email: value,
                errorEmail: ''
            })
        }
    }

    handlePassword = (value) => {
        const regex = new RegExp('^[A-Za-z0-9@]{0,}$')
        if (!regex.test(value)) {
            this.setState({
                password: ''
            })
        }
        else {
            this.setState({
                password: value
            })
        }
    }

    goToSignUp = () => {
        this.props.navigation.navigate("registration")
    }

    goToForgetPassword = () => {
        this.props.navigation.navigate("forgot-password")
    }

    handleError = (message) => {

    }

    facebookLogin = async () => {
        let socialServices = new SocialServices()
        login = await socialServices.facebookLogin()
        if (login == true)
            this.props.navigation.navigate('home-page')
        else
            this.props.navigation.navigate('login')
    }


    googleLogin = () => {
        Alert.alert("Google login not available")
    }


    render() {
        return (
            <View style={globalStylesheet.parent_conatiner_view}>
                <View style={loginStylesheet.sub_container_view}>
                    <Text style={globalStylesheet.header}>{StringsOfLanguages.welcome}</Text>
                    <Text style={globalStylesheet.primary_Text}>{StringsOfLanguages.signInMessage}</Text>
                    <TextInput
                        style={loginStylesheet.text_input}
                        mode='outlined'
                        label={StringsOfLanguages.email}
                        value={this.state.email}
                        onChangeText={this.handleEmail}
                        selectionColor={globalColorConstant.SELECTORCOLOR}
                        theme={globalThemeConstant.textInputTheme}
                    />
                    <Text style={globalStylesheet.text_Error}>{this.state.errorEmail}</Text>

                    <TextInput
                        style={loginStylesheet.text_input}
                        mode='outlined'
                        label={StringsOfLanguages.password}
                        value={this.state.password}
                        onChangeText={this.handlePassword}
                        selectionColor={globalColorConstant.SELECTORCOLOR}
                        secureTextEntry={true}
                        theme={globalThemeConstant.textInputTheme}
                    />
                    <Text style={globalStylesheet.text_Error}>{this.state.errorPassword}</Text>

                    <TouchableOpacity onPress={this.goToForgetPassword}>
                        <Text style={loginStylesheet.forgot_password}>{StringsOfLanguages.forgotPassword}</Text>
                    </TouchableOpacity>

                    <Button
                        mode='contained'
                        style={loginStylesheet.button_SignIn}
                        labelStyle={{ fontSize: 20 }}
                        onPress={this.userLogin}
                    >{StringsOfLanguages.signIn}</Button>

                    <View style={{ width: '100%', justifyContent: 'center', marginTop: '10%', flexDirection: 'row' }}>
                        <View style={{ borderBottomWidth: 1, borderColor: 'blue', width: '48%' }} />
                        <Text style={{ color: 'blue', marginBottom : '-2%' }}>{StringsOfLanguages.or}</Text>
                        <View style={{ borderBottomWidth: 1, borderColor: 'blue', width: '48%' }} />
                    </View>

                    <Button
                        mode='contained'
                        icon='facebook'
                        style={loginStylesheet.button_Facebook_SignIn}
                        onPress={this.facebookLogin}
                    >{StringsOfLanguages.connectFacebook}</Button>

                    <Button
                        mode='contained'
                        icon='google'
                        style={loginStylesheet.button_Google_SignIn}
                        onPress={this.googleLogin}
                    >{StringsOfLanguages.connectGoogle}</Button>

                    <Text style={globalStylesheet.text_Error}>{this.state.error}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', height: '30%' }}>
                    <Text >{StringsOfLanguages.newUser}</Text>
                    <TouchableOpacity onPress={this.goToSignUp}>
                        <Text
                            style={{ fontWeight: 'bold', color: 'red' }}>{StringsOfLanguages.signUpTag}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
