import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../components/login';
import Registration from '../components/registration';
import ForgotPassword from '../components/forgotPassword';
import Logout from '../components/logout';
import Dashboard from '../components/dashboard';
import NoteEditor from '../components/noteEditor';
import MenuDrawer from './menuDrawer';
import DisplayNotes from '../components/displayNotes';
import SplashScreen from '../components/splashScreen';
import CreateUpdateLabel from '../components/createUpdateLabel';
import DisplayLabels from '../components/displayLabels';
import SearchSelectLabel from '../components/searchSelectLabel';

const Stack = createStackNavigator();

ApplicationStack = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="splash-screen" headerMode='none'>
                <Stack.Screen name="splash-screen" component={SplashScreen}/>
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="registration" component={Registration} />
                <Stack.Screen name="forgot-password" component={ForgotPassword} />
                <Stack.Screen name="logout" component={Logout} />
                <Stack.Screen name="dashboard" component={Dashboard} />
                <Stack.Screen name="note-editor" component={NoteEditor} />
                <Stack.Screen name="display-note" component={DisplayNotes} />
                <Stack.Screen name="create-update-label" component={CreateUpdateLabel}/>
                <Stack.Screen name="display-labels" component={DisplayLabels} />
                <Stack.Screen name="search-select-label" component={SearchSelectLabel}/>
                <Stack.Screen name="home-page" component={MenuDrawer} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ApplicationStack;