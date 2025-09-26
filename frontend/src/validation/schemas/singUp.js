import * as yup from 'yup';

const SignUpSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, 'Минимум 3 символа!')
    .max(20, 'Максимум 20 символов!')
    .required('Обязательное поле!'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символов!')
    .required('Обязательное поле!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать!')
    .required('Обязательное поле!')
});

export default SignUpSchema;
