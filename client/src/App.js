import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import OnlyNotAuthorizedUserHoc from './Components/Hoc/OnlyNotAuthorizedUserHoc'
import PrivateHoc from './Components/Hoc/PrivateHoc'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Main from './Pages/Main'
import constants from './constants'
import { requestAuthRefresh } from './Actions/actionCreator'
import LoadSpinner from './Components/LoadSpinner/LoadSpinner'
import PrivateAdminHoc from './Components/Hoc/PrivateAdminHoc'
import Admin from './Pages/AdminPages/Admin'
import EditProducts from './Pages/AdminPages/EditProducts'
import EditIngridients from './Pages/AdminPages/EditIngridients'
import { bindActionCreators } from 'redux'
import * as ActionCreators from './Actions/actionCreator'

function App () {
  const dispatch = useDispatch()
  const hasUser = useSelector(({ auth: { user } }) => user)
  const products = useSelector(({ products }) => products.products)
  const ingridients = useSelector(({ ingridients }) => ingridients.ingridients)
  const [isShow, setisShow] = useState(false)

  const { ingridientsActionGet, productsActionGet } = bindActionCreators(
    ActionCreators,
    dispatch
  )

  useEffect(() => {
    if (!ingridients) {
      ingridientsActionGet()
    }
    if (!products) {
      productsActionGet()
    }
    const refreshToken = localStorage.getItem(constants.REFRESH_TOKEN)
    const fn = () => {
      if (refreshToken) {
        if (!hasUser) {
          dispatch(requestAuthRefresh(refreshToken))
          return
        }
      }
      setisShow(true)
    }
    fn()
  }, [hasUser])

  return isShow ? (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route
          exact
          path='/login'
          render={() => <OnlyNotAuthorizedUserHoc Component={Login} />}
        />
        <Route
          exact
          path='/register'
          render={() => <OnlyNotAuthorizedUserHoc Component={Register} />}
        />
        <Route
          exact
          path='/profile'
          render={() => <PrivateHoc Component={Profile} />}
        />
        <Route
          exact
          path='/admin'
          render={() => <PrivateAdminHoc Component={Admin} />}
        />
        <Route
          exact
          path='/edit_products'
          render={() => <PrivateAdminHoc Component={EditProducts} />}
        />
        <Route
          exact
          path='/edit_ingridients'
          render={() => <PrivateAdminHoc Component={EditIngridients} />}
        />
        <Redirect to={'/'} />
      </Switch>
    </BrowserRouter>
  ) : (
    <LoadSpinner />
  )
}

export default App
