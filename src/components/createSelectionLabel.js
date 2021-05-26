import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput, Appbar, Text, IconButton, Divider } from 'react-native-paper';
import DataServices from '../../services/dataServices';
import StringsOfLanguages from '../localization/stringsOfLanguages';

export default class CreateSelectionLabel extends Component {
    constructor() {
        super()
        this.state = {
            editing: null,
            label: '',
            labels: {},
            updatingLabel: ''
        }
    }

    componentDidMount() {
        new DataServices().getLabelsFromDatabase()
            .then(data => {
                data != null && this.setState({ labels: data })
            })
            .catch(error => console.log(error))
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
        let label = {
            labelName: this.state.label
        }
        new DataServices().addLabelToDatabase(label)
        this.props.navigation.push('create-selection-label')
    }

    updateLabel = (labelName) => {
        this.setState({
            updatingLabel: labelName
        })
    }

    focusUpdateLabel = (labelName) => this.setState({ updatingLabel: labelName })

    updateLabels = (key) => {
        labels = this.state.labels
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

    render() {
        return (
            <ScrollView style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                <Appbar style={{ backgroundColor: 'red' }} >
                    <Appbar.Action icon="keyboard-backspace" color='white' onPress={this.gotoHomePage} />
                    <Text style={{ fontSize: 30, color: 'white' }}>{StringsOfLanguages.editLabelTitle}</Text>
                </Appbar>
                <TextInput placeholder={StringsOfLanguages.createNewLabelPlaceholder} style={{ backgroundColor: 'white' }}
                    value={null}
                    onChangeText={this.addLabel}
                    style={{ backgroundColor: 'white', width: '100%' }}
                    onFocus={() => this.textInputFocused(true)}
                    onEndEditing={() => {
                        this.addOrUpdateLabelToDatabase()
                        this.textInputFocused(null)
                    }}
                    left={<TextInput.Icon name={this.state.editing == true ? 'window-close' : 'plus'} />}
                    right={this.state.editing == true ? <TextInput.Icon name='check' /> : null}
                />
                <View>
                    {
                        this.state.labels != {} && this.state.labels != null &&
                        Object.getOwnPropertyNames(this.state.labels).map(key => {
                            return (
                                <TextInput
                                    style={{ backgroundColor: 'white', width: '100%' }}
                                    value={this.state.editing == key ? this.state.updatingLabel : this.state.labels[key].labelName}
                                    onChangeText={(labelName) => this.updateLabel(labelName)}
                                    onFocus={() => {
                                        this.textInputFocused(key)
                                        this.focusUpdateLabel(this.state.labels[key].labelName)
                                    }}
                                    onEndEditing={() => {
                                        this.textInputFocused(null)
                                        this.updateLabels(key)
                                    }}
                                    key={key}
                                    right={<TextInput.Icon name={this.state.editing == key ? 'check' : 'pencil'} />}
                                    left={<TextInput.Icon name={this.state.editing == key ? 'delete-outline' : 'label-outline'}
                                        onPress={this.state.editing == key ? () => this.deleteLabel(key) : null} />}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}
