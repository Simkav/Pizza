import Modal from '../Modal/Modal';
import cl from './ErrorModal.module.css';
import cn from 'classnames';
import { FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function ErrorModal({ error, clearError }) {
  const [isErrorModalOpen, setErrorModalOpen] = useState(true);
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [error]);
  const handleClose = () => setErrorModalOpen((visible) => !visible);
  const handleClosed = () => clearError();

  return (
    <Modal
      visible={isErrorModalOpen}
      handleClose={handleClose}
      handleClosed={handleClosed}
    >
      <div className={cl.error_window}>
        <h3 className={cl.modal_title}>Ошибка</h3>
        <span className={cl.error_span}>{error}</span>
        <div className={cl.error_window_buttons_container}>
          <div
            onClick={() =>
              setErrorModalOpen((isErrorModalOpen) => !isErrorModalOpen)
            }
            className={cn(cl.error_window_button, cl.apply)}
          >
            <FaCheck />
          </div>
        </div>
      </div>
    </Modal>
  );
}
