import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper'
import DataServices from '../../services/dataServices';

const RBSheetComponent = (props) => {
    console.log(props)

    const deleteNote = async () => {
        console.log('noteKey : ' + props.noteKey)
        if (props.noteKey != undefined) {
            await new DataServices().deleteNote(props.noteKey)
        }
        console.log('after noteKey')
        props.navigation.push('home-page')
    }

    return (
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
                onPress={props.selectedIcon == "plus" ? null : deleteNote}
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
    )
}



export default RBSheetComponent