import Modal from '../Modal/Modal';
import cl from './ErrorModal.module.css';
import cn from 'classnames';
import { FaCheck } from 'react-icons/fa';
import { useEffect } from 'react';

function ErrorModal({ visible, setVisible, error, clearError }) {
  useEffect(() => {
    return () => {
      clearError();
    };
  });
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div className={cl.error_window}>
        <h3 className={cl.modal_title}>Ошибка</h3>
        <span className={cl.error_span}>{error}</span>
        <div className={cl.error_window_buttons_container}>
          <div
            onClick={() => setVisible((visible) => !visible)}
            className={cn(cl.error_window_button, cl.apply)}
          >
            <FaCheck></FaCheck>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ErrorModal;
