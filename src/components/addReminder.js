import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import {
   Text, Modal, Portal, Provider, Button, IconButton
} from 'react-native-paper';
import { AddReminderStyleSheet } from '../styles/addReminder.styles';
import { Picker } from '@react-native-picker/picker'
import moment from 'moment';
import { globalThemeConstant } from '../styles/globalStyleData.styles';
import SelectDateTime from './selectDateTime';

export default class AddReminder extends Component {
   constructor(props) {
      super(props)
      this.state = {
         date: '',
         time: '',
         displayDate: '',
         displayTime: '',
         repeat: '',
         selectTimeReminder: true,
         icon: false,
         showSelectDateTime: false,
         selectedDateOrTime: false
      }
   }

   componentDidMount() {
      let newDate = new Date()
      let currentDate = this.displayDate(newDate)
      let currentTime = this.displayTime(newDate)
      this.setState({
         date: newDate,
         displayDate: currentDate,
         displayTime: currentTime
      })
   }

   handleTimeReminder = () => this.setState({ selectTimeReminder: true })

   handlePlaceReminder = () => this.setState({ selectTimeReminder: false })

   displayDate = (date) => {
      let dateTime = new Date(date)
      let currentDate = moment(dateTime).format('LL')
      console.log(currentDate)
      return currentDate
   }

   displayTime = (timeDate) => {
      let dateTime = new Date(timeDate)
      let time = moment(dateTime).format('LT')
      console.log(time)
      return time
   }

   getPostDate = (days) => {
      console.log('---------------------------------------------------------')
      let dateTime = new Date()
      console.log("DayTime : " + dateTime)
      let date = moment(dateTime).add(days, 'days').calendar('I')
      let postDate = new Date(date)
      console.log("YY : " + postDate)
      console.log(postDate)
      return postDate
   }

   handleAddDate = async (dateIncrement) => {
      let choosenDate
      if (dateIncrement) {
         choosenDate = await this.getPostDate(dateIncrement)
         console.log("date : " + this.getPostDate(dateIncrement))
         this.setState({
            date: choosenDate
         })
      }
      else {
         this.openCalender()
      }

   }

   handleAddTime = (time) => {
      if (time) {
         this.setState({
            time: time
         })
      } else {
         this.openClock()
      }
   }

   handleSelectedDateTime = (dateOrTime) => {
      if (this.state.selectedDateOrTime == 'date') {
         this.hideSelectDateTime()
         let date = new Date(dateOrTime.nativeEvent.timestamp)
         console.log("DateTime : " + new Date(dateOrTime.nativeEvent.timestamp))
         this.setState({
            date: date,
            displayDate: this.displayDate(date)
         })
         this.closeCalender()
      }
      if (this.state.selectedDateOrTime == 'time') {
         this.hideSelectDateTime()
         console.log("time : " + JSON.stringify(dateOrTime.nativeEvent.timestamp))
         let time = new Date(dateOrTime.nativeEvent.timestamp)
         console.log("time format : " + new Date(dateOrTime.nativeEvent.timestamp))
         this.setState({
            time: time,
            displayTime: this.displayTime(time)
         })
         this.closeClock()
      }
   }

   hideSelectDateTime = () => this.setState({
      showSelectDateTime: false
   })

   closeAddReminder = () => this.props.hideAddReminder()

   openCalender = () => {
      this.setState({
         selectedDateOrTime: 'date',
         showSelectDateTime: true
      })
   }

   closeCalender = () => this.setState({ selectedDateOrTime: 'calender' })

   openClock = () => {
      this.setState({
         selectedDateOrTime: 'time',
         showSelectDateTime: true
      })
   }

   closeClock = () => this.setState({ selectedDateOrTime: 'clock' })

   saveReminder = () => {
      let reminder = ''
      if (this.state.selectedDateOrTime == 'calender' || this.state.selectedDateOrTime == 'date') {
         reminder = this.state.date
         console.log('dateOrTime : ' + this.state.date)
      } else {
         reminder = this.state.time
         console.log('dateOrTime : ' + this.state.time)
      }
      if (reminder != '') {
         this.props.addReminder(reminder)
         this.closeAddReminder()
      }
   }

   cancelReminder = () => this.closeAddReminder()

   render() {
      return (
         <Provider>
            <Portal>
               <Modal visible={this.props.showAddReminder} onDismiss={this.props.hideAddReminder}
                  contentContainerStyle={{ backgroundColor: 'transparent', height: '100%', width: '80%', alignSelf: 'center' }} >
                  <View style={{ backgroundColor: 'white', height: '45%', marginTop: '5%' }} >

                     <Text style={{ fontSize: 20, marginLeft: '10%', marginTop: '10%', fontWeight: 'bold' }}>Add Reminder</Text>
                     <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                        <Button style={{ ...AddReminderStyleSheet.TimePlaceButton, borderBottomColor: this.state.selectTimeReminder ? 'red' : 'white' }}
                           theme={globalThemeConstant.TimePlaceButtonTheme}
                           onPress={this.handleTimeReminder}>Time</Button>
                        <Button style={{ ...AddReminderStyleSheet.TimePlaceButton, borderBottomColor: this.state.selectTimeReminder ? 'white' : 'red' }}
                           theme={globalThemeConstant.TimePlaceButtonTheme}
                           onPress={this.handlePlaceReminder}>Place</Button>
                     </View>
                     <View style={{ height: '50%' }}>

                        {
                           this.state.selectTimeReminder ?
                              <View style={{ width: '100%', height: '100%', marginLeft: '10%', marginRight: '10%' }}>
                                 <View style={{ height: '30%' }}>
                                    <Picker
                                       style={{
                                          width: '80%',
                                          height: '30%',
                                          fontFamily: 'Montserrat-Regular',
                                          position: 'absolute',
                                          flexDirection: 'column-reverse'
                                       }}
                                       onValueChange={this.handleAddDate}
                                       selectedValue={this.state.date}
                                       mode='dropdown'
                                    >
                                       <Picker.Item label={this.state.displayDate} value={this.state.displayDate} />
                                       <Picker.Item label='Tomorrow' value={1} />
                                       <Picker.Item label='Next week' value={7} />
                                       <Picker.Item label={this.state.selectedDateOrTime == 'calender' ? this.state.displayDate : 'Select a date...'} value={false} />
                                    </Picker>
                                 </View>
                                 <View style={{ height: '30%' }}>
                                    <Picker
                                       style={{
                                          width: '80%',
                                          height: '30%',
                                          fontFamily: 'Montserrat-Regular',
                                          position: 'absolute',
                                          flexDirection: 'column-reverse'
                                       }}
                                       onValueChange={this.handleAddTime}
                                       selectedValue={this.state.time}
                                       mode='dropdown'
                                    >
                                       <Picker.Item label={this.state.displayTime} value={this.state.displayTime} />
                                       <Picker.Item label='Morning' value={false} />
                                       <Picker.Item label='Afternoon' value={false} />
                                       <Picker.Item label='Evening' value={false} />
                                       <Picker.Item label='Night' value={false} />
                                       <Picker.Item label={this.state.selectedDateOrTime == 'clock' ? this.state.displayTime : 'Select a date...'} value={false} />
                                    </Picker>
                                 </View>
                                 <View style={{ height: '30%' }}>
                                    <Picker
                                       style={{
                                          width: '80%',
                                          height: '30%',
                                          fontFamily: 'Montserrat-Regular',
                                          position: 'absolute',
                                          flexDirection: 'column-reverse'
                                       }}
                                       onValueChange={this.handleAddDate}
                                       selectedValue={this.state.date}
                                       mode='dropdown'
                                    >
                                       <Picker.Item label='Does not repeat' value={false} />
                                       <Picker.Item label='Daily' value={false} />
                                       <Picker.Item label='Weekly' value={false} />
                                       <Picker.Item label='Monthly' value={false} />
                                       <Picker.Item label='Yearly' value={false} />
                                       <Picker.Item label='Custom...' value={false} />
                                    </Picker>
                                 </View>
                              </View>

                              : <View style={{ width: '100%', height: '100%', marginLeft: '10%', marginRight: '10%' }}>
                                 <Button icon={this.state.icon == 'Home' ? 'circle-slice-8' : 'circle-outline'}
                                    onPress={() => this.setState({ icon: 'Home' })}
                                    theme={globalThemeConstant.TimePlaceButtonTheme}
                                    style={{ width: '80%', flexDirection: 'row' }}>Home</Button>
                                 <Button icon={this.state.icon == 'Work' ? 'circle-slice-8' : 'circle-outline'}
                                    onPress={() => this.setState({ icon: 'Work' })}
                                    theme={globalThemeConstant.TimePlaceButtonTheme}
                                    style={{ width: '80%', flexDirection: 'row' }}>Work</Button>
                                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <IconButton icon={this.state.icon == 'Home' ? 'circle-slice-8' : 'circle-outline'} />
                                    <TextInput style={{ width: '60%' }} placeholder='Edit location' underlineColorAndroid='black' onChangeText={(text) => console.log(text)} />
                                 </View>

                              </View>
                        }
                     </View>
                     <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: '10%' }}>
                        <Button onPress={this.closeAddReminder} >Cancel</Button>
                        <Button mode='outlined' style={{ backgroundColor: 'red' }}
                           theme={{ ...globalThemeConstant.TimePlaceButtonTheme, colors: { primary: 'white' } }}
                           onPress={this.saveReminder} >Save</Button>
                     </View>

                     <SelectDateTime showSelectDateTime={this.state.showSelectDateTime}
                        handleSelectedDateTime={this.handleSelectedDateTime} hideSelectDateTime={this.hideSelectDateTime}
                        mode={this.state.selectedDateOrTime} date={this.state.date} time={this.state.time}

                     />
                  </View>
               </Modal>
            </Portal>
         </Provider>
      )
   }
}