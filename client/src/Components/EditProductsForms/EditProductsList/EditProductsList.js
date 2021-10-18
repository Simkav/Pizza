import EditProduct from '../EditProduct/EditProduct'
import cl from './EditProductsList.module.css'
import { FaPlusCircle } from 'react-icons/fa'
import ProductModals from '../ProductModals/ProductModals'
import { useReducer } from 'react'

export default function EditProductsList ({ products, ingridients }) {
  const initState = {
    addModal: { state: false, closed: true },
    editModal: { state: false, closed: true },
    deleteModal: { state: false, closed: true }
  }

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

  return (
    <div>
      <ul className={cl.products_container}>
        <li
          className={cl.edit_product_button}
          onClick={() => modalsDispatch({ type: 'OPEN_ADD_MODAL' })}
        >
          <FaPlusCircle />
        </li>
        {products
          ? products.map(item => {
              return (
                <EditProduct
                  key={item.id}
                  item={item}
                  ingridients={ingridients}
                  modalsDispatch={modalsDispatch}
                />
              )
            })
          : null}
      </ul>
      <ProductModals
        modalsState={modalsState}
        modalsDispatch={modalsDispatch}
      />
    </div>
  )
}
