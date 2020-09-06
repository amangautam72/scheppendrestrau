import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator } from 'react-native';

//import { Spinner } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'

import { callSendOtp } from '../ActionCreators/OtpAction'
// import facebookIcon from '../assets/images/facebook.svg';
// import gmailIcon from '../assets/images/gmail.svg';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout'



const Signup = ({ navigation, route }) => {

    // const {restaurantcode } = route.params
    const [number, setNumber] = useState('');

    const response = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        //checkSession()
    }, [])

    useEffect(() => {
        console.log("RESPONSE :   " + JSON.stringify(response))

        if (response.otpReducer.otpSent)
            navigation.navigate('Otp', { ...route.params, phoneNumber: number })

    }, [response.otpReducer])


    const checkSession = () => {
        const token = localStorage.getItem('auth');
        if (token != null) {
            navigation.navigate('Splash', { ...route.params })
        }

        
    }
      

    const sendVerification = () => {

        if (number.length < 10) {
            alert("Enter your phone number please.")
            return
        }
        dispatch(callSendOtp(number))

    };



    const renderSignupView = () => {
        return (
            <View style={styles.container}>

                {/* <Text 
            onPress={() => navigation.navigate("Home")}
            style={{ padding: 20, textAlign: 'right',letterSpacing:0.72 }}>SKIP</Text> */}

                <View style={{ padding: 20 }}></View>

                <Text style={[styles.textStyle, { fontSize: 26, fontWeight: '600' }]}>Welcome to EnjoyDine</Text>
                <Text style={[styles.textStyle, { fontSize: 15, fontWeight: '400' }]}>{`Welcome to our "Contactless Dine-out". \nYou are in safe hands!`}</Text>

                <View style={{ padding: 5 }}></View>


                <Image style={{ height: 180 }} resizeMode='contain' source={require('../assets/images/signup.png')}></Image>


                <View style={{ padding: 5 }}></View>

                <Text style={[styles.textStyle, { fontWeight: 'BOLD' }]}>Sign up using the following</Text>


                <View style={styles.socialLogin}>
                    <TouchableOpacity
                        //onPress={facebookLogin}
                        style={[styles.socialButtons, { borderColor: Colors.facebook }]}>

                        {/* <Image resizeMode='contain' style={{width:18,height:18, marginRight:5}} source={facebookIcon}></Image> */}
                        <Text style={{ fontSize: 12, color: Colors.facebook, fontWeight: '400' }}>Login with Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        //onPress={googleLogin}
                        style={[styles.socialButtons, { borderColor: Colors.google }]}>
                        {/* <Image resizeMode='contain' style={{width:18,height:18, marginRight:5}} source={gmailIcon}></Image> */}
                        <Text style={{ fontSize: 12, color: Colors.google, fontWeight: '400' }}>Login using Gmail Ac.</Text>
                    </TouchableOpacity>

                </View>


                <View style={{ padding: 10 }}></View>


                <Text style={{ padding: 10, textAlign: 'center', color: Colors.lightGrey }}>---------------------------------------</Text>

                <Text style={{ padding: 10, textAlign: 'center' }}>Or</Text>

                <View style={{ padding: 5 }}></View>


                <Text style={[styles.textStyle, { fontWeight: '600' }]}>Login with Mobile Number</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginRight: 20 }}>


                    <TextInput
                        style={[styles.input, { fontSize: 12 }]}
                        placeholder='Enter your 10 digit Mobile Number'
                        placeholderTextColor="#ddd"
                        keyboardType='numeric'
                        maxLength={10}
                        onChangeText={text => setNumber(text)}
                        value={number}
                    />

                    <TouchableOpacity
                        onPress={sendVerification}
                        style={styles.sendButton}>

                        <Text style={{ color: 'white', letterSpacing: -0.06, fontWeight: '400' }}>Send OTP</Text>
                    </TouchableOpacity>

                </View>

                <View
                    nativeID={'recaptcha-container'}>

                </View>


                {/* {loading && <Spinner style={{position:'absolute', top:0,bottom:0,left:0,right:0,height:Layout.window.height,backgroundColor:'rgba(52, 52, 52, 0.3)'}} />} */}
            </View>
        )
    }


    return (
        renderSignupView()
    )



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textStyle: {
        padding: 10,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.07
    },
    socialLogin: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    socialButtons: {
        flexDirection: 'row',
        margin: 5,
        padding: 15,
        borderWidth: 1,
        borderRadius: 4
    },
    input: {
        flex: 1,
        height: 55,
        padding: 5,
        margin: 5,
        padding: 10,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        borderRadius: 4,

    },
    sendButton: {
        margin: 5,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: Colors.green,
        borderRadius: 4
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },

});


export default Signup