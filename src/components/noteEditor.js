import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { Appbar, TextInput, IconButton, Text } from 'react-native-paper';
import DataServices from '../../services/dataServices';
import RBSheet from 'react-native-raw-bottom-sheet';
import RBSheetComponent from './RBSheetComponent'
import StringsOfLanguages from '../localization/stringsOfLanguages';

export default class NoteEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note: "",
            title: "",
            selectedIcon: '',
            disableTouch: false
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
        if (!this.state.disableTouch) {
            await this.createOrUpdateNote()
            this.props.navigation.push('home-page')
        } else this.props.navigation.navigate('Deleted')

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

    componentDidMount() {
        if (this.props.route.params.note != undefined) {
            this.setState({
                title: this.props.route.params.note.title,
                note: this.props.route.params.note.note
            })
        } else {
            this.setState({
                title: '',
                note: ''
            })
        }

        if (this.props.route.params.disableTouch != undefined)
            this.setState({
                disableTouch: this.props.route.params.disableTouch
            })


        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backActionOrGoToDashboard
        );

    }

    componentWillUnmount() {

        this.backHandler.remove();
    }

    handlePlusIconButton = () => {
        if (!this.state.disableTouch) {
            this.setState({
                selectedIcon: 'plus'
            })
            this.RBSheet.open()
        }
    }

    handleDotsIconButton = () => {
        this.setState({
            selectedIcon: 'dots'
        })
        this.RBSheet.open()
    }

    archiveNote = () => {
        if (this.props.route.params.key != undefined && !this.state.disableTouch)
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
                        {
                            !this.state.disableTouch &&
                            <View style={{ width: '50%', justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <IconButton icon="pin-outline" color='red' />
                                <IconButton icon="bell-plus-outline" color='red' />
                                <IconButton icon={require('../assets/archive.png')} color='red' onPress={this.archiveNote} />
                            </View>
                        }
                    </Appbar>
                    <View>
                        <TextInput placeholder={StringsOfLanguages.title}
                            style={{ backgroundColor: 'white', fontSize: 30, fontWeight: 'bold' }}
                            placeholderTextColor='gray' mode='flat' selectionColor='red'
                            underlineColor='white' disabled={this.state.disableTouch}
                            theme={{
                                colors: {
                                    primary: 'white'
                                }
                            }}
                            value={this.state.title}
                            onChangeText={this.handleTitle} />
                        <TextInput placeholder={StringsOfLanguages.note} style={{ backgroundColor: 'white' }}
                            multiline={true} mode='flat' selectionColor='red'
                            underlineColor='white' disabled={this.state.disableTouch}
                            theme={{
                                colors: {
                                    primary: 'white'
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
                            height={this.state.disableTouch ? 100 : 300}
                            openDuration={250}
                            customStyles={{
                                container: {
                                    justifyContent: "center",
                                    alignContent: "center",
                                    marginBottom: 60
                                }
                            }}
                        >{
                                this.state.selectedIcon == 'plus' ?
                                    <RBSheetComponent
                                        selectedIcon={this.state.selectedIcon}
                                        camera="camera" cameraLabel={StringsOfLanguages.takePhoto}
                                        imageOutline="image-outline" imageOutlineLabel={StringsOfLanguages.addImage}
                                        brush="brush" brushLabel={StringsOfLanguages.drawing}
                                        mic="microphone-outline" micLabel={StringsOfLanguages.recording}
                                        box="check-box-outline" boxLabel={StringsOfLanguages.tickBoxes}
                                        noteKey={this.props.route.params.key != undefined ? this.props.route.params.key : undefined}
                                        navigation={this.props.navigation} disableTouch={this.state.disableTouch}
                                    /> :
                                    <RBSheetComponent
                                        selectedIcon={this.state.selectedIcon}
                                        deleteOutline="delete-outline" deleteOutlineLabel={StringsOfLanguages.delete}
                                        contentCopy="content-copy" contentCopyLabel={StringsOfLanguages.makeCopy}
                                        shareVariant="share-variant" shareVariantLabel={StringsOfLanguages.send}
                                        accountPlusOutline="account-plus-outline" accountPlusOutlineLabel={StringsOfLanguages.collaborator}
                                        labelOutline="label-outline" labelOutlineLabel={StringsOfLanguages.labels}
                                        noteKey={this.props.route.params.key != undefined ? this.props.route.params.key : undefined}
                                        navigation={this.props.navigation} disableTouch={this.state.disableTouch}
                                    />
                            }
                        </RBSheet>
                    </View>
                </Appbar>
            </View>
        )
    }
}