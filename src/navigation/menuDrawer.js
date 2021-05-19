import React from 'react';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import Dashboard from '../components/dashboard';
import Logout from '../components/logout';
import ArchiveDashboard from '../components/archiveDashboard';
import DeletedDashboard from '../components/deletedDashboard';
import LanguageSelection from '../components/languageSelection';
import StringsOfLanguages from '../localization/stringsOfLanguages';

const Drawer = createDrawerNavigator();

const MenuDrawer = () => {
    return (
        <Drawer.Navigator drawerType='Slide' drawerStyle={{ width: '50%' }}>
            <Drawer.Screen name={StringsOfLanguages.dashboard} component={Dashboard} />
            <Drawer.Screen name={StringsOfLanguages.archive} component={ArchiveDashboard} />
            <Drawer.Screen name={StringsOfLanguages.deleted} component={DeletedDashboard}/>
            <Drawer.Screen name={StringsOfLanguages.language} component={LanguageSelection} />
            <Drawer.Screen name={StringsOfLanguages.signOut} component={Logout} />
        </Drawer.Navigator>
    );
}

export default MenuDrawer;