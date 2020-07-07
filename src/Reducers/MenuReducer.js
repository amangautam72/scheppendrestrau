import { FETCHING_DATA, FETCHED_SUCCESSFULLY, FETCHING_FAILED, NO_INTERNET } from '../constants/ActionTypes'


const initialState = {
    data: [],
    isLoading: false,
    fetched: false,
    error: false,
    noInternet: false,
}


function menuReducer(state = initialState, action) {

    switch (action.type) {
        case FETCHING_DATA:
            return {
                ...state,
                isLoading: true,
            }
        case FETCHED_SUCCESSFULLY:

            return {
                data: action.response,
                fetched: true,
                isLoading: false,
            }
        case FETCHING_FAILED:
            return {
                ...state,
                isLoading: false,
                message: 'Something went wrong',
                error: true,
            }
        default:
            return state
    }
}


export default menuReducer