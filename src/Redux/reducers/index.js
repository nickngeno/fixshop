import {combineReducers} from  'redux'
import {productReducer,selectedProductReducer} from './productsReducer'

const rootReducer = combineReducers({
    allProducts: productReducer,
    product : selectedProductReducer
}) 
export default rootReducer