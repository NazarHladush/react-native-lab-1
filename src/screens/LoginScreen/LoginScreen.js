import React, {useState} from 'react'
import {Text, TouchableOpacity, View, SafeAreaView} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {firebase} from '../../firebase/config'
import styles from './styles';
import {validate} from "validate.js";
import emailConstraints from "../../validate/emailConstraints";
import passwordConstraints from "../../validate/passwordConstraints";

export default function LoginScreen({navigation, setLoading}) {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [emailIsValid, setEmailValid] = useState(true)

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordIsValid, setPasswordValid] = useState(true)

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
        setLoading(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                firebase.database().ref('/users/' + uid).once('value')
                    .then(
                        snapshot => {
                            const user = snapshot.val();
                            navigation.navigate('Home', {user: user});
                        }
                    ).catch(error => {
                    alert(error)
                    setLoading(false);
                })
            })
            .catch(error => {
                alert(error)
                setLoading(false);
            })
    }

    const onChangeEmail = (email) => {
        setEmail(email);
        validateEmail(email)
    };

    const validateEmail = (email) => {
        const validationResult = validate({emailAddress: email}, emailConstraints);
        if (typeof validationResult === 'undefined') {
            setEmailValid(true)
        } else {
            setEmailValid(false)
            setEmailError(validationResult.emailAddress[0])
        }
    }

    const onChangePassword = (password) => {
        setPassword(password);
        validatePassword(password)
    };

    const validatePassword = (password) => {
        const validationResult = validate({password: password}, passwordConstraints);
        if (typeof validationResult === 'undefined') {
            setPasswordValid(true)
        } else {
            setPasswordValid(false)
            setPasswordError(validationResult.password[0])
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="always">

                <TextInput
                    style={styles.input}
                    error={!emailIsValid}
                    label='E-mail'
                    mode="outlined"
                    onChangeText={(text) => onChangeEmail(text)}
                    value={email}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    autoCorrect={false}
                />

                {emailIsValid ? null :
                    <HelperText
                        visible={!emailIsValid}
                        style={styles.errorMessage}
                        type="error"
                    >
                        {emailError}
                    </HelperText>}

                <TextInput
                    style={styles.input}
                    error={!passwordIsValid}
                    secureTextEntry
                    label='Password'
                    mode="outlined"
                    onChangeText={(text) => onChangePassword(text)}
                    value={password}
                    autoCapitalize="none"
                />
                {passwordIsValid ? null :
                    <HelperText
                        visible={!passwordIsValid}
                        style={styles.errorMessage}
                        type="error"
                    >
                        {passwordError}
                    </HelperText>
                }

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress}
                                                                                 style={styles.footerLink}>Sign
                        up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}