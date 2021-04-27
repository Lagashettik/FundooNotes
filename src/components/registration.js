import React, { Component } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { TextInput, Button, Checkbox } from 'react-native-paper'
import DatePicker from 'react-native-date-picker'

export default class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            date: new Date(),
            errorFirstname: '',
            errorLastname: '',
            errorEmail: '',
            errorPassword: '',
            errorDate: '',
            errorConfirmPassword: '',
            secure: true,
            checked: false,
            datePickerVisibility: false
        }
    }

 

    handleFirstname = async (value) => {
        const regex = new RegExp('^[A-Z]{1}[a-z]{0,}$')
        if (!regex.test(value)) {
            await this.setState({
                firstname: '',
                ErrorFirstname: 'Enter correct Firstname'
            })
        }
        else {
            await this.setState({
                firstname: value,
                ErrorFirstname: ''
            })
        }
    }

    handleLastname = async (value) => {
        const regex = new RegExp('^[A-Z]{1}[a-z]{0,}$')
        if (!regex.test(value)) {
            this.setState({
                lastname: '',
                ErrorLastname: 'Enter correct Lastname'
            })
        } else {
            this.setState({
                lastname: value,
                ErrorLastname: ''
            })
        }
    }

    handleEmail = (email) => {
        const regex = new RegExp('^[A-Za-z0-9@.]{0,}$')
        if (!regex.test(email)) {
            this.setState({
                Email: '',
                ErrorEmail: 'Enter correct email'
            })

        } else {
            this.setState({
                Email: email,
                ErrorEmail: ''
            })

        }
    }

    handlePassword = (password) => {
        const regex = new RegExp('^[A-Za-z0-9@]{1,}$')
        if (!regex.test(password)) {
            this.setState({
                password: '',
                ErrorPassword: 'Enter Password in correct format'
            })
        } else {
            this.setState({
                password: password,
                ErrorPassword: ''
            })
        }
    }

    handleConfirmPassword = (value) => {
        console.log(value)
        if (this.state.password.includes(value)) {
            this.setState({
                confirmPassword: value,
                ErrorConfirmPassword: ''
            })
        }
        else {
            this.setState({
                confirmPassword : '',
                ErrorConfirmPassword: 'Password not match'
            })
        }
    }

    setChecked = () => {
        this.setState({
            checked: !this.state.checked,
            secure: !this.state.secure
        })
    }

    setDate = (value) => {
        console.log(value)
        this.setState({
            date: value
        })
    }

    openDatePicker = () => {
        this.setState({
            datePickerVisibility: true
        })
    }

    closeDatePicker = () => {
        this.setState({
            datePickerVisibility: false
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={{
                    height: '90%',
                    margin: '10%'
                }} >
                    <Text style={{ fontWeight: 'bold', fontSize: 40, marginTop: '10%' }}>Create Account,</Text>
                    <Text style={{ fontSize: 20, color: 'gray', marginBottom: '10%' }}>Sign up to get started!</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={{ width: '48%', margin: '1%' }}
                            mode='outlined'
                            label='Firstname'
                            value={this.state.firstName}
                            onChangeText={this.handleFirstname} />

                        <TextInput
                            style={{ width: '48%', margin: '1%' }}
                            mode='outlined'
                            label='Lastname'
                            value={this.state.lastName}
                            onChangeText={this.handleLastname} />
                    </View>

                    <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.errorFirstname}
                        <Text style={{ marginLeft: '1%', color: 'red' }}> {this.state.errorLastname}</Text>
                    </Text>

                    <View style={{ alignContent: 'center', flexDirection: 'column' }}>

                        <TouchableOpacity onPress={this.openDatePicker}>
                            <Text>Select Date : {this.state.date.toString()}</Text>
                        </TouchableOpacity>
                        {
                            this.state.datePickerVisibility &&
                            <View style={{ borderColor: 'black', borderWidth: 1 }}>
                                <DatePicker
                                    fadeToColor={'white'}
                                    mode='date'
                                    date={this.state.date}
                                    onDateChange={this.setDate}
                                />
                                <Button style={{ alignSelf: 'flex-end' }} onPress={this.closeDatePicker}>Close</Button>
                            </View>
                        }
                    </View>
                    <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.errorDate}</Text>
                    <TextInput
                        style={{ margin: '1%' }}
                        mode='outlined'
                        label='Email'
                        value={this.state.email}
                        onChangeText={this.handleEmail} />
                    <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.errorEmail}</Text>
                    <TextInput
                        style={{ margin: '1%' }}
                        mode='outlined'
                        label='Password'
                        value={this.state.password}
                        onChangeText={this.handlePassword}
                        secureTextEntry={this.state.secure} />

                    <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.errorPassword}</Text>
                    <TextInput
                        style={{ margin: '1%' }}
                        mode='outlined'
                        label='Confirm Password'
                        value={this.state.confirmPassword}
                        onChangeText={this.handleConfirmPassword}
                        secureTextEntry={this.state.secure} />
                    <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.errorConfirmPassword}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={this.state.checked ? "checked" : "unchecked"}
                            onPress={this.setChecked}
                            uncheckedColor='red'
                        />
                        <Text style={{ margin: '1%' }}>Show Password</Text>
                    </View>

                    <Button mode='contained'
                        style={{
                            marginTop: '20%',
                            width: '100%',
                            height: '5%',
                            alignSelf: 'flex-end',
                            justifyContent: 'center',
                            backgroundColor: 'red',
                        }}
                        labelStyle={{ fontSize: 20 }}
                        onPress={this.registerUser}>Sign up</Button>
                </View>
            </ScrollView>

        )

    }
}