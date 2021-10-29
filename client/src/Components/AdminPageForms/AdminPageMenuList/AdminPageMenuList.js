import cl from './AdminPageMenuList.module.css'
import { Link } from 'react-router-dom';
import { memo } from 'react';

export default memo(function AdminPageMenuList () {
  return (
    <>
      <Link className={cl.menu_link} to={'/edit_products'}>
        Редактировать продукты
      </Link>
      <Link className={cl.menu_link} to={'/edit_ingridients'}>
        Редактировать ингридиенты
      </Link>
    </>
  );
})
