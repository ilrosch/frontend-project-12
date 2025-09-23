import { Alert, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setCredential } from '../../services/slices/authSlice';
import { useNavigate } from 'react-router';
import { login } from '../../api/auth';

const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Минимум 2 символа!')
    .max(50, 'Максимум 50 символов!')
    .required('Обязательное поле!'),
  password: yup.string().required('Обязательное поле!'),
});

export default function FormLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await login(values);
        localStorage.setItem('user', JSON.stringify(data));
        dispatch(setCredential(data));
        navigate('/', { replace: true });
      } catch (err) {
        formik.setStatus('error');
        console.error(err.code);
      }
    },
  });

  return (
    <Form className='mb-2' onSubmit={formik.handleSubmit} noValidate>
      <Form.FloatingLabel controlId='username' label='Ваш ник' className='mb-2'>
        <Form.Control
          type='text'
          name='username'
          placeholder='Ваш ник'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={formik.touched.username && !!formik.errors.username}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.touched.username && formik.errors.username}
        </Form.Control.Feedback>
      </Form.FloatingLabel>

      <Form.FloatingLabel controlId='password' label='Ваш пароль' className='mb-4'>
        <Form.Control
          type='password'
          name='password'
          placeholder='Ваш пароль'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={formik.touched.password && !!formik.errors.password}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.touched.password && formik.errors.password}
        </Form.Control.Feedback>
      </Form.FloatingLabel>

      <Button type='submit' variant='primary' size='lg' disabled={!formik.isValid || !formik.dirty}>
        Войти
      </Button>

      {formik.status === 'error' && (
        <Alert variant='danger' className='mt-3'>
          Неверные имя пользователя или пароль!
        </Alert>
      )}
    </Form>
  );
}
