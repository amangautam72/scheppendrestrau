import { combineReducers } from 'redux'

import otpReducer from './OtpReducer'
import verifyReducer from './VeirfyOtpReducer'
import cartReducer from './CartReducer'
import menuReducer from './MenuReducer'
import orderReducer from './OrderReducer'

const rootReducer = combineReducers({
    otpReducer,
    verifyReducer,
    cartReducer,
    menuReducer,
    orderReducer
})


export default rootReducer