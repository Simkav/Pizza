import * as Yup from 'yup';
import 'yup-phone';

export const signInSchema = Yup.object({
  phone: Yup.string()
    .phone('UA', true, 'Не верный формат номера телефона')
    .required('Заполните поле'),
  password: Yup.string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .required('Заполните поле'),
});
