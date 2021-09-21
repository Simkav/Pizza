import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from "./Reducers";
import rootSaga from "./Sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const composeEnchancers = composeWithDevTools({ trace: true });

const store = createStore(
  combineReducers,
  composeEnchancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga, store.dispatch);

export default store;
