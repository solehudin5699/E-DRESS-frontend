export const modalFilterAction = () => {
  return {
    type: 'SHOWHIDEFILTER',
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
