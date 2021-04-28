import { StyleSheet } from 'react-native';
import { globalFontConstant } from './globalStyleData.styles';

export const loginStylesheet = StyleSheet.create({
    button_SignIn: {
        marginTop: '15%',
        width: '40%',
        height: '10%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    text_input: {
        marginTop: '10%'
    },
    forgot_password: {
        alignSelf: 'flex-end',
        marginTop: '5%',
        fontSize: globalFontConstant.H3,
        color: 'red'
    },
    sub_container_view: {
        height: '70%'
    }
})