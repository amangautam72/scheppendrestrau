import { FETCHING_ORDERS, ORDER_FETCHED, ORDER_FETCHING_FAILED, NO_INTERNET } from '../constants/ActionTypes'

const initialState = {
    order_status: false,
    orders:[],
    orderid:0,
    isLoading: false,
    fetched: false,
    error: false,
    noInternet: false

}


function orderReducer(state = initialState, action) {

    switch (action.type) {
        case FETCHING_ORDERS:
            return {
                ...state,
                isLoading: true,
            }
        case ORDER_FETCHED:
            let orderdetail = action.response.orderdetail
            let products = action.response.productdetail
            return {
                orders: products,
                fetched: true,
                order_status: products.length < 1 ? false : true,
                orderid: products.length < 1 ? 0 : orderdetail.id,
                isLoading: false,
            }
        case ORDER_FETCHING_FAILED:
            return {
                ...state,
                isLoading: false,
                message: action.message,
                error: true,
            }

        // case NO_INTERNET:
        //     return {
        //         ...state, 
        //         noInternet: true,

        //     }
        default:
            return state
    }
} 


export default orderReducer