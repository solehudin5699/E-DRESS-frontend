import {createAsyncAction} from 'redux-promise-middleware-actions';

import {
  loginAPI,
  registrationAPI,
  updateUserAPI,
  // validateTokenAPI,
} from '../../utils/auth';

export const loginAPICreator = createAsyncAction('LOGIN', async (body) => {
  const res = await loginAPI(body);
  return res.data;
});

export const registrationAPICreator = createAsyncAction(
  'REGISTRATION',
  async (body) => {
    const res = await registrationAPI(body);
    return res.data;
  },
);
export const resetStatusLoginCreator = () => {
  return {
    type: 'RESETSTATUSLOGIN',
  };
};
export const resetStatusUpdateCreator = () => {
  return {
    type: 'RESETSTATUSUPDATE',
  };
};
export const logoutCreator = (event) => {
  return {
    type: 'LOGOUT',
  };
};
export const updateUserAPICreator = createAsyncAction(
  'UPDATEUSER',
  async (id, body) => {
    const res = await updateUserAPI(id, body);
    return res.data;
  },
);
