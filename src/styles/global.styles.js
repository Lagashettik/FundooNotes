import React from 'react';
import { StyleSheet } from 'react-native';
import {globalColorConstant, globalFontConstant} from '../styles/globalStyleData.styles'

export const globalStylesheet = StyleSheet.create({
    parent_conatiner_view: {
        height: '90%',
        margin: '10%'
    },
    header: {
        fontWeight: 'bold',
        fontSize: globalFontConstant.H1,
        marginTop: '10%'
    },
    primary_Text: {
        fontSize: globalFontConstant.H2,
        color: globalColorConstant.SUBTEXTCOLOR
    },
    text_Error : {
        marginLeft : '1%',
        fontSize : globalFontConstant.H3,
        color : 'red'
    },
    text_input : {
        marginTop: '10%'
    }
    
})