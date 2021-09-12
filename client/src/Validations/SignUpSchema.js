import * as Yup from "yup";
import "yup-phone";

export const signUpSchema = Yup.object({
  phone: Yup.string()
    .phone("UA", true, "Не верный формат номера телефона")
    .required("Заполните поле"),
  password: Yup.string()
    .min(6, "Минимальная длина пароля 6 символов")
    .required("Заполните поле"),
  passwordConfirm: Yup.string()
    .test("passwords-match", "Пароли должны совпадать", function (value) {
      return this.parent.password === value;
    })
    .required("Заполните поле"),
});
