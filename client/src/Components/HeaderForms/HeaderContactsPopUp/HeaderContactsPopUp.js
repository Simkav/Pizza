import cl from './HeaderContactsPopUp.module.css';
import cn from 'classnames';
import { FaChevronDown, FaPhone } from 'react-icons/fa';
import PopUpModule from '../../PopUpModule/PopUpModule';
import { HeaderContactPhonesList } from '../../../Helpers/HeaderContactPhonesList';
import usePopUp from '../../../Hooks/usePopUp';
import { memo } from 'react';

export default memo(function HeaderContactsPopUp () {
  const [isHovered, contactsPopUp, menuButtonRef] = usePopUp();

  return (
    <div ref={menuButtonRef} className={cl.col}>
      <div className={cl.contact_phone_container}>
        <FaPhone />
        <span className={cl.header_menu_text}>Контакты</span>
        <FaChevronDown
          className={cn(cl.arrow_down, {
            [cl.arrow_active]: contactsPopUp || isHovered,
          })}
        ></FaChevronDown>
      </div>
      <PopUpModule visible={contactsPopUp} hovered={isHovered}>
        {HeaderContactPhonesList.map((item) => {
          return (
            <div key={item.prefix} className={cl.contact_phone}>
              <a href={item.href} className={cl.phone}>
                <img
                  alt={item.alt}
                  src={item.imageSrc}
                  className={cl.phone_operator_icon}
                />
                {`(${item.prefix}) 228-3-228`}
              </a>
            </div>
          );
        })}
      </PopUpModule>
    </div>
  );
})
