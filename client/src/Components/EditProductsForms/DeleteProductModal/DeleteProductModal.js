import Modal from '../../Modal/Modal';
import cl from './DeleteProductModal.module.css';
import cn from 'classnames';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { useLayoutEffect, useState } from 'react';
import { productsActionRemove } from '../../../Actions/actionCreator';
import { useDispatch } from 'react-redux';

export default function DeleteProductModal({ modalsState, modalsDispatch }) {
  const dispatch = useDispatch();
  const deleteModal = modalsState.deleteModal;
  const [removeProduct, setRemoveProduct] = useState(deleteModal.name);
  useLayoutEffect(() => {
    setRemoveProduct(deleteModal.name);
  }, [deleteModal.name]);
  const handleSubmit = () => {
    handleSubmitRemove(deleteModal.id);
    handleClose();
  };

  const handleClose = () => {
    modalsDispatch({ type: 'ON_CLOSE_DELETE_MODAL' });
  };

  const handleClosed = () => {
    modalsDispatch({ type: 'ON_DELETE_MODAL_CLOSED' });
  };

  const handleSubmitRemove = (id) => dispatch(productsActionRemove(id));

  return (
    <Modal
      visible={deleteModal.state}
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
}
