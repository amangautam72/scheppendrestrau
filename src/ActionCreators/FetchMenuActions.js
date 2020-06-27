import { FETCHING_DATA, FETCHED_SUCCESSFULLY, FETCHING_FAILED, NO_INTERNET } from '../constants/ActionTypes'

import {  getMenu } from '../Services/Requests'

export function fetchingData() {

    return {
        type: FETCHING_DATA,
    }
}

export function fetchedSuccessfully(res) {
    return {
        type: FETCHED_SUCCESSFULLY,
        response: res
    }
}


export function fetchingFailed(message) {
    return {
        type: FETCHING_FAILED,
        message: message,

    }
}

// export function noInternet(){
//     return {
//         type: NO_INTERNET,

//     }
// }



export function callMenuApi(resCode) {
    return (dispatch) => {
        dispatch(fetchingData())


        //NetInfo.isConnected.fetch().done((isConnected) => {
        // if(isConnected){
        getMenu(resCode).then(res => {

            //console.log("RESPONSE === " + JSON.stringify(res))

            if (res.status == '1') {

                //storeValue(res.data.userdata.usertype, res.data.userdata.id, res.data.userdata.user_name)
                let list = res.data
                for (let i = 0; i < list.length; i++) {
                    let menucard = list[i].item
                    for (let j = 0; j < menucard.length; j++) {
                        //let item = list[i].items.data
                        list[i].item[j].cartQuantity = 0
                    }
                }

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
