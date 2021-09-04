import React from "react";
import {render} from "react-dom";
import "./index.css";
import App from "./App";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {hamburgerMenuReducer} from './Components/Redux/HamburgerMenuReducer'



const hamburgerMenuStore = createStore(hamburgerMenuReducer);

render(
  <React.StrictMode>
    <Provider store={hamburgerMenuStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
