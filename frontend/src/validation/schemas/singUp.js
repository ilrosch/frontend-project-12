import * as yup from 'yup';

const SignUpSchema = (t) => yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, t('yup.min', { count: 3 }))
    .max(20, t('yup.max', { count: 20 }))
    .required(t('yup.required')),
  password: yup
    .string()
    .min(6, t('yup.max', { count: 6 }))
    .required(t('yup.required')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], t('yup.form.passwordsMustMatch'))
    .required(t('yup.required')),
});

export default SignUpSchema;
