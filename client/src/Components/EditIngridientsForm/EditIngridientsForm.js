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
  const [isModalOpen, setModalOpen] = useState(false);
  // TODO Вынести ingridient container в отдельный компонент? IngridientItemForm
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ingridientsActionGet());
  }, []);

  const [ingridients, isFetch] = useSelector(({ ingridients }) => [
    ingridients.ingridients,
    ingridients.isFetching,
  ]);

  const cancelEdit = (id) => {
    setIsEdit(false);
  };

  const applyEdit = (id) => {
    setIsEdit(false);
  };

  const removeIngridient = (id) => {
    dispatch(ingridientsActionRemove(id));
  };
    setModalOpen(false);
  }

  return (
    <div className={cl.edit_ingridients_form_container}>
      <h1 className={cl.edit_ingridients_form_title}>Ингридиенты</h1>
      <div className={cl.edit_ingridients_form_wrapper}>
        {ingridients === null ? null : ingridients.map((item) => {
          return (
            <div key={item.id} className={cl.ingridient_container}>
              <input
                disabled={isEdit == item.id ? false : true}
                className={cl.ingridient_input}
                defaultValue={item.name}
              />
              <div className={cl.ingridient_edit_buttons_container}>
                {isEdit == item.id ? (
                  <>
                    <div
                      className={cl.edit_button_container}
                      onClick={() => applyEdit(item.id)}
                    >
                      <FaCheck className={cl.edit_button} />
                      <span className={cl.button_tooltip_text}>
                        Подтвердить
                      </span>
                    </div>
                    <div
                      className={cl.edit_button_container}
                      onClick={() => cancelEdit(item.id)}
                    >
                      <FaTimes className={cl.edit_button} />
                      <span className={cl.button_tooltip_text}>Отменить</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={cl.edit_button_container}
                      onClick={() => setIsEdit(item.id)}
                    >
                      <FaEdit className={cl.edit_button} />
                      <span className={cl.button_tooltip_text}>
                        Редактировать
                      </span>
                    </div>
                    <div className={cl.edit_button_container}>
                      <FaTrash className={cl.edit_button} />
                      <span className={cl.button_tooltip_text}>Удалить</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
        <Modal visible={isModalOpen} setVisible={setModalOpen}>
          <div className={cl.add_ingridient_window}>
            <h3 className={cl.modal_title}>Добавить ингридиент</h3>
            <input className={cl.add_ingridient_input} />
            <div className={cl.add_window_buttons_container}>
              <div className={cn(cl.add_window_button, cl.apply)}
              onClick={addIngridient}>
                <FaCheck></FaCheck>
              </div>
              <div
                className={cn(cl.add_window_button, cl.cancel)}
                onClick={() => setModalOpen((isMenuOpen) => !isMenuOpen)}
              >
                <FaTimes></FaTimes>
              </div>
            </div>
          </div>
        </Modal>
        <div className={cl.add_button_container}>
          <div
            className={cl.add_button}
            onClick={() => setModalOpen((isMenuOpen) => !isMenuOpen)}
          >
            Добавить ингридиент
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditIngridientsForm;
