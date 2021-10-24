import Modal from '../../Modal/Modal';
import cl from './DeleteModal.module.css';
import cn from 'classnames';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { useLayoutEffect, useState } from 'react';
import { ingridientsActionRemove } from '../../../Actions/actionCreator';
import { useDispatch } from 'react-redux';

export default function DeleteModal({ modalsState, modalsDispatch }) {
  const dispatch = useDispatch();
  const [removeIngridient, setRemoveIngridient] = useState(
    modalsState.deleteModal.name,
  );

  useLayoutEffect(() => {
    if (!removeIngridient) setRemoveIngridient(modalsState.deleteModal.name);
  }, [modalsState.deleteModal.name]);

  const handleSubmit = () => {
    dispatch(ingridientsActionRemove(modalsState.deleteModal.id));
    handleClose();
  };

  const handleClose = () => modalsDispatch({ type: 'ON_CLOSE_DELETE_MODAL' });
  const handleClosed = () => {
    modalsDispatch({ type: 'ON_DELETE_MODAL_CLOSED' });
    setRemoveIngridient('');
  };

  return (
    <Modal
      visible={modalsState.deleteModal.state}
      handleClose={handleClose}
      handleClosed={handleClosed}
    >
      <div className={cl.delete_ingridient_window}>
        <h3 className={cl.modal_title}>Удалить ингридиент</h3>
        <span className={cl.delete_span}>
          Вы действительно хотите удалить ингридиент: {removeIngridient}?
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
            onClick={() => handleClose()}
          >
            <FaTimes></FaTimes>
          </div>
        </div>
      </div>
    </Modal>
  );
}
