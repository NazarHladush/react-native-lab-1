import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {LoginScreen, HomeScreen, RegistrationScreen} from './src/screens'
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {firebase} from './src/firebase/config'
import {decode, encode} from 'base-64'


if (!global.btoa) {
    global.btoa = encode
}
if (!global.atob) {
    global.atob = decode
}

const Stack = createStackNavigator();

export default function App() {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             console.log(user)
    //             setLoading(false)
    //         } else {
    //             setLoading(false)
    //         }
    //     });
    // }, []);

    if (loading) {
        return (
            <></>
        )
    }

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            error: 'red',
        },
    };

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    {user ? (
                        <Stack.Screen name="Home">
                            {props => <HomeScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={LoginScreen}/>
                            <Stack.Screen name="Registration" component={RegistrationScreen}/>
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}