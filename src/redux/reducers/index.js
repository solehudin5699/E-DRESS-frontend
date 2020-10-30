import {combineReducers} from "redux";
import productsReducer from "./products";
// import requestProductsReducer from './requestProducts';
import authAPIReducer from "./auth";
import modalReducer from "./modal";
import cartReducer from "./cart";
import orderReducer from "./order";
//Combine reducers
const indexReducer = combineReducers({
  products: productsReducer,
  // requestAPIProducts: requestProductsReducer,
  authAPI: authAPIReducer,
  cart: cartReducer,
  modals: modalReducer,
  order: orderReducer,
});

export default indexReducer;
