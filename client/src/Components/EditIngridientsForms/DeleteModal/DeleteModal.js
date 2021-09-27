import Modal from "../../Modal/Modal";
import cl from "./DeleteModal.module.css";
import cn from "classnames";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";

function DeleteModal({ visible, setVisible, id, name, handleSubmitRemove }) {
  const [removeIngridient, setRemoveIngridient] = useState(name)
  useEffect(() => {
    setRemoveIngridient(name);
  }, name);
  const handleSubmit = () => handleSubmitRemove(id);

  const handleCancel = () => setVisible((visible) => !visible);

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      handleCancel={handleCancel}
    >
      <div className={cl.add_ingridient_window}>
        <h3 className={cl.modal_title}>Удалить ингридиент</h3>
        <span className={cl.add_ingridient_input}>
          Вы действительно хотите удалить ингридиент: {removeIngridient}?
        </span>
        <div className={cl.add_window_buttons_container}>
          <button
            onClick={() => handleSubmit()}
            className={cn(cl.add_window_button, cl.apply)}
          >
            <FaCheck></FaCheck>
          </button>
          <div
            className={cn(cl.add_window_button, cl.cancel)}
            onClick={() => handleCancel()}
          >
            <FaTimes></FaTimes>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
