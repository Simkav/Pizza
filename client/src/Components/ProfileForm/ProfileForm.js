import { useSelector, useDispatch } from "react-redux";
import cl from "./ProfileForm.module.css";
import cn from "classnames";
import { useState } from "react";
import { useFormik } from "formik";

function ProfileForm() {
  const [isEdit, setIsEdit] = useState(false);
  const currentUser = useSelector(
    (state) => state.currentUser.currentUserObject
  );

  const dispatch = useDispatch();
  const editUserPersonalInfo = (values) => {
    dispatch({
      type: "EDIT_USER",
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
    setIsEdit(!isEdit)
    formikValue.phone = currentUser.phone
    formikValue.password = currentUser.password
    formikValue.email = currentUser.email
    formikValue.firstName = currentUser.firstName
    formikValue.secondName = currentUser.secondName
  }

  const ProfileFormik = useFormik({
    initialValues: {
      phone: currentUser === undefined ? "" : currentUser.phone,
      password: currentUser === undefined ? "" : currentUser.password,
      email: currentUser === undefined ? "" : currentUser.email,
      firstName: currentUser === undefined ? "" : currentUser.firstName,
      secondName: currentUser === undefined ? "" : currentUser.secondName,
    },
    onSubmit: (values) => {
      editUserPersonalInfo(values);
      setIsEdit(!isEdit)
    },
  });

  const formikValue = ProfileFormik.values;

  return (
    <form onSubmit={ProfileFormik.handleSubmit}>
      <div className={cl.row}>
        <div className={cn(cl.field_container, cl.column)}>
          <div className={cl.field_title}>Телефон</div>
          <input
            type={"tel"}
            name={"phone"}
            onChange={ProfileFormik.handleChange}
            onBlur={ProfileFormik.handleBlur}
            value={formikValue.phone}
            disabled={isEdit ? false : true}
            className={cn(cl.field_input, { [cl.field_input_active]: isEdit })}
          ></input>
        </div>
      </div>
      <div className={cl.row}>
        <div className={cn(cl.field_container, cl.column)}>
          <div className={cl.field_title}>Пароль</div>
          <input
            type={"password"}
            name={"password"}
            onChange={ProfileFormik.handleChange}
            onBlur={ProfileFormik.handleBlur}
            value={formikValue.password}
            autoComplete={"password"}
            disabled={isEdit ? false : true}
            className={cn(cl.field_input, { [cl.field_input_active]: isEdit })}
          ></input>
        </div>
      </div>
      <div className={cl.row}>
        <div className={cn(cl.field_container, cl.column)}>
          <div className={cl.field_title}>Email</div>
          <input
            type={"email"}
            name={"email"}
            onChange={ProfileFormik.handleChange}
            onBlur={ProfileFormik.handleBlur}
            value={formikValue.email}
            disabled={isEdit ? false : true}
            className={cn(cl.field_input, { [cl.field_input_active]: isEdit })}
          ></input>
        </div>
      </div>
      <div className={cl.row}>
        <div className={cn(cl.field_container, cl.column)}>
          <div className={cl.field_title}>Имя</div>
          <input
            type={"text"}
            name={"firstName"}
            onChange={ProfileFormik.handleChange}
            onBlur={ProfileFormik.handleBlur}
            value={formikValue.firstName}
            disabled={isEdit ? false : true}
            className={cn(cl.field_input, { [cl.field_input_active]: isEdit })}
          ></input>
        </div>
      </div>
      <div className={cl.row}>
        <div className={cn(cl.field_container, cl.column)}>
          <div className={cl.field_title}>Фамилия</div>
          <input
            type={"text"}
            name={"secondName"}
            onChange={ProfileFormik.handleChange}
            onBlur={ProfileFormik.handleBlur}
            value={formikValue.secondName}
            disabled={isEdit ? false : true}
            className={cn(cl.field_input, { [cl.field_input_active]: isEdit })}
          ></input>
        </div>
      </div>
      <div className={cn(cl.row)}>
        {isEdit ? (
          <>
            <div className={cl.field_container}>
              <button type={"submit"} className={cn(cl.button, cl.half)}>
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

export default ProfileForm;
