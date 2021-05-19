import React, { Component } from 'react';
import { View } from 'react-native';
import DisplayNotes from './displayNotes';
import DataServices from '../../services/dataServices';
import { Appbar, Text } from 'react-native-paper';

export default class DeletedDashboard extends Component {
    constructor() {
        super()
        this.state = {
            notes: {}
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
                        style={{ width: '100%', flexDirection: 'row' }}
                        theme={{ colors: { primary: 'red' } }}>
                        <Appbar.Action icon="view-headline" size={30} color='white' onPress={() => this.props.navigation.toggleDrawer()} />
                        <Text style={{ fontSize: 30, color: 'white' }}>Deleted</Text>
                    </Appbar>
                </View>

                <DisplayNotes filterNotes='deleted' navigation={this.props.navigation}
                    notes={this.state.notes} showGrid={() => false} />
            </View>
        )
    }
}