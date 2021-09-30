import React, { useEffect, useState } from 'react';
import cl from './EditIngridientsForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import EditModal from '../EditModal/EditModal';
import AddModal from '../AddModal/AddModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import ErrorModal from '../../ErrorModal/ErrorModal';
import IngridientsSpinner from '../IngridientsSpinner/IngridientsSpinner';
import * as ActionCreators from '../../../Actions/actionCreator';
import { bindActionCreators } from 'redux';
import IngridientContainer from '../IngridientContainer/IngridientContainer';

function EditIngridientsForm() {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const {
    ingridientsActionGet,
    ingridientsActionRemove,
    ingridientsActionCreate,
    ingridientsActionUpdate,
    ingridientsActionClearError,
  } = bindActionCreators(ActionCreators, dispatch);

  const [ingridients, isFetch, isError] = useSelector(({ ingridients }) => [
    ingridients.ingridients,
    ingridients.isFetching,
    ingridients.error,
  ]);

  useEffect(() => {
    if (!ingridients) {
      ingridientsActionGet();
    }
  }, [isError]);

  const handleSubmitEdit = (editableIngridient) => {
    ingridientsActionUpdate(editableIngridient, ingridients);
    setEditModalOpen(false);
  };

  const handleSubmitRemove = (id) => ingridientsActionRemove(id, ingridients);

  const handleSubmitAdd = (newIngridient) => {
    ingridientsActionCreate({ name: newIngridient });
    setAddModalOpen(false);
  };

  return (
    <div className={cl.edit_ingridients_form_container}>
      <h1 className={cl.edit_ingridients_form_title}>Ингридиенты</h1>
      <div className={cl.edit_ingridients_form_wrapper}>
        {ingridients ? (
          ingridients.map((item) => (
            <IngridientContainer
              key={item.id}
              item={item}
              setEditModalOpen={setEditModalOpen}
              setDeleteModalOpen={setDeleteModalOpen}
            />
          ))
        ) : isFetch ? (
          <IngridientsSpinner />
        ) : null}
        <AddModal
          visible={isAddModalOpen}
          setVisible={setAddModalOpen}
          handleSubmitAdd={handleSubmitAdd}
        />
        {isError ? (
          <ErrorModal
            error={isError}
            clearError={ingridientsActionClearError}
          />
        ) : null}
        <EditModal
          visible={isEditModalOpen}
          setVisible={setEditModalOpen}
          id={isEditModalOpen.id}
          name={isEditModalOpen.name}
          handleSubmitEdit={handleSubmitEdit}
        />
        <DeleteModal
          visible={isDeleteModalOpen}
          setVisible={setDeleteModalOpen}
          id={isDeleteModalOpen.id}
          name={isDeleteModalOpen.name}
          handleSubmitRemove={handleSubmitRemove}
        />
      </div>
      <div className={cl.add_button_container}>
        <div className={cl.add_button} onClick={() => setAddModalOpen(true)}>
          Добавить ингридиент
        </div>
      </div>
    </div>
  );
}

export default EditIngridientsForm;
