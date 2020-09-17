import {
  getProducts,
  selectProducts,
  changeQuantity,
  cancelOrder,
} from './actionTypes';
import {createAsyncAction} from 'redux-promise-middleware-actions';
// import axios from "axios";
import {getProductsAPI, addProductsAPI} from '../../utils/products';
// import { postOrderAPI } from "../../utils/requestOrder";

export const getProductsAPICreator = createAsyncAction(
  getProducts,
  async (keyword, sort, order, newest) => {
    const res = await getProductsAPI(keyword, sort, order, newest);
    return res.data;
  },
);
// export const postOrderAPICreator = createAsyncAction(
//   "postOrder",
//   async (body) => {
//     const res = await postOrderAPI(body);
//     return res.data;
//   }
// );

export const addProductsAPICreator = createAsyncAction(
  'ADDPRODUCTS',
  async (body) => {
    const res = await addProductsAPI(body);
    return res.data;
  },
);

export const selectProductCreator = (event) => {
  return {
    type: selectProducts,
    payload: event,
  };
};
export const changeQuantityCreator = (event) => {
  return {
    type: changeQuantity,
    payload: event,
  };
};
export const cancelOrderCreator = () => {
  return {
    type: cancelOrder,
  };
};

export const toastPostOrderCreator = () => {
  return {
    type: 'TOAST_POST_ORDER',
  };
};
