import React from 'react'
import { useSelector } from 'react-redux'
import ErrorModal from '../../ErrorModal/ErrorModal'
import AddProductModal from '../AddProductModal/AddProductModal'

export default function ProductModals ({
  isAddModalOpen,
  setAddModalOpen
}) {

  const handleSubmitAdd = newProduct => {
    setAddModalOpen(false)
  }

  return (
    <>
    {/*   {isError ? (
        <ErrorModal error={isError} clearError={'test'} />
      ) : null} */}
      {
        // TODO rest modals
      }
      <AddProductModal
        visible={isAddModalOpen}
        setVisible={setAddModalOpen}
        handleSubmitAdd={handleSubmitAdd}
      />
    </>
  )
}
