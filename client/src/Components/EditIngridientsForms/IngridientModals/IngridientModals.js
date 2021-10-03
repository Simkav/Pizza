import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import ErrorModal from '../../ErrorModal/ErrorModal'
import AddModal from '../AddModal/AddModal'
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'
import * as ActionCreators from '../../../Actions/actionCreator'

export default function IngridientModals ({
  isDeleteModalOpen,
  setDeleteModalOpen,
  isEditModalOpen,
  setEditModalOpen,
  isAddModalOpen,
  setAddModalOpen
}) {
  const dispatch = useDispatch()

  const {
    ingridientsActionRemove,
    ingridientsActionCreate,
    ingridientsActionUpdate,
    ingridientsActionClearError
  } = bindActionCreators(ActionCreators, dispatch)

  const [ingridients, isError] = useSelector(({ ingridients }) => [
    ingridients.ingridients,
    ingridients.error
  ])

  const handleSubmitEdit = editableIngridient => {
    ingridientsActionUpdate(editableIngridient, ingridients)
    setEditModalOpen({ id: false, name: false, state: false })
  }

  const handleSubmitRemove = id => ingridientsActionRemove(id, ingridients)

  const handleSubmitAdd = newIngridient => {
    ingridientsActionCreate({ name: newIngridient })
    setAddModalOpen(false)
  }
  return (
    <>
      {isError ? (
        <ErrorModal error={isError} clearError={ingridientsActionClearError} />
      ) : null}

      <EditModal
        visible={isEditModalOpen.state}
        setVisible={setEditModalOpen}
        id={isEditModalOpen.id}
        name={isEditModalOpen.name}
        handleSubmitEdit={handleSubmitEdit}
      />
      <DeleteModal
        visible={isDeleteModalOpen.state}
        setVisible={setDeleteModalOpen}
        id={isDeleteModalOpen.id}
        name={isDeleteModalOpen.name}
        handleSubmitRemove={handleSubmitRemove}
      />
      <AddModal
        visible={isAddModalOpen}
        setVisible={setAddModalOpen}
        handleSubmitAdd={handleSubmitAdd}
      />
    </>
  )
}
