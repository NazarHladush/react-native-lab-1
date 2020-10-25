import React from 'react'
import { Text, View, Button } from 'react-native'
import {firebase} from '../../firebase/config'

export default function HomeScreen(props) {

    const onPressLearnMore = () => {
        firebase.auth().signOut().then(() => {
            props.navigation.navigate('Home')
        })
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Welcome, {props.extraData.username}</Text>
        </View>
    )
}