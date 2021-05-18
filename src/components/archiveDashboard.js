import React, { Component } from 'react';
import { View } from 'react-native';
import DisplayNotes from './displayNotes';
import DataServices from '../../services/dataServices';

export default class ArchiveDashboard extends Component {
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
            <View style={{ height: '100%', width: '100%', paddingTop: '5%' }}>
                <DisplayNotes filterNotes='archive' navigation={this.props.navigation} notes={this.state.notes} />
            </View>
        )
    }
}