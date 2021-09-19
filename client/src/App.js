import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import PrivateHoc from "./Components/PrivateHoc/PrivateHoc";
import OnlyNotAuthorizedUserHoc from "./Components/OnlyNotAuthorizedUserHoc.jsx/OnlyNotAuthorizedUserHoc";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import Main from "./Pages/Main";

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const isAuth = localStorage.getItem("IsAuth");
    if (isAuth) {
      dispatch({ type: "AUTHORIZED", payload: true });
      dispatch({
        type: "LOGIN_USER",
        payload: JSON.parse(localStorage.getItem("UserObject")),
      });
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