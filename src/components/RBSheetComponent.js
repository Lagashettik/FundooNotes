import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper'

const RBSheetComponent = (props) => {
    console.log(props)
    return (
        <View style={{
            width: '100%',
            height: '50%',
            flex: 1,
            alignItems: 'flex-start'
        }}>
            <Button mode='text' theme={{
                colors: {
                    primary: 'red'
                }
            }} icon={props.selectedIcon == "plus" ? props.camera : props.deleteOutline}>
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