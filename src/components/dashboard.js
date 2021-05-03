import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar, TextInput, Button, Text, Searchbar, BottomNavigation, IconButton } from 'react-native-paper';

export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            view: true,
            index: 0,
            routes: [
                { key: 'music', title: 'Music', icon: 'queue-music' },
                { key: 'albums', title: 'Albums', icon: 'album' },
                { key: 'recents', title: 'Recents', icon: 'history' },
            ],
        }
    }

    logout = () => {
        this.props.navigation.navigate('login')
    }


    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        music: null,
        albums: null,
        recents: null
    });
    render() {
        return (
            <View style={{ height: '100%' }}>
                <View style={{ height: '93%' }}>
                    <Appbar theme={{
                        colors: {
                            primary: 'red'
                        }
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <IconButton icon="view-headline" size={30} color = 'white'/>
                            <Searchbar style={{ width: '60%', height: '80%', alignSelf: 'center' }}  placeholder='Search notes' />
                            <IconButton icon={this.state.view ? "view-agenda-outline" : "view-grid-outline"}
                                size={30}
                                color='white'
                                onPress={() => this.setState({ view: !this.state.view })} />
                            <IconButton icon="face" color='white' size={30} style={{marginLeft : -10}}/>
                        </View>
                    </Appbar>


                    <Text>Hello</Text>

                    <Button onPress={this.logout}>Logout</Button>
                </View>

                <View style={{ height: '7%', backgroundColor: 'red', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <IconButton icon="check-box-outline" size={30} color='white' />
                    <IconButton icon="brush" size={30} color='white' />
                    <IconButton icon="microphone-outline" size={30} color='white' />
                    <IconButton icon="image-outline" size={30} color='white' />
                    <IconButton icon="microphone-outline" size={30} color='white' />
                </View>

                {/* <BottomNavigation
                    navigationState={this.state}
                    onIndexChange={this._handleIndexChange}
                    renderScene={this._renderScene}
                /> */}
            </View>
        )
    }
}