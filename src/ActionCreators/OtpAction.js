import { OTP_ATTEMPT, OTP_SENT, OTP_FAILED, NO_INTERNET} from '../constants/ActionTypes'

import { sendOtp } from '../Services/Requests'

export function otpAttempt(){

    return {
        type:OTP_ATTEMPT,
    }
}

export function otpSent(){
    return {
        type: OTP_SENT,
    }
}


export function otpFailed(message){
    return {
        type: OTP_FAILED,
        message: message,
        
    }
}

// export function noInternet(){
//     return {
//         type: NO_INTERNET,
        
//     }
// }


export function callSendOtp(phoneNumber){
    return(dispatch) => {
        dispatch(otpAttempt())

           
        //NetInfo.isConnected.fetch().done((isConnected) => {
           // if(isConnected){
                sendOtp(phoneNumber).then(res => {

                    console.log("RESPONSE === " + JSON.stringify(res))
                    
                    if(res.status == '1'){
                       
                        //storeValue(res.data.userdata.usertype, res.data.userdata.id, res.data.userdata.user_name)
        
                        dispatch(otpSent())
                    }else{
                        dispatch(otpFailed(res.message))
        
                        // alert(res.message)
                    }
                
                })
                .catch((err) => console.log("ERROR : " + err))
            // }
            // else{
            //     Toast.show({ text: 'No internet connection found!- Internet connection required to use this app', buttonText: 'okay', duration: 3000 })
            //     dispatch(noInternet())
            // }
        //})

     

    } 
}
