import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import HamburgerMenuReducer from "./HamburgerMenuReducer";

const appReducer = combineReducers({
  auth: AuthReducer,
  hamburgerMenu: HamburgerMenuReducer,
});

export default appReducer;
