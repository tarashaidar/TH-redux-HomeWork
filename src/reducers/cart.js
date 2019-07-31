import * as actionTypes from '../actions/cart.actions';

const initState = {
  inCart: []
}

const addToCart = (state, product) => {
  product.quantity = 1;
  const updatedCart = state.inCart.concat(product)
  const unuqie = updatedCart.filter((item, index) => updatedCart.indexOf(item) === index);
  product.available--;
  return { ...state, inCart: unuqie };
}

const removeFromCart = (state, productId) => {
  const updatedCart = state.inCart.filter(el => el !== productId);
  return { ...state, inCart: updatedCart }
}

const clearCart = (state) => {
  return { ...state, inCart: state.inCart = [] }
}

const quantityChanged = (state, quantity, index) => {
  const cart = [...state.inCart]
  const product = { ...cart[index] }
  product.quantity = +quantity;
  if (product.quantity <= 0) {
    product.quantity = 1
  }
  if (product.quantity > product.available) {
    product.quantity = product.available
  }
  cart[index] = product;
  return { ...state, inCart: cart }
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEMS_TO_CART:
      return addToCart(state, action.product);
    case actionTypes.QUANTITY_CHANGED:
      return quantityChanged(state, action.quantity, action.index);
    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action.productId);
    case actionTypes.CLEAR_CART:
      return clearCart(state);
    default:
      return state;
  }
}
