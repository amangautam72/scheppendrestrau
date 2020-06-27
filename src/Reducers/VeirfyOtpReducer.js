import { VERIFY_ATTEMPT, VERIFY_SUCCESSFUL, VERIFY_FAILED, NO_INTERNET} from '../constants/ActionTypes'


const initialState = {
    data: {},
    isLoading: false,
    verifySuccess: false,
    error: false,
    noInternet: false

}


function verifyOtpReducer(state = initialState, action) {

    switch (action.type) {
        case VERIFY_ATTEMPT:
            return {
                ...state,
                isLoading: true,
            }
        case VERIFY_SUCCESSFUL:
            return {
                ...state,
                verifySuccess: true,
                isLoading: false,
            }
        case VERIFY_FAILED:
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


export default verifyOtpReducer