import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Appbar, Button, Text, Searchbar, IconButton, Card, FAB } from 'react-native-paper';
import { NotesData } from '../../database/notesData';
import UserServices from '../../services/userServices';
import DisplayNotes from './displayNotes';

export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            showGrid: false
        }
    }

    logout = async () => {
        let userServices = new UserServices()
        let value = await userServices.userLogout()
        if (value == '')
            this.props.navigation.navigate('login')
        else
            console.log(value)
    }

    goToNotes = () => {
        this.props.navigation.navigate('notes')
    }

    render() {
        return (
            <View style={{ height: '100%' }}>
                <View style={{ height: '93%' }}>
                    <Appbar theme={{
                        colors: {
                            primary: 'red'
                        }
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <IconButton icon="view-headline" size={30} color='white' onPress={() => this.props.navigation.toggleDrawer()} />
                            <Searchbar style={{ width: '60%', height: 40, alignSelf: 'center' }} placeholder='Search notes' />
                            <IconButton icon={this.state.showGrid ? "view-grid-outline" : "view-agenda-outline"  }
                                size={30}
                                color='white'
                                onPress={() => this.setState({ showGrid: !this.state.showGrid })} />
                            <IconButton icon="face" color='white' size={30} style={{ marginLeft: -10 }} onPress={this.logout} />
                        </View>
                    </Appbar>

                    <DisplayNotes showGrid={()=>this.state.showGrid}/>
                </View>

                <Appbar style={{ height: '7%', backgroundColor: 'red', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ justifyContent: 'space-between', width: '60%', flexDirection: 'row' }}>
                        <IconButton icon="check-box-outline" size={30} color='white' />
                        <IconButton icon="brush" size={30} color='white' onPress={this.goToNotes} />
                        <IconButton icon="microphone-outline" size={30} color='white' />
                        <IconButton icon="image-outline" size={30} color='white' />
                    </View >
                    <FAB icon="plus" style={{
                        position: 'relative', backgroundColor: 'red', marginTop: '-20%', marginRight: '10%', borderColor: 'white',
                        borderStyle: 'solid', borderWidth: 10, borderRadius: 50
                    }} onPress={this.goToNotes} />
                </Appbar>
            </View>
        )
    }
}