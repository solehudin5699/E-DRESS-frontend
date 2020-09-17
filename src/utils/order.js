import axios from "axios";

export const postOrderAPI = (body) => {
  return axios.post("http://localhost:1000/order/add", body
  ,{headers:{"x-access-token":`bearer ${localStorage.getItem("token")}`}});
};

