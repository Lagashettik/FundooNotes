import React, { Component } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Card, Chip } from 'react-native-paper'
import DataServices from '../../services/dataServices';

export default class DisplayNotes extends Component {
   constructor(props) {
      super(props)
      this.state = {
         showGrid: false,
         keys: [],
         notes: [],
         showNotes: [],
         endReached: false,
         scroll: false,
         index: 0,
         labels: []
      }
   }

   static getDerivedStateFromProps(props, state) {

      if (props.showGrid != undefined) {
         return {
            showGrid: props.showGrid()
         }
      }
      else return { showGrid: false }
   }


   async componentDidMount() {
      let tempNotes = []
      new DataServices().getNotesFromDatabase()
         .then(async notesData => {
            let notes = notesData
            if (notes != {} && notes != undefined) {
               await Object.getOwnPropertyNames(notes).map(noteKey => {
                  let note = {
                     key: noteKey,
                     value: notes[noteKey]
                  }
                  // console.log("note : " + JSON.stringify(note))
                  tempNotes.push(note)
               })
               // console.log("tempNotes : " + JSON.stringify(tempNotes))
               this.setState({
                  notes: tempNotes
               })

               let tempShowNotes = []
               let loadingNoteIndex
               for (loadingNoteIndex = 0; loadingNoteIndex < 10 && loadingNoteIndex < this.state.notes.length; loadingNoteIndex++) {
                  tempShowNotes.push(this.state.notes[loadingNoteIndex])
               }
               this.setState({
                  index: loadingNoteIndex,
                  showNotes: tempShowNotes
               })

               new DataServices().getLabelsFromDatabase()
                  .then(labels => this.setState({ labels: labels }))
            }
         })
         .catch(error => console.log("getNoteError : " + error))


   }

   editNote = (noteKey, noteData) => {
      console.log("NoteKey : " + noteKey + " Note : " + JSON.stringify(this.state.notes))
      if (this.props.filterNotes != 'deleted')
         this.props.navigation.push('note-editor', { note: noteData, key: noteKey })
      else
         this.props.navigation.push('note-editor', { note: noteData, key: noteKey, disableTouch: true })
   }

   filterNotes = (isArchive, isDeleted, note) => {
      // console.log(isArchive, isDeleted)
      if (this.props.filterNotes == undefined) {
         if (this.props.searchWord() == null)
            return isArchive != true && isDeleted != true
         else
            return ((note.title).includes(this.props.searchWord())
               || (note.note).includes(this.props.searchWord()))
               && (isArchive != true && isDeleted != true)
      }
      else if (this.props.filterNotes == 'archive')
         return isArchive == true && isDeleted != true
      else if (this.props.filterNotes == 'deleted')
         return isDeleted == true
      else console.log(this.props)
   }

   loadData = () => {
      if (this.state.index == this.state.notes.length) {
         this.setState({
            index: 0
         })
      } else {
         if (this.state.index + 10 < this.state.notes.length) {
            for (let i = this.state.index; i < this.state.index + 10; i++) {
               this.state.showNotes.push(this.state.notes[i])
            }
         } else {
            for (let i = this.state.index; i < this.state.notes.length; i++) {
               this.state.showNotes.push(this.state.notes[i])
            }
         }
      }

   }

   getLabelNames = (labels) => {

      let labelKeyArray = labels.split(",")
      return labelKeyArray
   }

   render() {
      return (

         <FlatList
            data={this.state.showNotes}
            keyExtractor={(item, index) => JSON.stringify(index)}
            key={1}
            onEndReached={() => console.log('END')
               // (this.state.endReached && this.state.scroll) ?
               // <ActivityIndicator size='large' color='red' /> : null
            }
            onScroll={async () => {
               if (this.state.endReached) {
                  this.loadData()
                  await this.setState({
                     endReached: false,
                     scroll: true
                  })
               }
            }}
            onEndReachedThreshold={0.1}
            renderItem={(key) => {
               if (this.filterNotes(key.item.value.isArchive, key.item.value.isDeleted, key.item)) {
                  return (
                     <Card key={key.index}
                        onPress={() => this.editNote(key.item.key, key.item.value)}
                        style={{ margin: 10, width: this.state.showGrid ? '44%' : '95%', backgroundColor: 'white' }}>
                        <Card.Title title={key.item.value.title} subtitle={key.item.value.note} key={key.index} />
                        <View style={{ width: '90%', flexWrap: 'wrap', flexDirection: 'row' }}>
                           {
                              key.item.value.labels != undefined ?
                                 this.getLabelNames(key.item.value.labels).filter(labelKey => this.state.labels[labelKey] != undefined)
                                    .map(labelKey => {
                                       return (
                                          <Chip mode='outlined' style={{ width: '30%' }} key={labelKey}>{this.state.labels[labelKey].labelName}</Chip>
                                       )
                                    })
                                 : null
                           }
                        </View>
                     </Card>
                  )
               }
            }}

         />

      )
   }
}