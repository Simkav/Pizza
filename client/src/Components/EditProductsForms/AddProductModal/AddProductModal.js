import cl from './AddProductModal.module.css'
import cn from 'classnames'
import { FaTimes, FaCheck } from 'react-icons/fa'
import Modal from '../../Modal/Modal'
import UploadImageForm from '../UploadImageForm/UploadImageForm'
import IngridientsChooseForm from '../IngridientsChooseForm/IngridientsChooseForm'
import { newProductSchema } from '../../../Validations/NewProductSchema'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { productsActionCreate } from '../../../Actions/actionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { NewProductFormInputItems } from '../../../Helpers/NewProductFormInputItems'

export default function AddProductModal ({ visible, setVisible }) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!visible) {
      NewProductFormik.resetForm()
    }
  }, [visible])

  const products = useSelector(({ products }) => products.products)

  const NewProductFormik = useFormik({
    initialValues: {
      products: products.map(item => item.name),
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
      setVisible(visible => !visible)
    },
    validationSchema: newProductSchema
  })

  const handleCancel = () => {
    setVisible(visible => !visible)
  }

  const formikValue = NewProductFormik.values
  const formikTouched = NewProductFormik.touched
  const formikError = NewProductFormik.errors

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      handleCancel={handleCancel}
    >
      <form
        className={cl.add_product_window}
        onSubmit={NewProductFormik.handleSubmit}
      >
        <h3 className={cl.modal_title}>Добавить продукт</h3>
        {visible ? (
          <>
            <UploadImageForm NewProductFormik={NewProductFormik} />
            <IngridientsChooseForm NewProductFormik={NewProductFormik} />
          </>
        ) : null}
        {NewProductFormInputItems.map(item => (
          <div className={cl.input_container} key={item.name}>
            <div className={cl.row}>
              <div
                className={cn(
                  cl.field_container,
                  {
                    [cl.input_empty]: !formikValue[item.name]
                  },
                  {
                    [cl.field_container_valid]:
                      !formikError[item.name] & formikTouched[item.name]
                  }
                )}
              >
                <label className={cl.label}>{item.labelText}</label>
                <input
                  type={item.type}
                  className={cn(
                    cl.add_product_input,
                    {
                      [cl.input_invalid]:
                        formikTouched[item.name] && formikError[item.name]
                    },
                    {
                      [cl.input_valid]:
                        !formikError[item.name] && formikTouched[item.name]
                    }
                  )}
                  name={item.name}
                  onChange={NewProductFormik.handleChange}
                  onBlur={NewProductFormik.handleBlur}
                  value={formikValue[item.name]}
                  autoComplete={'off'}
                />
              </div>
            </div>
            <div className={cn(cl.row, cl.error_text)}>
              <span className={cl.input_error_text}>
                {formikTouched[item.name] ? formikError[item.name] : ''}
              </span>
            </div>
          </div>
        ))}
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
