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

export default function EditProductModal ({ product, visible, setVisible }) {
  const dispatch = useDispatch()
  const mainProducts = useSelector(({ products }) => products.products)

  useLayoutEffect(() => {
    const getImage = async prop =>
      await API.ProductsCRUDApi.getProductImage(prop).then(result => result)

    async function init () {
      if (!visible || !product.state || !product) {
        NewProductFormik.resetForm()
        NewProductFormik.setFieldValue('state', false)
      }
      if (product.state === true) {
        NewProductFormik.setFieldValue(
          'products',
          mainProducts.map(item => item.name).filter(v => v !== product.name)
        )
        for (let prop in product) {
          if (prop === 'image') {
            NewProductFormik.setFieldValue(
              'image',
              await getImage(product[prop])
            )
          } else {
            NewProductFormik.setFieldValue(prop, product[prop])
            NewProductFormik.setFieldTouched(prop, true)
          }
        }
      }
    }
    init()
  }, [product, mainProducts, visible])

  const NewProductFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      products: [],
      image: '',
      id: '',
      name: '',
      price: '',
      weight: '',
      ingredients: [],
      state: false
    },
    validateOnChange: true,
    onSubmit: data => {
      const newProduct = Object.fromEntries(
        Object.entries(data).filter(item => {
          if (!(item[0] === 'state' || item[0] === 'products')) {
            return item[0]
          }
        })
      )
      dispatch(productsActionUpdate(newProduct))
      setVisible(visible => !visible)
    },
    validationSchema: newProductSchema
  })

  const handleCancel = () => {
    setVisible(visible => !visible)
  }

  return (
    <Modal visible={visible} handleCancel={handleCancel}>
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
            onClick={() => handleCancel()}
          >
            <FaTimes></FaTimes>
          </div>
        </div>
      </form>
    </Modal>
  )
}
