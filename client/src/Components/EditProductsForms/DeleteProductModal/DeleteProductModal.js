import Modal from "../../Modal/Modal";
import cl from "./DeleteProductModal.module.css";
import cn from "classnames";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useLayoutEffect, useState } from "react";

export default function DeleteProductModal({ visible, setVisible, id, name, handleSubmitRemove }) {
  const [removeIngridient, setRemoveIngridient] = useState(name);
  useLayoutEffect(() => {
    setRemoveIngridient(name);
  }, [name]);
  const handleSubmit = () => {
    handleSubmitRemove(id);
    setVisible((visible) => !visible);
  };

  const handleCancel = () => setVisible((visible) => !visible);

  return (
    <Modal
      visible={visible}
      handleCancel={handleCancel}
    >
      <div className={cl.delete_product_window}>
        <h3 className={cl.modal_title}>Удалить продукт</h3>
        <span className={cl.delete_span}>
          Вы действительно хотите удалить продукт: {removeIngridient}?
        </span>
        <div className={cl.delete_window_buttons_container}>
          <button
            onClick={() => handleSubmit()}
            className={cn(cl.delete_window_button, cl.apply)}
          >
            <FaCheck></FaCheck>
          </button>
          <div
            className={cn(cl.delete_window_button, cl.cancel)}
            onClick={() => handleCancel()}
          >
            <FaTimes></FaTimes>
          </div>
        </div>
      </div>
    </Modal>
  );
}
