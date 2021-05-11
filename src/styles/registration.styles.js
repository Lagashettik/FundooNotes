import { StyleSheet } from 'react-native';
import { globalStylesheet } from '../styles/global.styles'

export const registrationStyleSheet = StyleSheet.create({
    parent_container: {
        ...globalStylesheet.parent_conatiner_view
    },
    header: {
        ...globalStylesheet.header
    },
    name_container: {
        flexDirection: 'row'
    },
    name_input: {
        width: '48%',
        margin: '1%'
    },
    button_SignUp: {
        ...globalStylesheet.button,
        marginTop: '10%',
        height: '7%'
    },
    close_button: {
        alignSelf: 'flex-end'
    }

})