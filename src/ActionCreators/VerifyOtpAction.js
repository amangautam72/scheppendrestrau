import { VERIFY_ATTEMPT, VERIFY_SUCCESSFUL, VERIFY_FAILED, NO_INTERNET} from '../constants/ActionTypes'

import { verifyOtp } from '../Services/Requests'

export function verifyOtpAttempt(){

    return {
        type:VERIFY_ATTEMPT,
    }
}

export function verifySuccessful(){
    return {
        type: VERIFY_SUCCESSFUL,
    }
}


export function verifyFailed(message){
    return {
        type: VERIFY_FAILED,
        message: message,
        
    }
}

// export function noInternet(){
//     return {
//         type: NO_INTERNET,
        
//     }
// }


export function callVerifyOtp(phoneNumber,otp){
    return(dispatch) => {
        dispatch(verifyOtpAttempt())

           
        //NetInfo.isConnected.fetch().done((isConnected) => {
           // if(isConnected){
                verifyOtp(phoneNumber,otp).then(res => {

                    console.log("RESPONSE === " + JSON.stringify(res))
                    
                    if(res.status == '1'){
                       
                        //storeValue(res.data.userdata.usertype, res.data.userdata.id, res.data.userdata.user_name)
        
                        dispatch(verifySuccessful())
                    }else{
                        dispatch(verifyFailed(res.message))
        
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
