import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import OnlyNotAuthorizedUserHoc from "./Components/Hoc/OnlyNotAuthorizedUserHoc";
import PrivateHoc from "./Components/Hoc/PrivateHoc";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "./Pages/Main";
import constants from "./constants";
import { requestAuthRefresh } from "./Actions/actionCreator";
import LoadSpinner from "./Components/LoadSpinner/LoadSpinner";

function App() {
  const dispatch = useDispatch();
  // useStaae isSlider true
  useLayoutEffect(() => {
    const refreshToken = localStorage.getItem(constants.REFRESH_TOKEN);
    if (refreshToken) {
      dispatch(requestAuthRefresh(refreshToken));
      // TODO requestAuthRefresh
      //after succee isSliider false
    }
    // if !refrrshToken slider=falss
  }, []);

    <LoadSpinner />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route
          exact
          path="/login"
          component={OnlyNotAuthorizedUserHoc(Login)}
        />
        <Route
          exact
          path="/register"
          component={OnlyNotAuthorizedUserHoc(Register)}
        />
        <Route exact path="/profile" component={PrivateHoc(Profile)} />
        <Redirect to={"/"} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
