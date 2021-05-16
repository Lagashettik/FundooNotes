import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'

export default class DisplayNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showGrid: this.props.showGrid(),
            keys: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            showGrid: props.showGrid()
        }
    }

    editNote = (key) => {
        console.log("Note : " + JSON.stringify(this.props.notes[key]) + " Key : " + key)
        this.props.navigation.push('notes', { note: this.props.notes[key], key: key })
    }

    render() {
        return (
            <ScrollView 
            contentContainerStyle={{flexDirection : 'row', flexWrap : 'wrap'}}
            style={{height : '90%'}}>
                    {
                        Object.getOwnPropertyNames(this.props.notes).map((key, index) => {
                            return (<Card key={key}
                                onPress={() => this.editNote(key)}
                                style={{ margin: 10, width: this.state.showGrid ? '44%' : '95%' }}>
                                <Card.Title title={this.props.notes[key].title} subtitle={this.props.notes[key].note} />
                            </Card>)
                        })
                    }
            </ScrollView>
        )
    }
}