import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { Appbar, TextInput, IconButton, Text } from 'react-native-paper';
import DataServices from '../../services/dataServices';

export default class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            note: ""
        }
    }

    handleTitle = (value) => {
        this.setState({
            title: value
        })
    }

    handleNote = (value) => {
        this.setState({
            note: value
        })
    }

    goToDashboard = () => {
        if (this.props.route.params.note == undefined) {
            if (this.state.title != "" || this.state.note != "") {
                this.createNote()
            }
        } else {
            this.updateNote()
        }
        this.props.navigation.navigate('dashboard')
    }

    createNote = async () => {
        let note = { ...this.state }
        console.log(note)
        await new DataServices().saveNotesToDatabase(note)
    }

    updateNote = () => {
        console.log("inside update")
        console.log("state : " + JSON.stringify(this.state) + " key : " + this.props.route.params.key)
        new DataServices().updateNotesToDatabase(this.state, this.props.route.params.key)
        .then(() => console.log("Update completed!!!"))
        .catch(error => console.log(error))
    }

    deleteNote = () => {
        if(this.props.route.params.key != undefined){
        new DataServices().removeNotesFromDatabase(this.props.route.params.key)
            this.props.navigation.navigate('dashboard')
    }
    }

    backAction = async () => {
        await this.createNote()
        this.props.navigation.goBack()
        return true;
    };

    componentDidMount() {
        if (this.props.route.params.note != undefined) {
            this.setState({
                title: this.props.route.params.note.title,
                note: this.props.route.params.note.note
            })
        }

        console.log("params " + JSON.stringify(this.props.route.params.note))

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        
    }

    componentWillUnmount() {
        this.setState({
            title: '',
            note: ''
        })
        this.backHandler.remove();
    }

    render() {
        return (
            <View style={{ height: '100%', justifyContent: 'space-between', backgroundColor: 'white' }}>
                <View>
                    <Appbar
                        style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}
                        theme={{ colors: { primary: 'white' } }}>
                        <View style={{ width: '50%' }}>
                            <IconButton icon="keyboard-backspace" color='red' onPress={this.goToDashboard} />
                        </View>
                        <View style={{ width: '50%', justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <IconButton icon="pin-outline" color='red' />
                            <IconButton icon="bell-plus-outline" color='red' />
                            <IconButton icon={require('../assets/archive.png')} color='red' />
                        </View>
                    </Appbar>
                    <TextInput placeholder="Title"
                        style={{ backgroundColor: 'white', fontSize: 30, fontWeight: 'bold' }}
                        placeholderTextColor='gray' mode='flat'

                        theme={{
                            colors: {
                                primary: 'red',
                                text: 'black'
                            }
                        }}
                        value={this.state.title}
                        onChangeText={this.handleTitle} />
                    <TextInput placeholder="Note" style={{ backgroundColor: 'white' }}
                        multiline={true} mode='flat'
                        theme={{
                            colors: {
                                primary: 'red'
                            }
                        }}
                        value={this.state.note}
                        onChangeText={this.handleNote} />
                </View>
                <Appbar theme={{ colors: { primary: 'white' } }} style={{ justifyContent: 'space-between', height: '7%' }}>
                    <IconButton icon="plus-box-outline" color='red' />
                    <IconButton icon="delete-outline" color='red' onPress={this.deleteNote} />
                </Appbar>
            </View>
        )
    }
}