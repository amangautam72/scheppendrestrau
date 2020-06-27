import { OTP_ATTEMPT, OTP_SENT, OTP_FAILED, NO_INTERNET } from '../constants/ActionTypes'


const initialState = {
    data: {},
    isLoading: false,
    otpSent: false,
    error: false,
    noInternet: false

}


function sendOtpReducer(state = initialState, action) {

    switch (action.type) {
        case OTP_ATTEMPT:
            return {
                ...state,
                isLoading: true,
            }
        case OTP_SENT:
            return {
                ...state,
                otpSent: true,
                isLoading: false,
            }
        case OTP_FAILED:
            return {
                ...state,
                isLoading: false,
                message: action.message,
                error: true,
            }

        case NO_INTERNET:
            return {
                ...state, 
                noInternet: true,

            }
        default:
            return state
    }
} 


export default sendOtpReducer