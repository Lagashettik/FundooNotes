import React, { Component } from 'react';
import { View, BackHandler, Button } from 'react-native';
import { Appbar, TextInput, IconButton, Text } from 'react-native-paper';
import NoteBottomSheet from './noteBottomSheet'
import DataServices from '../../services/dataServices';
import RBSheet from 'react-native-raw-bottom-sheet';

export default class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note: "",
            title: "",
            noteBottomSheetShow : ''
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
        this.createOrUpdateNote()
        this.props.navigation.push('dashboard')
    }

    createOrUpdateNote = async () => {
        if (this.props.route.params.note == undefined) {
            if (this.state.title != "" || this.state.note != "") {
                let note = {
                    title: this.state.title,
                    note: this.state.note
                }
                console.log(note)
                await new DataServices().saveNotesToDatabase(note)
            }
        } else {
            this.updateNote()
        }
    }

    updateNote = () => {
        console.log("inside update")
        console.log("state : " + JSON.stringify({
            note: this.state.note,
            note: this.state.title
        }) + " key : " + this.props.route.params.key)
        if (!this.checkUpdate()) {
            let note = {
                title: this.state.title,
                note: this.state.note
            }
            new DataServices().updateNotesToDatabase(note, this.props.route.params.key)
                .then(() => console.log("Update completed!!!"))
                .catch(error => console.log(error))
        }
    }

    checkUpdate = () => JSON.stringify({
        note: this.state.note,
        note: this.state.title
    }) === JSON.stringify(this.props.route.params.note)


    deleteNote = () => {
        if (this.props.route.params.key != undefined) {
            new DataServices().removeNotesFromDatabase(this.props.route.params.key)
            this.props.navigation.navigate('dashboard')
        }
    }

    backAction = async () => {
        await this.createOrUpdateNote()
        this.props.navigation.push('dashboard')
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
                <Appbar theme={{ colors: { primary: 'white' } }} style={{ height: '7%' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                        <IconButton icon="plus-box-outline" color='red' onPress={() => this.setState({
                            noteBottomSheetShow : 'plus'
                        })}/>
                        <IconButton icon="dots-vertical" color='red' onPress={() => this.setState({
                            noteBottomSheetShow : 'dots'
                        })} />
                        {
                            this.state.noteBottomSheetShow == 'plus' ? <NoteBottomSheet open='plus'/>
                            : this.state.noteBottomSheetShow == 'dots' ? <NoteBottomSheet open='dots' /> : null
                        }
                    </View>
                </Appbar>
            </View>
        )
    }
}