import axios from 'axios';
import {serverAddress} from '../../sharedVariable';

export const loginAPI = (body) => {
  return axios.post(`${serverAddress}/auth/login`, body);
};
export const registrationAPI = (body) => {
  return axios.post(`${serverAddress}/auth/registration`, body);
};
export const updateUserAPI = (id, body) => {
  return axios.patch(`${serverAddress}/auth/update/${id}`, body, {
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
// export const validateTokenAPI = () => {
//   return axios.post('http://localhost:8000/auth/validate', null, {
//     headers: {'x-access-token': `bearer ${localStorage.getItem('token')}`},
//   });
// };
