import { StyleSheet } from 'react-native';
import { globalStylesheet } from './global.styles';
import { globalFontConstant } from './globalStyleData.styles';

export const loginStylesheet = StyleSheet.create({
    button_SignIn: {
        ...globalStylesheet.button,
        height: '10%'
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
    },
    button_Facebook_SignIn : {
        ...globalStylesheet.button,
        marginTop : '10%',
        backgroundColor : '#3b5998',
        height : '10%'
    },
    button_Google_SignIn : {
        ...globalStylesheet.button,
        marginTop : '10%',
        backgroundColor : '#BB001B',
        height : '10%'
    }
})