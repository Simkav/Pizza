import cl from './EditIngridientsForm.module.css'
import { useSelector } from 'react-redux'
import IngridientContainer from '../IngridientContainer/IngridientContainer'
import IngridientModals from '../IngridientModals/IngridientModals'
import { useReducer } from 'react'

export default function EditIngridientsForm () {
  const initState = {
    addModal: { state: false, closed: true },
    editModal: { state: false, closed: true },
    deleteModal: { state: false, closed: true }
  }

  const ingridients = useSelector(({ ingridients }) => ingridients.ingridients)

  const modalReducer = (state = initState, action) => {
    switch (action.type) {
      case 'OPEN_ADD_MODAL':
        return { ...state, addModal: { state: true, closed: false } }
      case 'OPEN_DELETE_MODAL':
        return {
          ...state,
          deleteModal: { ...action.payload, state: true, closed: false }
        }
      case 'OPEN_EDIT_MODAL':
        return {
          ...state,
          editModal: { ...action.payload, state: true, closed: false }
        }
      case 'ON_CLOSE_ADD_MODAL':
        return { ...state, addModal: { ...state.addModal, state: false } }
      case 'ON_ADD_MODAL_CLOSED':
        return { ...state, addModal: { ...state.addModal, closed: true } }
      case 'ON_CLOSE_DELETE_MODAL':
        return { ...state, deleteModal: { ...state.deleteModal, state: false } }
      case 'ON_DELETE_MODAL_CLOSED':
        return { ...state, deleteModal: { ...state.deleteModal, closed: true } }
      case 'ON_CLOSE_EDIT_MODAL':
        return { ...state, editModal: { ...state.editModal, state: false } }
      case 'ON_EDIT_MODAL_CLOSED':
        return { ...state, editModal: { ...state.editModal, closed: true } }

      default:
        return state
    }
  }

  const [modalsState, modalsDispatch] = useReducer(modalReducer, initState)

/*   const [isAddModalOpen, setAddModalOpen] = useState(false)

  const [isDeleteModalOpen, setDeleteModalOpen] = useState({
    id: false,
    name: '',
    state: false
  })

  const [isEditModalOpen, setEditModalOpen] = useState({
    id: false,
    name: '',
    state: false
  }) */

  return (
    <div className={cl.edit_ingridients_form_container}>
      <h1 className={cl.edit_ingridients_form_title}>Ингридиенты</h1>
      <div className={cl.edit_ingridients_form_wrapper}>
        {ingridients
          ? ingridients.map(item => (
              <IngridientContainer
                key={item.id}
                item={item}
                modalsDispatch={modalsDispatch}
              />
            ))
          : null}
        {
          <IngridientModals
            modalsState={modalsState}
            modalsDispatch={modalsDispatch}
          />
        }
      </div>
      <div className={cl.add_button_container}>
        <div className={cl.add_button} onClick={() => modalsDispatch({type: 'OPEN_ADD_MODAL'})}>
          Добавить ингридиент
        </div>
      </div>
    </div>
  )
}
