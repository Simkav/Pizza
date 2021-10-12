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

export default function EditProductModal ({ product, visible, setVisible }) {
  const dispatch = useDispatch()
  const mainProducts = useSelector(({ products }) => products.products)

  useLayoutEffect(() => {
    async function getImage (prop) {
      return await API.ProductsCRUDApi.getProductImage(prop).then(
        result => result
      )
    }
    async function init () {
      if (!visible) {
        NewProductFormik.resetForm()
      }
      if (product.state === true) {
        NewProductFormik.setFieldValue(
          'products',
          mainProducts.map(item => item.name).filter(v => v !== product.name)
        )
        for (let prop in product) {
          if (prop === 'Ingredients') {
            NewProductFormik.setFieldValue('ingredients', product[prop])
            NewProductFormik.setFieldTouched('ingredients', true)
          }
          if (prop === 'image') {
            NewProductFormik.setFieldValue('img', await getImage(product[prop]))
          } else if (prop !== 'Ingredients') {
            NewProductFormik.setFieldValue(prop, product[prop])
            NewProductFormik.setFieldTouched(prop, true)
          }
        }
      }
    }
    init()
  }, [visible, mainProducts])

  const NewProductFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      products: [],
      img: '',
      id: '',
      name: '',
      price: '',
      weight: '',
      ingredients: [],
      state: false
    },
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

  const formikValue = NewProductFormik.values
  const formikTouched = NewProductFormik.touched
  const formikError = NewProductFormik.errors

  return (
    <>
      {visible && formikValue.state === true ? (
        <Modal
          visible={visible}
          setVisible={setVisible}
          handleCancel={handleCancel}
        >
          <form
            className={cl.edit_product_window}
            onSubmit={NewProductFormik.handleSubmit}
          >
            <h3 className={cl.modal_title}>Редактировать продукт</h3>
            <UploadImageForm NewProductFormik={NewProductFormik} />
            <IngridientsChooseForm NewProductFormik={NewProductFormik} />
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
      ) : null}
    </>
  )
}
