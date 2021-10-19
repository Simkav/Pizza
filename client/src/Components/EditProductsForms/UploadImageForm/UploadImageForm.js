import { useEffect, useRef, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import cl from './UploadImageForm.module.css'
import cn from 'classnames'

export default function UploadImageForm ({ NewProductFormik }) {
  const formikValue = NewProductFormik.values
  const formikError = NewProductFormik.errors
  const formikTouched = NewProductFormik.touched
  const [isImage, setImage] = useState(formikValue.image)
  const [isDragEnter, setDragEnter] = useState(false)
  const fileRef = useRef()

  useEffect(() => {
    if (formikValue.image) {
      setImage(URL.createObjectURL(formikValue.image))
      NewProductFormik.setFieldTouched('image', true)
    }
  }, [formikValue.image])

  const handleChange = file => NewProductFormik.setFieldValue('image', file)
  return (
    <div
      className={cn(
        cl.image_upload_form_container,
        { [cl.active]: formikTouched.image && !formikError.image },
        {
          [cl.error]: formikTouched.image && formikError.image
        }
      )}
    >
      <h3 className={cl.image_upload_text}>Фотография продукта</h3>
      <label
        onDragOver={event => {
          setDragEnter(true)
          event.preventDefault()
        }}
        onDragLeave={() => setDragEnter(false)}
        onDrop={
          !isImage && isDragEnter
            ? e => {
                handleChange(e.dataTransfer.files[0])
                e.preventDefault()
              }
            : null
        }
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
          name={'image'}
          className={cl.product_image_input}
          onBlur={NewProductFormik.handleBlur}
          onChange={e => handleChange(e.target.files[0])}
          disabled={isImage ? true : false}
        />
      </label>
      <div
        className={cn(cl.image_buttons_container, {
          [cl.active]: formikTouched.image && isImage
        })}
      >
        {isImage ? (
          <>
            <button
              onClick={() => {
                setImage(null)
                NewProductFormik.setErrors({ ...formikError, image: '' })
                NewProductFormik.setFieldValue('image', '', true)
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
          [cl.active]: formikTouched.image && formikError.image
        })}
      >
        <span className={cl.input_error_text}>
          {formikTouched.image ? formikError.image : ''}
        </span>
      </div>
    </div>
  )
}
