import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Portal, Provider, Modal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker'

export default class SelectDateTime extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Provider>
                <Portal>
                    <Modal visible={this.props.showSelectDateTime} onDismiss={this.props.hideSelectDateTime}
                        contentContainerStyle={{ backgroundColor: 'transparent', height: '100%', width: '80%', alignSelf: 'center' }} >
                        <View>
                            {
                                this.props.mode == 'date' &&
                                <DateTimePicker mode='date' display='calendar'
                                    value={this.props.time == '' ? new Date() : this.props.time}
                                    onChange={this.props.handleSelectedDateTime}
                                    minimumDate={new Date()}
                                />
                            }
                            {
                                this.props.mode == 'time' &&
                                <DateTimePicker mode='time' display='clock'
                                    value={this.props.date == '' ? new Date() : this.props.date}
                                    onChange={this.props.handleSelectedDateTime} />
                            }
                        </View>
                    </Modal>
                </Portal>
            </Provider>
        )
    }
}
