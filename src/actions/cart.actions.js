export const ADD_ITEMS_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const QUANTITY_CHANGED = 'QUANTITY_CHANGED';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = payload => ({type: ADD_ITEMS_TO_CART, product: payload});
export const quantityChanged= (quantity, index) => ({type: QUANTITY_CHANGED, quantity: quantity, index: index});
export const removeFromCart = id => ({type: REMOVE_FROM_CART, productId: id});
export const clearCart = () => ({type: CLEAR_CART});

