import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {LoginScreen, HomeScreen, RegistrationScreen} from './src/screens'
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {firebase} from './src/firebase/config'
import {decode, encode} from 'base-64'
import {Button} from "react-native";
import Loading from "./src/screens/LoadingScreen/loading";


if (!global.btoa) {
    global.btoa = encode
}
if (!global.atob) {
    global.atob = decode
}

const Stack = createStackNavigator();

export default function App() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.database().ref('/users/' + user.uid).once('value').then(
                    snapshot => {
                        const userData = snapshot.val();
                        setLoading(false)
                        setUser(userData);
                    }
                ).catch(error => {
                    setLoading(false)
                    alert(error)
                })
            } else {
                setLoading(false)
            }
        });
    }, []);

    const logOut = () => {
        firebase.auth().signOut().then(() => {
            setUser(null);
        })
    }

    if (loading) {
        return (
            <Loading />
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
                        <Stack.Screen name="Home" options={{
                            headerRight: () => (
                                <Button
                                    onPress={() => logOut()}
                                    title="Log out"
                                    color="red"
                                />
                            ),
                        }}>
                            {props => <HomeScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                    ) : (
                        <>
                            <Stack.Screen name='Login'>
                                {props => <LoginScreen {...props} setLoading={setLoading}/>}
                            </Stack.Screen>
                            <Stack.Screen name="Registration">
                                {props => <RegistrationScreen {...props} setLoading={setLoading}/>}
                            </Stack.Screen>
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}