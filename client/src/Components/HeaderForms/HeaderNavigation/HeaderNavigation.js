import cl from './HeaderNavigation.module.css';
import HeaderContactsPopUp from '../HeaderContactsPopUp/HeaderContactsPopUp';
import HeaderProfilePopUp from '../HeaderProfilePopUp/HeaderProfilePopUp';
import HeaderCartPopUp from '../HeaderCartPopUp/HeaderCartPopUp';
import { memo } from 'react';

export default memo(function HeaderNavigation() {
  return (
    <div className={cl.header_navigation}>
      <HeaderContactsPopUp />
      <HeaderProfilePopUp />
      <HeaderCartPopUp />
    </div>
  );
})
