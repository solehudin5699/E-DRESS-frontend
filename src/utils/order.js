import axios from "axios";
import {serverAddress} from '../../sharedVariable';

export const postOrderAPI = (body) => {
  return axios.post(`${serverAddress}/order/add`, body
  // ,{headers:{"x-access-token":`bearer ${localStorage.getItem("token")}`}}
  );
};

