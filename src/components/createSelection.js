import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput, Appbar, Text, IconButton } from 'react-native-paper';
import DataServices from '../../services/dataServices';
import StringsOfLanguages from '../localization/stringsOfLanguages';

export default class CreateSelection extends Component {
    constructor() {
        super()
        this.state = {
            labels: {},
            editing: null
        }
    }

    componentDidMount() {
        new DataServices().getLabelsFromDatabase()
            .then(data => this.setState({ labels: data }))
            .catch(error => console.log(error))
    }

    textInputFocused = (data) => {
        this.setState({
            editing: data
        })
    }

    updateLabel = (label) => { }

    gotoHomePage = () => this.props.navigation.push('home-page')

    render() {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                <Appbar style={{ backgroundColor: 'red' }} >
                    <Appbar.Action icon="keyboard-backspace" color='white' onPress={this.gotoHomePage} />
                    <Text style={{ fontSize: 30, color: 'white' }}>{StringsOfLanguages.editLabelTitle}</Text>
                </Appbar>
                <TextInput placeholder={StringsOfLanguages.createNewLabelPlaceholder} style={{ backgroundColor: 'white' }} />
                <View>
                    {
                        this.state.labels != {} &&
                        Object.getOwnPropertyNames(this.state.labels).map(data => {
                            return (
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems : 'center' }}
                                    key={data}>
                                    <IconButton icon="label-outline" />
                                    <TextInput
                                        style={{ backgroundColor: 'white', width : '75%' }}
                                        value={this.state.labels[data]}
                                        onChangeText={this.updateLabel}
                                        onFocus={() => this.textInputFocused(data)}
                                        onEndEditing={() => this.textInputFocused(null)}
                                    />
                                    <IconButton icon={this.state.editing == data ? 'window-close' : 'check'} />
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}