import cl from './EditIngridientInput.module.css'
import cn from 'classnames'

export default function EditIngridientInput ({name, isInvalid, validate}) {

  return (
    <div className={cl.input_container}>
      <div className={cl.row}>
        <div
          className={cn(
            cl.field_container,
            {
              [cl.input_empty]: !name
            },
            {
              [cl.field_container_valid]:
                !isInvalid && name
            }
          )}
        >
          <label className={cl.label}>{'Название ингридиента'}</label>
          <input
            type={'text'}
            className={cn(
              cl.add_product_input,
              {
                [cl.input_invalid]:
                  isInvalid
              },
              {
                [cl.input_valid]:
                  !isInvalid
              }
            )}
            onChange={(e) => validate(e.currentTarget.value)}
            value={name}
            autoComplete={'off'}
          />
        </div>
      </div>
      <div className={cn(cl.row, cl.error_text)}>
        <span className={cl.input_error_text}>
          {isInvalid ? isInvalid : ''}
        </span>
      </div>
    </div>
  )
}
