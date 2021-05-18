import React, { Component } from 'react';
import { View } from 'react-native';
import DisplayNotes from './displayNotes';
import DataServices from '../../services/dataServices';
import { Appbar, Text } from 'react-native-paper';

export default class ArchiveDashboard extends Component {
    constructor() {
        super()
        this.state = {
            notes: {},
            showGrid: false
        }
    }

    componentDidMount() {
        new DataServices().getNotesFromDatabase().then(data => this.setState({ notes: data }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <View>
                    <Appbar
                        style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}
                        theme={{ colors: { primary: 'red' } }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Appbar.Action icon="view-headline" size={30} color='white' onPress={() => this.props.navigation.toggleDrawer()} />
                            <Text style={{ fontSize: 30, color: 'white' }}>Archive</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Appbar.Action icon="magnify" size={30} color='white' />
                            <Appbar.Action icon={this.state.showGrid ? "view-grid-outline" : "view-agenda-outline"}
                                size={30}
                                color='white'
                                onPress={() => this.setState({ showGrid: !this.state.showGrid })} />
                        </View>
                    </Appbar>
                </View>

                <DisplayNotes filterNotes='archive' navigation={this.props.navigation}
                    notes={this.state.notes} showGrid={() => this.state.showGrid} />
            </View>
        )
    }
}