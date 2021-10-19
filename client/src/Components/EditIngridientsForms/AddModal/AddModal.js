import Modal from '../../Modal/Modal'
import cl from './AddModal.module.css'
import cn from 'classnames'
import { FaTimes, FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ingridientsActionCreate } from '../../../Actions/actionCreator'

export default function AddModal ({ modalsState, modalsDispatch }) {
  const dispatch = useDispatch()
  const [newIngridient, setNewIngridient] = useState('')

  const handleSubmit = () => {
    dispatch(ingridientsActionCreate({ name: newIngridient }))
    handleClose()
  }

  const handleClose = () => modalsDispatch({ type: 'ON_CLOSE_ADD_MODAL' })
  const handleClosed = () => {
    modalsDispatch({ type: 'ON_ADD_MODAL_CLOSED' })
    setNewIngridient('')
  }

  return (
    <Modal
      visible={modalsState.addModal.state}
      handleClose={handleClose}
      handleClosed={handleClosed}
    >
      <div className={cl.add_ingridient_window}>
        <h3 className={cl.modal_title}>Добавить ингридиент</h3>
        <input
          placeholder={'Название ингридиента'}
          type={'text'}
          className={cl.add_ingridient_input}
          value={newIngridient}
          onChange={e => setNewIngridient(e.currentTarget.value)}
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
            onClick={() => handleClose()}
          >
            <FaTimes></FaTimes>
          </div>
        </div>
      </div>
    </Modal>
  )
}
