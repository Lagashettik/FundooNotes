import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import DataServices from '../../services/dataServices';

export default class CreateLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            label: '',
            editing: false
        }
    }

    submitLabel = () => {
        if (this.props.mode == 'search' && this.state.label == '')
            this.props.setLabel('')
        if (this.state.label != '')
            this.props.setLabel(this.state.label)
        if (this.props.mode != 'search')
            this.setState({
                label: '',
                editing: false
            })
    }

    createLabel = async (labelName) => {
        await this.setState({
            label: labelName
        })
        if (this.props.mode == 'search')
            this.submitLabel()
    }

    textInputFocused = () => {
        this.setState({
            editing: true
        })
    }

    leftIconPressed = () => {
        if (this.props.mode != 'search')
            this.state.editing == true && this.setState({ label: '', editing: !this.state.editing })
        else {
            console.log("labels : " + this.props.selectedLabels() + " noteKey : " + this.props.noteKey)
            if (this.props.selectedLabels() != undefined && this.props.noteKey != undefined) {
                console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
                let selectedLabels = {
                    labels: this.props.selectedLabels()
                }
                new DataServices().updateNoteToDatabase(selectedLabels, this.props.noteKey)
                    .then(() => this.props.navigation.push('note-editor'))
                    .catch(error => console.log(error))
            } else console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')

        }
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder={this.props.mode != 'search' ? 'Create label' : 'search label'}
                    value={this.state.label}
                    onChangeText={this.createLabel}
                    onFocus={this.textInputFocused}
                    onEndEditing={this.submitLabel}
                    style={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'gray' }}
                    selectionColor='red' underlineColor='white'
                    theme={{
                        colors: {
                            primary: 'white'
                        }
                    }}
                    left={<TextInput.Icon name={this.props.mode != 'search' ?
                        (this.state.editing == true ? 'window-close' : 'plus')
                        : 'keyboard-backspace'} onPress={this.leftIconPressed} />}
                    right={this.state.editing == true ? <TextInput.Icon name='check' /> : null} />
            </View >
        )
    }
}