import { useSelector, useDispatch } from 'react-redux';
import cl from './ProfileForm.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { useFormik } from 'formik';
import { ProfilePersonalInfoItems } from '../../../Helpers/ProfilePersonalInfoItems';

export default function ProfileForm() {
  const [isEdit, setIsEdit] = useState(false);
  const currentUser = useSelector(({ auth }) => auth).user;

  const dispatch = useDispatch();
  const editUserPersonalInfo = (values) => {
    dispatch({
      type: 'EDIT_USER',
      payload: {
        phone: values.phone,
        password: values.password,
        email: values.email,
        firstName: values.firstName,
        secondName: values.secondName,
      },
    });
  };

  const cancelUserProfileChanges = () => {
    setIsEdit(!isEdit);
    formikValue.phone = currentUser.phone;
    formikValue.password = currentUser.password;
    formikValue.email = currentUser.email;
    formikValue.firstName = currentUser.firstName;
    formikValue.secondName = currentUser.secondName;
  };

  const ProfileFormik = useFormik({
    initialValues: {
      phone: currentUser.phone === null ? '' : currentUser.phone,
      password: currentUser.password === null ? '' : currentUser.password,
      email: currentUser.email === null ? '' : currentUser.email,
      firstName: currentUser.firstName === null ? '' : currentUser.firstName,
      secondName: currentUser.secondName === null ? '' : currentUser.secondName,
    },
    onSubmit: (values) => {
      editUserPersonalInfo(values);
      setIsEdit(!isEdit);
    },
  });

  const formikValue = ProfileFormik.values;

  return (
    <form onSubmit={ProfileFormik.handleSubmit}>
      {ProfilePersonalInfoItems.map((item) => {
        return (
          <div className={cl.row} key={item.name}>
            <div className={cn(cl.field_container, cl.column)}>
              <div className={cl.field_title}>{item.fieldText}</div>
              <input
                type={item.type}
                name={item.name}
                onChange={ProfileFormik.handleChange}
                onBlur={ProfileFormik.handleBlur}
                value={formikValue[item.name]}
                disabled={isEdit ? false : true}
                className={cn(cl.field_input, {
                  [cl.field_input_active]: isEdit,
                })}
              ></input>
            </div>
          </div>
        );
      })}
      <div className={cn(cl.row)}>
        {isEdit ? (
          <>
            <div className={cl.field_container}>
              <button type={'submit'} className={cn(cl.button, cl.half)}>
                Подтвердить
              </button>
            </div>
            <div className={cl.field_container}>
              <button
                onClick={cancelUserProfileChanges}
                className={cn(cl.button, cl.half)}
              >
                Отменить
              </button>
            </div>
          </>
        ) : (
          <button onClick={() => setIsEdit(!isEdit)} className={cl.button}>
            Редактировать
          </button>
        )}
      </div>
    </form>
  );
}
