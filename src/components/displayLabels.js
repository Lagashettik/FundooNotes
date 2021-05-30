import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import DataServices from '../../services/dataServices';
import CreateLabel from './createLabel';

export default class DisplayLabels extends Component {
    constructor() {
        super()
        this.state = {
            labels: {},
            editing: '',
            label: '',

        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.labels != undefined)
            return {
                labels: props.labels
            }
        else return null
    }

    componentDidMount() {
        if (this.props.route != undefined) {
            if (this.props.route.params.mode == 'selection') {
                new DataServices().getLabelsFromDatabase()
                    .then(async data => {
                        await data != null && this.setState({ labels: JSON.stringify(data) })
                    })
                    .catch(error => console.log(error))
            }
        }
    }

    checkLabel = (labelName) => {
        let check = false
        Object.getOwnPropertyNames(this.state.labels).map(key => {
            check = this.state.labels[key].labelName.includes(labelName)
        })
        return check
    }

    createLabel = (labelName) => {
        if (labelName != '' && !this.checkLabel(labelName)) {
            let label = {
                labelName: labelName
            }
            new DataServices().addLabelToDatabase(label)
        }
    }

    updateLabel = async (labelName, key) => {
        let labels = this.state.labels
        labels[key].labelName = labelName
        await this.setState({
            labels: labels
        })
        new DataServices().updateLabelToDatabase(this.state.labels[key], key)
    }

    textInputFocus = (key) => {
        this.setState({
            editing: key
        })
    }

    textInputEndEditing = () => {
        this.setState({
            editing: ''
        })
    }

    deleteLabel = (key) => {
        // console.log('removed')
        // new DataServices().deleteLabelFromDatabase(key)
        // this.props.navigation.push('display-labels')
        this.state.editing != key ? console.log("Pressed") : console.log("deleted")
    }

    render() {
        return (
            <View>
                <CreateLabel setLabel={this.createLabel} />
                <ScrollView>
                    {
                        this.props.labels != undefined &&
                        Object.getOwnPropertyNames(this.state.labels).map(key => {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} key={key}>
                                    <IconButton icon={this.state.editing != key ? "label-outline" : "delete-outline"} style={{ flex: 0.1 }}
                                        onPress={() => this.deleteLabel(key)} />
                                    <TextInput
                                        value={this.state.labels[key].labelName}
                                        onChangeText={labelName => this.updateLabel(labelName, key)}
                                        style={{ backgroundColor: 'white', flex: 0.9 }}
                                        selectionColor='red' underlineColor='white'
                                        theme={{
                                            colors: {
                                                primary: 'white'
                                            }
                                        }}
                                        onFocus={() => this.textInputFocus(key)}
                                        onEndEditing={this.textInputEndEditing}
                                        // left={this.state.editing == key ? <TextInput.Icon name='delete-outline'
                                        //     onPress={console.log("pressed")} />
                                        //     : <TextInput.Icon name='label-outline'
                                        //         onPress={console.log(this.state.editing)} />}
                                        right={<TextInput.Icon name={this.state.editing == key ? 'check' : 'pencil'} />}
                                    />
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}