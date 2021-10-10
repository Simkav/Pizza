import { useEffect, useRef, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import cl from './UploadImageForm.module.css'
import cn from 'classnames'

export default function UploadImageForm ({ NewProductFormik }) {
  const formikValue = NewProductFormik.values
  const formikError = NewProductFormik.errors
  const formikTouched = NewProductFormik.touched
  const [isImage, setImage] = useState(formikValue.img)
  const fileRef = useRef()

  useEffect(() => {
    if (formikValue.img) {
      setImage(URL.createObjectURL(formikValue.img))
      NewProductFormik.setFieldTouched('img', true)
    }
  }, [formikValue.img])

  return (
    <div
      className={cn(
        cl.image_upload_form_container,
        { [cl.active]: formikTouched.img && !formikError.img },
        {
          [cl.error]: formikTouched.img && formikError.img
        }
      )}
    >
      <h3 className={cl.image_upload_text}>Фотография продукта</h3>
      <label
        className={cn(cl.product_image_upload_container, {
          [cl.image_upload_container_disabled]: isImage
        })}
      >
        <div className={cl.product_image_holder}>
          {isImage ? (
            <img
              className={cn(cl.product_image, {
                [cl.product_image_selected]: !formikError
              })}
              src={isImage}
              alt={'product'}
            />
          ) : null}
        </div>
        {!isImage ? (
          <>
            <div className={cl.cloud_upload}>
              <FaCloudUploadAlt />
            </div>
            <span className={cl.image_input_text}>
              Нажмите, или перетащите фотографию
            </span>
          </>
        ) : null}
        <input
          ref={fileRef}
          type={'file'}
          accept={'image/*'}
          name={'img'}
          className={cl.product_image_input}
          onBlur={NewProductFormik.handleBlur}
          onChange={e => {
            NewProductFormik.setTouched({
              ...NewProductFormik.touched,
              img: true
            })
            NewProductFormik.setFieldValue('img', e.target.files[0])
          }}
          disabled={isImage ? true : false}
        />
      </label>
      <div
        className={cn(cl.image_buttons_container, {
          [cl.active]: formikTouched.img && isImage
        })}
      >
        {isImage ? (
          <>
            <button
              onClick={() => {
                setImage(null)
                NewProductFormik.setErrors({ ...formikError, img: '' })
                NewProductFormik.setFieldValue('img', '')
                fileRef.current.value = ''
              }}
              className={cn(cl.add_window_button, cl.cloud_button)}
            >
              <FaCloudUploadAlt />
            </button>
          </>
        ) : null}
      </div>
      <div
        className={cn(cl.row, cl.error_text, {
          [cl.active]: formikTouched.img && formikError.img
        })}
      >
        <span className={cl.input_error_text}>
          {formikTouched.img ? formikError.img : ''}
        </span>
      </div>
    </div>
  )
}
