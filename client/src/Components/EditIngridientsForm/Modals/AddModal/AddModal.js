import Modal from "../../../Modal/Modal";
import cl from "./AddModal.module.css";
import cn from "classnames";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useState } from "react";

function AddModal({ visible, setVisible, handleSubmitAdd }) {
  const [newIngridient, setNewIngridient] = useState("");
  const handleSubmit = () => {
    handleSubmitAdd(newIngridient);
    setNewIngridient("")
  }
  const handleCancel = () => {
    setNewIngridient("");
    setVisible((visible) => !visible);
  };
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div className={cl.add_ingridient_window}>
        <h3 className={cl.modal_title}>Добавить ингридиент</h3>
        <input
          placeholder={"Название ингридиента"}
          type={"text"}
          className={cl.add_ingridient_input}
          value={newIngridient}
          onChange={(e) => setNewIngridient(e.currentTarget.value)}
        />
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

export default AddModal;
