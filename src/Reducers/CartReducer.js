import { ADD_TO_CART, REMOVE_FROM_CART, ADD_QUANTITY, SUBTRACT_QUANTITY, UPDATE_CART } from '../constants/ActionTypes'

const initialState = {
  data: [],
  cartItems: [],
  total: 0

}


const CartReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.item],
        total: state.total + action.item.cost

      }
    case REMOVE_FROM_CART:
      let newState = [...state.cartItems]
      let index = newState.findIndex(x => x.id === action.item.id)
      newState.splice(index, 1)
      return {
        ...state,
        cartItems: newState,
        total: state.total - action.item.cost
      }
    case ADD_QUANTITY:
      return {
        ...state,
        total: state.total + action.item.cost
      }
    case SUBTRACT_QUANTITY:
      return {
        ...state,
        total: state.total - action.item.cost
      }
    case UPDATE_CART:
      return {
        ...state,
        cartItems: action.items,
        total:action.total
      }
    default:
      return state
  }
}

export default CartReducer