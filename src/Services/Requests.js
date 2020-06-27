import Server from './Server'

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

export const getRestaurantInfo = (resCode) => {

    let path = `${Server.RESTAURANT_INFO}restaurant_id=aa1234`

    return fetch(path, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}


export const getMenu = (resCode) => {

    let path = `${Server.MENU}restaurant_id=${resCode}`

    return fetch(path, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}


export const placeOrder = (resCode, tableid, total, items, number) => {

    var params = {
        restaurant_id: resCode,
        totalamount: total,
        table_id: parseInt(tableid),
        items: items,
        user: '8787878787'
    }


    console.log("PARAMS  : " + JSON.stringify(params))

    return fetch(Server.PLACE_ORDER, {
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

export const modifyOrder = (orderid, items) => {

    var params = {
        order_id: orderid,
        items: items,
    }


    console.log("PARAMS  : " + JSON.stringify(params))

    return fetch(Server.MODIFY_ORDER, {
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

export const getOpenOrders = (resCode, tableid) => {

    let path = `${Server.ORDERS}restaurant_id=${resCode}&table_id=${tableid}`

    return fetch(path, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}


export const getGeneratedBill = (resCode, tableid) => {

    let path = `${Server.GENERATE_BILL}restaurant_id=${resCode}&table_id=${tableid}`

    return fetch(path, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

    }).then((response) => response.json())

        .catch((error) => {
            console.error(error);
        });
}