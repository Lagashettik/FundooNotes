import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar, TextInput, IconButton, Text } from 'react-native-paper';
import { NotesData } from '../../database/notesData';
import DataServices from '../../services/dataServices';
import { globalLabelConstant } from '../styles/globalStyleData.styles'

export default class Notes extends Component {
    constructor() {
        super()
        this.state = {
            title: 'Titles',
            note: "data \n",
            label: globalLabelConstant.other
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
        this.createNote()
        this.props.navigation.navigate('dashboard')
    }

    createNote = async () => {
        let note = { ...this.state }
        console.log(note)
        console.log("Array Size : " + NotesData.length)
        NotesData.push(note)
        this.setState({
            title: '',
            note: '',
            label: ''
        })
        await new DataServices().saveNotesToDatabase(NotesData)
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
                            <IconButton icon="archive" color='red' />
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
                <Appbar theme={{ colors: { primary: 'white' } }} style={{ justifyContent: 'space-between', height:'7%' }}>
                    <IconButton icon="plus-box-outline" color='red' />
                    <IconButton icon="dots-vertical" color='red' />
                </Appbar>
            </View>
        )
    }
}