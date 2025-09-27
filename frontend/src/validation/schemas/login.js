import * as yup from 'yup';

const LoginSchema = (t) => yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, t('yup.min', { count: 3 }))
    .max(20, t('yup.max', { count: 20 }))
    .required(t('yup.required')),
  password: yup
    .string()
    .required(t('yup.required')),
});

export default LoginSchema;
