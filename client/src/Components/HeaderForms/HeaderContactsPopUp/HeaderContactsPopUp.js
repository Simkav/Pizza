import cl from './HeaderContactsPopUp.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { FaChevronDown, FaPhone } from 'react-icons/fa';
import PopUpModule from '../../PopUpModule/PopUpModule';
import { HeaderContactPhonesList } from '../../../Helpers/HeaderContactPhonesList';

export default function HeaderContactsPopUp() {
  const [contactsPopUp, setContactsPopUp] = useState(false);

  return (
    <div
      className={cl.col}
      onClick={() => setContactsPopUp((contactsPopUp) => !contactsPopUp)}
    >
      <div className={cl.contact_phone_container}>
        <FaPhone />
        <span className={cl.header_menu_text}>Контакты</span>
        <FaChevronDown
          className={cn(cl.arrow_down, {
            [cl.arrow_active]: contactsPopUp,
          })}
        ></FaChevronDown>
      </div>
      <PopUpModule visible={contactsPopUp}>
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
}
