import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NotesData } from '../../database/notesData';
import { Card } from 'react-native-paper'

export default class DisplayNotes extends Component {
    constructor(props){
        super(props)
        this.state = {
            showGrid : this.props.showGrid()
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            showGrid : props.showGrid()
        }
    }

    render() {
        return (
            <View style={{width : '100%', flexDirection: 'row', flexWrap  :'wrap'}}>
                {
                    NotesData.map(data =>
                        <Card style={{ margin: 10, width : this.state.showGrid ? '44%' : '100%' }} key={NotesData.indexOf(data) }>
                            <Card.Title title={data.title} subtitle={data.note} />
                        </Card>
                    )
                }
            </View>
        )
    }
}