export const modalFilterAction = (value) => {
  return {
    type: 'SHOWHIDEFILTER',
    payload: value,
  };
};
export const setSearchByAction = (search) => {
  return {
    type: 'SETSEARCHBY',
    payload: search,
  };
};
export const setSortByAction = (sort) => {
  return {
    type: 'SETSORTBY',
    payload: sort,
  };
};
export const setOrderByAction = (order) => {
  return {
    type: 'SETORDERBY',
    payload: order,
  };
};
export const setNewestAction = (newest) => {
  return {
    type: 'NEWEST',
    payload: newest,
  };
};

export const modalSignOutAction = (value) => {
  return {
    type: 'SIGNOUT',
    payload: value,
  };
};
export const modalEditDeleteAction = (value, data) => {
  return {
    type: 'EDITDELETE',
    payload: value,
    data: data,
  };
};
export const modalDeleteAction = (value, id) => {
  return {
    type: 'DELETE',
    payload: value,
    id: id,
  };
};
