import React, { Component } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { Checkbox, IconButton } from 'react-native-paper';
import DataServices from '../../services/dataServices';
import CreateLabel from './createLabel';

export default class SearchSelectLabel extends Component {
    constructor() {
        super()
        this.state = {
            labels: {},
            searchWord: '',
            checkedLabel: [],
            selected: ''
        }
    }

    componentDidMount() {
        new DataServices().getLabelsFromDatabase()
            .then(data => {
                data != null && this.setState({ labels: data })
                new DataServices().getNoteFromDatabase(this.props.route.params.noteKey)
                    .then(note => {
                        if (note.labels != undefined)
                            this.setState({
                                checkedLabel : note.labels.split(',')
                            })
                        else console.log("notes : " + JSON.stringify(note) + "\nnoteKey" + this.props.route.params.noteKey)
                    })
            })
            .catch(error => console.log(error))


    }

    setSearchWord = (searchWord) => this.setState({ searchWord: searchWord })

    searchLabel = (key) => {
        if (this.state.searchWord != '') {
            return (this.state.labels[key].labelName).includes(this.state.searchWord)
        } else return true
    }

    setChecked = (key) => {
        if (this.checkChecked(key))
            this.removeChecked(key)
        else {
            let labels = this.state.checkedLabel
            labels.push(key)
            console.log("labels : " + labels)
            this.setState({
                checkedLabel: labels
            })
        }
        console.log("state label : " + this.state.checkedLabel)
    }

    checkChecked = (key) => {
        console.log(key)
        console.log("check : " + this.state.checkedLabel.includes(key))
        return this.state.checkedLabel.includes(key)
    }

    removeChecked = (key) => {
        let check = this.state.checkedLabel.splice(this.state.checkedLabel.indexOf(key), 1)
        console.log("remove : " + check)
        console.log("removed : " + this.state.checkedLabel)
    }


    render() {
        return (
            <View>
                <CreateLabel mode='search' setLabel={this.setSearchWord} selectedLabels={() => this.state.checkedLabel.toString()}
                    noteKey={this.props.route.params.noteKey} navigation={this.props.navigation} />
                <ScrollView>
                    {
                        this.state.labels != undefined &&
                        Object.getOwnPropertyNames(this.state.labels).map(key => {
                            if (this.searchLabel(key))
                                return (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }} key={key}>
                                        <IconButton icon="label-outline" style={{ width: '10%' }} />
                                        <Text style={{ width: '75%' }}>{this.state.labels[key].labelName}</Text>
                                        <Checkbox status={this.checkChecked(key) ? 'checked' : 'unchecked'}
                                            onPress={() => this.setChecked(key)}
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