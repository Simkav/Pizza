import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import HamburgerMenuReducer from './HamburgerMenuReducer';
import IngridientsReducer from './IngridientsReducer';
import ProductsReducer from './ProductsReducer';
import CartReducer from './CartReducer';

const appReducer = combineReducers({
  auth: AuthReducer,
  hamburgerMenu: HamburgerMenuReducer,
  ingridients: IngridientsReducer,
  products: ProductsReducer,
  cart: CartReducer,
});

export default appReducer;
