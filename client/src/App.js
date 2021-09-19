import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import PrivateHoc from "./Components/PrivateHoc/PrivateHoc";
import OnlyNotAuthorizedUserHoc from "./Components/OnlyNotAuthorizedUserHoc.jsx/OnlyNotAuthorizedUserHoc";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import Main from "./Pages/Main";
import constants from "./constants";

function App() {
  // const dispatch = useDispatch();

  useLayoutEffect(() => {
    const refreshToken = localStorage.getItem(constants.REFRESH_TOKEN);
    if (refreshToken) {
      // TODO requestAuthRefresh
    }
  }, []);

  return (
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