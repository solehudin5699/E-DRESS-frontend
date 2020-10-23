import {getProducts} from './actionTypes';
import {createAsyncAction} from 'redux-promise-middleware-actions';
// import axios from "axios";
import {
  getProductsAPI,
  addProductsAPI,
  updateProductsAPI,
  deleteProductsAPI,
} from '../../utils/products';

export const getProductsAPICreator = createAsyncAction(
  getProducts,
  async (keyword, sort, order, newest, page) => {
    const res = await getProductsAPI(keyword, sort, order, newest, page);
    return res.data;
  },
);

export const updateProductsAPICreator = createAsyncAction(
  'UPDATEPRODUCT',
  async (id, body) => {
    const res = await updateProductsAPI(id, body);
    return res.data;
  },
);

export const addProductsAPICreator = createAsyncAction(
  'ADDPRODUCTS',
  async (body) => {
    const res = await addProductsAPI(body);
    return res.data;
  },
);
export const deleteProductsAPICreator = createAsyncAction(
  'DELETEPRODUCTS',
  async (id) => {
    const res = await deleteProductsAPI(id);
    return res.data;
  },
);
export const setResetCreator = () => {
  return {
    type: 'RESET',
  };
};
export const setKeywordCreator = (keyword) => {
  return {
    type: 'KEYWORD',
    payload: keyword,
  };
};

export const resetToastCreator = () => {
  return {
    type: 'RESETTOAST',
  };
};

export const setPageCreator = (page) => {
  return {
    type: 'SETPAGE',
    payload: page,
  };
};
