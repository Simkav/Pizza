import cl from './EditProductInput.module.css';
import cn from 'classnames';

export default function EditProductInput({ item, NewProductFormik }) {
  const formikValue = NewProductFormik.values;
  const formikTouched = NewProductFormik.touched;
  const formikError = NewProductFormik.errors;

  return (
    <div className={cl.input_container}>
      <div className={cl.row}>
        <div
          className={cn(
            cl.field_container,
            {
              [cl.input_empty]: !formikValue[item.name],
            },
            {
              [cl.field_container_valid]:
                !formikError[item.name] & formikTouched[item.name],
            },
          )}
        >
          <label className={cl.label}>{item.labelText}</label>
          <input
            type={item.type}
            className={cn(
              cl.add_product_input,
              {
                [cl.input_invalid]:
                  formikTouched[item.name] && formikError[item.name],
              },
              {
                [cl.input_valid]:
                  !formikError[item.name] && formikTouched[item.name],
              },
            )}
            name={item.name}
            onChange={async (e) => {
              await NewProductFormik.setFieldValue(item.name, e.target.value);
              await NewProductFormik.validateField(item.name);
            }}
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
  );
}
