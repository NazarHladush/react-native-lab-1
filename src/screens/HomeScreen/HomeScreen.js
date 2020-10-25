import React from 'react'
import { Text, View, Button } from 'react-native'

export default function HomeScreen(props) {

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Welcome, {props.extraData.username}</Text>
        </View>
    )
}