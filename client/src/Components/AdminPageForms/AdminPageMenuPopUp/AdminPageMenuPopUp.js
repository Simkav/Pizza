import { memo } from 'react';
import usePopUp from '../../../Hooks/usePopUp';
import PopUpModule from '../../PopUpModule/PopUpModule';
import AdminPageMenuList from '../AdminPageMenuList/AdminPageMenuList';
import cl from './AdminPageMenuPopUp.module.css';

export default memo(function AdminPageMenuPopUp () {
  const [isHovered, menuPopUp, menuButtonRef] = usePopUp();

  return (
    <div className={cl.menu_button_container}>
      <div className={cl.menu_button} ref={menuButtonRef}>
        Меню
        <PopUpModule visible={menuPopUp} hovered={isHovered}>
          <AdminPageMenuList />
        </PopUpModule>
      </div>
    </div>
  );
});
