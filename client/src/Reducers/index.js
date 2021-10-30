import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import IngridientsReducer from './IngridientsReducer';
import ProductsReducer from './ProductsReducer';
import CartReducer from './CartReducer';

const appReducer = combineReducers({
  auth: AuthReducer,
  ingridients: IngridientsReducer,
  products: ProductsReducer,
  cart: CartReducer,
});

export default appReducer;
