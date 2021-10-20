import cl from './HeaderNavigation.module.css'
import HeaderContactsPopUp from '../HeaderContactsPopUp/HeaderContactsPopUp'
import HeaderProfilePopUp from '../HeaderProfilePopUp/HeaderProfilePopUp'
import HeaderCartPopUp from '../HeaderCartPopUp/HeaderCartPopUp'

export default function HeaderNavigation () {
  return (
    <div className={cl.header_navigation}>
      <HeaderContactsPopUp />
      <HeaderProfilePopUp />
      <HeaderCartPopUp />
    </div>
  )
}
