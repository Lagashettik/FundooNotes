import React from 'react';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import Dashboard from '../components/dashboard';
import Logout from '../components/logout';
import ArchiveDashboard from '../components/archiveDashboard';
import DeletedDashboard from '../components/deletedDashboard';

const Drawer = createDrawerNavigator();

const MenuDrawer = () => {
    return (
        <Drawer.Navigator drawerType='Slide' drawerStyle={{ width: '50%' }}>
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Archive" component={ArchiveDashboard} />
            <Drawer.Screen name="Deleted" component={DeletedDashboard}/>
            <Drawer.Screen name="Sign Out" component={Logout} />
        </Drawer.Navigator>
    );
}

export default MenuDrawer;