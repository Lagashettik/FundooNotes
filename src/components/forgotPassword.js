import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, TextInput } from 'react-native-paper';

export default class ForgotPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            enteredOTP: '',
            confirmOTP: '123',
            password: '',
            confirmPassword: '',
            securePassword: true,
            showPassBlock: false,
            OtpMismatch: '',
            passwordMismatch: '',
            passwordWarning: '',
            emailWarning: ''
        }
    }

    handleEmail = (value) => {
        const regex = new RegExp('^[A-Za-z0-9@.-]{0,}$')
        if (!regex.test(value)) {
            this.setState({
                emailWarning: 'Enter valid email id'
            })
        }
        else {
            this.setState({
                email: value,
                emailWarning: ''
            })
        }
    }

    handlePassword = (value) => {
        const regex = new RegExp('^[A-Za-z0-9@]{1,}$')
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
        console.log(this.state.password)
    }

    handleConfirmPassword = (value) => {
        if (this.state.password.includes(value)) {
            this.setState({
                confirmPassword: value
            })
        }
    }

    handleOTP = async (value) => {
        const regex = new RegExp('^[0-9]{0,6}$')
        if (regex.test(value)) {
            await this.setState({
                enteredOTP: value
            })

            if (this.state.enteredOTP == this.state.confirmOTP) {
                await this.setState({
                    showPassBlock: true
                })
            }
            else {
                await this.setState({
                    showPassBlock: false
                })
            }
        }
    }

    setPassword = () => {
        if (this.state.password === this.state.confirmPassword) {
            this.props.route.params.setEmailPassword(this.state.email, this.state.password)
        }
    }

    goToLogin = () => {
        this.props.navigation.navigate("login")
    }

    setChecked = () => {
        this.setState({
            securePassword: !this.state.securePassword
        })
    }

    render() {
        return (
            <View style={{
                height: '90%',
                margin: '10%'
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: '10%' }}>Forgot Your Password,</Text>
                <Text style={{ fontSize: 20, color: 'gray', marginBottom: '10%' }}>Enter following details to reset your password!</Text>

                <TextInput
                    style={{ margin: '1%' }}
                    mode='outlined'
                    label='Email'
                    value={this.state.email}
                    onChangeText={this.handleEmail}
                />
                <Text >{this.state.emailWarning}</Text>
                <TextInput
                    style={{ margin: '1%' }}
                    mode='outlined'
                    label='OTP'
                    value={this.state.enteredOTP}
                    onChangeText={this.handleOTP}
                />

                {
                    this.state.showPassBlock &&
                    <View>
                        <TextInput
                            style={{ margin: '1%' }}
                            mode='outlined'
                            label='Password'
                            value={this.state.password}
                            onChangeText={this.handlePassword}
                            secureTextEntry={this.state.secure} />

                        <TextInput
                            style={{ margin: '1%' }}
                            mode='outlined'
                            label='Confirm Password'
                            value={this.state.confirmPassword}
                            onChangeText={this.handleConfirmPassword}
                            secureTextEntry={this.state.secure} />

                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <Checkbox
                                status={this.state.securePassword ? "checked" : "unchecked"}
                                onPress={this.setChecked}
                                uncheckedColor='red' />
                            <Text style={{ margin: '1%' }}>Show Password</Text>
                        </View>

                        <Button mode='contained'
                            style={{
                                marginTop: '20%',
                                width: '30%',
                                height: '10%',
                                alignSelf: 'flex-end',
                                justifyContent: 'center',
                                backgroundColor: 'red',
                            }}
                            labelStyle={{ fontSize: 20 }}
                            onPress={this.setPassword}
                        >Set</Button>
                    </View> 
    }
                <View style={{ height: '10%', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text>I already have account,</Text>
                    <TouchableOpacity onPress={this.goToLogin}>
                        <Text style={{ alignSelf: 'center', color: 'red', fontWeight: 'bold' }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}