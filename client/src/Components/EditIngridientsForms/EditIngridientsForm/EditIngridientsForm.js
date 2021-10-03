import { useState } from 'react'
import cl from './EditIngridientsForm.module.css'
import { useSelector } from 'react-redux'
import IngridientContainer from '../IngridientContainer/IngridientContainer'
import IngridientModals from '../IngridientModals/IngridientModals'

export default function EditIngridientsForm () {
  // Сделать IngridientModalsReducer для облегчения компонента?
  const [isAddModalOpen, setAddModalOpen] = useState(false)

  const [isDeleteModalOpen, setDeleteModalOpen] = useState({
    id: false,
    name: '',
    state: false
  })

  const [isEditModalOpen, setEditModalOpen] = useState({
    id: false,
    name: '',
    state: false
  })

  const ingridients = useSelector(({ ingridients }) => ingridients.ingridients)

  return (
    <div className={cl.edit_ingridients_form_container}>
      <h1 className={cl.edit_ingridients_form_title}>Ингридиенты</h1>
      <div className={cl.edit_ingridients_form_wrapper}>
        {ingridients
          ? ingridients.map(item => (
              <IngridientContainer
                key={item.id}
                item={item}
                setEditModalOpen={setEditModalOpen}
                setDeleteModalOpen={setDeleteModalOpen}
              />
            ))
          : null}
        {
          <IngridientModals
            isDeleteModalOpen={isDeleteModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            isEditModalOpen={isEditModalOpen}
            setEditModalOpen={setEditModalOpen}
            isAddModalOpen={isAddModalOpen}
            setAddModalOpen={setAddModalOpen}
          />
        }
      </div>
      <div className={cl.add_button_container}>
        <div className={cl.add_button} onClick={() => setAddModalOpen(true)}>
          Добавить ингридиент
        </div>
      </div>
    </div>
  )
}
