import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AsideMenuItemList } from '../../../Helpers/AsideMenuItemList';
import cl from './AsideMenuList.module.css';

export default memo(function AsideMenuList () {
  return (
    <ul className={cl.main_navigation_menu}>
      {AsideMenuItemList.map((item) => (
        <li key={item.name} className={cl.main_navigation_menu_item}>
          <Link to='/login' className={cl.main_navigation_menu_item_link}>
            <div className={cl.main_navigation_menu_item_icon}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className={cl.main_navigation_menu_item_text_container}>
              <span className={cl.main_navigation_menu_item_text}>
                {item.name}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
});
