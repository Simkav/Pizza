import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const OnlyNotAuthorizedUserHoc = ({ Component }) => {
  const isAuth = useSelector(({ auth }) => auth).user
  return !isAuth ? <Component /> : <Redirect to={'/'} />
}

export default OnlyNotAuthorizedUserHoc
