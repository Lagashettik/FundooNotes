import React, { Component } from 'react';
import { View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet'
import { Button } from 'react-native-paper'

export default class NoteBottomSheet extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                {
                    this.props.open == 'plus' ? this.RBSheet.open() : this.RBSheet.close()
                }
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={500}
                    openDuration={500}
                    closeDuration={300}
                    customStyles={{
                        container: {
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }}
                >
                    {
                        this.props.open == 'plus' &&
                        <View>
                            <Button mode='text' icon="camera">Take photo</Button>
                            <Button mode='text' icon="image-outline">Add image</Button>
                            <Button mode='text' icon="brush">Drawing</Button>
                            <Button mode='text' icon="mic">Recording</Button>
                            <Button mode='text' icon="box">Tick boxes</Button>
                        </View>
                    }
                    {
                        this.props.open == 'dots' &&
                        <View>
                            <Button mode='text' icon="delete-outline">Delete</Button>
                            <Button mode='text' icon="content-copy">Make a copy</Button>
                            <Button mode='text' icon="share-variant">Send</Button>
                            <Button mode='text' icon="account-plus-outline">Collaborator</Button>
                            <Button mode='text' icon="label-outline">Labels</Button>
                        </View>
                    }
                </RBSheet>
            </View>
        )
    }
}