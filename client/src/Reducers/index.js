import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import HamburgerMenuReducer from "./HamburgerMenuReducer";
import IngridientsReducer from "./IngridientsReducer";
import ProductsReducer from "./ProductsReducer";

const appReducer = combineReducers({
  auth: AuthReducer,
  hamburgerMenu: HamburgerMenuReducer,
  ingridients: IngridientsReducer,
  products: ProductsReducer,
});

export default appReducer;
