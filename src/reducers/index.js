import { combineReducers } from 'redux';

import products from './products';
import cart from './cart';
import modal from './modal';

const rootReducer = combineReducers({
    products: products,
    cart: cart,
    modal: modal
});

export default rootReducer;