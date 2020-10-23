import {
  selectProducts,
  changeQuantity,
  cancelOrder,
} from '../actions/actionTypes';
import {
  getProductsAPICreator,
  addProductsAPICreator,
  updateProductsAPICreator,
  deleteProductsAPICreator,
} from '../actions/products';

const initialState = {
  products: [],
  productsBasedPage: [],
  // idProductOrdered: [],
  // productsOrdered: [],
  // totalPrice: 0,
  error: undefined,
  isPending: false,
  isFulFilled: false,
  isRejected: false,

  errorAdd: undefined,
  isAddPending: false,
  isAddFulFilled: false,
  isAddRejected: false,

  errorUpdate: undefined,
  isUpdatePending: false,
  isUpdateFulFilled: false,
  isUpdateRejected: false,

  errorDelete: undefined,
  isDeletePending: false,
  isDeleteFulFilled: false,
  isDeleteRejected: false,

  page: 1,
  // loading: false,
  // refreshing: false,
  keyword: '',
};

const productsReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case String(getProductsAPICreator.pending):
      return {
        ...prevState,
        isPending: true,
      };
    case String(getProductsAPICreator.fulfilled):
      let newData = prevState.products.concat(action.payload.data);
      return {
        ...prevState,
        products: newData,
        productsBasedPage: action.payload.data,
        error: undefined,
        isPending: false,
        isFulFilled: true,
        isRejected: false,
      };
    case String(getProductsAPICreator.rejected):
      return {
        ...prevState,
        error: action.payload,
        isRejected: true,
        isPending: false,
        isFulFilled: false,
      };

    // Add Products
    case String(addProductsAPICreator.pending):
      return {
        ...prevState,
        isAddPending: true,
      };
    case String(addProductsAPICreator.fulfilled): {
      let status;
      if (Number(action.payload.status) === 200) {
        status = true;
      } else {
        status = false;
      }
      return {
        ...prevState,
        errorAdd: undefined,
        isAddPending: false,
        isAddFulFilled: status,
        isAddRejected: false,
      };
    }
    case String(addProductsAPICreator.rejected):
      return {
        ...prevState,
        errorAdd: action.payload,
        isAddRejected: true,
        isAddPending: false,
        isAddFulFilled: false,
      };

    // Update Products
    case String(updateProductsAPICreator.pending):
      return {
        ...prevState,
        isUpdatePending: true,
      };
    case String(updateProductsAPICreator.fulfilled): {
      let status;
      let statusReject;
      if (Number(action.payload.status) === 200) {
        status = true;
        statusReject = false;
      } else {
        status = false;
        statusReject = true;
      }
      return {
        ...prevState,
        errorUpdate: undefined,
        isUpdatePending: false,
        isUpdateFulFilled: status,
        isUpdateRejected: false,
      };
    }
    case String(updateProductsAPICreator.rejected):
      return {
        ...prevState,
        errorUpdate: action.payload,
        isUpdateRejected: true,
        isUpdatePending: false,
        isUpdateFulFilled: false,
      };

    // Delete Products
    case String(deleteProductsAPICreator.pending):
      return {
        ...prevState,
        isDeletePending: true,
      };
    case String(deleteProductsAPICreator.fulfilled): {
      let status;
      let statusReject;
      if (Number(action.payload.status) === 200) {
        status = true;
        statusReject = false;
      } else if (Number(action.payload.status) === 500) {
        status = false;
        statusReject = true;
      }
      return {
        ...prevState,
        errorDelete: undefined,
        isDeletePending: false,
        isDeleteFulFilled: status,
        isDeleteRejected: statusReject,
      };
    }
    case String(deleteProductsAPICreator.rejected):
      return {
        ...prevState,
        errorDelete: action.payload,
        isDeleteRejected: true,
        isDeletePending: false,
        isDeleteFulFilled: false,
      };

    case 'RESET':
      return {
        ...prevState,
        products: [],
      };
    case 'RESETTOAST':
      return {
        ...prevState,
        isAddFulFilled: false,
        isAddRejected: false,
        isUpdateFulFilled: false,
        isUpdateRejected: false,
        isDeleteFulFilled: false,
        isDeleteRejected: false,
      };
    case 'KEYWORD':
      return {
        ...prevState,
        keyword: action.payload,
      };
    case 'SETPAGE':
      return {
        ...prevState,
        page: action.payload,
      };
    default:
      return prevState;
  }
};

export default productsReducer;
