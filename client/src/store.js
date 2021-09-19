import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from "./Reducers";

const composeEnchancers = composeWithDevTools({ trace: true });

const store = createStore(combineReducers, composeEnchancers());

export default store;
