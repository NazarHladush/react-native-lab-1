import React from 'react'
import { Text, View } from 'react-native'

export default function HomeScreen(props) {
    return (
        <View>
            <Text>Home Screen {props.extraData}</Text>
        </View>
    )
}