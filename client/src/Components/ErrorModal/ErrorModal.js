import Modal from '../Modal/Modal';
import cl from './ErrorModal.module.css';
import cn from 'classnames';
import { FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function ErrorModal({error, clearError }) {
  const [isErrorModalOpen, setErrorModalOpen] = useState(true)
  useEffect(() => {
    return () => {
      clearError();
    };
  });
  return (
    <Modal visible={isErrorModalOpen} setVisible={setErrorModalOpen}>
      <div className={cl.error_window}>
        <h3 className={cl.modal_title}>Ошибка</h3>
        <span className={cl.error_span}>{error}</span>
        <div className={cl.error_window_buttons_container}>
          <div
            onClick={() => setErrorModalOpen((isErrorModalOpen) => !isErrorModalOpen)}
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
