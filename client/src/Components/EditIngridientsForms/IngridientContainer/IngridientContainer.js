import { FaEdit, FaTrash } from "react-icons/fa";
import cl from './IngridientContainer.module.css'

function IngridientContainer({item, setEditModalOpen, setDeleteModalOpen}) {
  return (
      <div className={cl.ingridient_container}>
        <span className={cl.ingridient_span}>{item.name}</span>
        <div className={cl.ingridient_edit_buttons_container}>
          <div
            className={cl.edit_button_container}
            onClick={() => {
              setEditModalOpen(item);
            }}
          >
            <FaEdit className={cl.edit_button} />
            <span className={cl.button_tooltip_text}>Редактировать</span>
          </div>
          <div
            className={cl.edit_button_container}
            onClick={() => {
              setDeleteModalOpen(item);
            }}
          >
            <FaTrash className={cl.edit_button} />
            <span className={cl.button_tooltip_text}>Удалить</span>
          </div>
        </div>
      </div>
  );
}

export default IngridientContainer;
