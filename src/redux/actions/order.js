import {createAsyncAction} from "redux-promise-middleware-actions";
import {
  getAllOrderAPI,
  getOrderByCustomerAPI,
  postOrderAPI,
} from "../../utils/order";

export const getAllOrderAPICreator = createAsyncAction(
  "GET_ALL_ORDER",
  async () => {
    const res = await getAllOrderAPI();
    return res.data;
  },
);
export const getOrderByCustomerAPICreator = createAsyncAction(
  "GET_ORDER_BYCUSTOMER",
  async (id) => {
    const res = await getOrderByCustomerAPI(id);
    return res.data;
  },
);
export const postOrderAPICreator = createAsyncAction(
  "POST_ORDER",
  async (body) => {
    const res = await postOrderAPI(body);
    return res.data;
  },
);
export const resetStatus = () => {
  return {
    type: "RESET_STATUS_ORDER",
  };
};
