import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../components/login';
import Registration from '../components/registration';
import ForgotPassword from '../components/forgotPassword';
import Logout from '../components/logout';
import Dashboard from '../components/dashboard';

const Stack = createStackNavigator();

ApplicationStack = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="dashboard" headerMode='none'>
                <Stack.Screen name="registration" component={Registration} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="forgot-password" component={ForgotPassword} />
                <Stack.Screen name="logout" component={Logout} />
                <Stack.Screen name="dashboard" component={Dashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ApplicationStack;