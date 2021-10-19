import Modal from '../../Modal/Modal'
import cl from './EditModal.module.css'
import cn from 'classnames'
import { FaTimes, FaCheck } from 'react-icons/fa'
import { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ingridientsActionUpdate } from '../../../Actions/actionCreator'

export default function EditModal ({ modalsState, modalsDispatch }) {
  const dispatch = useDispatch()
  const [newName, setNewName] = useState(modalsState.editModal.name)

  useLayoutEffect(() => {
    if (modalsState.editModal.state && !newName) {
      setNewName(modalsState.editModal.name)
    }
  }, [modalsState.editModal])

  const handleSubmit = () => {
    const editableIngridient = { id: modalsState.editModal.id, name: newName }
    dispatch(ingridientsActionUpdate(editableIngridient))
    handleClose()
  }

  const handleClose = () => modalsDispatch({ type: 'ON_CLOSE_EDIT_MODAL' })
  const handleClosed = () => {
    modalsDispatch({ type: 'ON_EDIT_MODAL_CLOSED' })
    setNewName('')
  }

  return (
    <Modal
      visible={modalsState.editModal.state}
      handleClose={handleClose}
      handleClosed={handleClosed}
    >
      <div className={cl.edit_ingridient_window}>
        <h3 className={cl.modal_title}>Редактировать ингридиент</h3>
        <input
          placeholder={'Название ингридиента'}
          type={'text'}
          className={cl.edit_ingridient_input}
          value={newName}
          onChange={e => setNewName(e.currentTarget.value)}
        />
        <div className={cl.edit_window_buttons_container}>
          <button
            onClick={() => handleSubmit()}
            className={cn(cl.edit_window_button, cl.apply)}
          >
            <FaCheck />
          </button>
          <div
            className={cn(cl.edit_window_button, cl.cancel)}
            onClick={() => {
              handleClose()
            }}
          >
            <FaTimes />
          </div>
        </div>
      </div>
    </Modal>
  )
}
