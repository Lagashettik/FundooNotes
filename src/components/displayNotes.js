import React, { Component } from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
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
         index: 0
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
            }
         })
         .catch(error => console.log("getNoteError : " + error))

   }

   editNote = (noteKey,noteData) => {
      console.log("NoteKey : "+noteKey + " Note : " + JSON.stringify(this.state.notes))
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

   getLabelNames = async (labels) => {
      try{
         let labelKeyArray = await labels.split(",")
         // let labelNameArray
         console.log(labelKeyArray)
         // await labelKeyArray.map(labelKey => {
         //    console.log(labelKey)
         // })
      } catch(error){
         console.log("catch : " + error)
      }
      // return new Promise(async (resolve, reject) => {
      //    console.log('labels ' + labels)
      //    console.log("labels array : " + await labels.split(','))
      //    let labelKeyArray = await labels.split(',')
      //    console.log(labelKeyArray)
      //    let labelNameArray = []
      //    await labelKeyArray.map(labelkey => {
      //       // console.log("labelKey : " + labelkey)
      //       new DataServices().getLabelName(labelkey)
      //          .then(labelName => {
      //             console.log("LabelName : " + labelName)
      //             labelNameArray.push(labelName)
      //             console.log("getLabelNames labelNameArray : " + JSON.stringify(labelNameArray))
      //          })
      //          .catch(error => console.log("getLabelName error : " + error))
      //    })
      //    // console.log("getLabelNames labelNameArray : " + JSON.stringify(labelNameArray))
      //    resolve(labelNameArray)
      // })
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
                        onPress={() => this.editNote(key.item.key,key.item.value)}
                        style={{ margin: 10, width: this.state.showGrid ? '44%' : '95%', backgroundColor: 'white' }}>
                        <Card.Title title={key.item.value.title} subtitle={key.item.value.note} key={key.index} />
                        {
                           // console.log("check : " + JSON.stringify(key.item.value.labels)),
                           console.log(key.item.value.labels != undefined),
                           key.item.value.labels != undefined ?
                           // this.getLabelNames("-MaYr9lOOxBgCGf3fHz9")
                           console.log("xxxxxxxxxxxxxxxxxxxxxxxxx")
                              // this.getLabelNames(key.item.value.labels).then(labelNameArray => {
                              //    console.log("check : " + JSON.stringify(key.item.value.labels))
                              //    console.log("labelNameArray3 : " + JSON.stringify(labelNameArray))
                              //    if (JSON.stringify(labelNameArray) != [] && labelNameArray != undefined) {
                              //       labelNameArray.map(labelName => {
                              //          console.log('map labelName : ' + labelName)
                              //          return (
                              //             <Text key={labelName}>{labelName}</Text>
                              //          )
                              //       })
                              //    }
                              // })
                              : null
                        }
                     </Card>
                  )
               }
            }}

         />

      )
   }
}