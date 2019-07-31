import * as actionTypes from '../actions/products.action';

const initState = {
  products: null
};

const addProduct = (state, product) => {
  const updatedProductsList = state.products.concat(product);
  return { ...state, products: updatedProductsList };
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_LIST:
      return { ...state, products: action.products }
    case actionTypes.ADD_NEW_PRODUCT:
      return addProduct(state, action.product);
    default:
      return state;
  }
}


