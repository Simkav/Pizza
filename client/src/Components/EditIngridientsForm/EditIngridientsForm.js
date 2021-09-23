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
import { useFormik } from "formik";

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

  const IngridientsFormik = useFormik({
    initialValues: {
      newIngridient: "",
      ingridients: ingridients
        ? ingridients.map((item) => {
            return { [item.id]: item.name };
          })
        : null,
    },
    onSubmit: ({ newIngridient }) => {
      dispatch(ingridientsActionCreate({ name: newIngridient }));
    setModalOpen(false);
      IngridientsFormik.resetForm()
    },
  });

  const ingridientsValue = IngridientsFormik.values;

  return (
    <form
      onSubmit={IngridientsFormik.handleSubmit}
      className={cl.edit_ingridients_form_container}
    >
      <h1 className={cl.edit_ingridients_form_title}>Ингридиенты</h1>
      <div className={cl.edit_ingridients_form_wrapper}>
        {ingridients
          ? ingridients.map((item, index) => {
          return (
            <div key={item.id} className={cl.ingridient_container}>
              <input
                    type={"text"}
                    name={IngridientsFormik.initialValues.ingridients}
                    onChange={IngridientsFormik.handleChange}
                    onBlur={IngridientsFormik.handleBlur}
                disabled={isEdit == item.id ? false : true}
                className={cl.ingridient_input}
                    value={ingridients[index].name}
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
                          <span className={cl.button_tooltip_text}>
                            Отменить
                          </span>
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
                        <div
                          className={cl.edit_button_container}
                          onClick={() => removeIngridient(item.id)}
                        >
                      <FaTrash className={cl.edit_button} />
                          <span className={cl.button_tooltip_text}>
                            Удалить
                          </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
            })
          : isFetch
          ? null
          : //TODO Loading spinner
            null}
        <Modal visible={isModalOpen} setVisible={setModalOpen}>
          <div className={cl.add_ingridient_window}>
            <h3 className={cl.modal_title}>Добавить ингридиент</h3>
            <input
              type={"text"}
              name={"newIngridient"}
              onChange={IngridientsFormik.handleChange}
              onBlur={IngridientsFormik.handleBlur}
              className={cl.add_ingridient_input}
              value={ingridientsValue.newIngridient}
            />
            <div className={cl.add_window_buttons_container}>
              <button
                type={"submit"}
                className={cn(cl.add_window_button, cl.apply)}
              >
                <FaCheck></FaCheck>
              </button>
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
    </form>
  );
}

export default EditIngridientsForm;
