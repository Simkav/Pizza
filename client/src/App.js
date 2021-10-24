import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import OnlyNotAuthorizedUserHoc from './Components/Hoc/OnlyNotAuthorizedUserHoc';
import PrivateHoc from './Components/Hoc/PrivateHoc';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from './Pages/Main';
import constants from './constants';
import {
  requestAuthRefresh,
  ingridientsActionGet,
  productsActionGet,
} from './Actions/actionCreator';
import LoadSpinner from './Components/LoadSpinner/LoadSpinner';
import PrivateAdminHoc from './Components/Hoc/PrivateAdminHoc';
import Admin from './Pages/AdminPages/Admin';
import EditProducts from './Pages/AdminPages/EditProducts';
import EditIngridients from './Pages/AdminPages/EditIngridients';
import Cart from './Pages/Cart';

function App() {
  const dispatch = useDispatch();
  const hasUser = useSelector(({ auth: { user } }) => user);
  const [isShow, setisShow] = useState(false);

  useEffect(() => {
    dispatch(ingridientsActionGet());
    dispatch(productsActionGet());
    const refreshToken = localStorage.getItem(constants.REFRESH_TOKEN);
    const fn = () => {
      if (refreshToken) {
        if (!hasUser) {
          dispatch(requestAuthRefresh(refreshToken));
          return;
        }
      }
      setisShow(true);
    };
    fn();
  }, [hasUser]);

  return isShow ? (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route
          exact
          path="/login"
          render={() => <OnlyNotAuthorizedUserHoc Component={Login} />}
        />
        <Route
          exact
          path="/register"
          render={() => <OnlyNotAuthorizedUserHoc Component={Register} />}
        />
        <Route
          exact
          path="/profile"
          render={() => <PrivateHoc Component={Profile} />}
        />
        <Route
          exact
          path="/admin"
          render={() => <PrivateAdminHoc Component={Admin} />}
        />
        <Route
          exact
          path="/edit_products"
          render={() => <PrivateAdminHoc Component={EditProducts} />}
        />
        <Route
          exact
          path="/edit_ingridients"
          render={() => <PrivateAdminHoc Component={EditIngridients} />}
        />
        <Route exact path="/cart" component={Cart} />
        <Redirect to={'/'} />
      </Switch>
    </BrowserRouter>
  ) : (
    <LoadSpinner />
  );
}

export default App;
