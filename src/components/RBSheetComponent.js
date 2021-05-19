import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper'
import DataServices from '../../services/dataServices';
import StringsOfLanguages from '../localization/stringsOfLanguages';

const RBSheetComponent = (props) => {
    console.log(props)

    const deleteOrDeleteForeverNote = async () => {
        console.log('noteKey : ' + props.noteKey)
        if (props.noteKey != undefined) {
            if (!props.disableTouch)
                await new DataServices().deleteOrRestoreNote(props.noteKey)
            else
                await new DataServices().removeNotesFromDatabase(props.noteKey)
        }
        console.log('after noteKey')
        props.navigation.push('home-page')
    }

    const restoreNote = async () => {
        if (props.noteKey != undefined)
            await new DataServices().deleteOrRestoreNote(props.noteKey, false)
        props.navigation.push('home-page')
    }

    return (
        <View style={{ width: '100%', height: '100%' }}>{
            !props.disableTouch ?
                <View style={{
                    width: '100%',
                    height: '50%',
                    flex: 1,
                    alignItems: 'flex-start',
                    justifyContent: 'space-around'
                }}>
                    <Button mode='text' theme={{
                        colors: {
                            primary: 'red'
                        }
                    }}
                        icon={props.selectedIcon == "plus" ? props.camera : props.deleteOutline}
                        onPress={props.selectedIcon == "plus" ? null : deleteOrDeleteForeverNote}
                    >
                        {props.selectedIcon == "plus" ? props.cameraLabel : props.deleteOutlineLabel}</Button>
                    <Button mode='text' theme={{
                        colors: {
                            primary: 'red'
                        }
                    }} icon={props.selectedIcon == "plus" ? props.imageOutline : props.contentCopy}>
                        {props.selectedIcon == "plus" ? props.imageOutlineLabel : props.contentCopyLabel}</Button>
                    <Button mode='text' theme={{
                        colors: {
                            primary: 'red'
                        }
                    }} icon={props.selectedIcon == "plus" ? props.brush : props.shareVariant}>
                        {props.selectedIcon == "plus" ? props.brushLabel : props.shareVariantLabel}</Button>
                    <Button mode='text' theme={{
                        colors: {
                            primary: 'red'
                        }
                    }} icon={props.selectedIcon == "plus" ? props.mic : props.accountPlusOutline}>
                        {props.selectedIcon == "plus" ? props.micLabel : props.accountPlusOutlineLabel}</Button>
                    <Button mode='text' theme={{
                        colors: {
                            primary: 'red'
                        }
                    }} icon={props.selectedIcon == "plus" ? props.box : props.labelOutline}>
                        {props.selectedIcon == "plus" ? props.boxLabel : props.labelOutlineLabel}</Button>
                </View>
                :
                <View style={{
                    width: '100%',
                    height: '50%',
                    flex: 1,
                    alignItems: 'flex-start',
                    justifyContent: 'space-around'
                }}>
                    <Button mode='text' theme={{
                        colors: {
                            primary: 'red'
                        }
                    }}
                        icon="restore"
                        onPress={restoreNote}
                    >{StringsOfLanguages.restore}</Button>
                    <Button mode='text' theme={{
                        colors: {
                            primary: 'red'
                        }
                    }}
                        icon="delete-forever-outline"
                        onPress={deleteOrDeleteForeverNote}
                    >{StringsOfLanguages.deleteforever}</Button>
                </View>
        }
        </View>
    )
}



export default RBSheetComponent