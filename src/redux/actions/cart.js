export const addToCartAction = (product) => {
  return {
    type: 'ADDTOCART',
    payload: product,
  };
};
export const increaseQuantityAction = (index) => {
  return {
    type: 'INCQ',
    payload: index,
  };
};
export const decreaseQuantityAction = (index) => {
  return {
    type: 'DECQ',
    payload: index,
  };
};
export const deleteFromCartAction = () => {
  return {
    type: 'DEL',
  };
};
export const checkListAction = (index) => {
  return {
    type: 'CHECK',
    payload: index,
  };
};
export const setTotalPriceAction = () => {
  return {
    type: 'TOTALPRICE',
  };
};
