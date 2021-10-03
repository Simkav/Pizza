import cl from "./AddProductModal.module.css";
import cn from "classnames";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useState } from "react";
import Modal from "../../Modal/Modal";

export default function AddProductModal({ visible, setVisible, handleSubmitAdd }) {
  const [newIngridient, setNewIngridient] = useState("");
  const handleSubmit = () => {
    handleSubmitAdd(newIngridient);
    setNewIngridient("");
  };
  const handleCancel = () => {
    setNewIngridient("");
    setVisible((visible) => !visible);
  };
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      handleCancel={handleCancel}
    >
      <div className={cl.add_product_window}>
        <h3 className={cl.modal_title}>Добавить продукт</h3>
        {
          // TODO form for upload product image
        }
        <input
          placeholder={"Название продукта"}
          type={"text"}
          className={cl.add_product_input}
          value={newIngridient}
          onChange={(e) => setNewIngridient(e.currentTarget.value)}
        />
        {
          // TODO form for choose ingredients from database
          // TODO price input
          // TODO weight input
        }
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
