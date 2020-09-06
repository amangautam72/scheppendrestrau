import Server from './Server'


const getToken = async () => {
    try {
        const token = localStorage.getItem('auth')
        if (token !== null) {
            // value previously stored
            console.log("token : " + token)
            return token
        }
    } catch (e) {
        // error reading value
    }
}

export const sendOtp = (number) => {

    var params = {
        mobile: number,
    }


    console.log("PARAMS  : " + JSON.stringify(params))

    return fetch(Server.SEND_OTP, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}


export const verifyOtp = (number, otp) => {

    var params = {
        mobile: number,
        otp: otp
    }


    console.log("PARAMS  : " + JSON.stringify(params))

    return fetch(Server.VERIFY_OTP, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}

export const getRestaurantInfo = async (resCode) => {

    let path = `${Server.RESTAURANT_INFO}restaurant_id=${resCode}`

    const token = await getToken()

    return fetch(path, {
        method: "GET",
        headers: {
            'Authorization': 'bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}


export const getMenu = async (resCode) => {
    let path = `${Server.MENU}restaurant_id=${resCode}`

    const token = await getToken()

    return fetch(path, {
        method: "GET",
        headers: {
            'Authorization': 'bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}


export const placeOrder = async (resCode, tableid, total, items, number) => {

    var params = {
        restaurant_id: resCode,
        totalamount: total,
        table_id: parseInt(tableid),
        items: items,
    }


    console.log("PARAMS  : " + JSON.stringify(params))

    const token = await getToken()

    return fetch(Server.PLACE_ORDER, {
        method: "POST",
        headers: {
            'Authorization': 'bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}

export const modifyOrder = async (orderid, items, total) => {

    var params = {
        order_id: orderid,
        items: items,
        newamount: total
    }


    console.log("PARAMS  : " + JSON.stringify(params))

    const token = await getToken()

    return fetch(Server.MODIFY_ORDER, {
        method: "POST",
        headers: {
            'Authorization': 'bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}

export const getOpenOrders = async (resCode, tableid) => {

    let path = `${Server.ORDERS}restaurant_id=${resCode}&table_id=${tableid}`

    const token = await getToken()

    return fetch(path, {
        method: "POST",
        headers: {
            'Authorization': 'bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}


export const getGeneratedBill = async (resCode, tableid) => {

    let path = `${Server.GENERATE_BILL}restaurant_id=${resCode}&table_id=${tableid}`

    const token = await getToken()

    return fetch(path, {
        method: "POST",
        headers: {
            'Authorization': 'bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}



export const genrateSignature = async(amount,rescode,tableid) => {

    var params = {
        orderAmount: amount,
        rest_id: rescode,
        tab_id: tableid
    }

const token = await getToken()

console.log("PARAMS  : " + JSON.stringify(params))

return fetch(Server.GENERATE_SIGNATURE, {
    method: "POST",
    headers: {
        'Authorization': 'bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)

}).then((response) => response.json())

    .catch((error) => {
        console.error(error);
    });
}