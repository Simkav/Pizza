import React, { useEffect, useState } from "react";
import cl from "./EditIngridientsForm.module.css";
import { FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import Modal from "../Modal/Modal";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  ingridientsActionGet,
  ingridientsActionRemove,
  ingridientsActionCreate,
} from "../../Actions/actionCreator";

function EditIngridientsForm() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newIngridient, setNewIngridient] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ingridientsActionGet());
  }, []);

  const [ingridients, isFetch, isError] = useSelector(({ ingridients }) => [
    ingridients.ingridients,
    ingridients.isFetching,
    ingridients.error,
  ]);

  const cancelEdit = () => {};

  const applyEdit = () => {};

  const removeIngridient = (id) => {
    dispatch(ingridientsActionRemove(id, ingridients));
  };

  const handleSubmit = () => {
    dispatch(ingridientsActionCreate({ name: newIngridient }));
    setAddModalOpen(false);
    setNewIngridient("");
  };

  const handleCancelAddItem = () => {
    setAddModalOpen((isMenuOpen) => !isMenuOpen)
    setNewIngridient("");
  }

  return (
    <div className={cl.edit_ingridients_form_container}>
      <h1 className={cl.edit_ingridients_form_title}>Ингридиенты</h1>
      <div className={cl.edit_ingridients_form_wrapper}>
        {ingridients
          ? ingridients.map((item, index) => {
              return (
                <div key={item.id} className={cl.ingridient_container}>
                  <span className={cl.ingridient_span}>
                    {ingridients[index].name}
                  </span>
                  <div className={cl.ingridient_edit_buttons_container}>
                    {
                      //TODO переделать на изменение в модалке!
                    }
                    <div
                      className={cl.edit_button_container}
                      // onClick={() => setIsEdit(item.id)}
                    >
                      <FaEdit className={cl.edit_button} />
                      <span className={cl.button_tooltip_text}>
                        Редактировать
                      </span>
                    </div>
                    <div
                      className={cl.edit_button_container}
                      onClick={() => removeIngridient(item.id)}
                    >
                      <FaTrash className={cl.edit_button} />
                      <span className={cl.button_tooltip_text}>Удалить</span>
                    </div>
                  </div>
                </div>
              );
            })
          : isFetch
          ? null
          : //TODO Loading spinner
            null}
        <Modal visible={isAddModalOpen} setVisible={setAddModalOpen}>
          <div className={cl.add_ingridient_window}>
            <h3 className={cl.modal_title}>Добавить ингридиент</h3>
            <input
              placeholder={"Название ингридиента"}
              type={"text"}
              className={cl.add_ingridient_input}
              value={newIngridient}
              onChange={(e) => setNewIngridient(e.currentTarget.value)}
            />
            <div className={cl.add_window_buttons_container}>
              <button
                onClick={() => handleSubmit()}
                className={cn(cl.add_window_button, cl.apply)}
              >
                <FaCheck></FaCheck>
              </button>
              <div
                className={cn(cl.add_window_button, cl.cancel)}
                onClick={() => setAddModalOpen((isMenuOpen) => !isMenuOpen)}
              >
                <FaTimes></FaTimes>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className={cl.add_button_container}>
        <div
          className={cl.add_button}
          onClick={() => handleCancelAddItem()}
        >
          Добавить ингридиент
        </div>
      </div>
    </div>
  );
}

export default EditIngridientsForm;
