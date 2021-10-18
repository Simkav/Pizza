import cl from './AddProductModal.module.css'
import cn from 'classnames'
import { FaTimes, FaCheck } from 'react-icons/fa'
import Modal from '../../Modal/Modal'
import UploadImageForm from '../UploadImageForm/UploadImageForm'
import IngridientsChooseForm from '../IngridientsChooseForm/IngridientsChooseForm'
import { newProductSchema } from '../../../Validations/NewProductSchema'
import { useFormik } from 'formik'
import { useLayoutEffect } from 'react'
import { productsActionCreate } from '../../../Actions/actionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { NewProductFormInputItems } from '../../../Helpers/NewProductFormInputItems'
import EditProductInput from '../EditProductInput/EditProductInput'

export default function AddProductModal ({ modalsState, modalsDispatch }) {
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    if (!modalsState.addModal.state && modalsState.addModal.closed) {
      NewProductFormik.resetForm()
    }
  }, [modalsState.addModal])

  const products = useSelector(({ products }) => products.products)

  const NewProductFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      products: products ? products.map(item => item.name) : null,
      image: '',
      name: '',
      ingredients: [],
      weight: '',
      price: ''
    },
    onSubmit: data => {
      const newProduct = Object.fromEntries(
        Object.entries(data).filter(item => item[0] !== 'products')
      )
      dispatch(productsActionCreate({ product: newProduct }))
      handleClose()
    },
    validationSchema: newProductSchema
  })

  const handleClose = () => {
    modalsDispatch({ type: 'ON_CLOSE_ADD_MODAL' })
  }

  const handleClosed = () => {
    modalsDispatch({ type: 'ON_ADD_MODAL_CLOSED' })
  }

  return (
    <Modal
      visible={modalsState.addModal.state}
      handleClose={handleClose}
      handleClosed={handleClosed}
    >
      <form
        className={cl.add_product_window}
        onSubmit={NewProductFormik.handleSubmit}
      >
        <h3 className={cl.modal_title}>Добавить продукт</h3>
        <div className={cl.add_product_row}>
          <UploadImageForm NewProductFormik={NewProductFormik} />
          <IngridientsChooseForm NewProductFormik={NewProductFormik} />
          <div className={cl.inputs_fields_container}>
            {NewProductFormInputItems.map(item => (
              <EditProductInput
                key={item.name}
                NewProductFormik={NewProductFormik}
                item={item}
              />
            ))}
          </div>
        </div>
        <div className={cl.add_window_buttons_container}>
          <button
            type={'submit'}
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
      </form>
    </Modal>
  )
}
