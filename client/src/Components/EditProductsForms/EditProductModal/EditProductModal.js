import cl from './EditProductModal.module.css'
import cn from 'classnames'
import { FaTimes, FaCheck } from 'react-icons/fa'
import Modal from '../../Modal/Modal'
import UploadImageForm from '../UploadImageForm/UploadImageForm'
import IngridientsChooseForm from '../IngridientsChooseForm/IngridientsChooseForm'
import { newProductSchema } from '../../../Validations/NewProductSchema'
import { useFormik } from 'formik'
import { useLayoutEffect } from 'react'
import { productsActionUpdate } from '../../../Actions/actionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { NewProductFormInputItems } from '../../../Helpers/NewProductFormInputItems'
import * as API from '../../../Api'
import EditProductInput from '../EditProductInput/EditProductInput'

export default function EditProductModal ({ modalsState, modalsDispatch }) {
  const editModal = modalsState.editModal
  const dispatch = useDispatch()
  const mainProducts = useSelector(({ products }) => products.products)

  useLayoutEffect(() => {
    const getImage = async prop =>
      await API.ProductsCRUDApi.getProductImage(prop).then(result => result)

    async function init () {
      if (!editModal.state && editModal.closed) {
        NewProductFormik.resetForm()
      }
      if (editModal.state && editModal.product) {
        NewProductFormik.setFieldValue(
          'products',
          mainProducts
            .map(item => item.name)
            .filter(v => v !== editModal.product.name)
        )
        for (let prop in editModal.product) {
          if (prop === 'image') {
            NewProductFormik.setFieldValue(
              'image',
              await getImage(editModal.product[prop])
            )
          } else {
            NewProductFormik.setFieldValue(prop, editModal.product[prop])
            NewProductFormik.setFieldTouched(prop, true)
          }
        }
      }
    }
    init()
  }, [mainProducts, editModal])

  const NewProductFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      products: [],
      image: '',
      id: '',
      name: '',
      price: '',
      weight: '',
      ingredients: []
    },
    onSubmit: data => {
      const newProduct = Object.fromEntries(
        Object.entries(data).filter(item =>
          item[0] !== 'products' ? item[0] : null
        )
      )
      dispatch(productsActionUpdate(newProduct))
      handleClose()
    },
    validationSchema: newProductSchema
  })

  const handleClose = () => {
    modalsDispatch({ type: 'ON_CLOSE_EDIT_MODAL' })
  }

  const handleClosed = () => {
    modalsDispatch({ type: 'ON_EDIT_MODAL_CLOSED' })
  }

  return (
    <Modal
      visible={editModal.state}
      handleClose={handleClose}
      handleClosed={handleClosed}
    >
      {NewProductFormik.values.image ? (
        <form
          className={cl.edit_product_window}
          onSubmit={NewProductFormik.handleSubmit}
        >
          <h3 className={cl.modal_title}>Редактировать продукт</h3>
          <div className={cl.edit_product_row}>
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
      ) : null}
    </Modal>
  )
}
