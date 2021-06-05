import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import {
    Appbar, TextInput, IconButton, Text, Chip, Modal, Portal, Provider, Button
} from 'react-native-paper';
import DataServices from '../../services/dataServices';
import RBSheet from 'react-native-raw-bottom-sheet';
import RBSheetComponent from './RBSheetComponent'
import StringsOfLanguages from '../localization/stringsOfLanguages';
import AddReminder from './addReminder';

export default class NoteEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            note: "",
            title: "",
            selectedIcon: '',
            labels: '',
            labelArray: [],
            disableTouch: false,
            showAddReminder: false
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
                    note: this.state.note,
                    labels: this.state.labels
                }
                console.log(note)
                new DataServices().saveNotesToDatabase(note)
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
                note: this.state.note,
                labels: this.state.labels
            }
            new DataServices().updateNoteToDatabase(note, this.props.route.params.key)
                .then(() => console.log("Update completed!!!"))
                .catch(error => console.log(error))
        }
    }

    checkUpdate = () => JSON.stringify({
        note: this.state.note,
        note: this.state.title
    }) === JSON.stringify(this.props.route.params.note)

    componentDidMount() {
        console.log('component')
        if (this.props.route.params.note != undefined) {
            if (this.props.route.params.note.labels != undefined) {
                let arrayLabelKeys = this.props.route.params.note.labels.split(',')
                let arrayLabel = []
                arrayLabelKeys.map(key => new DataServices().getLabelName(key).then(async labelName => {
                    await arrayLabel.push(labelName)
                    this.setState({
                        labelArray: arrayLabel
                    })
                })
                    .catch(error => console.log(error)))
            }
            this.setState({
                title: this.props.route.params.note.title,
                note: this.props.route.params.note.note,
                labels: this.props.route.params.labels
            })
        } else {
            this.setState({
                note: "",
                title: "",
                labels: '',
                labelArray: []
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

    handlePlusIconButton = async () => {
        if (!this.state.disableTouch) {
            await this.setState({
                selectedIcon: 'plus'
            })
            this.RBSheet.open()
        }
    }

    handleDotsIconButton = async () => {
        await this.setState({
            selectedIcon: 'dots'
        })
        this.RBSheet.open()
    }

    archiveNote = () => {
        if (this.props.route.params.key != undefined && !this.state.disableTouch)
            new DataServices().archiveNote(this.props.route.params.key)
    }

    lablesToArray = () => {
        arrayLabel = this.state.labels.split(',')
    }

    handleBellPlusIconButton = async () => {
        await this.setState({
            selectedIcon: 'bell'
        })
        this.RBSheet.open()
    }

    showAddReminder = () => {
        this.setState({
            showAddReminder: true
        })
        this.RBSheet.close()
    }
    hideAddReminder = () => this.setState({ showAddReminder: false })

    render() {
        return (
            <View style={{ height: '100%', justifyContent: 'space-between', backgroundColor: 'white', marginLeft: '1%' }}>
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
                                <IconButton icon="bell-plus-outline" color='red' onPress={this.handleBellPlusIconButton} />
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
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: '2%' }}>
                            {
                                this.state.labelArray != [] && this.state.labelArray != undefined &&
                                this.state.labelArray.map(labelName => {
                                    return (
                                        <Chip mode={'outlined'} style={{ width: '30%', marginLeft: '1%' }} key={labelName}>{labelName}</Chip>
                                    )
                                })
                            }
                        </View>
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

                <AddReminder handleShowAddReminder={this.showAddReminder} hideAddReminder={this.hideAddReminder}
                showAddReminder={this.state.showAddReminder}  />

                <Appbar theme={{ colors: { primary: 'white' } }} style={{ height: '7%' }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                        <IconButton icon="plus-box-outline" color='red' onPress={this.handlePlusIconButton} />
                        <IconButton icon="dots-vertical" color='red' onPress={this.handleDotsIconButton} />
                        <RBSheet
                            ref={ref => {
                                this.RBSheet = ref;
                            }}
                            height={this.state.disableTouch ? 100 : this.state.selectedIcon != 'bell' ? 300 : 100}
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
                                    this.state.selectedIcon == 'dots' ?
                                        <RBSheetComponent
                                            selectedIcon={this.state.selectedIcon}
                                            deleteOutline="delete-outline" deleteOutlineLabel={StringsOfLanguages.delete}
                                            contentCopy="content-copy" contentCopyLabel={StringsOfLanguages.makeCopy}
                                            shareVariant="share-variant" shareVariantLabel={StringsOfLanguages.send}
                                            accountPlusOutline="account-plus-outline" accountPlusOutlineLabel={StringsOfLanguages.collaborator}
                                            labelOutline="label-outline" labelOutlineLabel={StringsOfLanguages.labels}
                                            noteKey={this.props.route.params.key != undefined ? this.props.route.params.key : undefined}
                                            navigation={this.props.navigation} disableTouch={this.state.disableTouch}
                                        /> :
                                        <RBSheetComponent
                                            selectedIcon={this.state.selectedIcon}
                                            showAddReminder={this.showAddReminder}
                                            clockOutline='clock-outline' clockLabel='Choosee a date and time'
                                            placeOutline='map-marker-outline' placeLabel='Choose a place'
                                        />
                            }
                        </RBSheet>
                    </View>
                </Appbar>
            </View>
        )
    }
}