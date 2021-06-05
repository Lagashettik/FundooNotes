import React, { Component } from 'react';
import { View } from 'react-native';
import DisplayNotes from './displayNotes';
import DataServices from '../../services/dataServices';
import { Appbar, Text } from 'react-native-paper';
import StringsOfLanguages from '../localization/stringsOfLanguages';

export default class DeletedDashboard extends Component {
    constructor() {
        super()
        this.state = {
            notes: {}
        }
    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%' }}>

                <View>
                    <Appbar
                        style={{ width: '100%', flexDirection: 'row' }}
                        theme={{ colors: { primary: 'red' } }}>
                        <Appbar.Action icon="view-headline" size={30} color='white' onPress={() => this.props.navigation.toggleDrawer()} />
                        <Text style={{ fontSize: 30, color: 'white' }}>{StringsOfLanguages.deleted}</Text>
                    </Appbar>
                </View>

                <DisplayNotes filterNotes='deleted' navigation={this.props.navigation}
                     showGrid={() => false} />
            </View>
        )
    }
}