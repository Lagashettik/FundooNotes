import React, { Component } from "react"
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, Button, Checkbox } from 'react-native-paper'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { globalStylesheet } from '../styles/global.styles'
import { registrationStyleSheet } from '../styles/registration.styles'
import { globalColorConstant, globalFontConstant, globalThemeConstant } from "../styles/globalStyleData.styles"
import UserServices from "../../services/userServices"

export default class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            dateOfBirth: '',
            errorFirstName: '',
            errorLastName: '',
            errorEmail: '',
            errorPassword: '',
            errorDateOfBirth: '',
            errorConfirmPassword: '',
            secure: true,
            checked: false,
            datePickerVisibility: false,
            snackVisible: false,
            tempDate: new Date()
        }
    }

    userRegister = async () => {
        if (this.state.email == '' && this.state.password == '') {
            this.setState({
                snackVisible: true
            })
        }
        else {
            let userServices = new UserServices()
            const user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                date: this.state.dateOfBirth.toString(),
                emailId: this.state.email
            }
            let value = await userServices.userRegister(user, this.state.password)
            if (value == '') {
                this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })

                this.props.navigation.navigate('dashboard')
            } else {
                console.log('errorMessage' + value)
            }
            
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

    setDateOfBirth = (value) => {
        let mValue = moment(value).format('DD-MM-YYYY')
        console.log(mValue)
        this.setState({
            dateOfBirth: mValue,
            tempDate: value
        })
        console.log(this.state.dateOfBirth)
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

    goToLogin = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={globalStylesheet.parent_conatiner_view} >
                <Text style={registrationStyleSheet.header}>Create Account,</Text>
                <Text style={globalStylesheet.primary_Text}>Sign up to get started!</Text>
                <View style={registrationStyleSheet.name_container}>
                    <TextInput
                        style={registrationStyleSheet.name_input}
                        mode='outlined'
                        label='Firstname'
                        value={this.state.firstName}
                        onChangeText={this.handleFirstName}
                        theme={globalThemeConstant.textInputTheme} />

                    <TextInput
                        style={registrationStyleSheet.name_input}
                        mode='outlined'
                        label='Lastname'
                        value={this.state.lastName}
                        onChangeText={this.handleLastName}
                        theme={globalThemeConstant.textInputTheme} />
                </View>

                <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.errorFirstName}
                    <Text style={{ marginLeft: '1%', color: 'red' }}> {this.state.errorLastName}</Text>
                </Text>

                <View style={{ alignContent: 'center', flexDirection: 'column' }}>

                    <TouchableOpacity onPress={this.openDatePicker}>
                        <Text style={{ margin: '1%', fontSize : globalFontConstant.H3 }}>Select Date : {this.state.dateOfBirth}</Text>
                    </TouchableOpacity>
                    {
                        this.state.datePickerVisibility &&
                        <View style={{ borderColor: 'red', borderWidth: 1 }}>
                            <DatePicker
                                fadeToColor={'white'}
                                mode='date'
                                date={this.state.tempDate}
                                onDateChange={this.setDateOfBirth}
                            />
                            <Button style={registrationStyleSheet.close_button}
                                mode="outlined"
                                labelStyle={{ color: globalColorConstant.PRIMARYCOLOR }}
                                onPress={this.closeDatePicker}>Close</Button>
                        </View>
                    }
                </View>
                <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.errorDateOfBirth}</Text>
                <TextInput
                    style={{ margin: '1%' }}
                    mode='outlined'
                    label='Email'
                    value={this.state.email}
                    onChangeText={this.handleEmail}
                    theme={globalThemeConstant.textInputTheme} />
                <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.errorEmail}</Text>
                <TextInput
                    style={{ margin: '1%' }}
                    mode='outlined'
                    label='Password'
                    value={this.state.password}
                    onChangeText={this.handlePassword}
                    secureTextEntry={this.state.secure}
                    theme={globalThemeConstant.textInputTheme} />

                <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.errorPassword}</Text>
                <TextInput
                    style={{ margin: '1%' }}
                    mode='outlined'
                    label='Confirm Password'
                    value={this.state.confirmPassword}
                    onChangeText={this.handleConfirmPassword}
                    secureTextEntry={this.state.secure}
                    theme={globalThemeConstant.textInputTheme} />
                <Text style={{ marginLeft: '1%', color: 'red' }}>{this.state.errorConfirmPassword}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox
                        status={this.state.checked ? "checked" : "unchecked"}
                        onPress={this.setChecked}
                        uncheckedColor='red'
                    />
                    <Text style={{ margin: '1%', fontSize : globalFontConstant.H3 }}>Show Password</Text>
                </View>

                <Button mode='contained'
                    style={registrationStyleSheet.button_SignUp}
                    labelStyle={{ fontSize: 20 }}
                    onPress={this.userRegister}
                    theme={globalThemeConstant.textInputTheme}>Sign up</Button>

                <View style={{ height: '10%', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text>I already have account,</Text>
                    <TouchableOpacity onPress={this.goToLogin}>
                        <Text style={{ alignSelf: 'center', color: 'red', fontWeight: 'bold' }}> Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}