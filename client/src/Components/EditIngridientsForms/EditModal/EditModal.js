import Modal from "../../Modal/Modal";
import cl from "./EditModal.module.css";
import cn from "classnames";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";

function EditModal({ visible, setVisible, id, name, handleSubmitEdit }) {
  const [newName, setNewName] = useState(name);
  useEffect(() => {
    setNewName(name);
  }, name);
  const handleCancel = () => {
    setNewName(name);
    setVisible((visible) => !visible);
  };
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      handleCancel={handleCancel}
    >
      <div className={cl.edit_ingridient_window}>
        <h3 className={cl.modal_title}>Редактировать ингридиент</h3>
        <input
          placeholder={"Название ингридиента"}
          type={"text"}
          className={cl.edit_ingridient_input}
          value={newName}
          onChange={(e) => setNewName(e.currentTarget.value)}
        />
        <div className={cl.edit_window_buttons_container}>
          <button
            onClick={() => handleSubmitEdit({ name: newName, id: id })}
            className={cn(cl.edit_window_button, cl.apply)}
          >
            <FaCheck></FaCheck>
          </button>
          <div
            className={cn(cl.edit_window_button, cl.cancel)}
            onClick={() => {
              handleCancel();
            }}
          >
            <FaTimes></FaTimes>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditModal;
