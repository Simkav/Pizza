import React, { useEffect, useState } from "react";
import cl from "./EditIngridientsForm.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  ingridientsActionGet,
  ingridientsActionRemove,
  ingridientsActionCreate,
  ingridientsActionUpdate,
} from "../../../Actions/actionCreator";
import EditModal from "../EditModal/EditModal";
import AddModal from "../AddModal/AddModal";
import DeleteModal from "../DeleteModal/DeleteModal"

function EditIngridientsForm() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ingridientsActionGet());
  }, []);

  const [ingridients, isFetch, isError] = useSelector(({ ingridients }) => [
    ingridients.ingridients,
    ingridients.isFetching,
    ingridients.error,
  ]);

  const handleSubmitEdit = (editableIngridient) => {
    dispatch(ingridientsActionUpdate(editableIngridient, ingridients));
    setEditModalOpen(false);
  };

  const handleSubmitRemove = (id) =>
    dispatch(ingridientsActionRemove(id, ingridients));

  const handleSubmitAdd = (newIngridient) => {
    dispatch(ingridientsActionCreate({ name: newIngridient }));
    setAddModalOpen(false);
  };

  return (
    <div className={cl.edit_ingridients_form_container}>
      <h1 className={cl.edit_ingridients_form_title}>Ингридиенты</h1>
      <div className={cl.edit_ingridients_form_wrapper}>
        {ingridients
          ? ingridients.map((item, index) => {
              return (
                <div key={item.id} className={cl.ingridient_wrapper}>
                  <div className={cl.ingridient_container}>
                    <span className={cl.ingridient_span}>
                      {ingridients[index].name}
                    </span>
                    <div className={cl.ingridient_edit_buttons_container}>
                      <div
                        className={cl.edit_button_container}
                        onClick={() => {
                          setEditModalOpen(item.id);
                        }}
                      >
                        <FaEdit className={cl.edit_button} />
                        <span className={cl.button_tooltip_text}>
                          Редактировать
                        </span>
                      </div>
                      <div
                        className={cl.edit_button_container}
                        onClick={() => handleSubmitRemove(item.id)}
                      >
                        <FaTrash className={cl.edit_button} />
                        <span className={cl.button_tooltip_text}>Удалить</span>
                      </div>
                    </div>
                  </div>
                  <EditModal
                    visible={item.id === isEditModalOpen ? true : false}
                    setVisible={setEditModalOpen}
                    id={item.id}
                    name={item.name}
                    handleSubmitEdit={handleSubmitEdit}
                  />
                   <DeleteModal
                    visible={item.id === isDeleteModalOpen ? true : false}
                    setVisible={setDeleteModalOpen}
                    id={item.id}
                    name={item.name}
                    handleSubmitRemove={handleSubmitRemove}
                  />
                </div>
              );
            })
          : isFetch
          ? null
          : //TODO Loading spinner
            null}
        <AddModal
          visible={isAddModalOpen}
          setVisible={setAddModalOpen}
          handleSubmitAdd={handleSubmitAdd}
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
