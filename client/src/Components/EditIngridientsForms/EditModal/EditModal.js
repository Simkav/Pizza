import Modal from '../../Modal/Modal';
import cl from './EditModal.module.css';
import cn from 'classnames';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { memo, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ingridientsActionUpdate } from '../../../Actions/actionCreator';
import EditIngridientInput from '../EditIngridientInput/EditIngridientInput';
import {
  onCloseEditModal,
  onEditModalClosed,
} from '../../../Actions/actionCreator';

export default memo(function EditModal ({ editModalState, modalsDispatch }) {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState(editModalState.name);
  const [isInvalid, setIsInvalid] = useState(false);

  const ingridients = useSelector(({ ingridients }) => ingridients.ingridients);

  useLayoutEffect(() => {
    if (editModalState.state && !newName) {
      setNewName(editModalState.name);
    }
  }, [editModalState]);

  const handleSubmit = () => {
    const editableIngridient = { id: editModalState.id, name: newName };
    dispatch(ingridientsActionUpdate(editableIngridient));
    handleClose();
  };

  const handleClose = () => modalsDispatch(onCloseEditModal());
  const handleClosed = () => {
    modalsDispatch(onEditModalClosed());
    setNewName('');
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
    setNewName(value);
  };

  return (
    <Modal
      visible={editModalState.state}
      handleClose={handleClose}
      handleClosed={handleClosed}
    >
      <div className={cl.edit_ingridient_window}>
        <h3 className={cl.modal_title}>Редактировать ингридиент</h3>
        <EditIngridientInput
          name={newName}
          isInvalid={isInvalid}
          validate={validate}
        />
        <div className={cl.edit_window_buttons_container}>
          <button
            onClick={() => (!isInvalid ? handleSubmit() : null)}
            className={cn(cl.edit_window_button, cl.apply)}
          >
            <FaCheck />
          </button>
          <div
            className={cn(cl.edit_window_button, cl.cancel)}
            onClick={() => {
              handleClose();
            }}
          >
            <FaTimes />
          </div>
        </div>
      </div>
    </Modal>
  );
});
