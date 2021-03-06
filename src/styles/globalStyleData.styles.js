import React from 'react';
import { Dimensions } from 'react-native';

const globalColorConstant = {
    SELECTORCOLOR: 'red',
    PRIMARYCOLOR: 'red',
    SECONDARYCOLOR: 'gray',
    ERRORCOLOR: 'red',
    MAINTEXTCOLOR: 'black',
    SUBTEXTCOLOR: 'gray',
    LABELCOLOR: 'white'
}

const globalFontConstant = {
    H1: 40,
    H2: 20,
    H3: 15
}

const globalThemeConstant = {
    textInputTheme: {
        roundness: 10,
        colors: {
            primary: 'red',
            placeholder: 'gray'
        }
    },
    TimePlaceButtonTheme: {
        roundness: 10,
        colors: {
            primary: 'black'
        }
    }
}

const globalLabelConstant = {
    educational: 'Educational',
    document: 'Document',
    personal: 'Personal',
    work: 'Work',
    inspiration: 'Inspiration',
    other: 'Other'
}

export { globalColorConstant, globalFontConstant, globalThemeConstant, globalLabelConstant }