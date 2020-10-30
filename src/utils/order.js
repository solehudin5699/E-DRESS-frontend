import axios from "axios";
import {serverAddress} from "../../sharedVariable";

export const postOrderAPI = (body) => {
  return axios.post(`${serverAddress}/order`, body);
};
export const getAllOrderAPI = () => {
  return axios.get(`${serverAddress}/order`);
};
export const getOrderByCustomerAPI = (id) => {
  return axios.get(`${serverAddress}/order/${id}`);
};
