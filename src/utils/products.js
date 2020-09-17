import axios from 'axios';

export const getProductsAPI = (keyword, sort, order, newest) => {
  return axios.get(
    `http://192.168.43.220:8000/products/search?name=${keyword}&sortBy=${sort}&orderBy=${order}&newest=${newest}&limit=100&page=1`,
  );
};

export const addProductsAPI = (body) => {
  return axios.post('http://localhost:8000/products/add', body, {
    headers: {
      'content-type': 'multipart/form-data',
      'x-access-token': `bearer ${localStorage.getItem('token')}`,
    },
  });
};
