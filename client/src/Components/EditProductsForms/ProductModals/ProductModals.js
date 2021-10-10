import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import ErrorModal from '../../ErrorModal/ErrorModal'
import AddProductModal from '../AddProductModal/AddProductModal'
import * as ActionCreators from '../../../Actions/actionCreator'
import DeleteProductModal from '../DeleteProductModal/DeleteProductModal'
import EditProductModal from '../EditProductModal/EditProductModal'

export default function ProductModals ({
  isAddModalOpen,
  setAddModalOpen,
  isEditModalOpen,
  setEditModalOpen,
  isDeleteModalOpen,
  setDeleteModalOpen
}) {
  const dispatch = useDispatch()

  const { productsActionRemove, productsActionClearError } = bindActionCreators(
    ActionCreators,
    dispatch
  )

  const [products, isError] = useSelector(({ products }) => [
    products.products,
    products.error
  ])

  const handleSubmitRemove = id => productsActionRemove(id, products)

  return (
    <>
      {isError ? (
        <ErrorModal error={isError} clearError={productsActionClearError} />
      ) : null}
      <AddProductModal visible={isAddModalOpen} setVisible={setAddModalOpen} />
      <DeleteProductModal
        visible={isDeleteModalOpen.state}
        setVisible={setDeleteModalOpen}
        id={isDeleteModalOpen.id}
        name={isDeleteModalOpen.name}
        handleSubmitRemove={handleSubmitRemove}
      />
      <EditProductModal
        product={isEditModalOpen}
        visible={isEditModalOpen.state}
        setVisible={setEditModalOpen}
      />
    </>
  )
}
