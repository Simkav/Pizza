import Modal from '../../Modal/Modal'
import cl from './DeleteModal.module.css'
import cn from 'classnames'
import { FaTimes, FaCheck } from 'react-icons/fa'
import { useLayoutEffect, useState } from 'react'

export default function DeleteModal ({
  visible,
  setVisible,
  id,
  name,
  handleSubmitRemove
}) {
  const [removeIngridient, setRemoveIngridient] = useState(name)

  useLayoutEffect(() => {
    if (!removeIngridient) setRemoveIngridient(name)
  }, [name])
  const handleSubmit = () => {
    handleSubmitRemove(id)
    handleClose()
  }
  
  const handleClose = () => setVisible(visible => !visible)
  const handleClosed = () => setRemoveIngridient('')

  return (
    <Modal
      visible={visible}
      handleClose={handleClose}
      handleClosed={handleClosed}
    >
      <div className={cl.delete_ingridient_window}>
        <h3 className={cl.modal_title}>Удалить ингридиент</h3>
        <span className={cl.delete_span}>
          Вы действительно хотите удалить ингридиент: {removeIngridient}?
        </span>
        <div className={cl.delete_window_buttons_container}>
          <button
            onClick={() => handleSubmit()}
            className={cn(cl.delete_window_button, cl.apply)}
          >
            <FaCheck></FaCheck>
          </button>
          <div
            className={cn(cl.delete_window_button, cl.cancel)}
            onClick={() => handleClose()}
          >
            <FaTimes></FaTimes>
          </div>
        </div>
      </div>
    </Modal>
  )
}
