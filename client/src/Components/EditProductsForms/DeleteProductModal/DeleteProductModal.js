import Modal from '../../Modal/Modal';
import cl from './DeleteProductModal.module.css';
import cn from 'classnames';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { memo, useLayoutEffect, useState } from 'react';
import { productsActionRemove } from '../../../Actions/actionCreator';
import { useDispatch } from 'react-redux';
import {
  onCloseDeleteModal,
  onDeleteModalClosed,
} from '../../../Actions/actionCreator';

export default memo(function DeleteProductModal ({
  deleteModalState,
  modalsDispatch,
}) {
  const dispatch = useDispatch();
  const [removeProduct, setRemoveProduct] = useState(deleteModalState.name);
  useLayoutEffect(() => {
    setRemoveProduct(deleteModalState.name);
  }, [deleteModalState.name]);
  const handleSubmit = () => {
    handleSubmitRemove(deleteModalState.id);
    handleClose();
  };

  const handleClose = () => {
    modalsDispatch(onCloseDeleteModal());
  };

  const handleClosed = () => {
    modalsDispatch(onDeleteModalClosed());
  };

  const handleSubmitRemove = (id) => dispatch(productsActionRemove(id));

  return (
    <Modal
      visible={deleteModalState.state}
      handleClose={handleClose}
      handleClosed={handleClosed}
    >
      <div className={cl.delete_product_window}>
        <h3 className={cl.modal_title}>Удалить продукт</h3>
        <span className={cl.delete_span}>
          Вы действительно хотите удалить продукт: {removeProduct}?
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
});
