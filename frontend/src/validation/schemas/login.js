import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, 'Минимум 3 символа!')
    .max(20, 'Максимум 20 символов!')
    .required('Обязательное поле!'),
  password: yup
    .string()
    .required('Обязательное поле!'),
});

export default LoginSchema;
