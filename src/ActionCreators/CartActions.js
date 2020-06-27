import { ADD_TO_CART, REMOVE_FROM_CART, SUBTRACT_QUANTITY, ADD_QUANTITY, UPDATE_CART} from '../constants/ActionTypes'


export function addToCart(item){

    return {
        type:ADD_TO_CART,
        item
    }
}

export function removeItem(item){

    return {
        type:REMOVE_FROM_CART,
        item
    }
}

export function addQuantity(item){

    return {
        type:ADD_QUANTITY,
        item
    }
}

export function subtractQuantity(item){

    return {
        type:SUBTRACT_QUANTITY,
        item
    }
}

export function updateCart(){

    return {
        type:UPDATE_CART
    }
}