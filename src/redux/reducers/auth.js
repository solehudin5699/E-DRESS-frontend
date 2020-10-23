import {
  loginAPICreator,
  registrationAPICreator,
  updateUserAPICreator,
} from '../actions/auth';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  //LOGIN
  statusLogin: false,
  dataLogin: {},
  errorLogin: undefined,
  isLoginPending: false,
  isLoginFulFilled: false,
  isLoginRejected: false,

  //REGIST
  statusRegist: false,
  dataRegist: [],
  errorRegist: undefined,
  isRegistPending: false,
  isRegistFulFilled: false,
  isRegistRejected: false,

  //UPDATEUSER
  statusUpdate: false,
  dataUpdate: [],
  errorUpdate: undefined,
  isUpdatePending: false,
  isUpdateFulFilled: false,
  isUpdateRejected: false,
};

const authAPIReducer = (prevState = initialState, action) => {
  switch (action.type) {
    //LOGIN
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
        // (async function () {
        //   try {
        //     await AsyncStorage.setItem('token', `${action.payload.data.token}`);
        //   } catch (err) {
        //     console.log(err);
        //   }
        // })();
      } else {
        status = 500;
        datalogin = undefined;
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

    //REGIST
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

    //UPDATE USER
    case String(updateUserAPICreator.pending):
      return {
        ...prevState,
        isUpdatePending: true,
      };
    case String(updateUserAPICreator.fulfilled): {
      let statusSuccess;
      let newData;
      if (Number(action.payload.status) === 200) {
        statusSuccess = 200;
        // newData={...prevState.dataLogin, ...action.payload.data}
      } else if (Number(action.payload.status) === 500) {
        statusSuccess = 500;
        // statusReject=true
      }
      return {
        ...prevState,
        dataLogin: {...prevState.dataLogin, ...action.payload.data},
        statusUpdate: statusSuccess,
        dataUpdate: action.payload.data,
        errorUpdate: undefined,
        isUpdatePending: false,
        isUpdateFulFilled: true,
        isUpdateRejected: false,
      };
    }
    case String(updateUserAPICreator.rejected):
      return {
        ...prevState,
        statusUpdate: 500,
        errorUpdate: action.payload,
        isUpdateRejected: true,
        isUpdatePending: false,
        isUpdateFulFilled: false,
      };

    case 'LOGOUT': {
      const clearAppData = async function () {
        try {
          const keys = await AsyncStorage.getAllKeys();
          await AsyncStorage.multiRemove(keys);
        } catch (error) {
          console.error('Error clearing app data.');
        }
      };
      clearAppData();
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
    }
    case 'RESETSTATUSLOGIN':
      return {
        ...prevState,
        statusLogin: null,
      };
    case 'RESETSTATUSUPDATE':
      return {
        ...prevState,
        statusUpdate: null,
      };
    default:
      return prevState;
  }
};

export default authAPIReducer;
