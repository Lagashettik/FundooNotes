import React, { Component } from 'react';
import { View, BackHandler, Button } from 'react-native';
import { Appbar, TextInput, IconButton, Text } from 'react-native-paper';
import DataServices from '../../services/dataServices';
import RBSheet from 'react-native-raw-bottom-sheet';
import RBSheetComponent from './RBSheetComponent'

export default class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note: "",
            title: "",
            selectedIcon: ''
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

    backActionOrGoToDashboard = async () => {
        await this.createOrUpdateNote()
        this.props.navigation.push('home-page')
        return true
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

    backAction = async () => {
        await this.createOrUpdateNote()
        this.props.navigation.push('home-page')
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
            this.backActionOrGoToDashboard
        );

    }

    componentWillUnmount() {
        if (this.props.route.params != undefined)
            if (this.props.route.params.note != undefined)
                this.setState({
                    title: '',
                    note: ''
                })

        this.backHandler.remove();
    }

    handlePlusIconButton = () => {
        this.setState({
            selectedIcon: 'plus'
        })
        this.RBSheet.open()
    }

    handleDotsIconButton = () => {
        this.setState({
            selectedIcon: 'dots'
        })
        this.RBSheet.open()
    }

    archiveNote = () => {
        if (this.props.route.params.key != undefined)
            new DataServices().archiveNote(this.props.route.params.key)
    }

    render() {
        return (
            <View style={{ height: '100%', justifyContent: 'space-between', backgroundColor: 'white' }}>
                <View>
                    <Appbar
                        style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}
                        theme={{ colors: { primary: 'white' } }}>
                        <View style={{ width: '50%' }}>
                            <IconButton icon="keyboard-backspace" color='red' onPress={this.backActionOrGoToDashboard} />
                        </View>
                        <View style={{ width: '50%', justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <IconButton icon="pin-outline" color='red' />
                            <IconButton icon="bell-plus-outline" color='red' />
                            <IconButton icon={require('../assets/archive.png')} color='red' onPress={this.archiveNote} />
                        </View>
                    </Appbar>
                    <View>
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
                                    primary: 'transparent'
                                }
                            }}
                            value={this.state.note}
                            onChangeText={this.handleNote} />
                    </View>
                </View>

                <Appbar theme={{ colors: { primary: 'white' } }} style={{ height: '7%' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                        <IconButton icon="plus-box-outline" color='red' onPress={this.handlePlusIconButton} />
                        <IconButton icon="dots-vertical" color='red' onPress={this.handleDotsIconButton} />
                        <RBSheet
                            ref={ref => {
                                this.RBSheet = ref;
                            }}
                            height={300}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginBottom: 60
                                }
                            }}
                        >{
                                this.state.selectedIcon == 'plus' ?
                                    <RBSheetComponent
                                        selectedIcon={this.state.selectedIcon}
                                        camera="camera" cameraLabel="Take photo"
                                        imageOutline="image-outline" imageOutlineLabel="Add image"
                                        brush="brush" brushLabel="Drawing"
                                        mic="microphone-outline" micLabel="Recording"
                                        box="check-box-outline" boxLabel="Tick boxes"
                                        noteKey={this.props.route.params.key != undefined ? this.props.route.params.key : undefined}
                                        navigation={this.props.navigation}
                                    /> :
                                    <RBSheetComponent
                                        selectedIcon={this.state.selectedIcon}
                                        deleteOutline="delete-outline" deleteOutlineLabel="Delete"
                                        contentCopy="content-copy" contentCopyLabel="Make a copy"
                                        shareVariant="share-variant" shareVariantLabel="Send"
                                        accountPlusOutline="account-plus-outline" accountPlusOutlineLabel="Collaborator"
                                        labelOutline="label-outline" labelOutlineLabel="Labels"
                                        noteKey={this.props.route.params.key != undefined ? this.props.route.params.key : undefined}
                                        navigation={this.props.navigation}
                                    />
                            }
                        </RBSheet>
                    </View>
                </Appbar>
            </View>
        )
    }
}