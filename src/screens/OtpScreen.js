
import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

import { Container,Input } from 'native-base';

import { useSelector, useDispatch } from 'react-redux'


import Colors from '../constants/Colors';
import Layout from '../constants/Layout'

import OtpInputs from '../Components/OtpInputs'
import { callSendOtp } from '../ActionCreators/OtpAction'
import { verifyOtp } from '../Services/Requests';



const OtpScreen = ({ navigation, route }) => {

    const phoneNumber = route.params ? route.params.phoneNumber : null;

    const { restaurantcode, tableid } = route.params

    const [otp, setOtp] = useState('')
   
    const response = useSelector(state => state)
    const dispatch = useDispatch()


    const getOtp = (value) => {
        setOtp(value)
    }

   
    const confirmCode = () => {
        if (otp.length < 6)
            return


            verifyOtp(phoneNumber,otp).then(res => {

                console.log("RESPONSE === " + JSON.stringify(res))
                
                if(res.status == '1'){
                    storeToken(res.data[0].login_token)
                    navigation.replace('Home',{...route.params})
                    
                }else{
                    
                }
            
            })
            .catch((err) => console.log("ERROR : " + err))

       
    }

    const storeToken = (token) => {
        localStorage.setItem('auth',token)
    }

    const resendOtp = () => {
    
        dispatch(callSendOtp(phoneNumber))
    }



    return (
        <View style={styles.container}>

            <View>


                <View style={{ padding: 40 }}></View>


                <Text style={[styles.textStyle, { color: Colors.blue, fontSize: 22, letterSpacing: -0.11}]}>OTP Verification</Text>
                <Text style={[styles.textStyle, { fontSize: 14, }]}>{`Please enter the 6 digit OTP sent on the. \ngiven number`}</Text>

                <Text style={[styles.textStyle, { color: Colors.blue, fontSize: 16, letterSpacing: -0.11,}]}>{phoneNumber}
                    {/* <Text onPress={() => navigation.navigate("Signup")}><Image resizeMode='contain' style={{ width: 11, height: 11, marginLeft: 8 }} source={editPencil}></Image></Text> */}
                </Text>


                <View style={{ padding: 30 }}></View>


                <Text style={[styles.textStyle, { paddingTop: 0, fontSize: 16, letterSpacing: -0.11}]}>Enter OTP</Text>


                <Container style={{ height: 100 }}>

                    <OtpInputs
                        width={40}
                        height={50}
                        getOtp={(otp) => getOtp(otp)}
                    />


                    


                </Container>


                <TouchableOpacity
                    onPress={confirmCode}
                    style={styles.submit}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Submit</Text>
                </TouchableOpacity>


                <View style={{ padding: 30 }}></View>



                <Text style={{ padding: 10, textAlign: 'center', color: Colors.lightGrey }}>---------------------------------------</Text>

                <Text style={[styles.textStyle, { padding: 0, fontSize: 16, letterSpacing: -0.11 }]}>Did not recieve an OTP?</Text>

                <Text onPress={() => resendOtp()} style={[styles.textStyle, { color: Colors.blue, letterSpacing: -0.11}]}>Resend OTP</Text>



            </View>


           
            {/* {loading && <Spinner style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: Layout.window.height, backgroundColor: 'rgba(52, 52, 52, 0.3)' }} />} */}

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textStyle: {
        padding: 5,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: -0.07
    },
    submit: {
        backgroundColor: Colors.darkBlue, padding: 15, paddingLeft: 100, paddingRight: 100, margin: 20, borderRadius: 5, alignSelf: 'center'
    },

});


export default OtpScreen   