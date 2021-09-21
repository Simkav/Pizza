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

function App () {
  const dispatch = useDispatch()
  const hasUser = useSelector(({ auth: { user } }) => user)
  const [isShow, setisShow] = useState(false)

  useEffect(() => {
    const fn = token => {
      dispatch(requestAuthRefresh(token))
    }

    const setShowing = () => {
      setisShow(true)
    }

    const refreshToken = localStorage.getItem(constants.REFRESH_TOKEN)
    if (refreshToken) {
      if (hasUser) {
        setShowing()
      } else {
        fn(refreshToken)
      }
    } else {
      setShowing()
    }
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
        <Redirect to={'/'} />
      </Switch>
    </BrowserRouter>
  ) : (
    <LoadSpinner />
  )
}

export default App
