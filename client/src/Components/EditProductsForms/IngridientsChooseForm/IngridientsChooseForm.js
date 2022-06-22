import { useLayoutEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import cl from './IngridientsChooseForm.module.css';
import cn from 'classnames';

export default function IngridientsChooseForm({ NewProductFormik }) {
  const formikValue = NewProductFormik.values;
  const formikError = NewProductFormik.errors;
  const formikTouched = NewProductFormik.touched;
  const bottomElement = useRef(null);
  const ingridients = useSelector(
    ({ ingridients: { ingridients } }) => ingridients,
  );

  const [ingridientsToSelect, setIngridientsToSelect] = useState(
    ingridients.map((v) => v.id),
  );
  const [selectedIngridients, setSelectedIngridients] = useState(
    NewProductFormik.values.ingredients
      ? NewProductFormik.values.ingredients
      : [],
  );

  useLayoutEffect(() => {
    // Для обновления списка ингридиентов при изменении selectedIngridients
    if (selectedIngridients.length > 0 && formikValue.ingredients) {
      NewProductFormik.setFieldValue('ingredients', selectedIngridients);
      setIngridientsToSelect(
        ingridients.reduce((acc, { id }) => {
          if (
            id !== formikValue.ingredients.includes(id) &&
            !selectedIngridients.includes(id)
          ) {
            acc.push(id);
          }
          return acc;
        }, []),
      );
      NewProductFormik.setFieldTouched('ingredients', true);
    }
    // Для инициализации списка ингридиентов при редактировании
    if (
      selectedIngridients.length === 0 &&
      formikValue.ingredients.length > 0
    ) {
      setSelectedIngridients(formikValue.ingredients);
      NewProductFormik.setFieldTouched('ingredients', true);
    }
    // Для скролла к самому нижнему элементу в списке ингридиентов
    if (selectedIngridients.length > 0) bottomElement.current.scrollIntoView();
  }, [formikValue, selectedIngridients]);

  const handleSelectedIngridient = (index) => {
    setSelectedIngridients((selectedIngridients) => [
      ...selectedIngridients,
      index,
    ]);
    setIngridientsToSelect(
      ingridients.reduce((acc, { id }) => {
        if (id !== index && !selectedIngridients.includes(id)) {
          acc.push(id);
        }
        return acc;
      }, []),
    );
    NewProductFormik.setFieldValue(
      'ingredients',
      [...selectedIngridients, index],
      true,
    );
  };

  const handleRemoveIngridient = (index) => {
    setSelectedIngridients((selectedIngridients) =>
      selectedIngridients.filter((i) => i !== index),
    );
    setIngridientsToSelect(() =>
      ingridients.reduce((acc, { id }) => {
        if (id === index || !selectedIngridients.includes(id)) {
          acc.push(id);
        }
        return acc;
      }, []),
    );
    NewProductFormik.setFieldValue(
      'ingredients',
      selectedIngridients.filter((i) => i !== index),
      true,
    );
  };

  return (
    <div
      className={cn(
        cl.ingridients_choose_form_container,
        { [cl.active]: formikTouched.ingredients && !formikError.ingredients },
        {
          [cl.error]: formikTouched.ingredients && formikError.ingredients,
        },
      )}
    >
      <h3 className={cl.ingridients_choose_title}>Выбор ингридиентов</h3>
      <ul className={cl.ingridients_choose_wrapper}>
        {selectedIngridients
          ? selectedIngridients.map((i, index) => {
              return ingridients.map((item) => {
                if (item.id === i) {
                  return (
                    <li
                      key={item.id}
                      className={cl.input_container}
                      ref={
                        selectedIngridients.length - 1 === index
                          ? bottomElement
                          : null
                      }
                    >
                      <span className={cl.input_text}>{item.name}</span>
                      <div
                        className={cl.tag_button_remove}
                        onClick={() => handleRemoveIngridient(i)}
                      >
                        <FaTimes />
                      </div>
                    </li>
                  );
                }
              });
            })
          : null}
      </ul>
      {ingridientsToSelect.length ? (
        <div className={cn(cl.input_container, cl.input_container_choose)}>
          <select
            className={cl.input_select}
            onChange={(e) => {
              NewProductFormik.setFieldTouched('ingredients', true);
              if (e.target.value !== null)
                handleSelectedIngridient(Number(e.target.value));
            }}
            defaultValue={null}
          >
            <option
              className={cn(cl.input_text, cl.input_text_choose)}
              value={null}
            >
              Выберите ингридиент
            </option>
            {ingridientsToSelect.map((i) => {
              return ingridients.map((item) =>
                item.id === i ? (
                  <option
                    key={item.id}
                    className={cl.input_text}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ) : null,
              );
            })}
          </select>
        </div>
      ) : null}
      <div
        className={cn(cl.row, cl.error_text, {
          [cl.active]: formikTouched.ingredients && formikError.ingredients,
        })}
      >
        <span className={cl.input_error_text}>
          {formikTouched.ingredients ? formikError.ingredients : ''}
        </span>
      </div>
    </div>
  );
}
