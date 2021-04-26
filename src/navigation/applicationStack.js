import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../components/login';
import Registration from '../components/registration';
import ForgotPassword from '../../../Details/forgotPassword';
import Register from '../components/register';

const Stack = createStackNavigator();

ApplicationStack = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="login" headerMode='none'>
                <Stack.Screen name="registration" component={Registration} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="register" component={Register}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ApplicationStack;