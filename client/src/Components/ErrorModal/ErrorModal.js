import Modal from "../Modal/Modal";
import cl from "./ErrorModal.module.css";
import cn from "classnames";
import { FaCheck } from "react-icons/fa";

function ErrorModal({ visible, setVisible, error }) {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div className={cl.add_ingridient_window}>
        <h3 className={cl.modal_title}>Ошибка</h3>
        <span className={cl.add_ingridient_input}>{error}</span>
        <div className={cl.add_window_buttons_container}>
          <div
            onClick={() => setVisible((visible) => !visible)}
            className={cn(cl.add_window_button, cl.apply)}
          >
            <FaCheck></FaCheck>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ErrorModal;
