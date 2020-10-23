import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {serverAddress} from '../../sharedVariable';

export const getProductsAPI = (keyword, sort, order, newest, page) => {
  return axios.get(
    `${serverAddress}/products/search?name=${keyword}&sortBy=${sort}&orderBy=${order}&newest=${newest}&limit=8&page=${page}`,
  );
};

export const addProductsAPI = (body) => {
  return axios.post(`${serverAddress}/products`, body, {
    headers: {
      'content-type': 'multipart/form-data',
      contentType: false,
      mimeType: 'multipart/form-data',
      'cache-control': 'no-cache',
      // 'x-access-token': `bearer ${AsyncStorage.getItem('token')}`,
      accept: 'application/json',
    },
  });
};

export const updateProductsAPI = (id, body) => {
  return axios.patch(`${serverAddress}/products/${id}`, body, {
    headers: {
      'content-type': 'multipart/form-data',
      contentType: false,
      mimeType: 'multipart/form-data',
      'cache-control': 'no-cache',
      // 'x-access-token': `bearer ${AsyncStorage.getItem('token')}`,
      accept: 'application/json',
    },
  });
};

export const deleteProductsAPI = (id) => {
  return axios.delete(`${serverAddress}/products/${id}`);
};
