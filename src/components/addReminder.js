import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import {
   Text, Modal, Portal, Provider, Button, IconButton
} from 'react-native-paper';
import { AddReminderStyleSheet } from '../styles/addReminder.styles';
import { Picker } from '@react-native-picker/picker'
import moment from 'moment';
import { globalThemeConstant } from '../styles/globalStyleData.styles';

export default class AddReminder extends Component {
   constructor(props) {
      super(props)
      this.state = {
         date: '',
         time: '',
         repeat: '',
         selectTimeReminder: true,
         icon: false
      }
   }

   componentDidMount() {
      let currentDate = this.getTodayDate()
      let currentTime = this.getCurrentTime()
      this.setState({
         date: currentDate,
         time: currentTime
      })
   }

   handleTimeReminder = () => this.setState({ selectTimeReminder: true })

   handlePlaceReminder = () => this.setState({ selectTimeReminder: false })

   getTodayDate = () => {
      let dateTime = new Date()
      let currentDate = moment(dateTime).format('LL')
      console.log(currentDate)
      return currentDate
   }

   getCurrentTime = () => {
      let dateTime = new Date()
      let currentTime = moment(dateTime).format('LT')
      console.log(currentTime)
      return currentTime
   }

   getPostDate = (days) => {
      console.log('---------------------------------------------------------')
      let dateTime = new Date()
      console.log("DayTime : " + dateTime)
      console.log('yy : ' + moment(dateTime).add(days, 'days').calendar('LL'))
      let postDate = moment(dateTime).add(days, 'days').calendar()
      console.log("xx " + moment(postDate).format('LL'))
      console.log(postDate)
      return postDate
   }

   handleAddDate = (date) => {
      this.getPostDate(date)
      console.log("date : " + this.getPostDate(date))
      return 'hey'
   }

   render() {
      return (
         <Provider>
            <Portal>
               <Modal visible={this.props.showAddReminder} onDismiss={this.props.hideAddReminder}
                  contentContainerStyle={{ backgroundColor: 'white', height: '50%', width: '80%', alignSelf: 'center' }} >
                  <View style={{ backgroundColor: 'white', height: '90%', marginTop: '5%' }} >
                     <Text style={{ fontSize: 20, marginLeft: '10%', fontWeight: 'bold' }}>Add Reminder</Text>
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
                                       <Picker.Item label={this.state.date} value={this.state.date} />
                                       <Picker.Item label='Tomorrow' value={1} />
                                       <Picker.Item label='Next week' value={7} />
                                       <Picker.Item label='Select a date...' value={this.handleAddDate()} />
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
                                       <Picker.Item label={this.state.time} value={this.state.time} />
                                       <Picker.Item label='Morning' value={false} />
                                       <Picker.Item label='Afternoon' value={false} />
                                       <Picker.Item label='Evening' value={false} />
                                       <Picker.Item label='Night' value={false} />
                                       <Picker.Item label='Select a time...' value='select' />
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
                        <Button  >Cancel</Button>
                        <Button mode='outlined' style={{ backgroundColor: 'red' }}
                           theme={{ ...globalThemeConstant.TimePlaceButtonTheme, colors: { primary: 'white' } }} >Save</Button>
                     </View>
                  </View>
               </Modal>
            </Portal>
         </Provider>
      )
   }
}