import { StyleSheet } from 'react-native';
import {globalStylesheet} from '../styles/global.styles'

export const forgotPasswordStyleSheet = StyleSheet.create({
    parent_container : {
        ...globalStylesheet.parent_conatiner_view
    },
    header : {
        ...globalStylesheet.header
    },
    button_reset : {
        ...globalStylesheet.button,
        height : '8%'
    }
})