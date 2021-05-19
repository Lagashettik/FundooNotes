import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import StringsOfLanguages from '../localization/stringsOfLanguages'

export default class LanguageSelection extends Component {
    constructor() {
        super()
        this.language = [
            { shortform: 'en', longform: 'English' },
            { shortform: 'hi', longform: 'हिंदी ' },
            { shortform: 'ma', longform: 'मराठी ' }
        ];
    }

    selectLanguage = (language) => {
        StringsOfLanguages.setLanguage(language)
        this.props.navigation.push('home-page')
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <Appbar style={{ width: '100%', flexDirection: 'row' }}
                    theme={{ colors: { primary: 'red' } }}
                >
                    <Appbar.Action icon="view-headline" size={30} color='white' onPress={() => this.props.navigation.toggleDrawer()} />
                    <Text style={{ fontSize: 30, color: 'white' }}>{StringsOfLanguages.language}</Text>
                </Appbar>

                <Text style={{ fontSize: 30, alignSelf: 'center', marginTop: '10%' }}>Select Language</Text>

                <View style={{ marginTop: 30, width: '100%', alignItems: 'center' }}>
                    {this.language.map((langObj, key) => (
                        <View style={{
                            width: '50%',
                            marginTop: 30,
                            alignItems: 'center'
                        }} key={key}>
                            <Text
                                onPress={() => this.selectLanguage(langObj.shortform)}
                                style={{
                                    color: '#191919',
                                    fontSize: 25,
                                }}>
                                {langObj.longform}
                            </Text>
                            <View style={{
                                height: 0.5,
                                width: '60%',
                                backgroundColor: '#C2C2C2',
                                marginTop: 10,
                            }} />
                        </View>
                    ))}
                </View>

            </View>
        )
    }
}