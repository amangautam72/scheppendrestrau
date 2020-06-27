import { FETCHING_ORDERS, ORDER_FETCHED, ORDER_FETCHING_FAILED, NO_INTERNET } from '../constants/ActionTypes'

import { getOpenOrders } from '../Services/Requests'

export function fetchingData() {

    return {
        type: FETCHING_ORDERS,
    }
}

export function fetchedSuccessfully(res) {
    return {
        type: ORDER_FETCHED,
        response: res
    }
}


export function fetchingFailed(message) {
    return {
        type: ORDER_FETCHING_FAILED,
        message: message,

    }
}

// export function noInternet(){
//     return {
//         type: NO_INTERNET,

//     }
// }


export function callOrdersApi(resCode, tableid) {
    return (dispatch) => {
        dispatch(fetchingData())


        //NetInfo.isConnected.fetch().done((isConnected) => {
        // if(isConnected){
        getOpenOrders(resCode, tableid).then(res => {

            //console.log("RESPONSE === " + JSON.stringify(res))

            if (res.status == '1') {

                let list = res.data[0]
                dispatch(fetchedSuccessfully(list))
            } else {
                dispatch(fetchingFailed(res.message))

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