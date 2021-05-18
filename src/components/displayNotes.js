import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-paper'

export default class DisplayNotes extends Component {
   constructor(props) {
      super(props)
      this.state = {
         showGrid: false,
         keys: []
      }
   }

   static getDerivedStateFromProps(props, state) {
      if (props.showGrid != undefined)
         return {
            showGrid: props.showGrid()
         }
      else return {showGrid : false}
   }

   editNote = (noteKey) => {
      console.log("Note : " + JSON.stringify(this.props.notes[noteKey]) + " Key : " + noteKey)
      this.props.navigation.push('notes', { note: this.props.notes[noteKey], key: noteKey })
   }

   filterNotes = (isArchive, isDeleted) => {
      if (this.props.filterNotes == undefined)
         return isArchive != true && isDeleted != true
      else if (this.props.filterNotes == 'archive')
         return isArchive == true
      else if (this.props.filterNotes == 'deleted')
         return isDeleted == true
      else console.log(this.props)
   }

   render() {
      return (
         <ScrollView
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
            style={{ height: '90%' }}>
            {
               Object.getOwnPropertyNames(this.props.notes).map((key, index) => {
                  if (this.filterNotes(this.props.notes[key].isArchive, this.props.notes[key].isDeleted))
                     return (
                        < Card key={key}
                           onPress={() => this.editNote(key)}
                           style={{ margin: 10, width: this.state.showGrid ? '44%' : '95%', backgroundColor: 'white' }}>
                           <Card.Title title={this.props.notes[key].title} subtitle={this.props.notes[key].note} />
                        </Card>
                     )
               })
            }
         </ScrollView >
      )
   }
}