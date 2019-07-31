const axios = require('axios');

export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';

export const setProducts = ( products ) => {
    return {
        type: GET_PRODUCT_LIST, 
        products
    };
};

export const getProductList = () => {
    return dispatch => {
        axios.get('./products.json')
        .then(products => {          
            dispatch(setProducts(products.data));            
        });
        
        
    }        
}

export const addNewProduct = payload => ({type: ADD_NEW_PRODUCT, product: payload});