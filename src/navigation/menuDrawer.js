import React from 'react';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import Dashboard from '../components/dashboard';
import Notes from '../components/notes';
import Logout from '../components/logout';
import SplashScreen from '../components/splashScreen';

const Drawer = createDrawerNavigator();

const MenuDrawer = () => {
    return (
        <Drawer.Navigator drawerType='slide' drawerStyle={{ width: '50%' }}>
            <Drawer.Screen name="dashboard" component={Dashboard} />
            <Drawer.Screen name="notes" component={Notes} />
            <Drawer.Screen name="Sign Out" component={Logout} />
        </Drawer.Navigator>
    );
}

export default MenuDrawer;