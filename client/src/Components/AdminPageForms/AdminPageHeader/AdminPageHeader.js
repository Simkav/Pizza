import { memo } from 'react';
import cl from './AdminPageHeader.module.css';
import { Link } from 'react-router-dom';
import AdminPageMenuPopUp from '../AdminPageMenuPopUp/AdminPageMenuPopUp';

export default memo(function AdminPageHeader () {
  return (
    <div className={cl.auth_header}>
      <Link to={'/'} className={cl.site_logo_container}>
        <img
          className={cl.site_logo}
          src='/images/site-logo2.png'
          alt='Site Logo'
        ></img>
      </Link>
      <AdminPageMenuPopUp />
    </div>
  );
});
