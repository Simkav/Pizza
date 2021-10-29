import Modal from '../../Modal/Modal';
import cl from './DeleteModal.module.css';
import cn from 'classnames';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { memo, useLayoutEffect, useState } from 'react';
import { ingridientsActionRemove } from '../../../Actions/actionCreator';
import { useDispatch } from 'react-redux';
import {
  onCloseDeleteModal,
  onDeleteModalClosed,
} from '../../../Actions/actionCreator';

export default memo(function DeleteModal ({ deleteModalState, modalsDispatch }) {
  const dispatch = useDispatch();
  const [removeIngridient, setRemoveIngridient] = useState(
    deleteModalState.name,
  );

  useLayoutEffect(() => {
    if (!removeIngridient) setRemoveIngridient(deleteModalState.name);
  }, [deleteModalState.name]);

  const handleSubmit = () => {
    dispatch(ingridientsActionRemove(deleteModalState.id));
    handleClose();
  };

  const handleClose = () => modalsDispatch(onCloseDeleteModal());
  const handleClosed = () => {
    modalsDispatch(onDeleteModalClosed());
    setRemoveIngridient('');
  };

  return (
    <Modal
      visible={deleteModalState.state}
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
})
