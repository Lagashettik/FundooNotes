import React, { Component } from "react"
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { TextInput, Button, Checkbox } from 'react-native-paper'
import DatePicker from 'react-native-date-picker'
import firebase from '../../database/firebase'
import moment from 'moment'
import { globalStylesheet } from '../styles/global.styles'
import { registrationStyleSheet } from '../styles/registration.styles'

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
            errorFirstName: '',
            errorLastName: '',
            errorEmail: '',
            errorPassword: '',
            errorDate: '',
            errorConfirmPassword: '',
            secure: true,
            checked: false,
            datePickerVisibility: false,
            snackVisible: false
        }
    }

    registerUser = () => {
        if (this.state.email == '' && this.state.password == '') {
            this.setState({
                snackVisible: true
            })
        }
        else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    
                    console.log('User registration successfully')
                    this.setState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        date: new Date(),
                        snackVisible: false
                    })
                    this.props.navigation.navigate('login')
                })
                .catch(error => console.log(error.message))
        }
    }

    handleFirstName = async (value) => {
        const regex = new RegExp('^[A-Z]{1}[a-z]{0,}$')
        if (!regex.test(value)) {
            await this.setState({
                firstName: '',
                errorFirstName: 'Enter Firstname correctly e.g. Krishna'
            })
        }
        else {
            await this.setState({
                firstName: value,
                errorFirstName: ''
            })
        }
    }

    handleLastName = async (value) => {
        const regex = new RegExp('^[A-Z]{1}[a-z]{0,}$')
        if (!regex.test(value)) {
            this.setState({
                lastName: '',
                errorLastName: 'Enter Lastname correctly e.g. Krishna'
            })
        } else {
            this.setState({
                lastName: value,
                errorLastName: ''
            })
        }
    }

    handleEmail = (value) => {
        const regex = new RegExp('^[A-Za-z0-9@.-]{0,}$')
        if (!regex.test(value)) {
            this.setState({
                email: '',
                errorEmail: 'Enter correct email e.g.Gameplay@gmail.com'
            })

        } else {
            this.setState({
                email: value,
                errorEmail: ''
            })

        }
    }

    handlePassword = (password) => {
        const regex = new RegExp('^[A-Za-z0-9@]{1,}$')
        if (!regex.test(password)) {
            this.setState({
                password: '',
                errorPassword: 'only @ special character allowed'
            })
        } else {
            this.setState({
                password: password,
                errorPassword: ''
            })
        }
    }

    handleConfirmPassword = (value) => {
        console.log(value)
        if (this.state.password.includes(value)) {
            this.setState({
                confirmPassword: value,
                errorConfirmPassword: ''
            })
        }
        else {
            this.setState({
                confirmPassword: '',
                errorConfirmPassword: 'Password not match re-enter password'
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
        let mValue = moment(value).format('DD-MM-YYYY')
        console.log(mValue)
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
                <View style={globalStylesheet.parent_conatiner_view} >
                    <Text style={registrationStyleSheet.header}>Create Account,</Text>
                    <Text style={{ fontSize: 20 }}>Sign up to get started!</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={{ width: '48%', margin: '1%' }}
                            mode='outlined'
                            label='Firstname'
                            value={this.state.firstName}
                            onChangeText={this.handleFirstName} />

                        <TextInput
                            style={{ width: '48%', margin: '1%' }}
                            mode='outlined'
                            label='Lastname'
                            value={this.state.lastName}
                            onChangeText={this.handleLastName} />
                    </View>

                    <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.errorFirstName}
                        <Text style={{ marginLeft: '1%', color: 'red' }}> {this.state.errorLastName}</Text>
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