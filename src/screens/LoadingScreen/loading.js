import * as React from 'react';
import {View} from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper';

const Loading = () => (
    <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size='large' animating={true} color='#788eec' />
    </View>

);

export default Loading;