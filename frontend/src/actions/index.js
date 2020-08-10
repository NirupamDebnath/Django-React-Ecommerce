export const addProductToCart = (product) => {
  return {
    type: 'ADD_PRODUCT_TO_CART',
    payload: product,
  };
};

export const incrementProductCountInCart = (product) => {
  return {
    type: 'INCREMENT_PRODUCT_COUNT_IN_CART',
    payload: product,
  };
};

export const decrementProductCountInCart = (product) => {
  return {
    type: 'DECREMENT_PRODUCT_COUNT_IN_CART',
    payload: product,
  };
};

export const removeProductFromCart = (product) => {
  return {
    type: 'REMOVE_PRODUCT_FROM_CART',
    payload: product,
  };
};
