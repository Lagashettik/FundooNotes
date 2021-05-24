import React, { Component } from 'react';
import { BackHandler, View } from 'react-native';
import { Appbar, Searchbar, IconButton, FAB } from 'react-native-paper';
import DataServices from '../../services/dataServices';
import UserServices from '../../services/userServices';
import StringsOfLanguages from '../localization/stringsOfLanguages';
import DisplayNotes from './displayNotes';

export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            showGrid: false,
            notes: {},
            searchNote: '',
            searchOn: false
        }
    }

    logout = () => {
        new UserServices().userLogout()
            .then(() => this.props.navigation.replace('login'))
            .catch(error => console.log(error))
    }

    goToNotes = () => {
        this.props.navigation.push('note-editor', { note: undefined, key: undefined })
    }

    handleSearchBar = async (searchWord) => {
        await this.setState({
            searchNote: searchWord,
            searchOn: true
        })
        if (this.state.searchNote == '')
            this.setState({
                searchOn: false
            })
    }

    componentDidMount() {
        new DataServices().getNotesFromDatabase().then(data => this.setState({ notes: data }))
            .catch(error => console.log(error))

        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => BackHandler.exitApp())
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    render() {
        return (
            <View style={{ height: '100%', justifyContent: 'space-between', backgroundColor: 'white' }}>
                <View style={{ height: '93%' }}>
                    <Appbar theme={{
                        colors: {
                            primary: 'red'
                        }
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Appbar.Action icon="view-headline" size={30} color='white' onPress={() => this.props.navigation.toggleDrawer()} />
                            <Searchbar style={{ width: '60%', height: 45, alignSelf: 'center' }} placeholder={StringsOfLanguages.searchNote}
                                onChangeText={this.handleSearchBar} />
                            <Appbar.Action icon={this.state.showGrid ? "view-grid-outline" : "view-agenda-outline"}
                                size={30}
                                color='white'
                                onPress={() => this.setState({ showGrid: !this.state.showGrid })} />
                            <IconButton icon="face" size={30} color='white' size={30} style={{ marginLeft: -10 }} onPress={this.logout} />
                        </View>
                    </Appbar>

                    <DisplayNotes showGrid={() => this.state.showGrid} navigation={this.props.navigation} notes={this.state.notes}
                        filterNotes={undefined} searchWord={() => this.state.searchOn ? this.state.searchNote : null} />
                </View>

                <Appbar style={{ height: '7%', backgroundColor: 'red', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ justifyContent: 'space-between', width: '60%', flexDirection: 'row' }}>
                        <IconButton icon="check-box-outline" size={30} color='white' />
                        <IconButton icon="brush" size={30} color='white' onPress={this.goToNotes} />
                        <IconButton icon="microphone-outline" size={30} color='white' />
                        <IconButton icon="image-outline" size={30} color='white' />
                    </View >
                    <FAB icon="plus" style={{
                        backgroundColor: 'red', marginRight: '10%', marginTop: '-15%', borderColor: 'white',
                        borderStyle: 'solid', borderWidth: 10, borderRadius: 50
                    }} onPress={this.goToNotes} />
                </Appbar>
            </View>
        )
    }
}