const initialState = {
  modalFilter: false,
  modalSignOut: false,
  modalEditDelete: false,
  dataModalEditDelete: null,
  modalDelete: false,
  idDelete: null,
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
        modalFilter: action.payload,
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
    case 'SIGNOUT':
      return {
        ...prevState,
        modalSignOut: action.payload,
      };
    case 'EDITDELETE':
      return {
        ...prevState,
        modalEditDelete: action.payload,
        dataModalEditDelete: action.data,
      };
    case 'DELETE':
      return {
        ...prevState,
        modalDelete: action.payload,
        idDelete: action.id,
      };
    default:
      return prevState;
  }
};

export default modalReducer;
