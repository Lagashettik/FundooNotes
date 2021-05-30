import React, { Component } from 'react';
import { BackHandler, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Appbar, Text } from 'react-native-paper';
import DataServices from '../../services/dataServices';
import StringsOfLanguages from '../localization/stringsOfLanguages';
import DisplayLabels from './displayLabels';

export default class CreateUpdateLabel extends Component {
    constructor() {
        super()
        this.state = {
            editing: null,
            label: '',
            labels: {},
            selectedLabels: []
        }
    }

    componentDidMount() {
        new DataServices().getLabelsFromDatabase()
            .then(data => {
                data != null && this.setState({ labels: data })
            })
            .catch(error => console.log(error))

        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.gotoHomePage)

    }

    componentWillUnmount = () => {
        this.backHandler.remove()
    }

    textInputFocused = (data) => {
        this.setState({
            editing: data,
            label: ''
        })
    }

    addLabel = (labelName) => {
        this.setState({
            label: labelName
        })
    }

    addOrUpdateLabelToDatabase = () => {
        if (this.state.label != '') {
            let label = {
                labelName: this.state.label
            }
            new DataServices().addLabelToDatabase(label)
        }
        if (this.props.route.params != undefined)
            this.props.navigation.navigate('note-editor')
        else
            this.props.navigation.push('create-selection-label')
    }

    updateLabel = (labelName) => {
        this.setState({
            updatingLabel: labelName
        })
    }

    focusUpdateLabel = (labelName) => this.setState({ updatingLabel: labelName })

    updateLabels = (key) => {
        let labels = this.state.labels
        labels[key].labelName = this.state.updatingLabel
        this.setState({
            labels: labels
        })

        let newLabel = {
            labelName: this.state.updatingLabel
        }
        new DataServices().updateLabelToDatabase(newLabel, key)
        this.setState({
            updatingLabel: '',
            label: ''
        })
    }

    deleteLabel = (key) => {
        new DataServices().deleteLabelFromDatabase(key)
        this.props.navigation.push('create-selection-label')
    }

    gotoHomePage = () => this.props.navigation.push('home-page')

    getSelectedLabels = (labelsArray) => {
        this.setState({
            selectedLabels: labelsArray
        })
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                {this.props.route.params == undefined && <Appbar style={{ backgroundColor: 'red' }} >
                    <Appbar.Action icon="keyboard-backspace" color='white' onPress={this.gotoHomePage} />
                    <Text style={{ fontSize: 30, color: 'white' }}>{StringsOfLanguages.editLabelTitle}</Text>
                </Appbar>}

                <DisplayLabels labels={this.state.labels} getSelectedLabels={this.getSelectedLabels} />
            </View>
        )
    }
}
// this.state.editing.toString()).includes(key)