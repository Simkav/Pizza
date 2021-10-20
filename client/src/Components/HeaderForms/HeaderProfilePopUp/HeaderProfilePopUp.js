import cl from './HeaderProfilePopUp.module.css'
import cn from 'classnames'
import { useState } from 'react'
import { FaChevronDown, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActionClear } from '../../../Actions/actionCreator'
import PopUpModule from '../../PopUpModule/PopUpModule'

export default function HeaderProfilePopUp () {
  const dispatch = useDispatch()
  const [profilePopUp, setProfilePopUp] = useState(false)

  const [isUserAuth, isAdmin] = useSelector(({ auth }) => [
    auth.user,
    auth.user ? auth.user.isAdmin : false
  ])

  const setLogOut = () => {
    dispatch(authActionClear())
  }

  return (
    isUserAuth ? (
      <div
        className={cl.col}
        onClick={() => setProfilePopUp(profilePopUp => !profilePopUp)}
      >
        <div className={cl.button_container}>
          <FaUser />
          <span className={cl.header_menu_text}>Профиль</span>
          <FaChevronDown
            className={cn(cl.arrow_down, {
              [cl.arrow_active]: profilePopUp
            })}
          ></FaChevronDown>
        </div>
        <PopUpModule visible={profilePopUp}>
          {isAdmin ? (
            <Link className={cl.profile_link} to={'/admin'}>
              Панель администратора
            </Link>
          ) : null}
          <Link className={cl.profile_link} to={'/profile'}>
            Персональная информация
          </Link>
          <div className={cl.profile_link} onClick={setLogOut}>
            Выйти
          </div>
        </PopUpModule>
      </div>
    ) : (
      <Link className={cl.col} to={'/login'}>
        <div className={cl.button_container}>
          <FaUser />
          <span className={cl.header_menu_text}>Войти</span>
        </div>
      </Link>
    )
  )
}
