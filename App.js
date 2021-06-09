import React, { Component } from 'react';
import ApplicationStack from './src/navigation/applicationStack';
import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from 'react-native-firebase';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";


export default class App extends Component {

  componentDidMount() {
    this.checkPermission()

    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

  }

  async checkPermission() {
    console.log('enabled')
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      console.log('if')
      this.getToken()
    } else {
      this.requestPermission()
      console.log('else')
    }
  }

  async getToken() {
    console.log("start")
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
    } else {
      await AsyncStorage.setItem('fcmToken', fcmToken)
    }
    console.log('fcmToken : ' + fcmToken)
    console.log("NNNNNNN : " +  firebase.messaging().getToken())
  }

  async requestPermission() {
    try {
      console.log("try")
      await firebase.messaging().requestPermission()
      this.getToken()
    } catch (error) {
      console.log("Permission Rejected : " + error)
    }
  }


  render() {
    return (
      <ApplicationStack />
    )
  }
}
