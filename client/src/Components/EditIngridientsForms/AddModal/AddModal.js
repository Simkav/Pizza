import Modal from '../../Modal/Modal';
import cl from './AddModal.module.css';
import cn from 'classnames';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ingridientsActionCreate } from '../../../Actions/actionCreator';
import EditIngridientInput from '../EditIngridientInput/EditIngridientInput';

export default function AddModal({ modalsState, modalsDispatch }) {
  const dispatch = useDispatch();
  const [newIngridient, setNewIngridient] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const ingridients = useSelector(({ ingridients }) => ingridients.ingridients);

  const handleSubmit = () => {
    dispatch(ingridientsActionCreate({ name: newIngridient }));
    handleClose();
  };

  const handleClose = () => modalsDispatch({ type: 'ON_CLOSE_ADD_MODAL' });
  const handleClosed = () => {
    modalsDispatch({ type: 'ON_ADD_MODAL_CLOSED' });
    setNewIngridient('');
    setIsInvalid(false);
  };

  const validate = (value) => {
    if (!value) {
      setIsInvalid('Как минимум один символ');
    }
    if (ingridients.find((v) => v.name === value)) {
      setIsInvalid('Такой ингридиент уже существует');
    } else if (value && !ingridients.find((v) => v.name === value)) {
      setIsInvalid(false);
    }
    setNewIngridient(value);
  };

  return (
    <Modal
      visible={modalsState.addModal.state}
      handleClose={handleClose}
      handleClosed={handleClosed}
    >
      <div className={cl.add_ingridient_window}>
        <h3 className={cl.modal_title}>Добавить ингридиент</h3>
        <EditIngridientInput
          name={newIngridient}
          isInvalid={isInvalid}
          validate={validate}
        />
        <div className={cl.add_window_buttons_container}>
          <button
            onClick={() => (!isInvalid ? handleSubmit() : null)}
            className={cn(cl.add_window_button, cl.apply)}
          >
            <FaCheck></FaCheck>
          </button>
          <div
            className={cn(cl.add_window_button, cl.cancel)}
            onClick={() => handleClose()}
          >
            <FaTimes></FaTimes>
          </div>
        </div>
      </div>
    </Modal>
  );
}
