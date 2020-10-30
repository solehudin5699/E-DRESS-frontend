import {
  getAllOrderAPICreator,
  getOrderByCustomerAPICreator,
  postOrderAPICreator,
} from "../actions/order";
const initialState = {
  statusGetAll: null,
  dataAllOrder: [],
  errorGetAll: undefined,
  isGetAllPending: false,
  isGetAllFulFilled: false,
  isGetAllRejected: false,

  //Cust means customer
  statusGetOrderByCust: null,
  dataOrderCust: [],
  errorGetOrderCust: undefined,
  isGetOrderCustPending: false,
  isGetOrderCustFulFilled: false,
  isGetOrderCustRejected: false,

  //Post Order
  statusPostOrder: null,
  dataPostOrder: [],
  errorPostOrder: undefined,
  isPostOrderPending: false,
  isPostOrderFulFilled: false,
  isPostOrderRejected: false,
};

const orderReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case String(getAllOrderAPICreator.pending): {
      return {
        ...prevState,
        isGetAllPending: true,
      };
    }
    case String(getAllOrderAPICreator.fulfilled): {
      let status;
      let data;
      let error;
      if (action.payload.status === 200) {
        status = 200;
        data = action.payload.data;
        error = undefined;
      } else {
        status = 500;
        data = [];
        error = action.payload.error;
      }
      return {
        ...prevState,
        statusGetAll: status,
        dataAllOrder: data,
        errorGetAll: error,
        isGetAllPending: false,
        isGetAllFulFilled: true,
        isGetAllRejected: false,
      };
    }
    case String(getAllOrderAPICreator.rejected): {
      return {
        ...prevState,
        statusGetAll: 500,
        errorGetAll: action.payload,
        isGetAllPending: false,
        isGetAllFulFilled: false,
        isGetAllRejected: true,
      };
    }

    //Get Order By Customer
    case String(getOrderByCustomerAPICreator.pending): {
      return {
        ...prevState,
        isGetOrderCustPending: true,
      };
    }
    case String(getOrderByCustomerAPICreator.fulfilled): {
      let status;
      let data;
      let error;
      if (action.payload.status === 200) {
        status = 200;
        data = action.payload.data;
        error = undefined;
      } else {
        status = 500;
        data = [];
        error = action.payload.error;
      }
      return {
        ...prevState,
        statusGetOrderByCust: status,
        dataOrderCust: data,
        errorGetOrderCust: error,
        isGetOrderCustPending: false,
        isGetOrderCustFulFilled: true,
        isGetOrderCustRejected: false,
      };
    }
    case String(getOrderByCustomerAPICreator.rejected): {
      return {
        ...prevState,
        statusGetOrderByCust: 500,
        errorGetOrderCust: action.payload,
        isGetOrderCustPending: false,
        isGetOrderCustFulFilled: false,
        isGetOrderCustRejected: true,
      };
    }

    //Post order
    case String(postOrderAPICreator.pending): {
      return {
        ...prevState,
        isPostOrderPending: true,
      };
    }
    case String(postOrderAPICreator.fulfilled): {
      let status;
      let data;
      let error;
      if (action.payload.status === 200) {
        status = 200;
        data = action.payload.data;
        error = undefined;
      } else {
        status = 500;
        data = [];
        error = action.payload.error;
      }
      return {
        ...prevState,
        statusPostOrder: status,
        dataPostOrder: data,
        errorPostOrder: error,
        isPostOrderPending: false,
        isPostOrderFulFilled: true,
        isPostOrderRejected: false,
      };
    }
    case String(postOrderAPICreator.rejected): {
      return {
        ...prevState,
        statusPostOrder: 500,
        errorPostOrder: action.payload,
        isPostOrderPending: false,
        isPostOrderFulFilled: false,
        isPostOrderRejected: true,
      };
    }
    case "RESET_STATUS_ORDER":
      return {
        ...prevState,
        statusGetAll: null,
        statusGetOrderByCust: null,
        statusPostOrder: null,
      };
    default:
      return prevState;
  }
};

export default orderReducer;
