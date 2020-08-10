import _ from 'lodash';
export const cartReducer = (cart = {}, action) => {
  if (action.payload != undefined) {
    if (!(action.payload.id in cart)) {
      switch (action.type) {
        case 'ADD_PRODUCT_TO_CART':
          action.payload.countInCart = 1;
          return { ...cart, [action.payload.id]: action.payload };
        default:
          return cart;
      }
    } else {
      let product;
      switch (action.type) {
        case 'ADD_PRODUCT_TO_CART':
          return _.omit(cart, [action.payload.id]);
        case 'REMOVE_PRODUCT_FROM_CART':
          return _.omit(cart, [action.payload.id]);
        case 'INCREMENT_PRODUCT_COUNT_IN_CART':
          product = cart[action.payload.id];
          product.countInCart += 1;
          return { ...cart, [product.id]: product };
        case 'DECREMENT_PRODUCT_COUNT_IN_CART':
          product = cart[action.payload.id];
          if (product.countInCart > 1) {
            product.countInCart -= 1;
            return { ...cart, [product.id]: product };
          } else {
            return cart;
          }

        default:
          return cart;
      }
    }
  }

  return cart;
};
