const initialState = {
  modalFilter: false,
  searchBy: 'name',
  sortBy: 'name',
  orderBy: 'ASC',
  newest: 'ASC',
};

const modalReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'SHOWHIDEFILTER':
      return {
        ...prevState,
        modalFilter: !prevState.modalFilter,
      };
    case 'SETSEARCHBY':
      return {
        ...prevState,
        searchBy: action.payload,
      };
    case 'SETSORTBY':
      return {
        ...prevState,
        sortBy: action.payload,
      };
    case 'SETORDERBY':
      return {
        ...prevState,
        orderBy: action.payload,
      };
    case 'NEWEST':
      return {
        ...prevState,
        newest: action.payload,
      };
    default:
      return prevState;
  }
};

export default modalReducer;
