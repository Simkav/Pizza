import { useLayoutEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import cl from './IngridientsChooseForm.module.css'
import cn from 'classnames'

export default function IngridientsChooseForm ({ NewProductFormik }) {
  const formikValue = NewProductFormik.values
  const formikError = NewProductFormik.errors
  const formikTouched = NewProductFormik.touched
  const ingridients = useSelector(
    ({ ingridients: { ingridients } }) => ingridients
  )

  const [ingridientsToSelect, setIngridientsToSelect] = useState(
    ingridients.map(v => v.id)
  )
  const [selectedIngridients, setSelectedIngridients] = useState(
    NewProductFormik.values.ingredients
      ? NewProductFormik.values.ingredients
      : []
  )

  useLayoutEffect(() => {
    if (selectedIngridients) {
      NewProductFormik.setFieldValue('ingredients', selectedIngridients)
      setIngridientsToSelect(
        ingridients.reduce((acc, { id }) => {
          if (
            id !== formikValue.ingredients.includes(id) &&
            !selectedIngridients.includes(id)
          ) {
            acc.push(id)
          }
          return acc
        }, [])
      )
    }
    if (!selectedIngridients && NewProductFormik.ingredients.length > 0) {
      setSelectedIngridients(NewProductFormik.values.ingredients)
      NewProductFormik.setFieldTouched('ingredients', true)
    }
  }, [selectedIngridients])

  const handleSelectedIngridient = index => {
    setSelectedIngridients(selectedIngridients => [
      ...selectedIngridients,
      index
    ])
    setIngridientsToSelect(
      ingridients.reduce((acc, { id }) => {
        if (id !== index && !selectedIngridients.includes(id)) {
          acc.push(id)
        }
        return acc
      }, [])
    )
  }

  const handleRemoveIngridient = index => {
    setSelectedIngridients(selectedIngridients =>
      selectedIngridients.filter(i => i !== index)
    )
    setIngridientsToSelect(() =>
      ingridients.reduce((acc, { id }) => {
        if (id === index || !selectedIngridients.includes(id)) {
          acc.push(id)
        }
        return acc
      }, [])
    )
  }

  return (
    <div
      className={cn(
        cl.ingridients_choose_form_container,
        { [cl.active]: formikTouched.ingredients && !formikError.ingredients },
        {
          [cl.error]: formikTouched.ingredients && formikError.ingredients
        }
      )}
    >
      <h3 className={cl.ingridients_choose_title}>Выбор ингридиентов</h3>
      <ul className={cl.ingridients_choose_wrapper}>
        {selectedIngridients
          ? selectedIngridients.map(i => {
              return ingridients.map(item => {
                if (item.id === i) {
                  return (
                    <li key={item.id} className={cl.input_container}>
                      <span className={cl.input_text}>{item.name}</span>
                      <div
                        className={cl.tag_button_remove}
                        onClick={() => handleRemoveIngridient(i)}
                      >
                        <FaTimes />
                      </div>
                    </li>
                  )
                }
              })
            })
          : null}
        {ingridientsToSelect.length > 0 ? (
          <li className={cl.input_container}>
            <select
              className={cl.input_select}
              onChange={e => {
                NewProductFormik.setFieldTouched('ingredients', true)
                if (e.target.value !== null)
                  handleSelectedIngridient(Number(e.target.value))
              }}
              defaultValue={null}
            >
              <option className={cl.input_text} value={null}>
                Выберите ингридиент
              </option>
              {ingridientsToSelect.map(i => {
                return ingridients.map(item =>
                  item.id === i ? (
                    <option
                      key={item.id}
                      className={cl.input_text}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ) : null
                )
              })}
            </select>
          </li>
        ) : null}
      </ul>
      <div
        className={cn(cl.row, cl.error_text, {
          [cl.active]: formikTouched.ingredients && formikError.ingredients
        })}
      >
        <span className={cl.input_error_text}>
          {formikTouched.ingredients ? formikError.ingredients : ''}
        </span>
      </div>
    </div>
  )
}
