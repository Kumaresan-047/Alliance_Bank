import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Icon, Input } from 'react-native-elements'
const LoginScreen = () => {
    //variable is used for navigating through the screens
    const navigation = useNavigation()
    //variable is used for store  the username
    const [username, setUsername] = useState('');
    //variable is used for store  the password
    const [password, setPassword] = useState('');
    //variable is used for store  the error message
    const [errorUser, setErrorForUser] = useState('');
    //variable is used for store  the error message
    const [errorPass, setErrorForPass] = useState('');
    //variable is used for store  the boolean value for the eye icon
    const [secure, setSecure] = useState(true);
    //variable is used for store  the valid condition
    const [valid, setValid] = useState(false);
    //function is used to handle login
    const handleLogin = () => {
        if (username == "kumar_bank" && password == "Encrypt@123") {
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text2: 'Welcome to Alliance Bank',
                position: 'bottom'
            });
            navigation.navigate("accountScreen")
            setPassword("")
            setUsername("")
        }
        else {
            if (username == "" || password == "") {
                username == "" ? setErrorForUser("Username is required") : null
                password == "" ? setErrorForPass("Password is required") : null
            }
            else {
                if (valid) {
                    Toast.show({
                        type: 'error',
                        text1: 'Login Failed',
                        text2: 'Invalid username or password.',
                        position: 'bottom',
                        visibilityTime: 1000,
                    });
                }
            }
        }
    };
    // Username Validation
    const validateUsername = (text) => {
        setUsername(text);
        if (text.length === 0) {
            setErrorForUser('Username is required');
        } else if (!/^[a-zA-Z0-9_]{3,15}$/.test(text)) {
            setErrorForUser('Username must be 3–15 characters, letters/numbers only.');
            setValid(false)
        } else {
            setErrorForUser('');
            setValid(true)
        }
    };

    // Password Validation
    const validatePassword = (text) => {
        setPassword(text);
        if (text.length === 0) {
            setErrorForPass('Password is required');
        } else if (
            !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(text)
        ) {
            setErrorForPass('Use at least 8 characters with uppercase, number, and special character.');
            setValid(false)
        } else {
            setErrorForPass('');
            setValid(true)
        }
    };


    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/allianceLogo.png")}
                style={styles.logo}
            />
            <Text style={styles.title}>ALLIANCE BANK</Text>
            <View style={styles.loginBox}>
                <Text style={[styles.label, { marginTop: 0 }]}>Username:</Text>
                <Input
                    inputContainerStyle={{ borderRadius: 5, backgroundColor: '#fff', height: 50 }}
                    placeholder="Enter Username"
                    inputStyle={{ fontSize: 15 }}
                    containerStyle={{ height: 45, paddingHorizontal: 0 }}
                    style={{ paddingLeft: 10 }}
                    value={username}
                    onChangeText={validateUsername}
                />
                {errorUser ? <Text style={styles.error}>{errorUser}</Text> : null}
                <Text style={styles.label}>Password:</Text>
                <Input
                    containerStyle={{ height: 50, paddingHorizontal: 0 }}
                    inputContainerStyle={{ borderRadius: 5, backgroundColor: '#fff', height: 50 }}
                    inputStyle={{ fontSize: 15 }}
                    style={{ paddingLeft: 10 }}
                    placeholder="Enter Password"
                    value={password}
                    onChangeText={validatePassword}
                    secureTextEntry={secure}
                    rightIcon={
                        password.length > 0 && <Icon
                            name={secure ? "eye-off" : "eye"}
                            containerStyle={{ marginHorizontal: 10 }}
                            type='material-community'
                            size={24}
                            color="#555"
                            onPress={() => setSecure(!secure)}
                        />
                    }
                />
                {errorPass ? <Text style={styles.error}>{errorPass}</Text> : null}
                <TouchableOpacity style={[styles.button, { backgroundColor: '#e63946' }]} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.footer}>Copyright © 2010-2024. AG | Delta Pte Ltd. All rights reserved.</Text>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fb',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: { height: 100, width: 100, backgroundColor: 'red' },
    error: {
        color: 'red',
        fontSize: 12,
        padding: 5,
        marginTop: 5
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0d2d6c',
        marginVertical: 10,
    },
    loginBox: {
        width: '100%',
        backgroundColor: '#1f4d82',
        padding: 20,
        borderRadius: 8,
        elevation: 5,
        paddingBottom: 30
    },
    label: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 10,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    button: {
        padding: 12,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    footer: {
        color: '#999',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 30,
    },
});
