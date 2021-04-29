import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { globalStylesheet } from '../styles/global.styles'
import { loginStylesheet } from '../styles/login.styles'
import { globalColorConstant, globalThemeConstant } from '../styles/globalStyleData.styles'
import UserServices from '../../services/userServices';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            error: ''
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
            let value = await userServices.userLogin(this.state.email, this.state.password)
            if (value == '') {
                this.setState({
                    email: '',
                    password: '',
                    errorEmail: ''
                })
                this.props.navigation.navigate('logout')
            } else {
                this.setState({
                    error : value
                })
            }
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

    render() {
        return (
            <View style={globalStylesheet.parent_conatiner_view}>
                <View style={loginStylesheet.sub_container_view}>
                    <Text style={globalStylesheet.header}>Welcome,</Text>
                    <Text style={globalStylesheet.primary_Text}>Sign in to continue!</Text>
                    <TextInput
                        style={loginStylesheet.text_input}
                        mode='outlined'
                        label='Email'
                        value={this.state.email}
                        onChangeText={this.handleEmail}
                        selectionColor={globalColorConstant.SELECTORCOLOR}
                        theme={globalThemeConstant.textInputTheme}
                    />
                    <Text style={globalStylesheet.text_Error}>{this.state.errorEmail}</Text>

                    <TextInput
                        style={loginStylesheet.text_input}
                        mode='outlined'
                        label='Password'
                        value={this.state.password}
                        onChangeText={this.handlePassword}
                        selectionColor={globalColorConstant.selectorcolor}
                        secureTextEntry={true}
                        theme={globalThemeConstant.textInputTheme}
                    />
                    <Text style={globalStylesheet.text_Error}>{this.state.errorPassword}</Text>

                    <TouchableOpacity onPress={this.goToForgetPassword}>
                        <Text style={loginStylesheet.forgot_password}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button
                        mode='contained'
                        style={loginStylesheet.button_SignIn}
                        labelStyle={{ fontSize: 20 }}
                        onPress={this.userLogin}
                    > Sign In</Button>

                    <Text style={globalStylesheet.text_Error}>{this.state.error}</Text>
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
