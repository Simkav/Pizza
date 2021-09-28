import cl from './AuthFormContainer.module.css'
import { useLocation } from 'react-router-dom'

function AuthFormContainer (props) {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  return (
    <div className={cl.signup_container}>
      <div className={cl.signup_form_wrapper}>
        <div className={cl.signup_info}>
          <h1>{isLogin ? 'Войти в аккаунт' : 'Создать аккаунт'}</h1>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default AuthFormContainer
