import { FaEdit, FaTrash } from 'react-icons/fa';
import cl from './IngridientContainer.module.css';
import { openEditModal, openDeleteModal } from '../../../Actions/actionCreator';

export default function IngridientContainer ({ item, modalsDispatch }) {
  return (
    <div className={cl.ingridient_container}>
      <span className={cl.ingridient_span}>{item.name}</span>
      <div className={cl.ingridient_edit_buttons_container}>
        <div
          className={cl.edit_button_container}
          onClick={() => {
            modalsDispatch(openEditModal(item));
          }}
        >
          <FaEdit className={cl.edit_button} />
          <span className={cl.button_tooltip_text}>Редактировать</span>
        </div>
        <div
          className={cl.edit_button_container}
          onClick={() => {
            modalsDispatch(openDeleteModal(item));
          }}
        >
          <FaTrash className={cl.edit_button} />
          <span className={cl.button_tooltip_text}>Удалить</span>
        </div>
      </div>
    </div>
  );
}
