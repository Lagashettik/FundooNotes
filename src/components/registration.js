import React, { Component } from "react"
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { TextInput, Button, Checkbox } from 'react-native-paper'
import DatePicker from 'react-native-date-picker'


export default class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            confirmPassword: '',
            date: new Date(),
            ErrorFirstname: '',
            ErrorLastname: '',
            ErrorUsername: '',
            ErrorPassword: '',
            ErrorDate: '',
            ErrorConfirmPassword: '',
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
        }
        else {
            this.setState({
                lastname: value,
                ErrorLastname: ''
            })
        }
    }

    handleUsername = (username) => {
        const regex = new RegExp('^[A-Za-z0-9@.]{0,}$')
        if (!regex.test(username)) {
            this.setState({
                username: '',
                ErrorUsername: 'Enter correct Username'
            })

        }
        else {
            this.setState({
                username: username,
                ErrorUsername: ''
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
        }
        else {
            this.setState({
                password: password,
                ErrorPassword: ''
            })
        }
    }

    handleConfirmPassword = (value) => {
        if (value == this.state.password) {
            this.setState({
                confirmPassword: value,
                ErrorConfirmPassword: ''
            })
        }
        else {
            this.setState({
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

    signUp = () => {
        if (this.state.ErrorDate != '' && this.state.ErrorFirstname != '' && this.state.ErrorLastname != '' && this.state.ErrorPassword != '' && this.state.ErrorUsername != '') {
            alert('Signed up!')
        }
        else {
            alert('Enter all fields or remaining fields')
        }
    }

    setDate = (value) => {
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
                            value={this.state.firstname}
                            onChangeText={this.handleFirstname} />

                        <TextInput
                            style={{ width: '48%', margin: '1%' }}
                            mode='outlined'
                            label='Lastname'
                            value={this.state.lastname}
                            onChangeText={this.handleLastname} />
                    </View>

                    <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.ErrorFirstname}
                        <Text style={{ marginLeft: '1%', color: 'red' }}> {this.state.ErrorLastname}</Text>
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
                    <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.ErrorDate}</Text>
                    <TextInput
                        style={{ margin: '1%' }}
                        mode='outlined'
                        label='Email'
                        value={this.state.username}
                        onChangeText={this.handleUsername} />
                    <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.ErrorUsername}</Text>
                    <TextInput
                        style={{ margin: '1%' }}
                        mode='outlined'
                        label='Password'
                        value={this.state.password}
                        onChangeText={this.handlePassword}
                        secureTextEntry={this.state.secure} />

                    <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.ErrorPassword}</Text>
                    <TextInput
                        style={{ margin: '1%' }}
                        mode='outlined'
                        label='Confirm Password'
                        value={this.state.confirmPassword}
                        onChangeText={this.handleConfirmPassword}
                        secureTextEntry={this.state.secure} />
                    <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.ErrorConfirmPassword}</Text>
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
                        onPress={this.signUp}>Sign up</Button>
                </View>
            </ScrollView>

        )

    }
}