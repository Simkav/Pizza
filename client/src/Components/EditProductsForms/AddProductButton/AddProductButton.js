import React, { memo } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { openAddModal } from '../../../Actions/actionCreator';
import cl from './AddProductButton.module.css'

export default memo(function AddProductButton ({ modalsDispatch }) {
  return (
    <li
      className={cl.edit_product_button}
      onClick={() => modalsDispatch(openAddModal())}
    >
      <FaPlusCircle />
    </li>
  );
})
