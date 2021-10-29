import { memo } from 'react';
import { Link } from 'react-router-dom';
import cl from './HeaderSiteLogo.module.css';

export default memo(function HeaderSiteLogo () {
  return (
    <Link to={'/'} className={cl.site_logo_container}>
      <img
        className={cl.site_logo}
        src='/images/site-logo2.png'
        alt='Site logo'
        height='100%'
      />
    </Link>
  );
});
