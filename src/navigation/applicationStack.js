import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../components/login';
import Registration from '../components/registration';
import ForgotPassword from '../components/forgotPassword';
import Logout from '../components/logout';
import Dashboard from '../components/dashboard';
import Notes from '../components/notes';
import MenuDrawer from './menuDrawer';
import DisplayNotes from '../components/displayNotes';
import NoteBottomSheet from '../components/noteBottomSheet';
import SplashScreen from '../components/splashScreen';

const Stack = createStackNavigator();

ApplicationStack = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="home-page" headerMode='none'>
                <Stack.Screen name="splash-screen" component={SplashScreen}/>
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="registration" component={Registration} />
                <Stack.Screen name="forgot-password" component={ForgotPassword} />
                <Stack.Screen name="logout" component={Logout} />
                <Stack.Screen name="dashboard" component={Dashboard} />
                <Stack.Screen name="notes" component={Notes} />
                <Stack.Screen name="display-note" component={DisplayNotes} />
                <Stack.Screen name="home-page" component={MenuDrawer} />
                <Stack.Screen name="note-bottom-sheet" component={NoteBottomSheet} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ApplicationStack;