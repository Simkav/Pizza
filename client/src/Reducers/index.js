import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import HamburgerMenuReducer from "./HamburgerMenuReducer";
import IngridientsReducer from "./IngridientsReducer";

const appReducer = combineReducers({
  auth: AuthReducer,
  hamburgerMenu: HamburgerMenuReducer,
  ingridients: IngridientsReducer,
});

export default appReducer;
