import {loginAPICreator, registrationAPICreator} from '../actions/auth';

const initialState = {
  statusLogin: false,
  dataLogin: {},
  errorLogin: undefined,
  isLoginPending: false,
  isLoginFulFilled: false,
  isLoginRejected: false,

  statusRegist: false,
  dataRegist: [],
  errorRegist: undefined,
  isRegistPending: false,
  isRegistFulFilled: false,
  isRegistRejected: false,
};

const authAPIReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case String(loginAPICreator.pending):
      return {
        ...prevState,
        isLoginPending: true,
      };
    case String(loginAPICreator.fulfilled):
      let datalogin;
      let status;
      if (Number(action.payload.status) === 200) {
        datalogin = action.payload.data;
        status = 200;
      } else {
        status = 500;
      }

      return {
        ...prevState,
        statusLogin: status,
        dataLogin: datalogin,
        errorLogin: undefined,
        isLoginPending: false,
        isLoginFulFilled: true,
        isLoginRejected: false,
      };
    case String(loginAPICreator.rejected):
      return {
        ...prevState,
        statusLogin: 500,
        errorLogin: action.payload,
        isLoginRejected: true,
        isLoginPending: false,
        isLoginFulFilled: false,
      };

    case String(registrationAPICreator.pending):
      return {
        ...prevState,
        isRegistPending: true,
      };
    case String(registrationAPICreator.fulfilled):
      return {
        ...prevState,
        statusRegist: action.payload.status,
        dataRegist: action.payload.data,
        errorRegist: undefined,
        isRegistPending: false,
        isRegistFulFilled: true,
        isRegistRejected: false,
      };
    case String(registrationAPICreator.rejected):
      return {
        ...prevState,
        statusRegist: 500,
        errorRegist: action.payload,
        isRegistRejected: true,
        isRegistPending: false,
        isRegistFulFilled: false,
      };

    case 'LOGOUT':
      return {
        ...prevState,
        dataLogin: [],
        statusLogin: false,
        errorLogin: undefined,
        isLoginPending: false,
        isLoginFulFilled: false,
        isLoginRejected: false,
        statusRegist: false,
        dataRegist: [],
        errorRegist: undefined,
        isRegistPending: false,
        isRegistFulFilled: false,
        isRegistRejected: false,
      };
    default:
      return prevState;
  }
};

export default authAPIReducer;
